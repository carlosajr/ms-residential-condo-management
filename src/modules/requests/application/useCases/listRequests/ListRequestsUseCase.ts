import { inject, injectable } from 'tsyringe';
import { RequestDTO } from '@/modules/requests/domain/dtos/RequestResponseDTO';
import {
  IRequestsRepository,
  REQUEST_REPOSITORY,
} from '@/modules/requests/domain/repositories/IRequestsRepository';
import { AppError } from '@/shared/core/errors/AppError';
import { StatusRequestTypeEnum } from '@/modules/requests/domain/enums/status-request-type.enum';

@injectable()
export class ListRequestsUseCase {
  constructor(
    @inject(REQUEST_REPOSITORY)
    private requestsRepository: IRequestsRepository,
  ) {}

  async execute(): Promise<RequestDTO[]> {
    const requests = await this.requestsRepository.findAll();

    return requests.map(request => ({
      id: request.id,
      description: request.description,
      status: request.status as StatusRequestTypeEnum,
    }));
  }
}
