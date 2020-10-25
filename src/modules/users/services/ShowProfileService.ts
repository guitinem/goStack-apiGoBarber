import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Users from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return user;
  }
}

export default ShowProfileService;
