import { Vaccine as IVaccine } from '@univet/shared';
import { Vaccine } from '../entities/Vaccine';

/**
 * Contrato para persistência de registros de vacinas.
 */
export interface IVaccineRepository {
  create(data: Omit<IVaccine, 'id'>): Promise<Vaccine>;
  findByPet(petId: string): Promise<Vaccine[]>;
  findById(id: string): Promise<Vaccine | null>;
  delete(id: string): Promise<void>;
}
