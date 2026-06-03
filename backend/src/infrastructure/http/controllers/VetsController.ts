import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase/config';

/**
 * Controller de Veterinários
 * Gerencia a listagem de profissionais da clínica.
 */
export class VetsController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const snap = await db.collection('vets').where('active', '==', true).get();
      const vets = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(vets);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const doc = await db.collection('vets').doc(id).get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'Veterinário não encontrado.' });
      }

      res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
      next(error);
    }
  }
}
