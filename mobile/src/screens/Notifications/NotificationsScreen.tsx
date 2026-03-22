import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Icon } from '../../components/atoms/Icon';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Vacina Pendente 💉',
    description: 'A vacina V10 do Rex vence em 3 dias. Agende agora!',
    time: '2h atrás',
  },
  {
    id: '2',
    title: 'Consulta Confirmada ✅',
    description: 'Dr. Silva confirmou seu horário para amanhã às 14:30.',
    time: '5h atrás',
  },
];

export const NotificationsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
      </View>

      <FlashList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        estimatedItemSize={80}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Icon name="Bell" size={20} color={colors.primary.main} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
          </View>
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
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  itemDescription: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    marginTop: 2,
  },
  itemTime: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.body,
    color: colors.primary.main,
    marginTop: 4,
  },
});
