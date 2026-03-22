import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

/**
 * Tela de Detalhes do Pet
 * Exibe o histórico médico e carteira de vacinação do animal.
 */
export const PetDetailScreen: React.FC<{ route: { params: { pet: any } } }> = ({ route }) => {
  const { pet } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.photoPlaceholder}>
          <Icon name="PawPrint" size={50} color={colors.primary.main} />
        </View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.breed}>{pet.breed} · {pet.gender === 'M' ? 'Macho' : 'Fêmea'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histórico Médico</Text>
        <Card style={styles.recordCard}>
          <View style={styles.recordItem}>
            <View style={styles.dateCircle}>
              <Text style={styles.dateText}>10</Text>
              <Text style={styles.monthText}>JUL</Text>
            </View>
            <View style={styles.recordInfo}>
              <Text style={styles.recordTitle}>Consulta de Rotina</Text>
              <Text style={styles.recordDesc}>Dr. Ricardo · Clínico Geral</Text>
            </View>
            <Icon name="ChevronRight" color={colors.text.secondary} />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vacinas (Carteirinha)</Text>
        <Card style={styles.vaccineCard}>
          <View style={styles.vaccineItem}>
            <View style={styles.vaccineIcon}>
              <Icon name="ShieldCheck" color={colors.primary.main} />
            </View>
            <View style={styles.vaccineInfo}>
              <Text style={styles.vaccineName}>V10 (Polivalente)</Text>
              <Text style={styles.vaccineDate}>Aplicada em 01/03/2026</Text>
            </View>
            <Text style={styles.vaccineStatus}>OK</Text>
          </View>

          <View style={styles.vaccineItem}>
            <View style={[styles.vaccineIcon, { backgroundColor: '#FFEBEE' }]}>
              <Icon name="AlertCircle" color="#F44336" />
            </View>
            <View style={styles.vaccineInfo}>
              <Text style={styles.vaccineName}>Raiva</Text>
              <Text style={[styles.vaccineDate, { color: '#F44336' }]}>Vencimento em 15/04/2026</Text>
            </View>
            <TouchableOpacity style={styles.renewBtn}>
              <Text style={styles.renewText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 24,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  breed: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  recordCard: {
    padding: 0,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  dateCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary.main,
  },
  monthText: {
    fontSize: 10,
    color: colors.primary.main,
  },
  recordInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  recordTitle: {
    fontSize: 16,
    fontFamily: typography.fonts.subheading,
    color: colors.text.primary,
  },
  recordDesc: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  vaccineCard: {
    padding: 0,
  },
  vaccineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  vaccineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaccineInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  vaccineName: {
    fontSize: 16,
    fontFamily: typography.fonts.subheading,
    color: colors.text.primary,
  },
  vaccineDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  vaccineStatus: {
    color: colors.primary.main,
    fontWeight: 'bold',
  },
  renewBtn: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  renewText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
