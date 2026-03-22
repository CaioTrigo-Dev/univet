import { Vaccine as IVaccine } from '@univet/shared';

/**
 * Entidade: Vacina
 * Registro de imunização de um pet.
 */
export class Vaccine implements IVaccine {
  constructor(
    public readonly id: string,
    public readonly petId: string,
    public readonly vetId: string,
    public readonly name: string,
    public readonly appliedAt: Date,
    public readonly nextDoseAt: Date,
    public readonly lotNumber: string,
    public readonly manufacturer: string,
    public readonly createdAt: Date,
    public readonly fileUrl?: string
  ) {}
}
