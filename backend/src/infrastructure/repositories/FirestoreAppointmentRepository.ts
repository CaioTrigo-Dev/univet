import { db } from '../firebase/config';
import { Appointment as IAppointment } from '@univet/shared';
import { Appointment } from '../../domain/entities/Appointment';
import { IAppointmentRepository } from '../../domain/repositories/IAppointmentRepository';

/**
 * Implementação Firestore do repositório de Agendamentos.
 */
const resolveDate = (d: any): Date => {
  if (d instanceof Date) return d;
  if (typeof d?.toDate === 'function') return d.toDate();
  if (d?._seconds !== undefined) return new Date(d._seconds * 1000);
  return new Date(d);
};

export class FirestoreAppointmentRepository implements IAppointmentRepository {
  private collection = db.collection('appointments');

  async create(data: Omit<IAppointment, 'id' | 'createdAt'>): Promise<Appointment> {
    const docRef = await this.collection.add({
      ...data,
      createdAt: new Date(),
    });
    
    return new Appointment(
      docRef.id,
      data.tutorId,
      data.petId,
      data.vetId,
      data.serviceId,
      data.date,
      data.status,
      data.totalPrice,
      new Date(),
      data.paymentStatus,
      data.notes
    );
  }

  async findById(id: string): Promise<Appointment | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data() as Omit<IAppointment, 'id'>;
    return new Appointment(
      doc.id,
      data.tutorId,
      data.petId,
      data.vetId,
      data.serviceId,
      resolveDate(data.date),
      data.status,
      data.totalPrice,
      resolveDate(data.createdAt),
      data.paymentStatus,
      data.notes,
      data.updatedAt ? resolveDate(data.updatedAt) : undefined
    );
  }

  async findByTutor(tutorId: string): Promise<Appointment[]> {
    const snapshot = await this.collection.where('tutorId', '==', tutorId).get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<IAppointment, 'id'>;
      return new Appointment(
        doc.id,
        data.tutorId,
        data.petId,
        data.vetId,
        data.serviceId,
        resolveDate(data.date),
        data.status,
        data.totalPrice,
        resolveDate(data.createdAt),
        data.paymentStatus,
        data.notes,
        data.updatedAt ? resolveDate(data.updatedAt) : undefined
      );
    });
  }

  async findByVet(vetId: string, date: Date): Promise<Appointment[]> {
    // Busca simples por veterinário e data (simplificado para o skeleton)
    const snapshot = await this.collection
      .where('vetId', '==', vetId)
      .where('date', '>=', date)
      .get();
      
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<IAppointment, 'id'>;
      return new Appointment(
        doc.id,
        data.tutorId,
        data.petId,
        data.vetId,
        data.serviceId,
        data.date,
        data.status,
        data.totalPrice,
        data.createdAt,
        data.paymentStatus,
        data.notes,
        data.updatedAt
      );
    });
  }

  async update(id: string, data: Partial<IAppointment>): Promise<Appointment> {
    await this.collection.doc(id).update(data);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Falha ao atualizar agendamento.');
    return updated;
  }
}
