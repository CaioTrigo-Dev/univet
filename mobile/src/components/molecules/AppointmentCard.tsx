import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../organisms/Card';
import { Icon } from '../atoms/Icon';
import { Appointment } from '@univet/shared';
import { typography } from '../../tokens/typography';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const dateObj = new Date(appointment.date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  
  const monthNames = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const month = monthNames[dateObj.getMonth()];

  return (
    <Card padding="md">
      <View style={styles.appointmentContent}>
        <View style={styles.dateBox}>
          <Text style={styles.dateDay} testID="apt-day">{day}</Text>
          <Text style={styles.dateMonth} testID="apt-month">{month}</Text>
        </View>
        <View style={styles.appointmentInfo}>
          <Text style={styles.appointmentTitle} testID="apt-title">Consulta de Rotina</Text>
          <Text style={styles.appointmentPet} testID="apt-pet">Pet: {appointment.petId}</Text>
          <Text style={styles.appointmentVet} testID="apt-vet">Vet: {appointment.vetId}</Text>
        </View>
        <Icon name="ChevronRight" color={colors.text.secondary} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary.main,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  dateDay: {
    color: '#fff',
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
  },
  dateMonth: {
    color: '#fff',
    fontSize: 10,
    fontFamily: typography.fonts.subheading,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  appointmentPet: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  appointmentVet: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.subheading,
    color: colors.primary.main,
  },
});
