import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const profile = await showProfile.execute({ user_id });

    return response.json(classToClass(profile));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;

    const updatedProfile = container.resolve(UpdateProfileService);

    const user = await updatedProfile.execute({
      user_id: request.user.id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}
