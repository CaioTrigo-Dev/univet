import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { useColors } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { auth } from '../../firebase/config';
import { petsService } from '../../services/pets.service';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

type Species = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';

const SPECIES_OPTIONS: { value: Species; label: string; icon: string }[] = [
  { value: 'dog', label: 'Cão', icon: 'Dog' },
  { value: 'cat', label: 'Gato', icon: 'Cat' },
  { value: 'bird', label: 'Pássaro', icon: 'Bird' },
  { value: 'rabbit', label: 'Coelho', icon: 'Rabbit' },
  { value: 'other', label: 'Outro', icon: 'PawPrint' },
];

export const AddEditPetScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [species, setSpecies] = useState<Species>('dog');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDateInput = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length > 2) formatted = digits.slice(0, 2) + '/' + digits.slice(2);
    if (digits.length > 4) formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
    setBirthDate(formatted);
  };

  const handleSave = async () => {
    if (!name.trim() || !breed.trim() || !birthDate.trim()) {
      showToast('Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    const parts = birthDate.split('/');
    if (parts.length !== 3 || parts[2].length !== 4) {
      showToast('Data inválida. Use DD/MM/AAAA.', 'error');
      return;
    }
    const [day, month, year] = parts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    if (isNaN(parsedDate.getTime()) || parsedDate > new Date()) {
      showToast('Data de nascimento inválida.', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        showToast('Sessão expirada. Faça login novamente.', 'error');
        return;
      }

      await petsService.create(token, {
        name: name.trim(),
        species,
        breed: breed.trim(),
        birthDate: parsedDate,
        tutorId: auth.currentUser!.uid,
        createdAt: new Date(),
      });

      showToast('Pet cadastrado com sucesso!', 'success');
      navigation.goBack();
    } catch (error: any) {
      showToast(error.message || 'Erro ao cadastrar pet.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Novo Pet</Text>
          <Text style={styles.subtitle}>Preencha os dados do seu animal.</Text>
        </View>

        <Text style={styles.label}>Espécie</Text>
        <View style={styles.speciesRow}>
          {SPECIES_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.speciesBtn, species === opt.value && styles.speciesBtnActive]}
              onPress={() => setSpecies(opt.value)}
            >
              <Icon name={opt.icon as any} size={22} color={species === opt.value ? '#fff' : colors.primary.main} />
              <Text style={[styles.speciesLabel, species === opt.value && styles.speciesLabelActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.form}>
          <Input
            label="Nome do Pet *"
            placeholder="Ex: Rex"
            value={name}
            onChangeText={setName}
            leftIcon={<Icon name="PawPrint" size={18} color={colors.text.secondary} />}
          />
          <Input
            label="Raça *"
            placeholder="Ex: Labrador"
            value={breed}
            onChangeText={setBreed}
            leftIcon={<Icon name="Dna" size={18} color={colors.text.secondary} />}
          />
          <Input
            label="Data de Nascimento * (DD/MM/AAAA)"
            placeholder="Ex: 20/05/2022"
            value={birthDate}
            onChangeText={formatDateInput}
            keyboardType="numeric"
            maxLength={10}
            leftIcon={<Icon name="Calendar" size={18} color={colors.text.secondary} />}
          />
        </View>

        <Button title="Salvar Pet" loading={loading} onPress={handleSave} style={styles.saveButton} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    content: { padding: spacing.lg, paddingBottom: spacing.xxl },
    header: { marginBottom: spacing.xl },
    title: { fontSize: typography.sizes.xxl, fontFamily: typography.fonts.heading, color: colors.primary.main },
    subtitle: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, marginTop: spacing.xs },
    label: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.subheading, color: colors.text.secondary, marginBottom: spacing.sm },
    speciesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
    speciesBtn: {
      flexDirection: 'row', alignItems: 'center', gap: 6,
      paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
      borderRadius: 20, borderWidth: 1.5, borderColor: colors.primary.main,
    },
    speciesBtnActive: { backgroundColor: colors.primary.main },
    speciesLabel: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.subheading, color: colors.primary.main },
    speciesLabelActive: { color: '#fff' },
    form: { marginBottom: spacing.xl },
    saveButton: { marginTop: spacing.md },
  });
}
