import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyPetsScreen } from '../screens/Pets/MyPetsScreen';
import { AddEditPetScreen } from '../screens/Pets/AddEditPetScreen';

const Stack = createNativeStackNavigator();

/**
 * PetsStack
 * Pilha de navegação para gestão de animais.
 */
export const PetsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MyPets" 
        component={MyPetsScreen} 
        options={{ title: 'Meus Animais' }} 
      />
      <Stack.Screen 
        name="AddEditPet" 
        component={AddEditPetScreen} 
        options={{ title: 'Novo Pet' }} 
      />
    </Stack.Navigator>
  );
};
