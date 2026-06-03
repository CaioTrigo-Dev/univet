import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useBooking } from '../../contexts/BookingContext';
import { Card } from '../../components/organisms/Card';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

const VETS = [
  { id: '1', name: 'Dra. Ana Silva',   specialization: 'Clínica Geral', rating: 4.9, reviews: 128 },
  { id: '2', name: 'Dr. Marcos Souza', specialization: 'Cirurgia',      rating: 4.7, reviews: 84  },
  { id: '3', name: 'Dra. Carla Lima',  specialization: 'Dermatologia',  rating: 4.8, reviews: 61  },
];

const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const DAY_ABBR = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_ABBR = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

const generateDays = (): Date[] => {
  const days: Date[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 1; i <= 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push(d);
  }
  return days;
};

// Simula horários ocupados de forma determinística (sem backend)
const isSlotTaken = (vetId: string, date: Date, slot: string): boolean => {
  const seed = (parseInt(vetId) * 7) + date.getDate() + parseInt(slot.replace(':', ''));
  return seed % 3 === 0;
};

const DAYS = generateDays();

export const BookingStep3Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { setVetAndTime } = useBooking();

  const [selectedVet, setSelectedVet]   = useState<string | null>(null);
  const [selectedDay, setSelectedDay]   = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const canContinue = !!selectedVet && !!selectedDay && !!selectedSlot;

  const handleSelectVet = (vetId: string) => {
    setSelectedVet(vetId);
    setSelectedSlot(null); // reset slot ao trocar vet
  };

  const handleSelectDay = (day: Date) => {
    setSelectedDay(day);
    setSelectedSlot(null); // reset slot ao trocar dia
  };

  const handleFinish = () => {
    if (!canContinue) return;
    const vet = VETS.find(v => v.id === selectedVet);
    const [hours, mins] = selectedSlot!.split(':').map(Number);
    const dateTime = new Date(selectedDay!);
    dateTime.setHours(hours, mins, 0, 0);
    setVetAndTime(selectedVet!, dateTime, vet?.name ?? '');
    navigation.navigate('BookingStep4');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Veterinários ── */}
        <Text style={styles.sectionTitle}>Com quem deseja agendar?</Text>
        {VETS.map(vet => {
          const isSelected = selectedVet === vet.id;
          return (
            <TouchableOpacity key={vet.id} onPress={() => handleSelectVet(vet.id)} activeOpacity={0.8}>
              <Card style={[styles.vetCard, isSelected && styles.vetCardSelected]}>
                <View style={styles.vetRow}>
                  <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
                    <Icon name="User" size={22} color={isSelected ? '#fff' : colors.primary.main} />
                  </View>
                  <View style={styles.vetInfo}>
                    <Text style={[styles.vetName, isSelected && styles.vetNameSelected]}>{vet.name}</Text>
                    <Text style={styles.vetSpec}>{vet.specialization}</Text>
                    <View style={styles.ratingRow}>
                      <Icon name="Star" size={12} color="#F9A825" />
                      <Text style={styles.ratingText}>{vet.rating}  •  {vet.reviews} avaliações</Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Icon name="Check" size={14} color="#fff" />
                    </View>
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}

        {/* ── Datas ── */}
        {selectedVet && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Selecione a data</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysRow}>
              {DAYS.map((day, i) => {
                const isSelected = selectedDay?.toDateString() === day.toDateString();
                const isSunday = day.getDay() === 0;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => !isSunday && handleSelectDay(day)}
                    style={[styles.dayChip, isSelected && styles.dayChipSelected, isSunday && styles.dayChipDisabled]}
                    activeOpacity={isSunday ? 1 : 0.8}
                  >
                    <Text style={[styles.dayAbbr, isSelected && styles.dayTextSelected, isSunday && styles.dayTextDisabled]}>
                      {DAY_ABBR[day.getDay()]}
                    </Text>
                    <Text style={[styles.dayNumber, isSelected && styles.dayTextSelected, isSunday && styles.dayTextDisabled]}>
                      {day.getDate()}
                    </Text>
                    <Text style={[styles.dayMonth, isSelected && styles.dayTextSelected, isSunday && styles.dayTextDisabled]}>
                      {MONTH_ABBR[day.getMonth()]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}

        {/* ── Horários ── */}
        {selectedVet && selectedDay && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Horários disponíveis</Text>
            <View style={styles.slotsGrid}>
              {TIME_SLOTS.map(slot => {
                const taken    = isSlotTaken(selectedVet, selectedDay, slot);
                const isSelected = selectedSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    disabled={taken}
                    onPress={() => setSelectedSlot(slot)}
                    style={[
                      styles.slotBtn,
                      isSelected && styles.slotBtnSelected,
                      taken && styles.slotBtnTaken,
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.slotText,
                      isSelected && styles.slotTextSelected,
                      taken && styles.slotTextTaken,
                    ]}>
                      {slot}
                    </Text>
                    {taken && <Text style={styles.takenLabel}>Ocupado</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* espaço para o botão não cobrir conteúdo */}
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continuar para Resumo"
          disabled={!canContinue}
          onPress={handleFinish}
        />
      </View>
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    scroll: { padding: spacing.lg },
    sectionTitle: {
      fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading,
      color: colors.primary.main, marginBottom: spacing.md,
    },

    // Vet cards
    vetCard: { marginBottom: spacing.md, borderWidth: 2, borderColor: 'transparent' },
    vetCardSelected: { borderColor: colors.primary.main },
    vetRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: {
      width: 50, height: 50, borderRadius: 25,
      backgroundColor: colors.primary.light,
      alignItems: 'center', justifyContent: 'center', marginRight: spacing.md, flexShrink: 0,
    },
    avatarSelected: { backgroundColor: colors.primary.main },
    vetInfo: { flex: 1 },
    vetName: { fontSize: typography.sizes.md, fontFamily: typography.fonts.heading, color: colors.text.primary },
    vetNameSelected: { color: colors.primary.main },
    vetSpec: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, color: colors.text.secondary, marginTop: 2 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
    ratingText: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, color: colors.text.secondary },
    checkBadge: {
      width: 26, height: 26, borderRadius: 13,
      backgroundColor: colors.primary.main,
      alignItems: 'center', justifyContent: 'center',
    },

    // Dia strip
    daysRow: { flexDirection: 'row' },
    dayChip: {
      alignItems: 'center', justifyContent: 'center',
      paddingVertical: spacing.md, paddingHorizontal: spacing.md,
      borderRadius: 14, marginRight: spacing.sm,
      backgroundColor: colors.background.paper,
      borderWidth: 2, borderColor: 'transparent',
      minWidth: 58,
    },
    dayChipSelected: { backgroundColor: colors.primary.main, borderColor: colors.primary.main },
    dayChipDisabled: { backgroundColor: colors.background.paper, opacity: 0.4 },
    dayAbbr: { fontSize: 11, fontFamily: typography.fonts.subheading, color: colors.text.secondary },
    dayNumber: { fontSize: typography.sizes.xl, fontFamily: typography.fonts.heading, color: colors.text.primary, lineHeight: 28 },
    dayMonth: { fontSize: 10, fontFamily: typography.fonts.body, color: colors.text.secondary },
    dayTextSelected: { color: '#fff' },
    dayTextDisabled: { color: colors.text.disabled },

    // Slots
    slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    slotBtn: {
      width: '22%', alignItems: 'center', justifyContent: 'center',
      paddingVertical: spacing.md, borderRadius: 12,
      backgroundColor: colors.background.paper,
      borderWidth: 2, borderColor: 'transparent',
    },
    slotBtnSelected: { backgroundColor: colors.primary.main, borderColor: colors.primary.main },
    slotBtnTaken: { backgroundColor: colors.background.default, opacity: 0.5 },
    slotText: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.subheading, color: colors.text.primary },
    slotTextSelected: { color: '#fff' },
    slotTextTaken: { color: colors.text.disabled },
    takenLabel: { fontSize: 9, fontFamily: typography.fonts.body, color: colors.text.disabled, marginTop: 2 },

    // Footer
    footer: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: spacing.lg, paddingBottom: spacing.xl,
      backgroundColor: colors.background.default,
      borderTopWidth: 1, borderTopColor: colors.border.light,
    },
  });
}
