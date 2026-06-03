import { Appointment } from '@univet/shared';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.15:3000/api';

/**
 * Serviço de Agendamentos (Mobile)
 */
export const appointmentsService = {
  async create(token: string, data: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao realizar agendamento.');
    }

    return response.json();
  },

  async listMine(token: string): Promise<Appointment[]> {
    const response = await fetch(`${API_URL}/appointments`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar agendamentos.');
    }

    return response.json();
  },

  async cancel(token: string, id: string, reason?: string): Promise<void> {
    const response = await fetch(`${API_URL}/appointments/${id}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      let message = 'Erro ao cancelar agendamento.';
      try {
        const errorData = await response.json();
        message = errorData.error || message;
      } catch {}
      throw new Error(message);
    }
  },
};
