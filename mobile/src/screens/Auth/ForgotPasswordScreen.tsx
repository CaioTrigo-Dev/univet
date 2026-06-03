import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useColors } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';

export const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      showToast('Por favor, informe seu e-mail.', 'error');
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        showToast('E-mail de recuperação enviado!', 'success');
        navigation.goBack();
      }, 1500);
    } catch (error) {
      showToast('Falha ao enviar e-mail.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="ChevronLeft" size={24} color={colors.primary.main} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.description}>
          Informe seu e-mail cadastrado para receber as instruções de recuperação.
        </Text>

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Button title="Enviar E-mail" loading={loading} onPress={handleReset} />
      </View>
    </KeyboardAvoidingView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    backButton: { padding: spacing.lg },
    content: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.xl },
    title: {
      fontSize: typography.sizes.xxl,
      fontFamily: typography.fonts.heading,
      color: colors.primary.main,
      marginBottom: spacing.md,
    },
    description: {
      fontSize: typography.sizes.md,
      fontFamily: typography.fonts.body,
      color: colors.text.secondary,
      lineHeight: 24,
      marginBottom: spacing.xxl,
    },
    form: { marginBottom: spacing.xl },
  });
}
