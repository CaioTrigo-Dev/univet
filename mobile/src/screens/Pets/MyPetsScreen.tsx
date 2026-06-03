import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { usePets } from '../../hooks/usePets';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { Button } from '../../components/atoms/Button';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const MyPetsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { pets, loading, fetchPets } = usePets();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchPets);
    return unsubscribe;
  }, [navigation, fetchPets]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Pets</Text>
        <Button
          title="Adicionar"
          variant="outline"
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEditPet')}
        />
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="PawPrint" size={64} color={colors.text.disabled} />
            <Text style={styles.emptyText}>Nenhum pet cadastrado ainda.</Text>
            <Button title="Cadastrar Primeiro Pet" onPress={() => navigation.navigate('AddEditPet')} />
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PetDetail', { pet: item })}>
            <Card style={styles.petCard}>
              <View style={styles.petInfo}>
                <View style={styles.petIcon}>
                  <Icon name={item.species === 'cat' ? 'Cat' : 'Dog'} size={32} color={colors.primary.main} />
                </View>
                <View style={styles.petDetails}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petBreed}>{item.species} • {item.breed}</Text>
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
    container: { flex: 1, backgroundColor: colors.background.default },
    header: { padding: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    title: { fontSize: typography.sizes.xxl, fontFamily: typography.fonts.heading, color: colors.primary.main },
    addButton: { minHeight: 40, paddingVertical: spacing.sm },
    listContent: { padding: spacing.md },
    petCard: { marginBottom: spacing.md },
    petInfo: { flexDirection: 'row', alignItems: 'center' },
    petIcon: {
      width: 56, height: 56, borderRadius: 28,
      backgroundColor: colors.primary.light,
      alignItems: 'center', justifyContent: 'center',
      marginRight: spacing.md,
    },
    petDetails: { flex: 1 },
    petName: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.subheading, color: colors.text.primary },
    petBreed: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, color: colors.text.secondary },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100, gap: spacing.md },
    emptyText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, textAlign: 'center' },
  });
}
