const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.9:3000/api';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: string;
  read: boolean;
  createdAt: any;
}

export const notificationsService = {
  async listMine(token: string): Promise<Notification[]> {
    const response = await fetch(`${API_URL}/notifications`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Erro ao carregar notificações.');
    return response.json();
  },

  async markAsRead(token: string, id: string): Promise<void> {
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
};
