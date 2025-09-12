import { Apartment } from '@/modules/apartments/domain/entities/Apartment';
import { IGenericRepository } from '@/shared/generic/repositories/IGenericRepository';

export const APARTMENT_REPOSITORY = 'APARTMENT_REPOSITORY';

export interface IApartmentsRepository extends IGenericRepository<Apartment> {}
