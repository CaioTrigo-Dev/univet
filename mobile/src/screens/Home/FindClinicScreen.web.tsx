import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useColors } from '../../contexts/ThemeContext';
import { Icon } from '../../components/atoms/Icon';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

const CLINICS = [
  { id: '1', name: 'UniVet Matriz', address: 'Rua Principal, 100 — Centro', phone: '(21) 3333-4444', mapsUrl: 'https://www.google.com/maps/search/UniVet+Matriz' },
  { id: '2', name: 'UniVet Barra', address: 'Av. das Américas, 2000 — Barra da Tijuca', phone: '(21) 3333-5555', mapsUrl: 'https://www.google.com/maps/search/UniVet+Barra' },
  { id: '3', name: 'UniVet Norte', address: 'Estrada do Recreio, 500 — Recreio', phone: '(21) 3333-6666', mapsUrl: 'https://www.google.com/maps/search/UniVet+Norte' },
];

export const FindClinicScreen: React.FC<{ navigation: any }> = () => {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.header, { backgroundColor: colors.primary.main }]}>
        <Icon name="MapPin" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Nossas Unidades</Text>
      </View>

      {CLINICS.map(clinic => (
        <View key={clinic.id} style={[styles.card, { backgroundColor: colors.background.paper, borderColor: colors.border.light }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary.light }]}>
              <Icon name="MapPin" size={20} color={colors.primary.main} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.clinicName, { color: colors.text.primary }]}>{clinic.name}</Text>
              <Text style={[styles.clinicAddress, { color: colors.text.secondary }]}>{clinic.address}</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.primary.main }]}
              onPress={() => Linking.openURL(clinic.mapsUrl)}
            >
              <Icon name="Map" size={14} color="#fff" />
              <Text style={styles.btnText}>Ver no Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#388E3C' }]}
              onPress={() => Linking.openURL(`tel:${clinic.phone.replace(/\D/g, '')}`)}
            >
              <Icon name="Phone" size={14} color="#fff" />
              <Text style={styles.btnText}>{clinic.phone}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.xl, paddingTop: spacing.xxl },
  headerTitle: { fontSize: typography.sizes.xl, fontFamily: typography.fonts.heading, color: '#fff' },
  card: { margin: spacing.md, marginTop: 0, marginBottom: spacing.md, borderRadius: 12, borderWidth: 1, padding: spacing.lg },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md },
  iconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  clinicName: { fontSize: typography.sizes.md, fontFamily: typography.fonts.heading },
  clinicAddress: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, marginTop: 2 },
  actions: { flexDirection: 'row', gap: spacing.sm },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 8 },
  btnText: { color: '#fff', fontFamily: typography.fonts.subheading, fontSize: typography.sizes.sm },
});
