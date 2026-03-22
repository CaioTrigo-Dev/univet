import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const data = [
  { name: 'Seg', consultas: 12 },
  { name: 'Ter', consultas: 19 },
  { name: 'Qua', consultas: 15 },
  { name: 'Qui', consultas: 22 },
  { name: 'Sex', consultas: 30 },
  { name: 'Sáb', consultas: 10 },
];

/**
 * Dashboard Administrativo UniVet
 * Exibe métricas em tempo real para gestores.
 */
const Dashboard = () => (
  <Box sx={{ mt: 2 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card sx={{ bgcolor: '#E3F2FD' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <PeopleIcon sx={{ fontSize: 40, mr: 2, color: '#1976D2' }} />
            <Box>
              <Typography color="textSecondary" gutterBottom>Tutores</Text>
              <Typography variant="h5">1,240</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{ bgcolor: '#F1F8E9' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <PetsIcon sx={{ fontSize: 40, mr: 2, color: '#388E3C' }} />
            <Box>
              <Typography color="textSecondary" gutterBottom>Pets Ativos</Text>
              <Typography variant="h5">3,120</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{ bgcolor: '#FFF3E0' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <EventAvailableIcon sx={{ fontSize: 40, mr: 2, color: '#F57C00' }} />
            <Box>
              <Typography color="textSecondary" gutterBottom>Consultas Hoje</Text>
              <Typography variant="h5">48</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Fluxo de Consultas Semanal</Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consultas" fill="#2D5A27" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
