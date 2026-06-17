import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { EditProfileScreen } from '../screens/Profile/EditProfileScreen';
import { useColors } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  const colors = useColors();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: colors.background.paper },
      headerTintColor: colors.text.primary,
      headerTitleStyle: { color: colors.text.primary },
    }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Editar Perfil' }} />
    </Stack.Navigator>
  );
};
