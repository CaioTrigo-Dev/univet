import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { usePets } from '../../hooks/usePets';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { Button } from '../../components/atoms/Button';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

/**
 * Tela: Meus Pets
 * Exibe a listagem de animais do tutor.
 */
export const MyPetsScreen: React.FC = () => {
  const { pets, loading, fetchPets } = usePets();

  useEffect(() => {
    // Simulação de token para demonstração
    fetchPets('demo-token');
  }, [fetchPets]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Meus Pets</Text>
        <Button 
          title="Adicionar" 
          variant="outline" 
          style={styles.addButton}
          onPress={() => {}} 
        />
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="PawPrint" size={64} color={colors.text.hint} />
            <Text style={styles.emptyText}>Nenhum pet cadastrado ainda.</Text>
            <Button title="Cadastrar Primeiro Pet" onPress={() => {}} />
          </View>
        )}
        renderItem={({ item }) => (
          <Card style={styles.petCard}>
            <View style={styles.petInfo}>
              <View style={styles.petIcon}>
                <Icon name="Dog" size={32} />
              </View>
              <View style={styles.petDetails}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petBreed}>{item.species} • {item.breed}</Text>
              </View>
              <Icon name="ChevronRight" color={colors.text.hint} />
            </View>
          </Card>
        )}
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
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
  },
  addButton: {
    minHeight: 40,
    paddingVertical: spacing.sm,
  },
  listContent: {
    padding: spacing.md,
  },
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    marginVertical: spacing.lg,
    textAlign: 'center',
  },
});
