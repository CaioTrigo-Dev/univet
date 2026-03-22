import { Request, Response, NextFunction } from 'express';
import { RegisterPetUseCase } from '../../../application/usecases/RegisterPetUseCase';
import { FirestorePetRepository } from '../../repositories/FirestorePetRepository';

/**
 * Controller de Pets
 * Lida com as requisições HTTP e delega para os casos de uso.
 */
export class PetsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = new FirestorePetRepository();
      const useCase = new RegisterPetUseCase(repo);

      // O 'tutorId' vem do token verificado no middleware de auth
      const tutorId = (req as any).uid;

      const pet = await useCase.execute({
        ...req.body,
        birthDate: new Date(req.body.birthDate),
        tutorId
      });

      res.status(201).json(pet);
    } catch (error) {
      next(error);
    }
  }

  async listMine(req: Request, res: Response, next: NextFunction) {
    try {
      const repo = new FirestorePetRepository();
      const tutorId = (req as any).uid;

      const pets = await repo.findByTutor(tutorId);
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
}
