import { MedicalRecord as IMedicalRecord } from '@univet/shared';
import { MedicalRecord } from '../entities/MedicalRecord';

/**
 * Contrato para persistência de prontuários médicos.
 */
export interface IMedicalRecordRepository {
  create(data: Omit<IMedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord>;
  findByPet(petId: string): Promise<MedicalRecord[]>;
  findById(id: string): Promise<MedicalRecord | null>;
}
