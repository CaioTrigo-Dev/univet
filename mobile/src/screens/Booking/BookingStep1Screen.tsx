import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { usePets } from '../../hooks/usePets';
import { useBooking } from '../../contexts/BookingContext';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { Skeleton } from '../../components/atoms/Skeleton';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const BookingStep1Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { pets, loading, fetchPets } = usePets();
  const { setPet, booking } = useBooking();

  useEffect(() => {
    const unsub = navigation.addListener('focus', fetchPets);
    return unsub;
  }, [navigation, fetchPets]);

  const handleSelectPet = (pet: any) => {
    setPet(pet);
    // Skip service selection if it was pre-selected (e.g. from ServiceDetailScreen)
    if (booking.serviceId) {
      navigation.navigate('BookingStep3');
    } else {
      navigation.navigate('BookingStep2');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Para quem é a consulta?</Text>
        <Skeleton height={80} style={{ marginBottom: spacing.md }} />
        <Skeleton height={80} style={{ marginBottom: spacing.md }} />
        <Skeleton height={80} />
      </View>
    );
  }

  if (!loading && pets.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Icon name="PawPrint" size={64} color={colors.text.disabled} />
        <Text style={styles.emptyTitle}>Nenhum pet cadastrado</Text>
        <Text style={styles.emptyText}>Cadastre um pet antes de agendar.</Text>
        <TouchableOpacity style={styles.addPetBtn} onPress={() => navigation.navigate('PetsTab')}>
          <Text style={styles.addPetText}>Ir para Meus Pets</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Para quem é a consulta?</Text>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectPet(item)}>
            <Card style={styles.petCard}>
              <View style={styles.petInfo}>
                <View style={styles.petIcon}>
                  <Icon name={item.species === 'cat' ? 'Cat' : 'Dog'} size={28} color={colors.primary.main} />
                </View>
                <View style={styles.petDetails}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petBreed}>{item.breed}</Text>
                </View>
                <Icon name="ChevronRight" color={colors.text.disabled} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
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
    petCard: { marginBottom: spacing.md },
    petInfo: { flexDirection: 'row', alignItems: 'center' },
    petIcon: {
      width: 48, height: 48, borderRadius: 24,
      backgroundColor: colors.primary.light,
      alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
    },
    petDetails: { flex: 1 },
    petName: {
      fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.text.primary,
    },
    petBreed: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, color: colors.text.secondary },
    emptyContainer: { justifyContent: 'center', alignItems: 'center', gap: spacing.md },
    emptyTitle: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading, color: colors.text.primary },
    emptyText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, textAlign: 'center' },
    addPetBtn: {
      marginTop: spacing.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
      borderRadius: 12, backgroundColor: colors.primary.main,
    },
    addPetText: { color: '#fff', fontFamily: typography.fonts.subheading, fontSize: typography.sizes.md },
  });
}
