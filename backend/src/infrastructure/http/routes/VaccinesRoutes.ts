import { Router } from 'express';
import { VaccinesController } from '../controllers/VaccinesController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new VaccinesController();

router.get('/pet/:petId', authMiddleware, controller.listByPet);
router.post('/', authMiddleware, controller.add);

export default router;
