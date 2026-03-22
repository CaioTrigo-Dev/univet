import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { Skeleton } from '../../components/atoms/Skeleton';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { servicesService, Service } from '../../services/services.service';

/**
 * Tela Inicial (Dashboard)
 * Ponto central para o tutor visualizar seus pets e agendamentos.
 */
export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await servicesService.getAll();
        setServices(data.filter(s => s.active));
      } catch (error) {
        console.error('Failed to fetch services layout', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Tutor'}! 🐾</Text>
          <Text style={styles.subtitle}>Como estão seus amiguinhos hoje?</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('NotificationsTab')}
          accessibilityLabel="Ver notificações e alertas pet"
        >
          <Icon name="Bell" color={colors.primary.main} />
        </TouchableOpacity>
      </View>

      {/* Firestore Banners (Mocked Display for UI requirement) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerCarousel}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1628131338278-56517e440c1e?auto=format&fit=crop&w=400' }} 
          style={styles.banner} 
        />
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?auto=format&fit=crop&w=400' }} 
          style={styles.banner} 
        />
      </ScrollView>

      {/* Ações Rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('BookingStack')}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}><Icon name="Calendar" color="#1976D2" /></View>
            <Text style={styles.actionLabel}>Agendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('PetsTab')}>
            <View style={[styles.actionIcon, { backgroundColor: '#F1F8E9' }]}><Icon name="PlusCircle" color="#388E3C" /></View>
            <Text style={styles.actionLabel}>Meu Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('FindClinic')}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}><Icon name="MapPin" color="#F57C00" /></View>
            <Text style={styles.actionLabel}>Unidades</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Próximo Agendamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximo Agendamento</Text>
        <Card padding="md">
          <View style={styles.appointmentContent}>
            <View style={styles.dateBox}>
              <Text style={styles.dateDay}>25</Text>
              <Text style={styles.dateMonth}>MAR</Text>
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentTitle}>Consulta de Rotina</Text>
              <Text style={styles.appointmentPet}>Rex</Text>
            </View>
            <Icon name="ChevronRight" color={colors.text.secondary} />
          </View>
        </Card>
      </View>

      {/* Categorias e Serviços (Novo conforme UNIVET_FINAL.md) */}
      <View style={[styles.section, { marginBottom: spacing.xl }]}>
        <Text style={styles.sectionTitle}>Nossos Serviços</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {['all', 'consultation', 'vaccine', 'grooming'].map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryChip, 
                activeCategory === cat && styles.categoryChipActive
              ]}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                {cat === 'all' ? 'Todos' : cat === 'consultation' ? 'Consultas' : cat === 'vaccine' ? 'Vacinas' : 'Estética'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.servicesGrid}>
          {loading ? (
            <Skeleton width="100%" height={100} style={{ borderRadius: 12 }} />
          ) : (
            filteredServices.map(service => (
              <TouchableOpacity 
                key={service.id} 
                onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
              >
                <Card style={styles.serviceCard}>
                  {service.imageUrl ? (
                    <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
                  ) : (
                    <View style={styles.serviceImagePlaceholder}><Icon name="Activity" color={colors.primary.main} /></View>
                  )}
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>R$ {service.price.toFixed(2)}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  greeting: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 0.48,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  statValue: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.heading,
    color: colors.primary.main,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  seeAll: {
    color: colors.primary.main,
    fontFamily: typography.fonts.subheading,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  actionLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.subheading,
    color: colors.text.secondary,
  },
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary.main,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  dateDay: {
    color: '#fff',
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.heading,
  },
  dateMonth: {
    color: '#fff',
    fontSize: 10,
    fontFamily: typography.fonts.subheading,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    color: colors.text.primary,
  },
  appointmentPet: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.secondary,
  },
  appointmentVet: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.subheading,
    color: colors.primary.main,
  },
  tipsList: {
    marginTop: spacing.md,
  },
  tipCard: {
    width: 200,
    marginRight: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.body,
    color: colors.text.primary,
  },
  bannerCarousel: {
    paddingLeft: spacing.xl,
    paddingBottom: spacing.lg,
  },
  banner: {
    width: 280,
    height: 140,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  categoryChip: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: colors.primary.main,
  },
  categoryText: {
    fontFamily: typography.fonts.subheading,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  categoryTextActive: {
    color: '#FFF',
  },
  servicesGrid: {
    flexDirection: 'column',
  },
  serviceCard: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  serviceImage: {
    width: 100,
    height: 100,
  },
  serviceImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceInfo: {
    padding: spacing.md,
    justifyContent: 'center',
  },
  serviceName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.md,
  },
  servicePrice: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.md,
    color: colors.secondary.main,
    marginTop: spacing.xs,
  }
});
