import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase/config';

/**
 * Controller de Prontuários (Medical Records)
 */
export class MedicalRecordsController {
  async listByPet(req: Request, res: Response, next: NextFunction) {
    try {
      const { petId } = req.params;
      const snap = await db.collection('medical_records')
        .where('petId', '==', petId)
        .orderBy('createdAt', 'desc')
        .get();
        
      const records = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(records);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        ...req.body,
        createdAt: new Date(),
      };
      const ref = await db.collection('medical_records').add(data);
      res.status(201).json({ id: ref.id, ...data });
    } catch (error) {
      next(error);
    }
  }
}
