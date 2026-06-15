import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Linking, ActivityIndicator, Platform,
} from 'react-native';
import * as Location from 'expo-location';
import { useColors } from '../../contexts/ThemeContext';
import { Icon } from '../../components/atoms/Icon';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

interface Clinic {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  hours: string;
  distance?: number;
}

const CLINICS: Clinic[] = [
  {
    id: '1', name: 'UniVet Matriz',
    lat: -22.9035, lng: -43.2096,
    address: 'Rua Principal, 100 – Tijuca',
    phone: '(21) 3333-1111',
    hours: 'Seg–Sex 8h–18h  |  Sáb 8h–13h',
  },
  {
    id: '2', name: 'UniVet Barra',
    lat: -23.0033, lng: -43.3496,
    address: 'Av. das Américas, 2000 – Barra da Tijuca',
    phone: '(21) 3333-2222',
    hours: 'Seg–Dom 8h–20h',
  },
  {
    id: '3', name: 'UniVet Botafogo',
    lat: -22.9519, lng: -43.1851,
    address: 'R. Voluntários da Pátria, 45 – Botafogo',
    phone: '(21) 3333-3333',
    hours: 'Seg–Sex 8h–18h',
  },
];

const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const formatDistance = (km: number): string =>
  km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

export const FindClinicScreen: React.FC = () => {
  const colors = useColors();
  const [clinics, setClinics] = useState<Clinic[]>(CLINICS);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
          const { latitude, longitude } = loc.coords;
          const withDistance = CLINICS.map(c => ({
            ...c,
            distance: getDistanceKm(latitude, longitude, c.lat, c.lng),
          })).sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
          setClinics(withDistance);
        }
      } catch {
        // silently ignore location errors
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  const openMaps = (clinic: Clinic) => {
    const url = Platform.OS === 'ios'
      ? `maps://app?daddr=${clinic.lat},${clinic.lng}&dirflg=d`
      : `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
    Linking.openURL(url);
  };

  const callClinic = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\D/g, '')}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.header, { backgroundColor: colors.primary.main }]}>
        <Icon name="MapPin" size={26} color="#fff" />
        <Text style={styles.headerTitle}>Nossas Unidades</Text>
        {loadingLocation && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 'auto' }} />}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {clinics.map(clinic => (
          <View
            key={clinic.id}
            style={[styles.card, { backgroundColor: colors.background.paper, borderColor: colors.border.light }]}
          >
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary.light }]}>
                <Icon name="PawPrint" size={20} color={colors.primary.main} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={[styles.clinicName, { color: colors.text.primary }]}>{clinic.name}</Text>
                  {clinic.distance !== undefined && (
                    <View style={[styles.distanceBadge, { backgroundColor: colors.primary.light }]}>
                      <Text style={[styles.distanceText, { color: colors.primary.main }]}>
                        {formatDistance(clinic.distance)}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.clinicAddress, { color: colors.text.secondary }]}>{clinic.address}</Text>
                <Text style={[styles.clinicHours, { color: colors.text.disabled }]}>{clinic.hours}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.btn, { borderColor: colors.primary.main }]}
                onPress={() => callClinic(clinic.phone)}
              >
                <Icon name="Phone" size={14} color={colors.primary.main} />
                <Text style={[styles.btnText, { color: colors.primary.main }]}>Ligar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnPrimary, { backgroundColor: colors.primary.main, borderColor: colors.primary.main }]}
                onPress={() => openMaps(clinic)}
              >
                <Icon name="Navigation" size={14} color="#fff" />
                <Text style={[styles.btnText, { color: '#fff' }]}>Traçar Rota</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    gap: spacing.md, padding: spacing.xl, paddingTop: spacing.xxl,
  },
  headerTitle: {
    fontSize: typography.sizes.xl, fontFamily: typography.fonts.heading, color: '#fff',
  },
  list: { padding: spacing.md, gap: spacing.md },
  card: {
    borderRadius: 16, borderWidth: 1, padding: spacing.lg,
  },
  cardTop: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  iconBox: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  clinicName: { fontSize: typography.sizes.md, fontFamily: typography.fonts.heading, flex: 1 },
  distanceBadge: {
    paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 10,
  },
  distanceText: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.subheading },
  clinicAddress: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, marginTop: 2 },
  clinicHours: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, marginTop: 2 },
  actions: { flexDirection: 'row', gap: spacing.sm },
  btn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.xs, paddingVertical: spacing.sm, borderRadius: 10, borderWidth: 1,
  },
  btnPrimary: {},
  btnText: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.subheading },
});
