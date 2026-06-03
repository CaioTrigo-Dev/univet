import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const BookingStep5Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.animationContainer}>
          <Text style={styles.emoji}>✅</Text>
          <Text style={styles.celebration}>Tudo certo!</Text>
        </View>

        <Text style={styles.title}>Consulta Agendada!</Text>
        <Text style={styles.description}>
          Enviamos os detalhes para o seu e-mail e você pode acompanhar pelo menu de agendamentos.
        </Text>
      </View>

      <Button
        title="Voltar para o Início"
        onPress={() => navigation.getParent()?.navigate('HomeMain')}
        style={styles.button}
      />
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.paper, padding: spacing.xl },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    animationContainer: { alignItems: 'center', marginBottom: spacing.xxl },
    emoji: { fontSize: 80 },
    celebration: {
      fontSize: typography.sizes.xl, fontFamily: typography.fonts.heading,
      color: colors.primary.main, marginTop: spacing.md,
    },
    title: {
      fontSize: typography.sizes.xxl, fontFamily: typography.fonts.heading,
      color: colors.text.primary, textAlign: 'center',
    },
    description: {
      fontSize: typography.sizes.md, fontFamily: typography.fonts.body,
      color: colors.text.secondary, textAlign: 'center',
      marginTop: spacing.md, paddingHorizontal: spacing.xl,
    },
    button: { marginBottom: spacing.md },
  });
}
