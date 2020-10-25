import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.name).toBe('Guilherme Teste');
    expect(profile.email).toBe('guilherme@teste.com');
  });

  it('should not be able to show a non-existing profile', async () => {
    await expect(
      showProfileService.execute({ user_id: 'non-existing-user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
