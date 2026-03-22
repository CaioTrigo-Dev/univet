import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { usePets } from '../../hooks/usePets';
import { useBooking } from '../../contexts/BookingContext';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { Skeleton } from '../../components/atoms/Skeleton';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

/**
 * Agendamento Passo 1: Selecionar Pet
 */
export const BookingStep1Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { pets, loading } = usePets();
  const { setPet } = useBooking();

  const handleSelectPet = (pet: any) => {
    setPet(pet);
    navigation.navigate('BookingStep2');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Para quem é a consulta?</Text>
      
      {loading ? (
        <View>
          <Skeleton height={80} style={{ marginBottom: spacing.md }} />
          <Skeleton height={80} style={{ marginBottom: spacing.md }} />
          <Skeleton height={80} />
        </View>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPet(item)}>
              <Card style={styles.petCard}>
                <View style={styles.petInfo}>
                  <Icon name="Dog" size={32} />
                  <Text style={styles.petName}>{item.name}</Text>
                  <Icon name="ChevronRight" color={colors.text.disabled} />
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
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
  petCard: {
    marginBottom: spacing.md,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  petName: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.subheading,
  },
});
