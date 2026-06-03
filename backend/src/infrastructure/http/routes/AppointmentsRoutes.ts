import { Router } from 'express';
import { AppointmentsController } from '../controllers/AppointmentsController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new AppointmentsController();

/**
 * Rotas de Agendamentos
 * Todas as rotas de agendamentos requerem autenticação.
 */
router.use(authMiddleware);

// POST /api/appointments - Cria um novo agendamento
router.post('/', (req, res, next) => controller.create(req, res, next));

// GET /api/appointments - Lista os agendamentos do tutor logado
router.get('/', (req, res, next) => controller.listMine(req, res, next));

// PATCH /api/appointments/:id/cancel - Cancela ou solicita cancelamento
router.patch('/:id/cancel', (req, res, next) => controller.cancel(req, res, next));

export default router;
