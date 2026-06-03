import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme, useColors } from '../../contexts/ThemeContext';
import { useFontSize } from '../../contexts/FontSizeContext';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { Button } from '../../components/atoms/Button';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors, insets.top), [colors, insets.top]);
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { fontSizeLevel, setFontSizeLevel, getScale } = useFontSize();
  const scale = getScale();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Icon name="User" size={40} color={colors.primary.main} />
        </View>
        <Text style={[styles.name, { fontSize: 24 * scale }]}>{user?.name || 'Usuário UniVet'}</Text>
        <Text style={[styles.email, { fontSize: 16 * scale }]}>{user?.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontSize: 14 * scale }]}>Preferências</Text>
        <Card style={styles.menuCard}>
          <View style={styles.menuItem}>
            <Icon name="Moon" color={colors.text.secondary} />
            <Text style={[styles.menuText, { fontSize: 16 * scale }]}>Modo Escuro</Text>
            <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: '#767577', true: colors.primary.main }} />
          </View>
          <View style={styles.menuItem}>
            <Icon name="Type" color={colors.text.secondary} />
            <Text style={[styles.menuText, { fontSize: 16 * scale }]}>Tamanho da Fonte</Text>
            <View style={styles.fontSizeControls}>
              {(['small', 'medium', 'large'] as const).map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setFontSizeLevel(level)}
                  style={[styles.fontBtn, fontSizeLevel === level && { backgroundColor: colors.primary.main }]}
                >
                  <Text style={[styles.fontBtnText, fontSizeLevel === level && { color: '#FFF' }]}>
                    {level === 'small' ? 'P' : level === 'medium' ? 'M' : 'G'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { fontSize: 14 * scale }]}>Configurações</Text>
        <Card style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="Bell" color={colors.text.secondary} />
            <Text style={[styles.menuText, { fontSize: 16 * scale }]}>Notificações</Text>
            <Icon name="ChevronRight" color={colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="Shield" color={colors.text.secondary} />
            <Text style={[styles.menuText, { fontSize: 16 * scale }]}>Privacidade</Text>
            <Icon name="ChevronRight" color={colors.text.secondary} />
          </TouchableOpacity>
        </Card>
      </View>

      <Button title="Sair da Conta" variant="outline" onPress={handleSignOut} style={styles.signOutButton} />
      <Text style={styles.version}>Versão 1.0.0</Text>
    </ScrollView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>, topInset: number) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    header: { alignItems: 'center', padding: spacing.xl, paddingTop: topInset + spacing.md, backgroundColor: colors.background.paper, borderBottomWidth: 1, borderBottomColor: colors.border.main },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary.light, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
    name: { fontFamily: typography.fonts.heading, color: colors.text.primary },
    email: { fontFamily: typography.fonts.body, color: colors.text.secondary, marginBottom: spacing.md },
    editButton: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 20, borderWidth: 1, borderColor: colors.primary.main },
    editButtonText: { color: colors.primary.main, fontFamily: typography.fonts.subheading },
    section: { padding: spacing.lg },
    sectionTitle: { fontFamily: typography.fonts.heading, color: colors.text.secondary, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 1 },
    menuCard: { padding: 0 },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border.light },
    menuText: { flex: 1, marginLeft: spacing.md, fontFamily: typography.fonts.body, color: colors.text.primary },
    signOutButton: { margin: spacing.xl, borderColor: colors.secondary.main },
    version: { textAlign: 'center', color: colors.text.secondary, fontSize: typography.sizes.xs, marginBottom: spacing.xl },
    fontSizeControls: { flexDirection: 'row', gap: 8 },
    fontBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: colors.primary.main, justifyContent: 'center', alignItems: 'center' },
    fontBtnText: { fontSize: 12, fontWeight: 'bold', color: colors.primary.main },
  });
}
