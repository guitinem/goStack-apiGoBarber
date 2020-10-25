import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    fakeUserRepository.create({
      name: 'Fulano Santos',
      email: 'fulano.santos@gmail.com',
      password: '123456oi',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'fulano.santos@gmail.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'fulano.santos@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Fulano Santos',
      email: 'fulano.santos@gmail.com',
      password: '123456oi',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'fulano.santos@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
