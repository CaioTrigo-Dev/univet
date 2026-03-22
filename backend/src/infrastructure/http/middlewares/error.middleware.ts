import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de Erro Global
 * Captura exceções não tratadas e retorna um formato JSON padronizado.
 */
export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[API ERROR] ${req.method} ${req.url}:`, error);

  const status = error.status || 500;
  const message = error.message || 'Erro interno no servidor';

  res.status(status).json({
    success: false,
    status,
    message,
    timestamp: new Date().toISOString()
  });
};
