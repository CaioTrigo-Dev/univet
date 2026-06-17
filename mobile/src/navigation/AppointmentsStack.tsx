import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppointmentsHistoryScreen } from '../screens/Appointments/AppointmentsHistoryScreen';
import { AppointmentDetailScreen } from '../screens/Appointments/AppointmentDetailScreen';
import { useColors } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export const AppointmentsStack = () => {
  const colors = useColors();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: colors.background.paper },
      headerTintColor: colors.text.primary,
      headerTitleStyle: { color: colors.text.primary },
    }}>
      <Stack.Screen name="AppointmentsHistory" component={AppointmentsHistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen as any} options={{ title: 'Detalhes do Agendamento', headerBackTitle: 'Voltar' }} />
    </Stack.Navigator>
  );
};
