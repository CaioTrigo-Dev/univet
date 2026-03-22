import { db } from '../firebase/config';
import { Pet as IPet } from '@univet/shared';
import { Pet } from '../../domain/entities/Pet';
import { IPetRepository } from '../../domain/repositories/IPetRepository';

/**
 * Implementação Firestore do repositório de Pets.
 */
export class FirestorePetRepository implements IPetRepository {
  private collection = db.collection('pets');

  async create(data: Omit<IPet, 'id'>): Promise<Pet> {
    const docRef = await this.collection.add(data);
    return new Pet(
      docRef.id,
      data.name,
      data.species,
      data.breed,
      data.birthDate,
      data.tutorId,
      data.createdAt || new Date(),
      data.photoUrl
    );
  }

  async findById(id: string): Promise<Pet | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data() as Omit<IPet, 'id'>;
    return new Pet(
      doc.id,
      data.name,
      data.species,
      data.breed,
      data.birthDate,
      data.tutorId,
      data.createdAt || new Date(),
      data.photoUrl
    );
  }

  async findByTutor(tutorId: string): Promise<Pet[]> {
    const snapshot = await this.collection.where('tutorId', '==', tutorId).get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<IPet, 'id'>;
      return new Pet(
        doc.id,
        data.name,
        data.species,
        data.breed,
        data.birthDate,
        data.tutorId,
        data.createdAt || new Date(),
        data.photoUrl
      );
    });
  }

  async update(id: string, data: Partial<IPet>): Promise<Pet> {
    await this.collection.doc(id).update(data);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Falha ao atualizar o pet.');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
