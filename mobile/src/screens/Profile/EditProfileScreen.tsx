import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/molecules/Input';
import { Button } from '../../components/atoms/Button';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const EditProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name) {
      Alert.alert('Erro', 'O nome é obrigatório.');
      return;
    }

    setLoading(true);
    try {
      // Simulação de atualização de perfil
      setTimeout(() => {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.goBack();
      }, 1000);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar Perfil</Text>

        <View style={styles.form}>
          <Input 
            label="Nome Completo" 
            value={name} 
            onChangeText={setName} 
          />
          <Input 
            label="E-mail" 
            value={user?.email || ''} 
            editable={false} 
          />
          <Input 
            label="Telefone" 
            value={phone} 
            onChangeText={setPhone} 
            keyboardType="phone-pad"
          />
        </View>

        <Button 
          title="Salvar Alterações" 
          loading={loading}
          onPress={handleSave} 
          accessibilityLabel="Botão para salvar alterações de perfil"
        />
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
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
    marginBottom: spacing.xl,
  },
  form: {
    marginBottom: spacing.xxl,
  },
});
