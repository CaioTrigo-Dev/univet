import React from 'react';
import { 
  List, Datagrid, TextField, DateField, 
  Create, Edit, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput
} from 'react-admin';

export const MedicalRecordList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="date" label="Data do Atendimento" />
      <TextField source="petId" label="ID do Pet" />
      <TextField source="vetId" label="ID do Vet" />
      <TextField source="diagnosis" label="Diagnóstico Primário" />
    </Datagrid>
  </List>
);

export const MedicalRecordEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <DateInput source="date" label="Data do Atendimento" />
      <TextInput source="petId" label="Pet" />
      <TextInput source="vetId" label="Veterinário" />
      <TextInput source="weightKg" label="Peso (Kg)" />
      <TextInput source="temperature" label="Temperatura (°C)" />
      <TextInput source="diagnosis" label="Diagnóstico" multiline fullWidth />
      <TextInput source="treatment" label="Tratamento / Prescrição" multiline fullWidth />
      <TextInput source="notes" label="Observações Clínicas" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

export const MedicalRecordCreate = () => (
  <Create>
    <SimpleForm>
      <DateInput source="date" label="Data do Atendimento" defaultValue={new Date()} />
      <TextInput source="petId" label="ID do Pet" />
      <TextInput source="vetId" label="ID do Veterinário" />
      <TextInput source="weightKg" label="Peso (Kg)" />
      <TextInput source="temperature" label="Temperatura (°C)" />
      <TextInput source="diagnosis" label="Diagnóstico" multiline fullWidth />
      <TextInput source="treatment" label="Tratamento / Prescrição" multiline fullWidth />
      <TextInput source="notes" label="Observações Clínicas" multiline fullWidth />
    </SimpleForm>
  </Create>
);
