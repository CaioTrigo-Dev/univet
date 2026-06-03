import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { Icon } from '../../components/atoms/Icon';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/organisms/Card';
import { useColors } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { petsService } from '../../services/pets.service';
import { auth } from '../../firebase/config';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

const SPECIES_ICON: Record<string, string> = {
  dog: 'Dog', cat: 'Cat', bird: 'Bird', rabbit: 'Rabbit', other: 'PawPrint',
};
const SPECIES_LABEL: Record<string, string> = {
  dog: 'Cão', cat: 'Gato', bird: 'Pássaro', rabbit: 'Coelho', other: 'Outro',
};

const parseDate = (date: any): Date => {
  if (!date) return new Date(0);
  if (typeof date === 'object' && date._seconds !== undefined) return new Date(date._seconds * 1000);
  return new Date(date);
};

const calculateAge = (birthDate: any) => {
  const birth = parseDate(birthDate);
  if (isNaN(birth.getTime()) || birth.getTime() === 0) return null;
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  if (now.getDate() < birth.getDate()) { months--; if (months < 0) { years--; months += 12; } }
  return { years, months };
};

const formatAgeText = (birthDate: any): string => {
  const age = calculateAge(birthDate);
  if (!age) return 'Idade desconhecida';
  const { years, months } = age;
  if (years === 0 && months === 0) return 'Recém-nascido';
  if (years === 0) return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  if (months === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`;
  return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`;
};

const formatBirthDate = (date: any): string => {
  const d = parseDate(date);
  if (isNaN(d.getTime()) || d.getTime() === 0) return '—';
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
};

export const PetDetailScreen: React.FC<{ route: { params: { pet: any } }; navigation: any }> = ({ route, navigation }) => {
  const { pet } = route.params;
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { showToast } = useToast();

  const [name, setName] = useState<string>(pet.name || '');
  const [observations, setObservations] = useState<string>(pet.observations || '');
  const [saving, setSaving] = useState(false);

  const iconName = (SPECIES_ICON[pet.species] || 'PawPrint') as any;

  const handleSave = async () => {
    if (!name.trim()) { showToast('O nome não pode ficar em branco.', 'error'); return; }
    setSaving(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) { showToast('Sessão expirada.', 'error'); return; }
      await petsService.update(token, pet.id, { name: name.trim(), observations: observations.trim() });
      showToast('Pet atualizado!', 'success');
      navigation.goBack();
    } catch (e: any) {
      showToast(e.message || 'Erro ao salvar.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Icon name={iconName} size={52} color={colors.primary.main} />
          </View>
          <View style={[styles.speciesBadge]}>
            <Text style={styles.speciesText}>{SPECIES_LABEL[pet.species] || pet.species}</Text>
          </View>
        </View>

        {/* Idade em destaque */}
        <Card style={styles.ageCard} padding="md">
          <View style={styles.ageRow}>
            <View style={styles.ageItem}>
              <Icon name="Cake" size={20} color={colors.primary.main} />
              <Text style={styles.ageLabel}>Idade</Text>
              <Text style={styles.ageValue}>{formatAgeText(pet.birthDate)}</Text>
            </View>
            <View style={styles.ageDivider} />
            <View style={styles.ageItem}>
              <Icon name="Calendar" size={20} color={colors.primary.main} />
              <Text style={styles.ageLabel}>Nascimento</Text>
              <Text style={styles.ageValue}>{formatBirthDate(pet.birthDate)}</Text>
            </View>
            {pet.breed ? (
              <>
                <View style={styles.ageDivider} />
                <View style={styles.ageItem}>
                  <Icon name="Dna" size={20} color={colors.primary.main} />
                  <Text style={styles.ageLabel}>Raça</Text>
                  <Text style={styles.ageValue} numberOfLines={2}>{pet.breed}</Text>
                </View>
              </>
            ) : null}
          </View>
        </Card>

        {/* Editar Nome */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Nome</Text>
          <TextInput
            style={styles.fieldInput}
            value={name}
            onChangeText={setName}
            placeholder="Nome do pet"
            placeholderTextColor={colors.text.hint}
          />
        </View>

        {/* Observações */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Observações</Text>
          <TextInput
            style={[styles.fieldInput, styles.textArea]}
            value={observations}
            onChangeText={setObservations}
            placeholder="Ex: Tem medo de trovões, alérgico a frango..."
            placeholderTextColor={colors.text.hint}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Button title="Salvar Alterações" loading={saving} onPress={handleSave} />

        {/* Vacinas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Carteira de Vacinação</Text>
          <Card style={styles.vaccineCard}>
            <View style={styles.vaccineItem}>
              <View style={[styles.vaccineIcon, { backgroundColor: colors.primary.light }]}>
                <Icon name="ShieldCheck" size={18} color={colors.primary.main} />
              </View>
              <View style={styles.vaccineInfo}>
                <Text style={styles.vaccineName}>V10 (Polivalente)</Text>
                <Text style={styles.vaccineDate}>Aplicada em 01/03/2026</Text>
              </View>
              <Text style={[styles.vaccineStatus, { color: colors.primary.main }]}>OK</Text>
            </View>
            <View style={styles.vaccineItem}>
              <View style={[styles.vaccineIcon, { backgroundColor: '#FFEBEE' }]}>
                <Icon name="AlertCircle" size={18} color="#F44336" />
              </View>
              <View style={styles.vaccineInfo}>
                <Text style={styles.vaccineName}>Antirrábica</Text>
                <Text style={[styles.vaccineDate, { color: '#F44336' }]}>Vencimento em 15/05/2026</Text>
              </View>
              <Text style={[styles.vaccineStatus, { color: '#F44336' }]}>Renovar</Text>
            </View>
          </Card>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    content: { padding: spacing.lg, paddingBottom: spacing.xxl },
    avatarSection: { alignItems: 'center', marginBottom: spacing.lg },
    avatar: {
      width: 100, height: 100, borderRadius: 50,
      backgroundColor: colors.primary.light,
      alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
    },
    speciesBadge: {
      paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
      backgroundColor: colors.primary.main, borderRadius: 20,
    },
    speciesText: { color: '#fff', fontFamily: typography.fonts.subheading, fontSize: typography.sizes.sm },
    ageCard: { marginBottom: spacing.lg },
    ageRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    ageItem: { alignItems: 'center', flex: 1, gap: 4 },
    ageDivider: { width: 1, height: 50, backgroundColor: colors.border.light },
    ageLabel: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, color: colors.text.secondary, marginTop: 4 },
    ageValue: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.heading, color: colors.text.primary, textAlign: 'center' },
    fieldGroup: { marginBottom: spacing.md },
    fieldLabel: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.subheading, color: colors.text.secondary, marginBottom: spacing.xs, marginLeft: 4 },
    fieldInput: {
      backgroundColor: colors.background.paper,
      borderRadius: 12, borderWidth: 1, borderColor: colors.border.main,
      paddingHorizontal: spacing.md, paddingVertical: spacing.md,
      fontSize: typography.sizes.md, fontFamily: typography.fonts.body,
      color: colors.text.primary, minHeight: 56,
    },
    textArea: { minHeight: 110, paddingTop: spacing.md },
    section: { marginTop: spacing.xl },
    sectionTitle: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading, color: colors.text.primary, marginBottom: spacing.md },
    vaccineCard: { padding: 0 },
    vaccineItem: {
      flexDirection: 'row', alignItems: 'center', padding: spacing.md,
      borderBottomWidth: 1, borderBottomColor: colors.border.light,
    },
    vaccineIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    vaccineInfo: { flex: 1, marginLeft: spacing.md },
    vaccineName: { fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.text.primary },
    vaccineDate: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, color: colors.text.secondary },
    vaccineStatus: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.heading },
  });
}
