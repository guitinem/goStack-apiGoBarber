import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    const authenticUser = await authenticateUserService.execute({
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    expect(authenticUser).toHaveProperty('user');
    expect(authenticUser.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'email.fake@gmail.com',
        password: 'notexist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Fulano Silva',
      email: 'fula.silva@gmail.com',
      password: '123456teste',
    });

    await expect(
      authenticateUserService.execute({
        email: 'fula.silva@gmail.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
