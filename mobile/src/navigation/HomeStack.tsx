import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { SearchScreen } from '../screens/Home/SearchScreen';
import { FindClinicScreen } from '../screens/Home/FindClinicScreen';
import { ServiceDetailScreen } from '../screens/Home/ServiceDetailScreen';
import { BookingStack } from './BookingStack';
import { useColors } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  const colors = useColors();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: colors.background.paper },
      headerTintColor: colors.text.primary,
      headerTitleStyle: { color: colors.text.primary },
    }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true, title: 'Busca' }} />
      <Stack.Screen name="FindClinic" component={FindClinicScreen} options={{ headerShown: true, title: 'Unidades UniVet' }} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen as any} options={{ headerShown: true, title: 'Detalhes do Serviço' }} />
      <Stack.Screen name="BookingStack" component={BookingStack} />
    </Stack.Navigator>
  );
};
