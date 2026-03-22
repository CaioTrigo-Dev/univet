import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useBooking } from '../../contexts/BookingContext';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

const SERVICES = [
  { id: '1', name: 'Consulta Clínica', price: 120 },
  { id: '2', name: 'Vacinação', price: 80 },
  { id: '3', name: 'Banho e Tosa', price: 95 },
  { id: '4', name: 'Cirurgia Geral', price: 500 },
];

/**
 * Agendamento Passo 2: Selecionar Serviço
 */
export const BookingStep2Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { setService } = useBooking();

  const handleSelectService = (id: string, price: number) => {
    setService(id, price);
    navigation.navigate('BookingStep3');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qual o serviço desejado?</Text>
      
      <FlatList
        data={SERVICES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectService(item.id, item.price)}>
            <Card style={styles.serviceCard}>
              <View style={styles.serviceInfo}>
                <View>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.servicePrice}>R$ {item.price.toFixed(2)}</Text>
                </View>
                <Icon name="PlusCircle" color={colors.secondary.main} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
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
  serviceCard: {
    marginBottom: spacing.md,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.subheading,
    color: colors.text.primary,
  },
  servicePrice: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.secondary.main,
    marginTop: 2,
  },
});
