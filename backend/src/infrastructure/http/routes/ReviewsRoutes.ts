import { Router } from 'express';
import { ReviewsController } from '../controllers/ReviewsController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new ReviewsController();

router.get('/vet/:vetId', controller.listByVet); // Public
router.post('/', authMiddleware, controller.create);

export default router;
