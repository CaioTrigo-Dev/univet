import { Pet as IPet } from '@univet/shared';

/**
 * Entidade Pet (Domain Layer)
 * Contém regras de negócio puras relacionadas ao animal.
 */
export class Pet implements IPet {
  constructor(
    public readonly id: string,
    public name: string,
    public species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other',
    public breed: string,
    public birthDate: Date,
    public readonly tutorId: string,
    public photoUrl?: string
  ) {}

  // Calcula a idade do pet em anos
  get ageInYears(): number {
    const diff = Date.now() - this.birthDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  // Verifica se o pet já é adulto
  isAdult(): boolean {
    return this.ageInYears >= 1;
  }
}
