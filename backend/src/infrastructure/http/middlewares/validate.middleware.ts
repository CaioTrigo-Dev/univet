import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * Middleware de Validação com Zod
 * Valida o corpo da requisição contra um schema compartilhado.
 */
export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Erro de validação',
          details: error.errors.map(e => ({ path: e.path, message: e.message }))
        });
      }
      next(error);
    }
  };
