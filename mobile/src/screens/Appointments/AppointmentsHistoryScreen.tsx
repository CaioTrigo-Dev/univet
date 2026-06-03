import React, { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { appointmentsService } from '../../services/appointments.service';
import { petsService } from '../../services/pets.service';
import { auth } from '../../firebase/config';

const parseDate = (date: any): Date => {
  if (!date) return new Date(0);
  if (typeof date === 'object' && date._seconds !== undefined) return new Date(date._seconds * 1000);
  return new Date(date);
};

const formatDate = (date: any): string => {
  const d = parseDate(date);
  if (isNaN(d.getTime())) return '—';
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const mins = d.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} às ${hours}:${mins}`;
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  pending:                { label: 'Pendente',             bg: '#F57F17', text: '#fff' },
  confirmed:              { label: 'Confirmado',           bg: '#1976D2', text: '#fff' },
  in_progress:            { label: 'Em andamento',         bg: '#7B1FA2', text: '#fff' },
  completed:              { label: 'Concluído',            bg: '#2E7D32', text: '#fff' },
  cancelled:              { label: 'Cancelado',            bg: '#C62828', text: '#fff' },
  cancellation_requested: { label: 'Avaliando cancelamento', bg: '#E65100', text: '#fff' },
};

export const AppointmentsHistoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors, insets.top), [colors, insets.top]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const load = async () => {
        setLoading(true);
        try {
          const token = await auth.currentUser?.getIdToken();
          if (!token || !active) return;
          const [appts, myPets] = await Promise.all([
            appointmentsService.listMine(token),
            petsService.listMine(token),
          ]);
          if (!active) return;
          const sorted = [...appts].sort(
            (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
          );
          setAppointments(sorted);
          setPets(myPets);
        } catch (e) {
          console.error(e);
        } finally {
          if (active) setLoading(false);
        }
      };
      load();
      return () => { active = false; };
    }, [])
  );

  const getPetName = (petId: string) => pets.find(p => p.id === petId)?.name || 'Pet';

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Agendamentos</Text>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AppointmentDetail', { appointment: item })}
          >
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>{parseDate(item.date).getDate().toString().padStart(2, '0')}</Text>
                  <Text style={styles.dateMonth}>
                    {['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'][parseDate(item.date).getMonth()]}
                  </Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.petName}>{getPetName(item.petId)}</Text>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
                <View style={styles.rightCol}>
                  {(() => {
                    const cfg = STATUS_CONFIG[item.status] ?? { label: item.status, bg: '#9E9E9E', text: '#fff' };
                    return (
                      <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
                        <Text style={[styles.statusText, { color: cfg.text }]}>{cfg.label}</Text>
                      </View>
                    );
                  })()}
                  <Icon name="ChevronRight" size={16} color={colors.text.disabled} />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="CalendarX" size={64} color={colors.text.disabled} />
            <Text style={styles.emptyTitle}>Sem agendamentos</Text>
            <Text style={styles.emptyText}>Seus agendamentos aparecerão aqui.</Text>
          </View>
        }
      />
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>, topInset: number) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    header: { padding: spacing.xl, paddingTop: topInset + spacing.md },
    title: { fontSize: typography.sizes.xxl, fontFamily: typography.fonts.heading, color: colors.primary.main },
    list: { padding: spacing.lg, paddingTop: 0 },
    card: { marginBottom: spacing.md },
    cardContent: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
    dateBox: {
      width: 50, height: 50, backgroundColor: colors.primary.main,
      borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    },
    dateDay: { color: '#fff', fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading },
    dateMonth: { color: '#fff', fontSize: 10, fontFamily: typography.fonts.subheading },
    info: { flex: 1 },
    petName: { fontSize: typography.sizes.md, fontFamily: typography.fonts.heading, color: colors.text.primary },
    date: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, color: colors.text.secondary, marginTop: 2 },
    rightCol: { alignItems: 'flex-end', gap: spacing.xs },
    statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 8 },
    statusText: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.heading },
    emptyContainer: { alignItems: 'center', marginTop: 80, gap: spacing.md },
    emptyTitle: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading, color: colors.text.primary },
    emptyText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, textAlign: 'center' },
  });
}
