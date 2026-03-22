import { db } from './config';

/**
 * Script de Seed (UniVet)
 * Inicializa coleções básicas no Firestore.
 */
async function seed() {
  console.log('🌱 Iniciando seeding do Firestore...');

  try {
    // 1. Criar Serviços Padrão
    const services = [
      { id: '1', name: 'Consulta Geral', price: 150, description: 'Check-up completo do seu pet.' },
      { id: '2', name: 'Vacinação', price: 80, description: 'Aplicação de vacinas essenciais.' },
      { id: '3', name: 'Banho e Tosa', price: 120, description: 'Cuidado e higiene para o animal.' },
      { id: '4', name: 'Cirurgia', price: 500, description: 'Procedimentos cirúrgicos complexos.' },
    ];

    const servicesRef = db.collection('services');
    for (const service of services) {
      await servicesRef.doc(service.id).set(service);
      console.log(`✅ Serviço adicionado: ${service.name}`);
    }

    // 2. Criar um Admin de Teste (Opcional)
    const adminUser = {
      uid: 'admin-test-uid',
      name: 'Administrador UniVet',
      email: 'admin@univet.com',
      role: 'admin',
      createdAt: new Date(),
    };
    await db.collection('users').doc(adminUser.uid).set(adminUser);
    console.log('✅ Usuário Admin de teste criado.');

    console.log('✨ Seeding concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro no seeding:', error);
    process.exit(1);
  }
}

seed();
