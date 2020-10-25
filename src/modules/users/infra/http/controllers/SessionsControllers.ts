import { container } from 'tsyringe';
import { Response, Request } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authService = container.resolve(AuthenticateUserService);

    const { user, token } = await authService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
