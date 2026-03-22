import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new AuthController();

/**
 * Rotas de Autenticação
 */

// POST /api/auth/register - Cadastro de novo tutor
router.post('/register', (req, res, next) => controller.register(req, res, next));

// GET /api/auth/me - Retorna perfil do usuário logado (requer token)
router.get('/me', authMiddleware, (req, res, next) => controller.getProfile(req, res, next));

export default router;
