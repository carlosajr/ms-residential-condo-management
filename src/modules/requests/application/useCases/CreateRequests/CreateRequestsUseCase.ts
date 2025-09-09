import { inject, injectable } from 'tsyringe';
import { CreateRequestDTO } from '@/modules/requests/domain/dtos/CreateRequestDTO';
import { RequestDTO } from '@/modules/requests/domain/dtos/RequestResponseDTO';
import {
  IRequestsRepository,
  REQUEST_REPOSITORY,
} from '@/modules/requests/domain/repositories/IRequestsRepository';
import { StatusRequestTypeEnum } from '@/modules/requests/domain/enums/status-request-type.enum';
import { RabbitMQProducer } from '@/shared/messaging/producer/RabbitMQProducer';
import { QueueNameEnum } from '@/shared/enums/queue-name.enum';

@injectable()
export class CreateRequestsUseCase {
  constructor(
    @inject(REQUEST_REPOSITORY)
    private requestsRepository: IRequestsRepository,
  ) {}

  async execute({ description }: CreateRequestDTO): Promise<RequestDTO> {
    const request = await this.requestsRepository.create({
      description,
      status: StatusRequestTypeEnum.PENDING,
    });

    await RabbitMQProducer.sendToQueue(QueueNameEnum.PROCESS_REQUESTS, request);

    return {
      id: request.id,
      description: request.description,
      status: request.status as StatusRequestTypeEnum,
    };
  }
}
