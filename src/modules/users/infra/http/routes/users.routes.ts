import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import EnsureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRoutes = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  usersController.create,
);

usersRoutes.patch(
  '/avatar',
  EnsureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoutes;
