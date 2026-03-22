import { z } from 'zod';

// --- Interfaces ---

export interface User {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  role: 'tutor' | 'vet' | 'admin';
  createdAt: Date;
}

export interface Pet {
  id: string;
  tutorId: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  birthDate: Date;
  photoUrl?: string;
}

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

export interface MedicalRecord {
  id: string;
  petId: string;
  appointmentId: string;
  vetId: string;
  description: string;
  prescriptions: string[];
  createdAt: Date;
}

export interface Vaccine {
  id: string;
  petId: string;
  name: string;
  appliedAt: Date;
  nextDoseAt?: Date;
  lot?: string;
  vetId?: string;
}

// --- Validation Schemas (Zod) ---

export const RegisterUserSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  phone: z.string().optional(),
});

export const CreatePetSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  species: z.enum(['dog', 'cat', 'bird', 'rabbit', 'other']),
  breed: z.string().min(2, 'Raça obrigatória'),
  birthDate: z.coerce.date(),
});

export const ScheduleAppointmentSchema = z.object({
  petId: z.string().uuid().or(z.string().min(1)),
  vetId: z.string().uuid().or(z.string().min(1)),
  serviceId: z.string().min(1),
  scheduledAt: z.coerce.date().refine((date) => date > new Date(), {
    message: 'A data deve ser futura',
  }),
  totalPrice: z.number().positive(),
});
