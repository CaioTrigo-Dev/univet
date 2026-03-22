import React from 'react';
import { 
  List, Datagrid, TextField, BooleanField, 
  Create, Edit, SimpleForm, TextInput, 
  BooleanInput, ArrayInput, SimpleFormIterator 
} from 'react-admin';

export const VetList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Veterinário" />
      <TextField source="crmv" label="CRMV" />
      <TextField source="specialty" label="Especialidade" />
      <BooleanField source="active" label="Ativo" />
    </Datagrid>
  </List>
);

export const VetEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Nome do Veterinário" fullWidth />
      <TextInput source="crmv" label="Registro CRMV" />
      <TextInput source="specialty" label="Especialidade" fullWidth />
      <BooleanInput source="active" label="Ativo" />
      
      <ArrayInput source="availability" label="Horários de Atendimento">
        <SimpleFormIterator inline>
          <TextInput source="dayOfWeek" label="Dia da Semana (0-6)" />
          <TextInput source="startTime" label="Início (HH:mm)" />
          <TextInput source="endTime" label="Término (HH:mm)" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const VetCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nome do Veterinário" fullWidth />
      <TextInput source="crmv" label="Registro CRMV" />
      <TextInput source="specialty" label="Especialidade" fullWidth />
      <BooleanInput source="active" label="Ativo" defaultValue={true} />
      
      <ArrayInput source="availability" label="Horários de Atendimento">
        <SimpleFormIterator inline>
          <TextInput source="dayOfWeek" label="Dia da Semana (0-6)" />
          <TextInput source="startTime" label="Início (HH:mm)" />
          <TextInput source="endTime" label="Término (HH:mm)" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
