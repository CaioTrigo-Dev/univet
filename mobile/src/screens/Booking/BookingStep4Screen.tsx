import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useBooking } from '../../contexts/BookingContext';
import { Card } from '../../components/organisms/Card';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { appointmentsService } from '../../services/appointments.service';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { auth } from '../../firebase/config';

const formatDate = (date?: Date) => {
  if (!date) return '—';
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${d}/${m}/${y} às ${h}:${min}`;
};

export const BookingStep4Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { booking, resetBooking } = useBooking();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        showToast('Sessão expirada. Faça login novamente.', 'error');
        return;
      }
      await appointmentsService.create(token, {
        tutorId: user?.uid || 'anonymous',
        petId: booking.pet!.id,
        serviceId: booking.serviceId!,
        vetId: booking.vetId!,
        date: booking.scheduledAt!,
        totalPrice: booking.totalPrice!,
        status: 'pending',
      });

      showToast('Consulta agendada com sucesso!', 'success');
      resetBooking();
      navigation.navigate('BookingStep5');
    } catch (error: any) {
      showToast(error.message, 'error');
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
          <TouchableOpacity onPress={() => navigation.navigate('BookingStep1')}>
            <Text style={styles.editLink}>Alterar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Icon name="Activity" size={20} color={colors.text.secondary} />
          <Text style={styles.label}>Serviço:</Text>
          <Text style={styles.value}>{booking.serviceName ?? 'Serviço'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BookingStep2')}>
            <Text style={styles.editLink}>Alterar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Icon name="User" size={20} color={colors.text.secondary} />
          <Text style={styles.label}>Médico:</Text>
          <Text style={styles.value}>{booking.vetName ?? '—'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BookingStep3')}>
            <Text style={styles.editLink}>Alterar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Icon name="Calendar" size={20} color={colors.text.secondary} />
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formatDate(booking.scheduledAt)}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BookingStep3')}>
            <Text style={styles.editLink}>Alterar</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>R$ {booking.totalPrice?.toFixed(2)}</Text>
        </View>
      </Card>

      <View style={styles.footer}>
        <Button title="Confirmar Agendamento" loading={loading} onPress={handleConfirm} />
        <Button
          title="Esvaziar Carrinho"
          variant="secondary"
          style={{ marginTop: spacing.sm }}
          onPress={() => { resetBooking(); navigation.navigate('BookingStep1'); }}
        />
        <Button
          title="Voltar"
          variant="outline"
          style={{ marginTop: spacing.sm }}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background.default },
    title: {
      fontSize: typography.sizes.xl, fontFamily: typography.fonts.heading,
      color: colors.primary.main, marginBottom: spacing.xl,
    },
    summaryCard: { marginBottom: spacing.xl },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
    label: {
      marginLeft: spacing.sm, fontSize: typography.sizes.md,
      fontFamily: typography.fonts.body, color: colors.text.secondary, width: 70,
    },
    value: {
      fontSize: typography.sizes.sm, fontFamily: typography.fonts.subheading,
      color: colors.text.primary, flex: 1,
    },
    totalRow: {
      marginTop: spacing.lg, paddingTop: spacing.md,
      borderTopWidth: 1, borderTopColor: colors.border.light,
      justifyContent: 'space-between',
    },
    totalLabel: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading, color: colors.text.primary },
    totalValue: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading, color: colors.secondary.main },
    editLink: {
      color: colors.primary.main, fontSize: typography.sizes.xs,
      fontFamily: typography.fonts.subheading, marginLeft: spacing.sm,
    },
    footer: { marginTop: 'auto' },
  });
}
