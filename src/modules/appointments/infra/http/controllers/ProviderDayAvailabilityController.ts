import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.body;
    const { provider_id } = request.params;

    const listProviderDay = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDay.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(availability);
  }
}
