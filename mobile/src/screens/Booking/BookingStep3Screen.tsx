import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useBooking } from '../../contexts/BookingContext';
import { Card } from '../../components/organisms/Card';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

const VETS = [
  { id: '1', name: 'Dra. Ana Silva', specialization: 'Clínica Geral' },
  { id: '2', name: 'Dr. Marcos Souza', specialization: 'Cirurgia' },
];

/**
 * Agendamento Passo 3: Selecionar Veterinário e Horário
 */
export const BookingStep3Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { setVetAndTime } = useBooking();
  const [selectedVet, setSelectedVet] = useState<string | null>(null);

  const handleFinish = () => {
    if (!selectedVet) return;
    // Simplificado para o skeleton: data fixa para hoje + 1 dia
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    setVetAndTime(selectedVet, tomorrow);
    navigation.navigate('BookingStep4');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Com quem deseja agendar?</Text>
        
        {VETS.map(vet => (
          <TouchableOpacity 
            key={vet.id} 
            onPress={() => setSelectedVet(vet.id)}
          >
            <Card style={[
              styles.vetCard,
              selectedVet === vet.id && styles.selectedCard
            ]}>
              <View style={styles.vetInfo}>
                <View style={styles.avatar}>
                  <Icon name="User" color={colors.primary.main} />
                </View>
                <View>
                  <Text style={styles.vetName}>{vet.name}</Text>
                  <Text style={styles.vetSpec}>{vet.specialization}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <Text style={[styles.title, { marginTop: spacing.xl }]}>Horários disponíveis</Text>
        <Text style={styles.info}>Exibindo horários para amanhã às 10:00 (Simulação)</Text>
      </ScrollView>

      <Button 
        title="Continuar para Resumo" 
        disabled={!selectedVet}
        onPress={handleFinish}
        style={styles.nextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background.default,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
    marginBottom: spacing.lg,
  },
  vetCard: {
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: colors.secondary.main,
  },
  vetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  vetName: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.subheading,
    color: colors.text.primary,
  },
  vetSpec: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  info: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  nextButton: {
    marginTop: spacing.md,
  },
});
