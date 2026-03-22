import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Card } from '../../components/organisms/Card';

const MOCK_APPOINTMENTS = [
  {
    id: '1',
    petName: 'Rex',
    serviceName: 'Consulta de Rotina',
    date: '15 Out 2026 - 14:30',
    status: 'scheduled',
  },
  {
    id: '2',
    petName: 'Bolinha',
    serviceName: 'Vacinação V10',
    date: '10 Out 2026 - 09:00',
    status: 'completed',
  },
];

export const AppointmentsHistoryScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Agendamentos</Text>
      </View>

      <FlashList
        data={MOCK_APPOINTMENTS}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.petName}>{item.petName}</Text>
                <Text style={styles.serviceName}>{item.serviceName}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                item.status === 'completed' ? styles.statusCompleted : styles.statusScheduled
              ]}>
                <Text style={styles.statusText}>
                  {item.status === 'completed' ? 'Concluído' : 'Agendado'}
                </Text>
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
  },
  list: {
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  serviceName: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  date: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.primary.main,
    marginTop: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  statusScheduled: {
    backgroundColor: colors.primary.light,
  },
  statusCompleted: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.secondary,
    fontFamily: typography.fonts.body,
  },
});
