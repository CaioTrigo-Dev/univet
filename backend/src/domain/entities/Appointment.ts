import { Appointment as IAppointment } from '@univet/shared';

/**
 * Entidade Appointment (Domain Layer)
 * Representa o agendamento de um serviço para um pet.
 */
export class Appointment implements IAppointment {
  constructor(
    public readonly id: string,
    public tutorId: string,
    public petId: string,
    public vetId: string,
    public serviceId: string,
    public date: Date,
    public status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'cancellation_requested',
    public totalPrice: number,
    public createdAt: Date,
    public paymentStatus?: 'pending' | 'paid' | 'refunded',
    public notes?: string,
    public updatedAt?: Date
  ) {}

  // Verifica se a consulta ainda vai acontecer
  isUpcoming(): boolean {
    return this.date > new Date() && this.status !== 'cancelled' && this.status !== 'completed';
  }

  // Verifica se o agendamento pode ser cancelado pelo usuário
  canBeCancelled(): boolean {
    return this.status === 'pending' || this.status === 'confirmed';
  }
}

