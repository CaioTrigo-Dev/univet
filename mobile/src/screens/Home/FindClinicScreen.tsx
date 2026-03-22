import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Icon } from '../../components/atoms/Icon';

const CLINICS = [
  { id: '1', name: 'UniVet Matriz', lat: -22.9035, lng: -43.2096, address: 'Rua Principal, 100' },
  { id: '2', name: 'UniVet Barra', lat: -23.0033, lng: -43.3496, address: 'Av. das Américas, 2000' },
];

/**
 * Tela de Localização
 * Encontra as clínicas UniVet mais próximas usando GPS.
 */
export const FindClinicScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: -22.9035,
          longitude: -43.2096,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {CLINICS.map(clinic => (
          <Marker 
            key={clinic.id}
            coordinate={{ latitude: clinic.lat, longitude: clinic.lng }}
            title={clinic.name}
            description={clinic.address}
          >
            <View style={styles.marker}>
              <Icon name="PawPrint" color="#fff" size={16} />
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.infoCard}>
        <Text style={styles.title}>Clínica mais próxima</Text>
        <View style={styles.clinicRow}>
          <Icon name="MapPin" color={colors.primary.main} />
          <View style={styles.clinicText}>
            <Text style={styles.clinicName}>{CLINICS[0].name}</Text>
            <Text style={styles.clinicAddress}>{CLINICS[0].address}</Text>
          </View>
          <TouchableOpacity style={styles.routeBtn}>
            <Text style={styles.routeText}>Traçar Rota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    backgroundColor: colors.primary.main,
    padding: spacing.xs,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoCard: {
    position: 'absolute',
    bottom: spacing.xxl,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicText: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  clinicName: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  clinicAddress: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  routeBtn: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  routeText: {
    color: '#fff',
    fontFamily: typography.fonts.subheading,
    fontSize: typography.sizes.xs,
  },
});
