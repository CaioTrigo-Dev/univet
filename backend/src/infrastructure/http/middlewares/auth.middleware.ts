import { Request, Response, NextFunction } from 'express';
import { auth } from '../../firebase/config';

/**
 * Middleware de Autenticação
 * Verifica o Firebase ID Token enviado no header Authorization.
 * Injeta o 'uid' do usuário no objeto Request.
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou inválido.' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({ error: 'Token expirado ou inválido.' });
  }
};
