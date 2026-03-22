import { MedicalRecord as IMedicalRecord } from '@univet/shared';

/**
 * Entidade: Prontuário Médico
 * Registro detalhado de uma consulta ou procedimento.
 */
export class MedicalRecord implements IMedicalRecord {
  constructor(
    public readonly id: string,
    public readonly petId: string,
    public readonly appointmentId: string,
    public readonly vetId: string,
    public readonly description: string,
    public readonly prescriptions: string[],
    public readonly createdAt: Date
  ) {}
}
