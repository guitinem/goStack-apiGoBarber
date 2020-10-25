import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRouter.use(EnsureAuthenticated);

appointmentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    }),
  }),
  appointmentsController.create,
);
appointmentRouter.get('/me', providerAppointmentsController.index);

export default appointmentRouter;
