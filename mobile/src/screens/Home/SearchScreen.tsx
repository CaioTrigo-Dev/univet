import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

const MOCK_SERVICES = [
  { id: '1', name: 'Consulta Clínica', price: 150, category: 'Saúde' },
  { id: '2', name: 'Vacinação', price: 80, category: 'Prevenção' },
  { id: '3', name: 'Banho e Tosa', price: 120, category: 'Estética' },
  { id: '4', name: 'Cirurgia Geral', price: 1500, category: 'Complexo' },
];

/**
 * Tela de Busca
 * Permite filtrar serviços e veterinários.
 */
export const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MOCK_SERVICES);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = MOCK_SERVICES.filter(s => 
      s.name.toLowerCase().includes(text.toLowerCase()) || 
      s.category.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Icon name="Search" size={20} color={colors.text.secondary} />
          <TextInput 
            style={styles.searchInput}
            placeholder="O que você está procurando?"
            value={query}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList 
        data={results}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
              </View>
              <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  searchHeader: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.primary,
  },
  list: {
    padding: spacing.lg,
  },
  itemCard: {
    marginBottom: spacing.md,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  itemCategory: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  itemPrice: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.secondary.main,
  },
  empty: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  emptyText: {
    color: colors.text.secondary,
    fontFamily: typography.fonts.body,
  },
});
