import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/organisms/Card';
import { Icon, IconName } from '../../components/atoms/Icon';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { servicesService } from '../../services/services.service';
import { useBooking } from '../../contexts/BookingContext';
import { Skeleton } from '../../components/atoms/Skeleton';

const SERVICE_CONFIG: Record<string, { bg: string; iconColor: string; icon: IconName; defaultImageUrl?: string }> = {
  consultation: { bg: '#E3F2FD', iconColor: '#1565C0', icon: 'Stethoscope',
    defaultImageUrl: 'https://plus.unsplash.com/premium_photo-1661916447474-235409b19e16?auto=format&fit=crop&w=800&q=80' },
  consulta:     { bg: '#E3F2FD', iconColor: '#1565C0', icon: 'Stethoscope',
    defaultImageUrl: 'https://plus.unsplash.com/premium_photo-1661916447474-235409b19e16?auto=format&fit=crop&w=800&q=80' },
  vaccine:      { bg: '#E8F5E9', iconColor: '#2E7D32', icon: 'Syringe',
    defaultImageUrl: 'https://plus.unsplash.com/premium_photo-1702599116608-639ae9da1127?auto=format&fit=crop&w=800&q=80' },
  vacina:       { bg: '#E8F5E9', iconColor: '#2E7D32', icon: 'Syringe',
    defaultImageUrl: 'https://plus.unsplash.com/premium_photo-1702599116608-639ae9da1127?auto=format&fit=crop&w=800&q=80' },
  grooming:     { bg: '#F3E5F5', iconColor: '#6A1B9A', icon: 'Scissors',
    defaultImageUrl: 'https://images.unsplash.com/photo-1583534778255-5d67d3dcf95d?auto=format&fit=crop&w=800&q=80' },
  estetica:     { bg: '#F3E5F5', iconColor: '#6A1B9A', icon: 'Scissors',
    defaultImageUrl: 'https://images.unsplash.com/photo-1583534778255-5d67d3dcf95d?auto=format&fit=crop&w=800&q=80' },
  banho:        { bg: '#E0F7FA', iconColor: '#00838F', icon: 'Droplets',
    defaultImageUrl: 'https://images.unsplash.com/photo-1583534778255-5d67d3dcf95d?auto=format&fit=crop&w=800&q=80' },
  emergency:    { bg: '#FFEBEE', iconColor: '#B71C1C', icon: 'AlertCircle' },
  emergencia:   { bg: '#FFEBEE', iconColor: '#B71C1C', icon: 'AlertCircle' },
  surgery:      { bg: '#FFF3E0', iconColor: '#E65100', icon: 'Activity' },
  cirurgia:     { bg: '#FFF3E0', iconColor: '#E65100', icon: 'Activity' },
  exam:         { bg: '#E8EAF6', iconColor: '#283593', icon: 'FileText' },
  exame:        { bg: '#E8EAF6', iconColor: '#283593', icon: 'FileText' },
};

const getServiceConfig = (category: string) =>
  SERVICE_CONFIG[category?.toLowerCase()] ??
  { bg: '#F1F8E9', iconColor: '#33691E', icon: 'Heart' as IconName };

export const ServiceDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { serviceId } = route.params;
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setService: setBookingService } = useBooking();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await servicesService.getById(serviceId);
        setService(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleSchedule = () => {
    setBookingService(service.id, service.price, service.name);
    navigation.navigate('BookingStack');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Skeleton width="100%" height={250} style={{ borderRadius: 0 }} />
        <View style={{ padding: spacing.lg }}>
          <Skeleton width={150} height={32} style={{ marginBottom: spacing.md }} />
          <Skeleton width={80} height={24} style={{ marginBottom: spacing.xl }} />
          <Skeleton width="100%" height={80} />
        </View>
      </View>
    );
  }

  if (!service) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Serviço não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {(() => {
          const cfg = getServiceConfig(service.category);
          const imgUrl = service.imageUrl || cfg.defaultImageUrl;
          return imgUrl ? (
            <Image source={{ uri: imgUrl }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder, { backgroundColor: cfg.bg }]}>
              <Icon name={cfg.icon} size={72} color={cfg.iconColor} />
            </View>
          );
        })()}

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{service.name}</Text>
            <Text style={styles.price}>R$ {service.price.toFixed(2)}</Text>
          </View>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{service.category}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#E3F2FD' }]}>
              <View style={{ marginRight: 4 }}>
                <Icon name="Clock" size={12} color="#1976D2" />
              </View>
              <Text style={[styles.badgeText, { color: '#1976D2' }]}>{service.durationMinutes} min</Text>
            </View>
          </View>

          <Card padding="md" style={styles.descCard}>
            <Text style={styles.sectionTitle}>Sobre o Serviço</Text>
            <Text style={styles.description}>{service.description}</Text>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Agendar esse Serviço" onPress={handleSchedule} />
      </View>
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    image: { width: '100%', height: 250 },
    imagePlaceholder: { backgroundColor: colors.primary.light, alignItems: 'center', justifyContent: 'center' },
    content: { padding: spacing.lg, paddingBottom: spacing.xxl },
    headerRow: {
      flexDirection: 'row', justifyContent: 'space-between',
      alignItems: 'baseline', marginBottom: spacing.sm,
    },
    title: {
      fontSize: typography.sizes.xl, fontFamily: typography.fonts.heading,
      color: colors.text.primary, flex: 1, marginRight: spacing.sm,
    },
    price: { fontSize: typography.sizes.xl, fontFamily: typography.fonts.heading, color: colors.secondary.main },
    badgesRow: { flexDirection: 'row', marginBottom: spacing.xl },
    badge: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: colors.background.paper,
      paddingHorizontal: spacing.sm, paddingVertical: 4,
      borderRadius: 12, marginRight: spacing.sm,
    },
    badgeText: {
      fontSize: typography.sizes.xs, fontFamily: typography.fonts.subheading,
      color: colors.text.secondary, textTransform: 'uppercase',
    },
    descCard: { marginTop: spacing.md },
    sectionTitle: {
      fontSize: typography.sizes.md, fontFamily: typography.fonts.heading,
      color: colors.text.primary, marginBottom: spacing.sm,
    },
    description: {
      fontSize: typography.sizes.md, fontFamily: typography.fonts.body,
      color: colors.text.secondary, lineHeight: 24,
    },
    footer: {
      padding: spacing.lg,
      backgroundColor: colors.background.paper,
      borderTopWidth: 1, borderTopColor: colors.border.light,
    },
    errorText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: '#D32F2F' },
  });
}
