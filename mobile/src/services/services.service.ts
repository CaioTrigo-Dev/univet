const API_URL = 'http://localhost:3000/api';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  durationMinutes: number;
  imageUrl?: string;
  active: boolean;
  createdAt?: string;
}

export const servicesService = {
  getAll: async (): Promise<Service[]> => {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  },

  getById: async (id: string): Promise<Service> => {
    const response = await fetch(`${API_URL}/services/${id}`);
    if (!response.ok) throw new Error('Failed to fetch service details');
    return response.json();
  }
};
