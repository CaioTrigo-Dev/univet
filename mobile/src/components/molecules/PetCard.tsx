import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../organisms/Card';
import { Icon } from '../atoms/Icon';
import { Pet } from '@univet/shared';
import { typography } from '../../tokens/typography';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

interface PetCardProps {
  pet: Pet;
  onPress?: () => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onPress }) => (
  // O componente Card atualmente não tem onPress nativo, mas a estrutura visual está isolada.
  <Card style={styles.petCard} padding="md">
    <View style={styles.petInfo}>
      <View style={styles.petIcon}>
        <Icon name={pet.species === 'cat' ? 'Cat' : 'Dog'} size={32} />
      </View>
      <View style={styles.petDetails}>
        <Text style={styles.petName} testID="pet-name">{pet.name}</Text>
        <Text style={styles.petBreed} testID="pet-breed">{pet.species} • {pet.breed}</Text>
      </View>
      <Icon name="ChevronRight" color={colors.text.secondary} />
    </View>
  </Card>
);

const styles = StyleSheet.create({
  petCard: {
    marginBottom: spacing.md,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E7F5EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.subheading,
    color: colors.text.primary,
  },
  petBreed: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
});
