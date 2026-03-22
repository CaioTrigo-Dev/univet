import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase/config';

/**
 * Controller de Vacinas
 */
export class VaccinesController {
  async listByPet(req: Request, res: Response, next: NextFunction) {
    try {
      const { petId } = req.params;
      const snap = await db.collection('vaccines')
        .where('petId', '==', petId)
        .orderBy('appliedAt', 'desc')
        .get();
        
      const vaccines = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(vaccines);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        ...req.body,
        appliedAt: new Date(req.body.appliedAt),
        createdAt: new Date(),
      };
      const ref = await db.collection('vaccines').add(data);
      res.status(201).json({ id: ref.id, ...data });
    } catch (error) {
      next(error);
    }
  }
}
