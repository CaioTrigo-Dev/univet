import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { AuthStack } from './AuthStack';
import { AppNavigator } from './AppNavigator';
import { SplashScreen } from '../screens/Auth/SplashScreen';

/**
 * RootNavigator
 * Gerencia a troca entre fluxo de Auth e fluxo de App.
 */
export const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};
