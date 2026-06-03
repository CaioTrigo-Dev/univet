import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppointmentsHistoryScreen } from '../screens/Appointments/AppointmentsHistoryScreen';
import { AppointmentDetailScreen } from '../screens/Appointments/AppointmentDetailScreen';

const Stack = createNativeStackNavigator();

export const AppointmentsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppointmentsHistory"
        component={AppointmentsHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen as any}
        options={{ title: 'Detalhes do Agendamento', headerBackTitle: 'Voltar' }}
      />
    </Stack.Navigator>
  );
};
