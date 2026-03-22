import { User as IUser } from '@univet/shared';

/**
 * Entidade User (Domain Layer)
 * Representa qualquer usuário logado no sistema e suas permissões.
 */
export class User implements IUser {
  constructor(
    public readonly id: string,
    public readonly uid: string,
    public name: string,
    public email: string,
    public role: 'admin' | 'vet' | 'tutor',
    public createdAt: Date,
    public avatarUrl?: string
  ) {}

  // Atalhos para verificação de permissões (Roles)
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isVet(): boolean {
    return this.role === 'vet';
  }

  isTutor(): boolean {
    return this.role === 'tutor';
  }
}
