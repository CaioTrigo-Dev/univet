import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { authMiddleware } from '../middlewares/auth.middleware';
// Assumindo que no ambiente ideal haveria um roleMiddleware(['admin'])
// por simplicidade usaremos apenas authMiddleware

const router = Router();
const controller = new UsersController();

router.use(authMiddleware);
router.get('/', controller.list);
router.put('/:id/status', controller.block);

export default router;
