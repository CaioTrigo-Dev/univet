import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase/config';

export class NotificationsController {
  async listByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).uid;
      const snap = await db.collection('notifications').where('userId', '==', userId).get();
      const notifs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(notifs);
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await db.collection('notifications').doc(id).update({ read: true });
      res.json({ success: true, read: true });
    } catch (error) {
      next(error);
    }
  }
}
