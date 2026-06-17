import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import authRoutes from './infrastructure/http/routes/AuthRoutes';
import petsRoutes from './infrastructure/http/routes/PetsRoutes';
import appointmentsRoutes from './infrastructure/http/routes/AppointmentsRoutes';
import servicesRoutes from './infrastructure/http/routes/ServicesRoutes';
import vetsRoutes from './infrastructure/http/routes/VetsRoutes';
import medicalRecordsRoutes from './infrastructure/http/routes/MedicalRecordsRoutes';
import vaccinesRoutes from './infrastructure/http/routes/VaccinesRoutes';
import usersRoutes from './infrastructure/http/routes/UsersRoutes';
import notificationsRoutes from './infrastructure/http/routes/NotificationsRoutes';
import reviewsRoutes from './infrastructure/http/routes/ReviewsRoutes';

// Configuração de variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Definição das Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/vets', vetsRoutes);
app.use('/api/medical-records', medicalRecordsRoutes);
app.use('/api/vaccines', vaccinesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/reviews', reviewsRoutes);

// Rota de verificação de saúde da API
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[ERROR]', req.method, req.path, err?.message || err);
  res.status(err?.status || 500).json({ error: err?.message || 'Internal server error' });
});

// Inicialização do servidor HTTP
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
