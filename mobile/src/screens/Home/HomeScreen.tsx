import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

/**
 * Tela Inicial (Dashboard)
 * Ponto central para o tutor visualizar seus pets e agendamentos.
 */
export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Tutor'}! 🐾</Text>
          <Text style={styles.subtitle}>Como estão seus amiguinhos hoje?</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Icon name="Bell" color={colors.primary.main} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Pets</Text>
          <Text style={styles.statValue}>3</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Agendamentos</Text>
          <Text style={styles.statValue}>1</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        </View>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => navigation.navigate('BookingStack')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Icon name="Calendar" color="#1976D2" />
            </View>
            <Text style={styles.actionLabel}>Agendar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => navigation.navigate('PetsTab')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F1F8E9' }]}>
              <Icon name="PlusCircle" color="#388E3C" />
            </View>
            <Text style={styles.actionLabel}>Novo Pet</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => navigation.navigate('FindClinic')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Icon name="MapPin" color="#F57C00" />
            </View>
            <Text style={styles.actionLabel}>Unidades</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximo Agendamento</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        
        <Card padding="md">
          <View style={styles.appointmentContent}>
            <View style={styles.dateBox}>
              <Text style={styles.dateDay}>25</Text>
              <Text style={styles.dateMonth}>MAR</Text>
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentTitle}>Consulta de Rotina</Text>
              <Text style={styles.appointmentPet}>Pipoca (Cachorro)</Text>
              <Text style={styles.appointmentVet}>Dra. Ana Silva</Text>
            </View>
            <Icon name="ChevronRight" color={colors.text.secondary} />
          </View>
        </Card>
      </View>

      <View style={[styles.section, { marginBottom: spacing.xl }]}>
        <Text style={styles.sectionTitle}>Dicas de Saúde</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsList}>
          <Card style={styles.tipCard}>
            <Icon name="Droplets" color={colors.primary.main} />
            <Text style={styles.tipText}>A importância da hidratação no verão.</Text>
          </Card>
          <Card style={styles.tipCard}>
            <Icon name="Activity" color={colors.secondary.main} />
            <Text style={styles.tipText}>Sinais de alerta: Quando ir ao vet?</Text>
          </Card>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  greeting: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 0.48,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  statValue: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  seeAll: {
    color: colors.primary.main,
    fontFamily: typography.fonts.subheading,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  actionLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.subheading,
    color: colors.text.secondary,
  },
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
  tipsList: {
    marginTop: spacing.md,
  },
  tipCard: {
    width: 200,
    marginRight: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.primary,
  },
});
