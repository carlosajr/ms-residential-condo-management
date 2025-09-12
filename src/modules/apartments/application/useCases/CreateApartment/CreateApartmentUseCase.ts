import { inject, injectable } from 'tsyringe';

import {
  IApartmentsRepository,
  APARTMENT_REPOSITORY,
} from '@/modules/apartments/domain/repositories/IApartmentsRepository';

@injectable()
export class CreateApartmentUseCase {
  constructor(
    @inject(APARTMENT_REPOSITORY)
    private apartmentsRepository: IApartmentsRepository,
  ) {}

  async execute({ number }: { number: string }) {
    const apartment = await this.apartmentsRepository.create({ number });
    return apartment;
  }
}
