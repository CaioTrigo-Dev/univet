import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showToast } = useToast();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (name.length < 3) { showToast('Informe seu nome completo.', 'error'); return; }
    if (!email.includes('@')) { showToast('Informe um e-mail válido.', 'error'); return; }
    if (password.length < 6) { showToast('A senha deve ter pelo menos 6 caracteres.', 'error'); return; }
    if (password !== confirmPassword) { showToast('As senhas não coincidem.', 'error'); return; }

    setLoading(true);
    try {
      await signUp(email, password, name);
      await authService.register({ name, email, phone, password });
      showToast('Conta criada com sucesso!', 'success');
    } catch (error: any) {
      const code = error?.code || '';
      const msgs: Record<string, string> = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado. Tente fazer login.',
        'auth/invalid-email': 'E-mail inválido. Verifique e tente novamente.',
        'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
        'auth/network-request-failed': 'Sem conexão com a internet. Tente novamente.',
        'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
      };
      showToast(msgs[code] || 'Erro ao criar conta. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background.default }}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Junte-se à nossa comunidade pet.</Text>
        </View>

        <View style={styles.form}>
          <Input label="Nome Completo" placeholder="Ex: João Silva" value={name} onChangeText={setName}
            leftIcon={<Icon name="User" size={18} color={colors.text.secondary} />} />
          <Input label="E-mail" placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none"
            value={email} onChangeText={setEmail} leftIcon={<Icon name="Mail" size={18} color={colors.text.secondary} />} />
          <Input label="Telefone (opcional)" placeholder="(21) 99999-9999" keyboardType="phone-pad"
            value={phone} onChangeText={setPhone} leftIcon={<Icon name="Phone" size={18} color={colors.text.secondary} />} />
          <Input label="Senha" placeholder="Mínimo 6 caracteres" secureTextEntry value={password} onChangeText={setPassword}
            leftIcon={<Icon name="Lock" size={18} color={colors.text.secondary} />} />
          <Input label="Confirmar Senha" placeholder="Repita sua senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}
            leftIcon={<Icon name="CheckCircle" size={18} color={colors.text.secondary} />} />
        </View>

        <Button title="Cadastrar" loading={loading} onPress={handleRegister} style={styles.registerButton} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    content: { padding: spacing.xl, paddingBottom: spacing.xxl },
    header: { marginBottom: spacing.xl, marginTop: spacing.lg },
    title: { fontSize: typography.sizes.xxl, fontFamily: typography.fonts.heading, color: colors.primary.main },
    subtitle: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, marginTop: spacing.xs },
    form: { marginBottom: spacing.lg },
    registerButton: { marginTop: spacing.md },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xxl, marginBottom: spacing.lg },
    footerText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary },
    loginText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.primary.main, marginLeft: spacing.xs },
  });
}
