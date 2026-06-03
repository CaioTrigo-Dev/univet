import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) { showToast('Preencha todos os campos.', 'error'); return; }
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Icon name="PawPrint" size={64} color={colors.primary.main} />
          <Text style={styles.title}>UniVet</Text>
          <Text style={styles.subtitle}>Cuidado com carinho para o seu pet.</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            leftIcon={<Icon name="Mail" size={18} color={colors.text.secondary} />}
          />
          <Input
            label="Senha"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            leftIcon={<Icon name="Lock" size={18} color={colors.text.secondary} />}
          />
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <Button title="Entrar" loading={loading} onPress={handleLogin} style={styles.loginButton} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    content: { flexGrow: 1, padding: spacing.xl, justifyContent: 'center' },
    header: { alignItems: 'center', marginBottom: spacing.xxl },
    title: { fontSize: typography.sizes.h1, fontFamily: typography.fonts.heading, color: colors.primary.main, marginTop: spacing.md },
    subtitle: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, textAlign: 'center', marginTop: spacing.xs },
    form: { marginBottom: spacing.lg },
    forgotPassword: { alignSelf: 'flex-end', marginTop: -spacing.sm },
    forgotPasswordText: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.subheading, color: colors.primary.main },
    loginButton: { marginTop: spacing.md },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xxl },
    footerText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary },
    registerText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.secondary.main, marginLeft: spacing.xs },
  });
}
