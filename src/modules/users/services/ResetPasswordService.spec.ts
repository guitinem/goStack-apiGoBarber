// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Fulano Santos',
      email: 'fulano.santos@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      token,
      password: '123123',
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toEqual('123123');
  });

  it('should not be able to reset the password with a non-exist token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-exist-token',
        password: 'randomPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with a non-exist user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-exist-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: 'randomPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than two hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'Fulano Santos',
      email: 'fulano.santos@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: 'randomPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
