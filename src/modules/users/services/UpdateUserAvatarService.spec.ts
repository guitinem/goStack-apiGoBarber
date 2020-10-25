import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateAvatarUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'teste.jpge',
    });

    expect(user.avatar).toBe('teste.jpge');
  });

  it('should not be able to update an avatar from non exist user', async () => {
    expect(
      updateUserAvatarService.execute({
        user_id: 'non-exist-user',
        avatarFileName: 'teste.jpge',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'teste.jpge',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'teste_novo.jpge',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('teste.jpge');
    expect(user.avatar).toBe('teste_novo.jpge');
  });
});
