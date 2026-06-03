import { User } from '@univet/shared';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.15:3000/api';

/**
 * Serviço de Autenticação (Mobile)
 * Comunicação com o backend para registro e perfil.
 * Nota: O login real é feito via Firebase SDK no mobile, 
 * e o token é enviado para o backend.
 */
export const authService = {
  // Registra um novo tutor no backend
  async register(data: any): Promise<User> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao registrar usuário.');
    }

    return response.json();
  },

  // Obtém o perfil do usuário logado usando o token do Firebase
  async getProfile(token: string): Promise<User> {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar perfil.');
    }

    return response.json();
  },
};
