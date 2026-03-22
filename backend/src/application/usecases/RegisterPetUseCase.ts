import { Pet } from '../../domain/entities/Pet';
import { IPetRepository } from '../../domain/repositories/IPetRepository';
import { Pet as IPet } from '@univet/shared';

export type RegisterPetDTO = Omit<IPet, 'id'>;

/**
 * Caso de Uso: Cadastro de Pet
 * Centraliza as regras de negócio para salvar um novo animal.
 */
export class RegisterPetUseCase {
  constructor(private readonly petRepo: IPetRepository) {}

  async execute(dto: RegisterPetDTO): Promise<Pet> {
    // Regra: pet precisa de um nome
    if (!dto.name || dto.name.trim() === '') {
      throw new Error('Nome do pet é obrigatório.');
    }

    // Regra: data de nascimento não pode ser no futuro
    if (dto.birthDate > new Date()) {
      throw new Error('Data de nascimento inválida.');
    }

    return this.petRepo.create(dto);
  }
}
