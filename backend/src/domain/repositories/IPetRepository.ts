import { Pet as IPet } from '@univet/shared';
import { Pet } from '../entities/Pet';

// Contrato para persistência de dados de Pets
export interface IPetRepository {
  create(pet: Omit<IPet, 'id'>): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByTutor(tutorId: string): Promise<Pet[]>;
  update(id: string, data: Partial<IPet>): Promise<Pet>;
  delete(id: string): Promise<void>;
}
