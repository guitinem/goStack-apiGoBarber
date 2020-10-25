import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordsRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  forgotPasswordController.create,
);
passwordsRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  resetPasswordController.create,
);

export default passwordsRouter;
