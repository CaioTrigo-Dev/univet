import { Appointment as IAppointment } from '@univet/shared';

/**
 * Entidade Appointment (Domain Layer)
 * Representa o agendamento de um serviço para um pet.
 */
export class Appointment implements IAppointment {
  constructor(
    public readonly id: string,
    public petId: string,
    public vetId: string,
    public serviceId: string,
    public tutorId: string,
    public scheduledAt: Date,
    public status: 'pending' | 'confirmed' | 'cancelled' | 'done',
    public totalPrice: number,
    public createdAt: Date,
    public notes?: string
  ) {}

  // Verifica se a consulta ainda vai acontecer
  isUpcoming(): boolean {
    return this.scheduledAt > new Date() && this.status !== 'cancelled';
  }

  // Verifica se o agendamento pode ser cancelado pelo usuário
  canBeCancelled(): boolean {
    return this.status === 'pending' || this.status === 'confirmed';
  }
}
