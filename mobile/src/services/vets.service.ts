const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.9:3000/api';

export interface Vet {
  id: string;
  name: string;
  crmv: string;
  specialties: string[];
  photoUrl?: string;
  bio?: string;
  rating?: number;
}

export const vetsService = {
  async getAll(): Promise<Vet[]> {
    const response = await fetch(`${API_URL}/vets`);
    if (!response.ok) throw new Error('Erro ao carregar veterinários.');
    return response.json();
  },
};
