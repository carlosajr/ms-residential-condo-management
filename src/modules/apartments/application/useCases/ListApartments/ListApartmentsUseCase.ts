import { inject, injectable } from 'tsyringe';

import {
  IApartmentsRepository,
  APARTMENT_REPOSITORY,
} from '@/modules/apartments/domain/repositories/IApartmentsRepository';

@injectable()
export class ListApartmentsUseCase {
  constructor(
    @inject(APARTMENT_REPOSITORY)
    private apartmentsRepository: IApartmentsRepository,
  ) {}

  async execute() {
    return this.apartmentsRepository.findAll();
  }
}
