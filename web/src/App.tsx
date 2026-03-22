import React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import jsonServerProvider from 'ra-data-json-server';
import Dashboard from './Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { authProvider } from './authProvider';
import { AppointmentList } from './appointments';
import { SettingsPanel } from './settings';
import { ServiceList, ServiceCreate, ServiceEdit } from './services';
import { VetList, VetCreate, VetEdit } from './vets';
import { MedicalRecordList, MedicalRecordCreate, MedicalRecordEdit } from './medicalRecords';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

/**
 * Painel Administrativo UniVet
 * Configura rotas e recursos para gestão da clínica.
 */
const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource 
      name="appointments" 
      list={AppointmentList} 
      icon={EventNoteIcon} 
      options={{ label: 'Consultas' }}
    />
    <Resource 
      name="services" 
      list={ServiceList} create={ServiceCreate} edit={ServiceEdit} 
      icon={MedicalServicesIcon} 
      options={{ label: 'Catálogo de Serviços' }}
    />
    <Resource 
      name="vets" 
      list={VetList} create={VetCreate} edit={VetEdit} 
      icon={LocalHospitalIcon} 
      options={{ label: 'Corpo Clínico (Vets)' }}
    />
    <Resource 
      name="medicalRecords" 
      list={MedicalRecordList} create={MedicalRecordCreate} edit={MedicalRecordEdit} 
      icon={AssignmentIcon} 
      options={{ label: 'Prontuários' }}
    />
    <Resource 
      name="users" 
      list={() => <div style={{ padding: 20 }}>Listagem de Tutores (Em breve)</div>} 
      icon={PeopleIcon} 
      options={{ label: 'Tutores' }}
    />
    <Resource 
      name="pets" 
      list={() => <div style={{ padding: 20 }}>Listagem de Animais (Em breve)</div>} 
      icon={PetsIcon} 
      options={{ label: 'Pacientes Pets' }}
    />
    
    <CustomRoutes>
      <Route path="/settings" element={<SettingsPanel />} />
    </CustomRoutes>
  </Admin>
);

export default App;
