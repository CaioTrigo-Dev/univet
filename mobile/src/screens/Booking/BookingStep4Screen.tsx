import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useBooking } from '../../contexts/BookingContext';
import { Card } from '../../components/organisms/Card';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { appointmentsService } from '../../services/appointments.service';

/**
 * Agendamento Passo 4: Resumo Final
 */
export const BookingStep4Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { booking, resetBooking } = useBooking();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await appointmentsService.create('demo-token', {
        petId: booking.pet!.id,
        serviceId: booking.serviceId!,
        vetId: booking.vetId!,
        scheduledAt: booking.scheduledAt!,
        totalPrice: booking.totalPrice!,
        status: 'pending'
      });
      
      Alert.alert('Sucesso', 'Consulta agendada com sucesso!', [
        { text: 'OK', onPress: () => {
          resetBooking();
          navigation.navigate('Home');
        }}
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revise seu agendamento</Text>
      
      <Card padding="lg" style={styles.summaryCard}>
        <View style={styles.row}>
          <Icon name="PawPrint" size={20} color={colors.text.secondary} />
          <Text style={styles.label}>Pet:</Text>
          <Text style={styles.value}>{booking.pet?.name}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="Activity" size={20} color={colors.text.secondary} />
          <Text style={styles.label}>Serviço:</Text>
          <Text style={styles.value}>{booking.serviceId === '1' ? 'Consulta Clínica' : 'Outro'}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="Calendar" size={20} color={colors.text.secondary} />
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{booking.scheduledAt?.toLocaleString('pt-BR')}</Text>
        </View>

        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>R$ {booking.totalPrice?.toFixed(2)}</Text>
        </View>
      </Card>

      <View style={styles.footer}>
        <Button 
          title="Confirmar Agendamento" 
          loading={loading}
          onPress={handleConfirm}
        />
        <Button 
          title="Voltar" 
          variant="outline" 
          style={{ marginTop: spacing.md }}
          onPress={() => navigation.goBack()}
        />
      </View>
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
    marginBottom: spacing.xl,
  },
  summaryCard: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    marginLeft: spacing.sm,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    width: 80,
  },
  value: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.subheading,
    color: colors.text.primary,
    flex: 1,
  },
  totalRow: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
    color: colors.secondary.main,
  },
  footer: {
    marginTop: 'auto',
  },
});
