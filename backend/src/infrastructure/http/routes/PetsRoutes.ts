import { Router } from 'express';
import { PetsController } from '../controllers/PetsController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { CreatePetSchema } from '@univet/shared';

const router = Router();
const controller = new PetsController();

/**
 * Rotas de Pets
 * Todas as rotas são protegidas por autenticação.
 */

// GET /api/pets - Listar meus pets
router.get('/', authMiddleware, (req, res, next) => controller.listMine(req, res, next));

// POST /api/pets - Cadastrar novo pet (com validação de schema)
router.post('/',
  authMiddleware,
  validate(CreatePetSchema),
  (req, res, next) => controller.create(req, res, next)
);

// PATCH /api/pets/:id - Atualizar pet
router.patch('/:id', authMiddleware, (req, res, next) => controller.update(req, res, next));

export default router;
