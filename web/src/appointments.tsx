import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  DateField, 
  SelectField,
  Button,
  useRecordContext,
  useNotify,
  useRefresh,
  TopToolbar,
  FilterButton,
  TextInput
} from 'react-admin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AppointmentFilters = [
  <TextInput label="Buscar Pet ou Tutor" source="q" alwaysOn />
];

const ApproveButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  
  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate API call
    notify('Consulta confirmada com sucesso!', { type: 'success' });
    refresh();
  };

  if (!record || record.status !== 'Agendada') return null;

  return (
    <Button label="Aprovar" onClick={handleApprove} style={{ color: '#2D5A27' }}>
      <CheckCircleIcon />
    </Button>
  );
};

const CancelApptButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    notify('Consulta cancelada.', { type: 'warning' });
    refresh();
  };

  if (!record || record.status === 'Cancelada' || record.status === 'Concluída') return null;

  return (
    <Button label="Cancelar" onClick={handleCancel} style={{ color: '#D32F2F' }}>
      <CancelIcon />
    </Button>
  );
};

export const AppointmentList = () => (
  <List filters={AppointmentFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="petName" label="Pet" />
      <TextField source="tutorName" label="Tutor" />
      <TextField source="service" label="Serviço" />
      <DateField source="date" label="Data" showTime />
      <SelectField 
        source="status" 
        choices={[
          { id: 'Agendada', name: 'Agendada' },
          { id: 'Confirmada', name: 'Confirmada' },
          { id: 'Cancelada', name: 'Cancelada' },
        ]} 
      />
      <ApproveButton />
      <CancelApptButton />
    </Datagrid>
  </List>
);
