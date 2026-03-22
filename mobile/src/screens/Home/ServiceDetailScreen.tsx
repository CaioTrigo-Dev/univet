import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { servicesService } from '../../services/services.service';
import { useBooking } from '../../contexts/BookingContext';
import { Skeleton } from '../../components/atoms/Skeleton';

/**
 * Tela de Detalhes do Serviço
 * Exibe foto, preço, duração e descrição.
 */
export const ServiceDetailScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
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
    setBookingService(service.id, service.price);
    // Navega para o fluxo de agendamento começando pela escolha do Pet e data
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
      <ScrollView>
        {service.imageUrl ? (
          <Image source={{ uri: service.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Icon name="Activity" size={48} color={colors.primary.main} />
          </View>
        )}
        
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  image: {
    width: '100%',
    height: 250,
  },
  imagePlaceholder: {
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.heading,
    color: colors.secondary.main,
  },
  badgesRow: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.sm,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.subheading,
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  descCard: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  errorText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: '#D32F2F',
  }
});
