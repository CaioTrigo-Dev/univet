import { MedicalRecord as IMedicalRecord } from '@univet/shared';
import { MedicalRecord } from '../../domain/entities/MedicalRecord';
import { IMedicalRecordRepository } from '../../domain/repositories/IMedicalRecordRepository';

export type CreateMedicalRecordDTO = Omit<IMedicalRecord, 'id' | 'createdAt'>;

/**
 * Caso de Uso: Criar Prontuário
 * Registra as observações e prescrições médicas de uma consulta.
 */
export class CreateMedicalRecordUseCase {
  constructor(
    private readonly medicalRecordRepo: IMedicalRecordRepository
  ) {}

  async execute(dto: CreateMedicalRecordDTO): Promise<MedicalRecord> {
    if (!dto.description) {
      throw new Error('A descrição do prontuário é obrigatória.');
    }

    return this.medicalRecordRepo.create(dto);
  }
}
