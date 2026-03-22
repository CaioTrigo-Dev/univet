import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from '../../components/atoms/Button';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { colors } from '../../tokens/colors';

/**
 * Agendamento Passo 5: Sucesso
 * Exibido após a confirmação do agendamento.
 */
export const BookingStep5Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.animationContainer}>
          {/* Usando placeholder do Lottie - No real, importaria o .json */}
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
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  emoji: {
    fontSize: 80,
  },
  celebration: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
    marginTop: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  button: {
    marginBottom: spacing.md,
  },
});
