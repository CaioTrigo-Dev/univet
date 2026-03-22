import * as admin from 'firebase-admin';
import { db } from './config';

/**
 * Script de Seed Master (UniVet)
 * Popula todas as coleções do Firestore conforme documentação.
 */
async function seedModel() {
  console.log('🌱 Iniciando seeding completo do Firestore...');

  try {
    const batch = db.batch();
    const now = admin.firestore.Timestamp.now();

    // 1. Usuários
    const users = [
      {
        uid: 'user-tutor-1',
        name: 'Carlos Eduado - Tutor',
        email: 'carlos@tutor.com',
        phone: '(21) 98888-7777',
        address: 'Rua das Flores, 123 - RJ',
        role: 'tutor',
        createdAt: now,
        updatedAt: now,
      },
      {
        uid: 'user-vet-1',
        name: 'Dra. Ana Silva - Veterinária',
        email: 'ana@univet.com',
        phone: '(21) 97777-6666',
        role: 'vet',
        createdAt: now,
        updatedAt: now,
      },
      {
        uid: 'user-admin-1',
        name: 'Admin UniVet',
        email: 'admin@univet.com',
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      }
    ];

    users.forEach(u => {
      const ref = db.collection('users').doc(u.uid);
      batch.set(ref, u);
    });

    // 2. Veterinários (Perfil)
    const vets = [
      {
        id: 'vet-1',
        userId: 'user-vet-1',
        name: 'Dra. Ana Silva',
        crmv: 'CRMV-RJ 12345',
        specialties: ['Clínica Geral', 'Pediatria'],
        photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&q=80&w=200',
        bio: 'Especialista em pequenos animais com mais de 10 anos de experiência.',
        availableDays: ['monday', 'wednesday', 'friday'],
        availableHours: { start: '08:00', end: '18:00' },
        rating: 4.8,
        totalReviews: 25,
        active: true,
      }
    ];

    vets.forEach(v => {
      const ref = db.collection('vets').doc(v.id);
      batch.set(ref, v);
    });

    // 3. Serviços
    const services = [
      {
        id: 'serv-1',
        name: 'Consulta de Rotina',
        description: 'Check-up completo de saúde para seu animal.',
        category: 'consultation',
        price: 150.00,
        durationMinutes: 30,
        imageUrl: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&q=80&w=200',
        active: true,
        createdAt: now,
      },
      {
        id: 'serv-2',
        name: 'Vacina V10 (Cães)',
        description: 'Proteção contra as 10 principais doenças caninas.',
        category: 'vaccine',
        price: 85.50,
        durationMinutes: 15,
        imageUrl: 'https://images.unsplash.com/photo-1628131338278-56517e440c1e?auto=format&fit=crop&q=80&w=200',
        active: true,
        createdAt: now,
      },
      {
        id: 'serv-3',
        name: 'Banho e Tosa Completa',
        description: 'Higiene e estética para todas as raças.',
        category: 'grooming',
        price: 110.00,
        durationMinutes: 90,
        active: true,
        createdAt: now,
      }
    ];

    services.forEach(s => {
      batch.set(db.collection('services').doc(s.id), s);
    });

    // 4. Pets (Tutor Carlos)
    const pets = [
      {
        id: 'pet-1',
        ownerId: 'user-tutor-1',
        name: 'Rex',
        species: 'dog',
        breed: 'Golden Retriever',
        birthDate: admin.firestore.Timestamp.fromDate(new Date('2021-05-15')),
        weight: 28.5,
        gender: 'male',
        photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200',
        allergies: ['Frango'],
        observations: 'Muito dócil, mas tem medo de tempestades.',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'pet-2',
        ownerId: 'user-tutor-1',
        name: 'Mimi',
        species: 'cat',
        breed: 'Siamês',
        birthDate: admin.firestore.Timestamp.fromDate(new Date('2022-10-20')),
        weight: 4.2,
        gender: 'female',
        photoUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=200',
        allergies: [],
        createdAt: now,
        updatedAt: now,
      }
    ];

    pets.forEach(p => {
      batch.set(db.collection('pets').doc(p.id), p);
    });

    // 5. Agendamentos
    const appointments = [
      {
        id: 'app-1',
        tutorId: 'user-tutor-1',
        petId: 'pet-1',
        vetId: 'vet-1',
        serviceId: 'serv-1',
        date: admin.firestore.Timestamp.fromDate(new Date('2024-03-25T14:30:00')),
        status: 'confirmed',
        notes: 'Rex está um pouco apático ultimamente.',
        totalPrice: 150.00,
        paymentStatus: 'pending',
        createdAt: now,
        updatedAt: now,
      }
    ];

    appointments.forEach(a => {
      batch.set(db.collection('appointments').doc(a.id), a);
    });

    // 6. Prontuários Médicos
    const medicalRecords = [
      {
        id: 'med-1',
        petId: 'pet-1',
        vetId: 'vet-1',
        appointmentId: 'app-prev', // ID imaginário de consulta passada
        date: admin.firestore.Timestamp.fromDate(new Date('2023-11-10')),
        diagnosis: 'Dermatite leve',
        treatment: 'Pomada antifúngica por 10 dias.',
        prescriptions: [{ medication: 'Dermacort', dosage: '2x ao dia', frequency: '12h', duration: '10 dias' }],
        exams: [],
        weight: 27.8,
        temperature: 38.5,
        observations: 'Melhora esperada em 5 dias.',
        createdAt: now,
      }
    ];

    medicalRecords.forEach(m => {
      batch.set(db.collection('medical_records').doc(m.id), m);
    });

    // 7. Vacinas
    const vaccines = [
      {
        id: 'vac-1',
        petId: 'pet-1',
        vetId: 'vet-1',
        name: 'Antirrábica',
        appliedAt: admin.firestore.Timestamp.fromDate(new Date('2023-05-15')),
        nextDoseAt: admin.firestore.Timestamp.fromDate(new Date('2024-05-15')),
        lotNumber: 'ABC-123',
        manufacturer: 'Zoetis',
        createdAt: now,
      }
    ];

    vaccines.forEach(v => {
      batch.set(db.collection('vaccines').doc(v.id), v);
    });

    // 8. Notificações
    const notifications = [
      {
        id: 'not-1',
        userId: 'user-tutor-1',
        title: 'Lembrete de Consulta 🐾',
        body: 'Rex tem uma consulta amanhã às 14:30.',
        type: 'appointment_reminder',
        read: false,
        createdAt: now,
      }
    ];

    notifications.forEach(n => {
      batch.set(db.collection('notifications').doc(n.id), n);
    });

    // 9. Avaliações (Reviews)
    const reviews = [
      {
        id: 'rev-1',
        vetId: 'vet-1',
        tutorId: 'user-tutor-1',
        score: 5,
        comment: 'Dra. Ana foi super atenciosa com o Rex!',
        createdAt: now,
      }
    ];

    reviews.forEach(r => {
      batch.set(db.collection('reviews').doc(r.id), r);
    });

    await batch.commit();
    console.log('✅ Banco de dados populado com sucesso em um único lote!');
    console.log('✨ Seeding concluído! O sistema está pronto para testes.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante o seeding:', error);
    process.exit(1);
  }
}

seedModel();
