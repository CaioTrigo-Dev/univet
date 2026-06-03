import { Request, Response, NextFunction } from 'express';
import { ScheduleAppointmentUseCase } from '../../../application/usecases/ScheduleAppointmentUseCase';
import { FirestoreAppointmentRepository } from '../../repositories/FirestoreAppointmentRepository';

/**
 * Controller de Agendamentos
 * Gerencia a lógica HTTP para consultas.
 */
export class AppointmentsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = new FirestoreAppointmentRepository();
      const useCase = new ScheduleAppointmentUseCase(repo);

      const tutorId = (req as any).uid;

      const appointment = await useCase.execute({
        ...req.body,
        date: new Date(req.body.date || req.body.scheduledAt),
        tutorId
      });

      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async listMine(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = new FirestoreAppointmentRepository();
      const tutorId = (req as any).uid;

      const appointments = await repo.findByTutor(tutorId);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = new FirestoreAppointmentRepository();
      const { id } = req.params;
      const tutorId = (req as any).uid;
      const { reason } = req.body;

      const appointment = await repo.findById(id);
      if (!appointment) {
        res.status(404).json({ error: 'Agendamento não encontrado.' });
        return;
      }
      if (appointment.tutorId !== tutorId) {
        res.status(403).json({ error: 'Sem permissão para cancelar este agendamento.' });
        return;
      }
      if (['cancelled', 'completed', 'cancellation_requested'].includes(appointment.status)) {
        res.status(400).json({ error: 'Este agendamento não pode ser cancelado.' });
        return;
      }

      const resolveDate = (d: any): Date => {
        if (d instanceof Date) return d;
        if (typeof d?.toDate === 'function') return d.toDate();
        if (d?._seconds !== undefined) return new Date(d._seconds * 1000);
        if (d?.seconds !== undefined) return new Date(d.seconds * 1000);
        return new Date(d);
      };
      const appointmentDate = resolveDate(appointment.date);
      const hoursUntilAppointment = (appointmentDate.getTime() - Date.now()) / (1000 * 60 * 60);

      // Mais de 24h de antecedência → cancela na hora
      // Menos de 24h → solicita aprovação
      const newStatus = hoursUntilAppointment > 24 ? 'cancelled' : 'cancellation_requested';

      const updateData: any = { status: newStatus, updatedAt: new Date() };
      if (reason) {
        updateData.notes = `[Solicitação de cancelamento]: ${reason}`;
      } else if (appointment.notes) {
        updateData.notes = appointment.notes;
      }

      const updated = await repo.update(id, updateData);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
}
