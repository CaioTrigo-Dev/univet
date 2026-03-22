import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';

export const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, informe seu e-mail.');
      return;
    }

    setLoading(true);
    try {
      // Simulação de envio de reset de senha
      setTimeout(() => {
        Alert.alert('Sucesso', 'E-mail de recuperação enviado!');
        navigation.goBack();
      }, 1500);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar e-mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
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

        <Button 
          title="Enviar E-mail" 
          loading={loading}
          onPress={handleReset} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  backButton: {
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
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
  form: {
    marginBottom: spacing.xl,
  },
});
