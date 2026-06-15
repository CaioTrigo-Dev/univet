import { Pet } from '@univet/shared';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.9:3000/api';

/**
 * Serviço de Pets (Mobile)
 * Comunicação com a API Backend para gestão de animais.
 */
export const petsService = {
  // Lista todos os pets do usuário logado
  async listMine(token: string): Promise<Pet[]> {
    const response = await fetch(`${API_URL}/pets`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar pets.');
    }

    return response.json();
  },

  // Atualiza um pet existente
  async update(token: string, petId: string, data: Partial<Pet>): Promise<Pet> {
    const response = await fetch(`${API_URL}/pets/${petId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao atualizar pet.');
    }
    return response.json();
  },

  // Cadastra um novo pet
  async create(token: string, data: Omit<Pet, 'id' | 'createdAt'>): Promise<Pet> {
    const response = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao cadastrar pet.');
    }

    return response.json();
  },
};
