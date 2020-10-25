import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
// import User from '../infra/typeorm/entities/Users';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Users token does not exists');
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Users does not exists');
    }

    const createdDateToken = userToken.created_at;
    const compareDate = addHours(createdDateToken, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Expired token');
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
