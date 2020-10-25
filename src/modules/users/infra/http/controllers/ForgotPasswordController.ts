import { container } from 'tsyringe';
import { Response, Request } from 'express';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordService.execute({
      email,
    });

    return response.status(204).json();
  }
}
