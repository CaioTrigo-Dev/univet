// Interface base para o Usuário (Tutor, Vet ou Admin)
export interface User {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  role: 'admin' | 'vet' | 'tutor';
  createdAt: Date;
  updatedAt?: Date;
}

// Perfil detalhado de um Veterinário
export interface Vet {
  id: string;
  userId: string;
  name: string;
  crmv: string;
  specialties: string[];
  photoUrl: string;
  bio: string;
  availableDays: ('monday'|'tuesday'|'wednesday'|'thursday'|'friday'|'saturday')[];
  availableHours: { start: string; end: string };
  rating: number;
  totalReviews: number;
  active: boolean;
}

// Representação de um Pet no sistema
export interface Pet {
  id: string;
  tutorId: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  birthDate: Date;
  weight?: number;
  gender?: 'male' | 'female';
  photoUrl?: string;
  allergies?: string[];
  observations?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Catálogo de Serviços da Clínica
export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'consultation' | 'exam' | 'surgery' | 'grooming' | 'vaccine' | 'other';
  price: number;
  durationMinutes: number;
  imageUrl?: string;
  active: boolean;
  createdAt: Date;
}

// Registro de uma consulta agendada
export interface Appointment {
  id: string;
  tutorId: string;
  petId: string;
  vetId: string;
  serviceId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'cancellation_requested';
  notes?: string;
  totalPrice: number;
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  updatedAt?: Date;
}

// Prontuário Médico de uma consulta
export interface MedicalRecord {
  id: string;
  petId: string;
  vetId: string;
  appointmentId: string;
  date: Date;
  diagnosis: string;
  treatment: string;
  prescriptions: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  exams: Array<{
    name: string;
    result: string;
    fileUrl?: string;
  }>;
  weight: number;
  temperature: number;
  observations: string;
  nextAppointment?: Date;
  createdAt: Date;
}

// Histórico de Vacinas
export interface Vaccine {
  id: string;
  petId: string;
  vetId: string;
  name: string;
  appliedAt: Date;
  nextDoseAt: Date;
  lotNumber: string;
  manufacturer: string;
  fileUrl?: string;
  createdAt: Date;
}

// Notificações do Sistema
export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'appointment_reminder' | 'vaccine_due' | 'exam_result' | 'promotion' | 'general';
  read: boolean;
  data?: Record<string, string>;
  createdAt: Date;
}
