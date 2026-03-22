import { Router } from 'express';
import { ServicesController } from '../controllers/ServicesController';

const router = Router();
const controller = new ServicesController();

router.get('/', controller.list);
router.get('/:id', controller.getById);

export default router;
