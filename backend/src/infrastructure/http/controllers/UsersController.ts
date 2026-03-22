import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase/config';

export class UsersController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const snap = await db.collection('users').get();
      const users = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async block(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await db.collection('users').doc(id).update({ status });
      res.json({ success: true, status });
    } catch (error) {
      next(error);
    }
  }
}
