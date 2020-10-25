import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Guilherme Teste',
      email: 'guilherme@teste.com',
      password: 'daksdakdk',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Guilherme Nao Teste',
      email: 'guilhermenaoteste@teste.com',
      password: 'daksdakdk',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Guilherme Novo',
      email: 'guilhermenovo@teste.com',
      password: 'daksdakdk',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});