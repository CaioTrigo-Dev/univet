import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase/config';

/**
 * Controller de Serviços
 * Gerencia a listagem e visualização de serviços da clínica.
 */
export class ServicesController {
  // Lista todos os serviços ativos
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const snap = await db.collection('services').get();
      const services = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(services);
    } catch (error) {
      next(error);
    }
  }

  // Obtém detalhes de um serviço específico
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const doc = await db.collection('services').doc(id).get();
      
      if (!doc.exists) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
      next(error);
    }
  }
}
