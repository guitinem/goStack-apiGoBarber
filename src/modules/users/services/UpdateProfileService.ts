import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import Users from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email already in use!');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password  to set a new one',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match!');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.userRepository.save(user);
  }
}

export default UpdateProfile;
