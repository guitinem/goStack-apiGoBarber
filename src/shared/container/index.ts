import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

// Appointments
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepositry';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// Notificaitons
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

// UserTokens
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);
