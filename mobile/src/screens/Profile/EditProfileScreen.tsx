import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useColors } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const EditProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { user } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name) {
      showToast('O nome é obrigatório.', 'error');
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        showToast('Perfil atualizado com sucesso!', 'success');
        navigation.goBack();
      }, 1000);
    } catch (error) {
      showToast('Falha ao atualizar perfil.', 'error');
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
        <Text style={styles.title}>Editar Perfil</Text>

        <View style={styles.form}>
          <Input label="Nome Completo" value={name} onChangeText={setName} />
          <Input label="E-mail" value={user?.email || ''} editable={false} />
          <Input label="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>

        <Button
          title="Salvar Alterações"
          loading={loading}
          onPress={handleSave}
          accessibilityLabel="Botão para salvar alterações de perfil"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    content: { padding: spacing.xl },
    title: {
      fontSize: typography.sizes.xxl,
      fontFamily: typography.fonts.heading,
      color: colors.primary.main,
      marginBottom: spacing.xl,
    },
    form: { marginBottom: spacing.xxl },
  });
}
