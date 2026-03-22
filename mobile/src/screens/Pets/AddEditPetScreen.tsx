import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Alert 
} from 'react-native';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { petsService } from '../../services/pets.service';

/**
 * Tela: Adicionar/Editar Pet
 * Formulário para cadastro e edição de animais.
 */
export const AddEditPetScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'dog' | 'cat' | 'bird' | 'rabbit' | 'other'>('dog');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !breed || !birthDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      // Simulação de salvamento
      await petsService.create('demo-token', {
        name,
        species,
        breed,
        birthDate: new Date(birthDate),
        tutorId: 'demo-tutor',
        createdAt: new Date(),
      });
      Alert.alert('Sucesso', 'Pet cadastrado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Novo Pet</Text>
          <Text style={styles.subtitle}>Preencha os dados do seu animal.</Text>
        </View>

        <View style={styles.form}>
          <Input 
            label="Nome do Pet" 
            placeholder="Ex: Rex" 
            value={name}
            onChangeText={setName}
            leftIcon={<Icon name="PawPrint" size={18} color={colors.text.secondary} />}
          />

          <Input 
            label="Raça" 
            placeholder="Ex: Labrador" 
            value={breed}
            onChangeText={setBreed}
            leftIcon={<Icon name="Dna" size={18} color={colors.text.secondary} />}
          />

          <Input 
            label="Data de Nascimento (AAAA-MM-DD)" 
            placeholder="Ex: 2022-05-20" 
            value={birthDate}
            onChangeText={setBirthDate}
            leftIcon={<Icon name="Calendar" size={18} color={colors.text.secondary} />}
          />
        </View>

        <Button 
          title="Salvar Pet" 
          loading={loading}
          onPress={handleSave}
          style={styles.saveButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  form: {
    marginBottom: spacing.xl,
  },
  saveButton: {
    marginTop: spacing.md,
  },
});
