import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import authRoutes from './infrastructure/http/routes/AuthRoutes';
import petsRoutes from './infrastructure/http/routes/PetsRoutes';
import appointmentsRoutes from './infrastructure/http/routes/AppointmentsRoutes';

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

// Rota de verificação de saúde da API
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Inicialização do servidor HTTP
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
