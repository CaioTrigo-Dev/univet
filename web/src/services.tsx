import React from 'react';
import { 
  List, Datagrid, TextField, NumberField, BooleanField, 
  Create, Edit, SimpleForm, TextInput, NumberInput, 
  BooleanInput, ImageInput, ImageField 
} from 'react-admin';

export const ServiceList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nome do Serviço" />
      <TextField source="category" label="Categoria" />
      <NumberField source="price" label="Preço (R$)" options={{ style: 'currency', currency: 'BRL' }} />
      <NumberField source="durationMinutes" label="Duração (min)" />
      <BooleanField source="active" label="Ativo" />
    </Datagrid>
  </List>
);

export const ServiceEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Nome do Serviço" fullWidth />
      <TextInput source="description" label="Descrição" multiline fullWidth />
      <TextInput source="category" label="Categoria" />
      <NumberInput source="price" label="Preço" />
      <NumberInput source="durationMinutes" label="Duração (min)" />
      <BooleanInput source="active" label="Ativo" />
      <ImageInput source="image" label="Foto do Serviço" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const ServiceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nome do Serviço" fullWidth />
      <TextInput source="description" label="Descrição" multiline fullWidth />
      <TextInput source="category" label="Categoria" />
      <NumberInput source="price" label="Preço" />
      <NumberInput source="durationMinutes" label="Duração (min)" />
      <BooleanInput source="active" label="Ativo" defaultValue={true} />
      <ImageInput source="image" label="Foto do Serviço" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
