import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import EnsureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(EnsureAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    }),
  }),
  profileController.update,
);

profileRouter.get('/', profileController.show);

export default profileRouter;
