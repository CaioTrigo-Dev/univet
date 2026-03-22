import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { SearchScreen } from '../screens/Home/SearchScreen';
import { FindClinicScreen } from '../screens/Home/FindClinicScreen';
import { BookingStack } from './BookingStack';

const Stack = createNativeStackNavigator();

/**
 * HomeStack
 * Navegação para a aba Início, incluindo busca, localização e agendamento.
 */
export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ headerShown: true, title: 'Busca' }} 
      />
      <Stack.Screen 
        name="FindClinic" 
        component={FindClinicScreen} 
        options={{ headerShown: true, title: 'Unidades UniVet' }} 
      />
      <Stack.Screen name="BookingStack" component={BookingStack} />
    </Stack.Navigator>
  );
};
