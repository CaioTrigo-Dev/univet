import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
  ScrollView, Linking, Platform, ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Icon } from '../../components/atoms/Icon';

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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const FindClinicScreen: React.FC = () => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const mapRef = useRef<MapView>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>(CLINICS);
  const [selected, setSelected] = useState<Clinic>(CLINICS[0]);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionDenied(true);
        setLoadingLocation(false);
        return;
      }
      try {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        const userLat = loc.coords.latitude;
        const userLng = loc.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

        const withDistance = CLINICS.map(c => ({
          ...c,
          distance: getDistanceKm(userLat, userLng, c.lat, c.lng),
        })).sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

        setClinics(withDistance);
        setSelected(withDistance[0]);

        mapRef.current?.animateToRegion({
          latitude: userLat,
          longitude: userLng,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }, 800);
      } catch {
        setPermissionDenied(true);
      } finally {
        setLoadingLocation(false);
      }
    })();
  }, []);

  const handleSelectClinic = (clinic: Clinic) => {
    setSelected(clinic);
    mapRef.current?.animateToRegion({
      latitude: clinic.lat,
      longitude: clinic.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }, 500);
  };

  const openRoute = (clinic: Clinic) => {
    const url = Platform.OS === 'ios'
      ? `maps://app?daddr=${clinic.lat},${clinic.lng}&dirflg=d`
      : `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
    Linking.openURL(url);
  };

  const callClinic = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\D/g, '')}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -22.9519,
          longitude: -43.2500,
          latitudeDelta: 0.18,
          longitudeDelta: 0.18,
        }}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {clinics.map(clinic => (
          <Marker
            key={clinic.id}
            coordinate={{ latitude: clinic.lat, longitude: clinic.lng }}
            onPress={() => handleSelectClinic(clinic)}
          >
            <View style={[
              styles.marker,
              selected.id === clinic.id && styles.markerSelected,
            ]}>
              <Icon name="PawPrint" color="#fff" size={selected.id === clinic.id ? 20 : 15} />
            </View>
          </Marker>
        ))}
      </MapView>

      {loadingLocation && (
        <View style={styles.loadingBadge}>
          <ActivityIndicator size="small" color={colors.primary.main} />
          <Text style={styles.loadingText}>Localizando você...</Text>
        </View>
      )}

      {permissionDenied && (
        <View style={styles.loadingBadge}>
          <Icon name="MapPinOff" size={16} color={colors.text.secondary} />
          <Text style={styles.loadingText}>Localização não disponível</Text>
        </View>
      )}

      <View style={styles.bottomSheet}>
        <View style={styles.bottomHandle} />
        <Text style={styles.sheetTitle}>
          {userLocation ? 'Clínicas próximas a você' : 'Nossas Unidades'}
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {clinics.map(clinic => {
            const isSelected = selected.id === clinic.id;
            return (
              <TouchableOpacity
                key={clinic.id}
                onPress={() => handleSelectClinic(clinic)}
                activeOpacity={0.8}
              >
                <View style={[styles.clinicCard, isSelected && styles.clinicCardSelected]}>
                  <View style={[styles.clinicIconBox, isSelected && styles.clinicIconBoxSelected]}>
                    <Icon name="PawPrint" size={20} color={isSelected ? '#fff' : colors.primary.main} />
                  </View>

                  <View style={styles.clinicInfo}>
                    <View style={styles.clinicTopRow}>
                      <Text style={[styles.clinicName, isSelected && styles.clinicNameSelected]}>
                        {clinic.name}
                      </Text>
                      {clinic.distance !== undefined && (
                        <View style={[styles.distanceBadge, isSelected && styles.distanceBadgeSelected]}>
                          <Text style={[styles.distanceText, isSelected && styles.distanceTextSelected]}>
                            {formatDistance(clinic.distance)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.clinicAddress} numberOfLines={1}>{clinic.address}</Text>
                    <Text style={styles.clinicHours}>{clinic.hours}</Text>

                    {isSelected && (
                      <View style={styles.clinicActions}>
                        <TouchableOpacity
                          style={styles.actionBtn}
                          onPress={() => callClinic(clinic.phone)}
                        >
                          <Icon name="Phone" size={14} color={colors.primary.main} />
                          <Text style={styles.actionBtnText}>Ligar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionBtn, styles.actionBtnPrimary]}
                          onPress={() => openRoute(clinic)}
                        >
                          <Icon name="Navigation" size={14} color="#fff" />
                          <Text style={[styles.actionBtnText, { color: '#fff' }]}>Traçar Rota</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1 },
    map: { height: SCREEN_HEIGHT * 0.48 },
    marker: {
      backgroundColor: colors.primary.main,
      padding: 8, borderRadius: 20,
      borderWidth: 2, borderColor: '#fff',
      elevation: 4, shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4,
    },
    markerSelected: {
      backgroundColor: colors.secondary.main,
      padding: 10,
    },
    loadingBadge: {
      position: 'absolute', top: spacing.lg, alignSelf: 'center',
      flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
      backgroundColor: colors.background.paper,
      paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
      borderRadius: 20, elevation: 4,
    },
    loadingText: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, color: colors.text.secondary },
    bottomSheet: {
      flex: 1,
      backgroundColor: colors.background.default,
      borderTopLeftRadius: 24, borderTopRightRadius: 24,
      paddingTop: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl,
      elevation: 8,
      shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 8,
    },
    bottomHandle: {
      width: 40, height: 4, borderRadius: 2,
      backgroundColor: colors.border.main,
      alignSelf: 'center', marginBottom: spacing.md,
    },
    sheetTitle: {
      fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading,
      color: colors.text.primary, marginBottom: spacing.md,
    },
    clinicCard: {
      flexDirection: 'row', alignItems: 'flex-start',
      backgroundColor: colors.background.paper,
      borderRadius: 16, padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 2, borderColor: 'transparent',
    },
    clinicCardSelected: {
      borderColor: colors.primary.main,
    },
    clinicIconBox: {
      width: 44, height: 44, borderRadius: 22,
      backgroundColor: colors.primary.light,
      alignItems: 'center', justifyContent: 'center',
      marginRight: spacing.md, flexShrink: 0,
    },
    clinicIconBoxSelected: {
      backgroundColor: colors.primary.main,
    },
    clinicInfo: { flex: 1 },
    clinicTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
    clinicName: {
      fontSize: typography.sizes.md, fontFamily: typography.fonts.heading,
      color: colors.text.primary, flex: 1,
    },
    clinicNameSelected: { color: colors.primary.main },
    distanceBadge: {
      backgroundColor: colors.background.default,
      paddingHorizontal: spacing.sm, paddingVertical: 2,
      borderRadius: 10, marginLeft: spacing.sm,
    },
    distanceBadgeSelected: { backgroundColor: colors.primary.light },
    distanceText: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.subheading, color: colors.text.secondary },
    distanceTextSelected: { color: colors.primary.main },
    clinicAddress: {
      fontSize: typography.sizes.sm, fontFamily: typography.fonts.body,
      color: colors.text.secondary, marginTop: 2,
    },
    clinicHours: {
      fontSize: typography.sizes.xs, fontFamily: typography.fonts.body,
      color: colors.text.disabled, marginTop: 2,
    },
    clinicActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
    actionBtn: {
      flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
      paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
      borderRadius: 10, borderWidth: 1, borderColor: colors.primary.main,
    },
    actionBtnPrimary: {
      backgroundColor: colors.primary.main, borderColor: colors.primary.main,
    },
    actionBtnText: {
      fontSize: typography.sizes.xs, fontFamily: typography.fonts.subheading,
      color: colors.primary.main,
    },
  });
}
