import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { authService } from '../../services/auth.service';
import { useToast } from '../../contexts/ToastContext';

/**
 * Tela de Cadastro
 * Permite que novos tutores criem uma conta.
 */
export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validações do PDF/Checklist
    if (name.length < 10 || name.length > 60) {
      showToast('O nome deve ter entre 10 e 60 caracteres.', 'error');
      return;
    }

    if (!email.includes('@')) {
      showToast('Informe um e-mail válido.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('A senha deve ter pelo menos 6 caracteres.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('As senhas não coincidem.', 'error');
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        name,
        email,
        phone,
        password,
      });

      showToast('Conta criada com sucesso! Faça login para continuar.', 'success');
      navigation.navigate('Login');
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Junte-se à nossa comunidade pet.</Text>
        </View>

        <View style={styles.form}>
          <Input 
            label="Nome Completo" 
            placeholder="Ex: João Silva" 
            value={name}
            onChangeText={setName}
            leftIcon={<Icon name="User" size={18} color={colors.text.secondary} />}
          />

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
            label="Telefone (opcional)" 
            placeholder="(21) 99999-9999" 
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            leftIcon={<Icon name="Phone" size={18} color={colors.text.secondary} />}
          />

          <Input 
            label="Senha" 
            placeholder="Mínimo 6 caracteres" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            leftIcon={<Icon name="Lock" size={18} color={colors.text.secondary} />}
          />

          <Input 
            label="Confirmar Senha" 
            placeholder="Repita sua senha" 
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon={<Icon name="CheckCircle" size={18} color={colors.text.secondary} />}
          />
        </View>

        <Button 
          title="Cadastrar" 
          loading={loading}
          onPress={handleRegister}
          style={styles.registerButton}
          accessibilityLabel="Botão para criar nova conta"
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginText}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  form: {
    marginBottom: spacing.lg,
  },
  registerButton: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  footerText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  loginText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.subheading,
    color: colors.primary.main,
    marginLeft: spacing.xs,
  },
});
