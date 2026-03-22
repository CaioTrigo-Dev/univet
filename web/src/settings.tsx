import React from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Box, Switch, FormControlLabel } from '@mui/material';
import { useNotify } from 'react-admin';

export const SettingsPanel = () => {
  const notify = useNotify();

  const handleSave = () => {
    notify('As configurações gerais foram atualizadas!', { type: 'success' });
  };

  return (
    <Box sx={{ mt: 3, mx: 'auto', maxWidth: 800 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
            Gestão de Configurações da Clínica
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Esses horários e regras operacionais serão refletidos automaticamente no aplicativo dos Tutores (Mobile).
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Horário de Abertura" 
                defaultValue="08:00" 
                type="time"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Horário de Fechamento" 
                defaultValue="18:00" 
                type="time" 
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>Parâmetros Operacionais</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <FormControlLabel control={<Switch defaultChecked color="success" />} label="Aceitar Agendamentos Automáticos" />
                <FormControlLabel control={<Switch defaultChecked color="success" />} label="Enviar Lembrete Via Push Notification (24h antes)" />
                <FormControlLabel control={<Switch color="success" />} label="Exibir Módulo de Banho e Tosa em manutenção" />
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="success" onClick={handleSave} size="large">
                Salvar Regras de Negócio
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
