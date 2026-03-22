import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase/config';

export class ReviewsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tutorId = (req as any).uid;
      const { vetId, score, comment } = req.body;
      const reviewRef = await db.collection('reviews').add({
        tutorId,
        vetId,
        score,
        comment,
        createdAt: new Date()
      });
      res.status(201).json({ id: reviewRef.id });
    } catch (error) {
      next(error);
    }
  }

  async listByVet(req: Request, res: Response, next: NextFunction) {
    try {
      const { vetId } = req.params;
      const snap = await db.collection('reviews').where('vetId', '==', vetId).get();
      const reviews = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
}
