import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useColors } from '../../contexts/ThemeContext';
import { Card } from '../../components/organisms/Card';
import { Icon } from '../../components/atoms/Icon';
import { Button } from '../../components/atoms/Button';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { petsService } from '../../services/pets.service';
import { servicesService } from '../../services/services.service';
import { vetsService } from '../../services/vets.service';
import { appointmentsService } from '../../services/appointments.service';
import { auth } from '../../firebase/config';
import { useToast } from '../../contexts/ToastContext';

const CLINICS = [
  { id: '1', name: 'UniVet Matriz', address: 'Rua Principal, 100 — Centro', phone: '(21) 3333-4444' },
  { id: '2', name: 'UniVet Barra', address: 'Av. das Américas, 2000 — Barra da Tijuca', phone: '(21) 3333-5555' },
];

const parseDate = (date: any): Date => {
  if (!date) return new Date(0);
  if (typeof date === 'object' && date._seconds !== undefined) return new Date(date._seconds * 1000);
  return new Date(date);
};

const formatDate = (date: any): string => {
  const d = parseDate(date);
  if (isNaN(d.getTime())) return '—';
  const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const day = d.getDate().toString().padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const weekday = weekdays[d.getDay()];
  const hours = d.getHours().toString().padStart(2, '0');
  const mins = d.getMinutes().toString().padStart(2, '0');
  return `${weekday}, ${day} de ${month} de ${year}\nàs ${hours}:${mins}`;
};

const STATUS_INFO: Record<string, { label: string; color: string; bg: string }> = {
  pending:                { label: 'Pendente',               color: '#F57F17', bg: '#FFF8E1' },
  confirmed:              { label: 'Confirmado',             color: '#1976D2', bg: '#E3F2FD' },
  in_progress:            { label: 'Em andamento',           color: '#7B1FA2', bg: '#F3E5F5' },
  completed:              { label: 'Concluído',              color: '#2E7D32', bg: '#E8F5E9' },
  cancelled:              { label: 'Cancelado',              color: '#C62828', bg: '#FFEBEE' },
  cancellation_requested: { label: 'Avaliando cancelamento', color: '#E65100', bg: '#FFF3E0' },
};

const CANCELLABLE_STATUSES = ['pending', 'confirmed'];

