import { Request, Response, NextFunction } from 'express';
import { auth, db } from '../../firebase/config';

/**
 * Controller de Autenticação
 * Lida com o registro de usuários e persistência de perfis.
 */
export class AuthController {
  // Registra um novo usuário (Tutor por padrão)
  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password, name, phone } = req.body;

    try {
      // 1. Cria usuário no Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
      });

      // 2. Cria perfil no Firestore
      const userProfile = {
        uid: userRecord.uid,
        email,
        name,
        phone,
        role: 'tutor',
        createdAt: new Date(),
      };

      await db.collection('users').doc(userRecord.uid).set(userProfile);

      // 3. Define claims customizadas (opcional, para segurança extra)
      await auth.setCustomUserClaims(userRecord.uid, { role: 'tutor' });

      res.status(201).json(userProfile);
    } catch (error) {
      next(error);
    }
  }

  // Obtém o perfil do usuário logado
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const uid = (req as any).uid;
      const doc = await db.collection('users').doc(uid).get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'Perfil não encontrado.' });
      }

      res.json(doc.data());
    } catch (error) {
      next(error);
    }
  }
}
