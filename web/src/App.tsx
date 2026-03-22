import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

/**
 * Painel Administrativo UniVet
 * Configura rotas e recursos para gestão da clínica.
 */
const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource 
      name="users" 
      list={() => <div style={{ padding: 20 }}>Listagem de Tutores (Em breve)</div>} 
      icon={PeopleIcon} 
      options={{ label: 'Tutores' }}
    />
    <Resource 
      name="posts" 
      list={() => <div style={{ padding: 20 }}>Listagem de Pets (Em breve)</div>} 
      icon={PetsIcon} 
      options={{ label: 'Animais' }}
    />
  </Admin>
);

export default App;
