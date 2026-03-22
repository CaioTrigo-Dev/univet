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
        scheduledAt: new Date(req.body.scheduledAt),
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
}
