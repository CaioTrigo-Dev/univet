import { Router } from 'express';
import { MedicalRecordsController } from '../controllers/MedicalRecordsController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new MedicalRecordsController();

router.get('/pet/:petId', authMiddleware, controller.listByPet);
router.post('/', authMiddleware, controller.create);

export default router;
