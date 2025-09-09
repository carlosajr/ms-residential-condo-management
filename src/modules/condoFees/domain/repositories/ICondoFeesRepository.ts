import { CondoFee } from '@/modules/condoFees/domain/entities/CondoFee';
import { IGenericRepository } from '@/shared/generic/repositories/IGenericRepository';

export const CONDO_FEE_REPOSITORY = 'CONDO_FEE_REPOSITORY';

export interface ICondoFeesRepository extends IGenericRepository<CondoFee> {}
