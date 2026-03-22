import { Router } from 'express';
import { VetsController } from '../controllers/VetsController';

const router = Router();
const controller = new VetsController();

router.get('/', controller.list);
router.get('/:id', controller.getById);

export default router;
