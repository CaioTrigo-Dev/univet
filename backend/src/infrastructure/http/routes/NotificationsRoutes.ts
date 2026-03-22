import { Router } from 'express';
import { NotificationsController } from '../controllers/NotificationsController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new NotificationsController();

router.use(authMiddleware);
router.get('/', controller.listByUser);
router.put('/:id/read', controller.markAsRead);

export default router;
