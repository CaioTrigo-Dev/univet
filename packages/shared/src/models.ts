// Interface base para o Usuário (Tutor, Vet ou Admin)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vet' | 'tutor';
  avatarUrl?: string;
  createdAt: Date;
}

// Representação de um Pet no sistema
export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  birthDate: Date;
  tutorId: string;
  photoUrl?: string;
}

// Registro de uma consulta agendada
export interface Appointment {
  id: string;
  petId: string;
  vetId: string;
  serviceId: string;
  tutorId: string;
  scheduledAt: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'done';
  totalPrice: number;
  notes?: string;
  createdAt: Date;
}
