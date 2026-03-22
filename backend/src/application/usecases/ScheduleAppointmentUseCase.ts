import { Appointment as IAppointment } from '@univet/shared';
import { Appointment } from '../../domain/entities/Appointment';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';

export type ScheduleAppointmentDTO = Omit<IAppointment, 'id' | 'createdAt'>;

/**
 * Caso de Uso: Agendamento de Consulta
 * Gerencia a reserva de horários para atendimento.
 */
export class ScheduleAppointmentUseCase {
  constructor(
    private readonly appointmentRepo: IAppointmentRepository
  ) {}

  async execute(dto: ScheduleAppointmentDTO): Promise<Appointment> {
    // Regra: consulta deve ser no futuro
    if (dto.scheduledAt <= new Date()) {
      throw new Error('A consulta deve ser agendada para uma data futura.');
    }

    return this.appointmentRepo.create({
      ...dto,
      status: 'pending'
    });
  }
}
