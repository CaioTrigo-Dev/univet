import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/organisms/Card';
import { Icon, IconName } from '../../components/atoms/Icon';
import { Skeleton } from '../../components/atoms/Skeleton';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { servicesService, Service } from '../../services/services.service';
import { appointmentsService } from '../../services/appointments.service';
import { petsService } from '../../services/pets.service';
import { auth } from '../../firebase/config';

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
  SERVICE_CONFIG[category.toLowerCase()] ??
  { bg: '#F1F8E9', iconColor: '#33691E', icon: 'Heart' as IconName };

const MONTHS = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];

const parseDate = (date: any): Date => {
  if (!date) return new Date(0);
  if (typeof date === 'object' && date._seconds !== undefined) return new Date(date._seconds * 1000);
  return new Date(date);
};

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors, insets.top), [colors, insets.top]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [nextAppointment, setNextAppointment] = useState<any | null>(null);
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const [serviceData, appts, myPets] = await Promise.all([
          servicesService.getAll(),
          token ? appointmentsService.listMine(token) : Promise.resolve([]),
          token ? petsService.listMine(token) : Promise.resolve([]),
        ]);

        setServices(serviceData.filter((s: Service) => s.active));
        setPets(myPets);

        const now = new Date();
        const upcoming = (appts as any[])
          .filter(a => {
            const d = parseDate(a.date);
            return d > now && a.status !== 'cancelled' && a.status !== 'completed';
          })
          .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
        setNextAppointment(upcoming[0] || null);
      } catch (error) {
        console.error('Failed to fetch home data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const getPetName = (petId: string) => pets.find(p => p.id === petId)?.name || 'Seu pet';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Tutor'}! 🐾</Text>
          <Text style={styles.subtitle}>Como estão seus amiguinhos hoje?</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('NotificationsTab')}
          accessibilityLabel="Ver notificações"
        >
          <Icon name="Bell" color={colors.primary.main} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerCarousel}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop' }} style={styles.banner} />
        <Image source={{ uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop' }} style={styles.banner} />
        <Image source={{ uri: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1000&auto=format&fit=crop' }} style={styles.banner} />
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('BookingStack')}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Icon name="Calendar" color="#1976D2" />
            </View>
            <Text style={styles.actionLabel}>Agendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('PetsTab')}>
            <View style={[styles.actionIcon, { backgroundColor: '#F1F8E9' }]}>
              <Icon name="PlusCircle" color="#388E3C" />
            </View>
            <Text style={styles.actionLabel}>Meu Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AppointmentsTab')}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF8E1' }]}>
              <Icon name="ClipboardList" color="#F57F17" />
            </View>
            <Text style={styles.actionLabel}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('FindClinic')}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Icon name="MapPin" color="#F57C00" />
            </View>
            <Text style={styles.actionLabel}>Unidades</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximo Agendamento</Text>
        {nextAppointment ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AppointmentsTab', {
              screen: 'AppointmentDetail',
              params: { appointment: nextAppointment },
            })}
          >
            <Card padding="md">
              <View style={styles.appointmentContent}>
                <View style={styles.dateBox}>
                  <Text style={styles.dateDay}>
                    {parseDate(nextAppointment.date).getDate().toString().padStart(2, '0')}
                  </Text>
                  <Text style={styles.dateMonth}>
                    {MONTHS[parseDate(nextAppointment.date).getMonth()]}
                  </Text>
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentTitle}>Consulta agendada</Text>
                  <Text style={styles.appointmentPet}>{getPetName(nextAppointment.petId)}</Text>
                </View>
                <Icon name="ChevronRight" color={colors.text.secondary} />
              </View>
            </Card>
          </TouchableOpacity>
        ) : (
          <Card padding="md">
            <View style={styles.emptyAppointment}>
              <Icon name="CalendarX" size={28} color={colors.text.disabled} />
              <Text style={styles.emptyAppointmentText}>Nenhum agendamento próximo</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BookingStack')}>
                <Text style={styles.scheduleLink}>Agendar agora →</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      </View>

      <View style={[styles.section, { marginBottom: spacing.xl }]}>
        <Text style={styles.sectionTitle}>Nossos Serviços</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {['all', 'consultation', 'vaccine', 'grooming'].map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                {cat === 'all' ? 'Todos' : cat === 'consultation' ? 'Consultas' : cat === 'vaccine' ? 'Vacinas' : 'Estética'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.servicesGrid}>
          {loading ? (
            <>
              <Skeleton width="47%" height={170} style={{ borderRadius: 12 }} />
              <Skeleton width="47%" height={170} style={{ borderRadius: 12 }} />
              <Skeleton width="47%" height={170} style={{ borderRadius: 12 }} />
              <Skeleton width="47%" height={170} style={{ borderRadius: 12 }} />
            </>
          ) : (
            filteredServices.map(service => {
              const cfg = getServiceConfig(service.category);
              return (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceCardWrapper}
                  onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
                  activeOpacity={0.85}
                >
                  <Card style={styles.serviceCard}>
                    {(service.imageUrl || cfg.defaultImageUrl) ? (
                      <Image
                        source={{ uri: service.imageUrl || cfg.defaultImageUrl }}
                        style={styles.serviceCardImage}
                      />
                    ) : (
                      <View style={[styles.serviceCardIconArea, { backgroundColor: cfg.bg }]}>
                        <Icon name={cfg.icon} size={44} color={cfg.iconColor} />
                      </View>
                    )}
                    <View style={styles.serviceCardInfo}>
                      <Text style={styles.serviceCardName} numberOfLines={2}>{service.name}</Text>
                      <Text style={styles.serviceCardPrice}>R$ {service.price.toFixed(2)}</Text>
                      <View style={styles.serviceCardMeta}>
                        <Icon name="Clock" size={11} color={colors.text.secondary} />
                        <Text style={styles.serviceCardDuration}>{service.durationMinutes} min</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>, topInset: number) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.xl, paddingTop: topInset + spacing.md },
    greeting: { fontSize: typography.sizes.xxl, fontFamily: typography.fonts.heading, color: colors.text.primary },
    subtitle: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary },
    notificationBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.background.paper, alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    bannerCarousel: { paddingLeft: spacing.xl, paddingBottom: spacing.lg },
    banner: { width: 200, height: 200, borderRadius: 12, marginRight: spacing.md },
    section: { marginTop: spacing.xl, paddingHorizontal: spacing.xl, gap: 16 },
    sectionTitle: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading, color: colors.text.primary },
    quickActions: { flexDirection: 'row', justifyContent: 'space-between' },
    actionItem: { alignItems: 'center', flex: 1 },
    actionIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
    actionLabel: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.subheading, color: colors.text.secondary },
    appointmentContent: { flexDirection: 'row', alignItems: 'center' },
    dateBox: { width: 50, height: 50, backgroundColor: colors.primary.main, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
    dateDay: { color: '#fff', fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading },
    dateMonth: { color: '#fff', fontSize: 10, fontFamily: typography.fonts.subheading },
    appointmentInfo: { flex: 1, gap: 4 },
    appointmentTitle: { fontSize: typography.sizes.md, fontFamily: typography.fonts.heading, color: colors.text.primary },
    appointmentPet: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, color: colors.text.secondary },
    emptyAppointment: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
    emptyAppointmentText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary },
    scheduleLink: { fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.primary.main },
    categories: { flexDirection: 'row', marginBottom: spacing.md },
    categoryChip: { backgroundColor: colors.background.paper, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 20, marginRight: spacing.sm },
    categoryChipActive: { backgroundColor: colors.primary.main },
    categoryText: { fontFamily: typography.fonts.subheading, fontSize: typography.sizes.sm, color: colors.text.secondary },
    categoryTextActive: { color: '#FFF' },
    servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
    serviceCardWrapper: { width: '47%' },
    serviceCard: { padding: 0, overflow: 'hidden' },
    serviceCardImage: { width: '100%', height: 120 },
    serviceCardIconArea: { height: 120, alignItems: 'center', justifyContent: 'center' },
    serviceCardInfo: { padding: spacing.md },
    serviceCardName: { fontFamily: typography.fonts.heading, fontSize: typography.sizes.sm, color: colors.text.primary, minHeight: 36 },
    serviceCardPrice: { fontFamily: typography.fonts.heading, fontSize: typography.sizes.md, color: colors.secondary.main, marginTop: spacing.xs },
    serviceCardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.xs },
    serviceCardDuration: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, color: colors.text.secondary },
  });
}
