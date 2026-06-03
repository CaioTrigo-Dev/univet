import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyPetsScreen } from '../screens/Pets/MyPetsScreen';
import { AddEditPetScreen } from '../screens/Pets/AddEditPetScreen';
import { PetDetailScreen } from '../screens/Pets/PetDetailScreen';

const Stack = createNativeStackNavigator();

export const PetsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPets"
        component={MyPetsScreen}
        options={{ title: 'Meus Animais' }}
      />
      <Stack.Screen
        name="PetDetail"
        component={PetDetailScreen as any}
        options={{ title: 'Perfil do Pet', headerBackTitle: 'Voltar' }}
      />
      <Stack.Screen
        name="AddEditPet"
        component={AddEditPetScreen}
        options={{ title: 'Novo Pet' }}
      />
    </Stack.Navigator>
  );
};
