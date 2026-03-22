import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookingStep1Screen } from '../screens/Booking/BookingStep1Screen';
import { BookingStep2Screen } from '../screens/Booking/BookingStep2Screen';
import { BookingStep3Screen } from '../screens/Booking/BookingStep3Screen';
import { BookingStep4Screen } from '../screens/Booking/BookingStep4Screen';
import { BookingStep5Screen } from '../screens/Booking/BookingStep5Screen';

const Stack = createNativeStackNavigator();

/**
 * BookingStack
 * Gerencia o fluxo seqüencial de agendamento.
 */
export const BookingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="BookingStep1" 
        component={BookingStep1Screen} 
        options={{ title: 'Selecionar Pet' }} 
      />
      <Stack.Screen 
        name="BookingStep2" 
        component={BookingStep2Screen} 
        options={{ title: 'Selecionar Serviço' }} 
      />
      <Stack.Screen 
        name="BookingStep3" 
        component={BookingStep3Screen} 
        options={{ title: 'Vet e Horário' }} 
      />
      <Stack.Screen 
        name="BookingStep4" 
        component={BookingStep4Screen} 
        options={{ title: 'Resumo' }} 
      />
      <Stack.Screen 
        name="BookingStep5" 
        component={BookingStep5Screen} 
        options={{ title: 'Concluído', headerShown: false }} 
      />
    </Stack.Navigator>
  );
};
