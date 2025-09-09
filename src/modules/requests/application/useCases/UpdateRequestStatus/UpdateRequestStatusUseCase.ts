import { inject, injectable } from 'tsyringe';
import {
  IRequestsRepository,
  REQUEST_REPOSITORY,
} from '@/modules/requests/domain/repositories/IRequestsRepository';
import { AppError } from '@/shared/core/errors/AppError';
import { UpdateStatusRequestDTO } from '@/modules/requests/domain/dtos/UpdateStatusRequestDTO';

@injectable()
export class UpdateRequestStatusUseCase {
  constructor(
    @inject(REQUEST_REPOSITORY)
    private requestsRepository: IRequestsRepository,
  ) {}

  async execute({ status, id }: UpdateStatusRequestDTO): Promise<void> {
    const request = await this.requestsRepository.findById(id);

    if (!request) throw new AppError(`NOT_FOUND`, 404);

    request.status = status;

    await this.requestsRepository.update(request);
  }
}
