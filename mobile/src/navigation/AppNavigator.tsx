import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './HomeStack';
import { PetsStack } from './PetsStack';
import { AppointmentsHistoryScreen } from '../screens/Appointments/AppointmentsHistoryScreen';
import { NotificationsScreen } from '../screens/Notifications/NotificationsScreen';
import { ProfileStack } from './ProfileStack';
import { Icon } from '../components/atoms/Icon';
import { colors } from '../tokens/colors';

const Tab = createBottomTabNavigator();

/**
 * AppNavigator (Navegação Principal)
 * Barra de abas inferior para usuários autenticados.
 */
export const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: colors.primary.main,
      tabBarInactiveTintColor: colors.text.secondary,
      headerShown: false,
    }}>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => <Icon name="Home" color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="PetsTab" 
        component={PetsStack} 
        options={{
          tabBarLabel: 'Animais',
          tabBarIcon: ({ color, size }) => <Icon name="PawPrint" color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="AppointmentsTab" 
        component={AppointmentsHistoryScreen} 
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ color, size }) => <Icon name="Calendar" color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="NotificationsTab" 
        component={NotificationsScreen} 
        options={{
          tabBarLabel: 'Avisos',
          tabBarIcon: ({ color, size }) => <Icon name="Bell" color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack} 
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <Icon name="User" color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};