export const AppointmentDetailScreen: React.FC<{ route: { params: { appointment: any } }; navigation: any }> = ({ route, navigation }) => {
  const { appointment } = route.params;
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const { showToast } = useToast();
  const [petName, setPetName] = useState<string>('Carregando...');
  const [serviceName, setServiceName] = useState<string>('Carregando...');
  const [vetName, setVetName] = useState<string>('Carregando...');
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(appointment.status);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const clinic = CLINICS[0];

  const appointmentDate = parseDate(appointment.date);
  const hoursUntilAppointment = (appointmentDate.getTime() - Date.now()) / (1000 * 60 * 60);
  const canCancelDirectly = hoursUntilAppointment > 24;
  const isCancellable = CANCELLABLE_STATUSES.includes(currentStatus);

  const handleCancelPress = () => {
    if (canCancelDirectly) {
      setShowCancelModal(true);
    } else {
      setShowCancelModal(true);
    }
  };

  const handleConfirmCancel = async () => {
    if (!canCancelDirectly && cancelReason.trim().length < 10) {
      showToast('Descreva o motivo com pelo menos 10 caracteres.', 'error');
      return;
    }
    setCancelling(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) { showToast('Sessão expirada.', 'error'); return; }
      await appointmentsService.cancel(token, appointment.id, cancelReason.trim() || undefined);
      setShowCancelModal(false);
      setCancelReason('');
      showToast(
        canCancelDirectly
          ? 'Agendamento cancelado com sucesso.'
          : 'Solicitação enviada. Aguarde a aprovação da clínica.',
        'success',
      );
      navigation.goBack();
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setCancelling(false);
    }
  };
  const statusInfo = STATUS_INFO[currentStatus] || { label: currentStatus, color: colors.text.secondary, bg: colors.background.paper };

  useEffect(() => {
    const resolve = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const [pets, services, vets] = await Promise.all([
          token ? petsService.listMine(token) : Promise.resolve([]),
          servicesService.getAll(),
          vetsService.getAll(),
        ]);
        const pet = (pets as any[]).find(p => p.id === appointment.petId);
        const service = (services as any[]).find(s => s.id === appointment.serviceId);
        const vet = (vets as any[]).find(v => v.id === appointment.vetId);
        setPetName(pet?.name || appointment.petId);
        setServiceName(service?.name || 'Consulta');
        setVetName(vet?.name || 'Veterinário');
      } catch (e) {
        console.error(e);
        setPetName('—');
        setServiceName('—');
        setVetName('—');
      } finally {
        setLoading(false);
      }
    };
    resolve();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Status destaque */}
      <View style={[styles.statusBanner, { backgroundColor: statusInfo.bg }]}>
        <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
      </View>

      {/* Data e hora */}
      <Card padding="md" style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <Icon name="Calendar" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Data e Hora</Text>
            <Text style={styles.rowValue}>{formatDate(appointment.date)}</Text>
          </View>
        </View>
      </Card>

      {/* Informações */}
      <Card padding="md" style={styles.card}>
        <View style={[styles.row, styles.rowBorder]}>
          <View style={styles.rowIcon}>
            <Icon name="PawPrint" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Pet</Text>
            <Text style={styles.rowValue}>{petName}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.rowBorder]}>
          <View style={styles.rowIcon}>
            <Icon name="Stethoscope" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Serviço</Text>
            <Text style={styles.rowValue}>{serviceName}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.rowBorder]}>
          <View style={styles.rowIcon}>
            <Icon name="User" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Veterinário</Text>
            <Text style={styles.rowValue}>{vetName}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <Icon name="DollarSign" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>Valor Total</Text>
            <Text style={[styles.rowValue, { color: colors.secondary.main }]}>
              R$ {(appointment.totalPrice ?? 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </Card>

      {/* Local */}
      <Card padding="md" style={styles.card}>
        <Text style={styles.sectionTitle}>Local</Text>
        <View style={[styles.row, { marginTop: spacing.sm }]}>
          <View style={styles.rowIcon}>
            <Icon name="MapPin" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowValue}>{clinic.name}</Text>
            <Text style={styles.rowLabel}>{clinic.address}</Text>
          </View>
        </View>
        <View style={[styles.row, { marginTop: spacing.sm }]}>
          <View style={styles.rowIcon}>
            <Icon name="Phone" size={20} color={colors.primary.main} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowValue}>{clinic.phone}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => navigation.getParent()?.navigate('HomeTab', { screen: 'FindClinic' })}
        >
          <Icon name="Map" size={16} color="#fff" />
          <Text style={styles.mapBtnText}>Ver no Mapa</Text>
        </TouchableOpacity>
      </Card>

      {/* Observações */}
      {appointment.notes ? (
        <Card padding="md" style={styles.card}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <Text style={styles.notes}>{appointment.notes}</Text>
        </Card>
      ) : null}

      {isCancellable && (
        <Button
          title="Cancelar Agendamento"
          variant="outline"
          style={{ marginTop: spacing.sm, borderColor: '#C62828' }}
          textStyle={{ color: '#C62828' }}
          onPress={handleCancelPress}
        />
      )}

      <Button
        title="Novo Agendamento"
        variant="outline"
        style={{ marginTop: spacing.sm }}
        onPress={() => navigation.getParent()?.navigate('HomeTab', { screen: 'BookingStack' })}
      />

    </ScrollView>
    <Modal visible={showCancelModal} transparent animationType="slide" onRequestClose={() => setShowCancelModal(false)}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {canCancelDirectly ? 'Confirmar cancelamento' : 'Solicitação de cancelamento'}
          </Text>
          <Text style={styles.modalDesc}>
            {canCancelDirectly
              ? 'Tem certeza que deseja cancelar este agendamento? Esta ação não poderá ser desfeita.'
              : 'Este agendamento é em menos de 24h. Descreva o motivo para que a clínica possa avaliar e aprovar o cancelamento.'}
          </Text>
          {!canCancelDirectly && (
            <TextInput
              style={styles.reasonInput}
              placeholder="Descreva o motivo do cancelamento..."
              placeholderTextColor={colors.text.secondary}
              value={cancelReason}
              onChangeText={setCancelReason}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          )}
          <View style={styles.modalActions}>
            <Button
              title="Voltar"
              variant="outline"
              style={{ flex: 1 }}
              onPress={() => { setShowCancelModal(false); setCancelReason(''); }}
            />
            <Button
              title={canCancelDirectly ? 'Confirmar' : 'Enviar solicitação'}
              style={{ flex: 1 }}
              loading={cancelling}
              onPress={handleConfirmCancel}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    content: { padding: spacing.lg, paddingBottom: spacing.xxl },
    statusBanner: {
      alignSelf: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.sm,
      borderRadius: 20, marginBottom: spacing.lg,
    },
    statusText: { fontFamily: typography.fonts.heading, fontSize: typography.sizes.md },
    card: { marginBottom: spacing.md },
    sectionTitle: { fontSize: typography.sizes.md, fontFamily: typography.fonts.heading, color: colors.text.primary, marginBottom: spacing.xs },
    row: { flexDirection: 'row', alignItems: 'flex-start' },
    rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border.light, paddingBottom: spacing.md, marginBottom: spacing.md },
    rowIcon: {
      width: 36, height: 36, borderRadius: 18,
      backgroundColor: colors.primary.light,
      alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
    },
    rowContent: { flex: 1 },
    rowLabel: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, color: colors.text.secondary },
    rowValue: { fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.text.primary, marginTop: 2 },
    mapBtn: {
      flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
      backgroundColor: colors.primary.main,
      paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
      borderRadius: 8, alignSelf: 'flex-start', marginTop: spacing.md,
    },
    mapBtnText: { color: '#fff', fontFamily: typography.fonts.subheading, fontSize: typography.sizes.sm },
    notes: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, lineHeight: 22 },
    modalOverlay: {
      flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: colors.background.paper,
      borderTopLeftRadius: 20, borderTopRightRadius: 20,
      padding: spacing.xl,
      paddingBottom: spacing.xxl,
      gap: spacing.md,
    },
    modalTitle: {
      fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading,
      color: colors.text.primary,
    },
    modalDesc: {
      fontSize: typography.sizes.sm, fontFamily: typography.fonts.body,
      color: colors.text.secondary, lineHeight: 22,
    },
    reasonInput: {
      borderWidth: 1, borderColor: colors.border.light,
      borderRadius: 8, padding: spacing.md,
      fontFamily: typography.fonts.body, fontSize: typography.sizes.md,
      color: colors.text.primary, minHeight: 80,
      backgroundColor: colors.background.default,
    },
    modalActions: { flexDirection: 'row', gap: spacing.sm },
  });
}
