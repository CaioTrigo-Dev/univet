import { Appointment as IAppointment } from '@univet/shared';
import { Appointment } from '../entities/Appointment';

// Contrato para persistência de agendamentos
export interface IAppointmentRepository {
  create(data: Omit<IAppointment, 'id' | 'createdAt'>): Promise<Appointment>;
  findById(id: string): Promise<Appointment | null>;
  findByTutor(tutorId: string): Promise<Appointment[]>;
  findByVet(vetId: string, date: Date): Promise<Appointment[]>;
  update(id: string, data: Partial<IAppointment>): Promise<Appointment>;
}
