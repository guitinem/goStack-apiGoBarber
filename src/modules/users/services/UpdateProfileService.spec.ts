import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateAvatarUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Guilherme Outro Teste',
      email: 'guilherme.tinem@teste.com',
    });

    expect(updatedUser.name).toBe('Guilherme Outro Teste');
    expect(updatedUser.email).toBe('guilherme.tinem@teste.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    const user = await fakeUsersRepository.create({
      name: 'Guilherme Novo Teste',
      email: 'guilherme.novo@teste.com',
      password: 'daksdakdk',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Guilherme Outro Teste',
        email: 'guilherme@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'guilherme@teste.com',
      name: 'Guilherme Teste',
      password: '456123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('456123');
  });

  it('should not be able to update password without old one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'guilherme@teste.com',
        name: 'Guilherme Teste',
        password: '456123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'guilherme@teste.com',
        name: 'Guilherme Teste',
        password: '456123',
        old_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        email: 'guilherme@teste.com',
        name: 'Guilherme Teste',
        password: '456123',
        old_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
