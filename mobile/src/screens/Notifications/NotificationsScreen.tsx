import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Icon } from '../../components/atoms/Icon';
import { notificationsService, Notification } from '../../services/notifications.service';
import { auth } from '../../firebase/config';

const parseDate = (date: any): Date => {
  if (!date) return new Date(0);
  if (typeof date === 'object' && date._seconds !== undefined) return new Date(date._seconds * 1000);
  return new Date(date);
};

const timeAgo = (date: any): string => {
  const d = parseDate(date);
  const diff = Date.now() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'agora';
  if (hours < 24) return `${hours}h atrás`;
  const days = Math.floor(hours / 24);
  return `${days}d atrás`;
};

const ICON_BY_TYPE: Record<string, string> = {
  appointment_reminder: 'Calendar',
  vaccine_reminder: 'Shield',
  appointment_confirmed: 'CheckCircle',
  default: 'Bell',
};

export const NotificationsScreen: React.FC = () => {
  const colors = useColors();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;
        const data = await notificationsService.listMine(token);
        const sorted = [...data].sort(
          (a, b) => parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime()
        );
        setNotifications(sorted);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleMarkRead = async (id: string) => {
    const token = await auth.currentUser?.getIdToken();
    if (!token) return;
    await notificationsService.markAsRead(token, id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Avisos</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const iconName = (ICON_BY_TYPE[item.type] || ICON_BY_TYPE.default) as any;
          return (
            <TouchableOpacity
              style={[styles.item, !item.read && styles.itemUnread]}
              onPress={() => handleMarkRead(item.id)}
            >
              <View style={[styles.iconContainer, !item.read && styles.iconContainerUnread]}>
                <Icon name={iconName} size={20} color={item.read ? colors.text.secondary : colors.primary.main} />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.itemTitle, !item.read && styles.itemTitleUnread]}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.body}</Text>
                <Text style={styles.itemTime}>{timeAgo(item.createdAt)}</Text>
              </View>
              {!item.read && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="BellOff" size={64} color={colors.text.disabled} />
            <Text style={styles.emptyTitle}>Sem avisos</Text>
            <Text style={styles.emptyText}>Você não tem notificações no momento.</Text>
          </View>
        }
      />
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    header: { padding: spacing.xl },
    title: { fontSize: typography.sizes.xxl, fontFamily: typography.fonts.heading, color: colors.primary.main },
    list: { paddingHorizontal: spacing.lg, paddingTop: 0 },
    item: {
      flexDirection: 'row',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
      alignItems: 'center',
    },
    itemUnread: { backgroundColor: colors.primary.light + '22' },
    iconContainer: {
      width: 44, height: 44, borderRadius: 22,
      backgroundColor: colors.background.paper,
      alignItems: 'center', justifyContent: 'center',
      marginRight: spacing.md,
    },
    iconContainerUnread: { backgroundColor: colors.primary.light },
    textContainer: { flex: 1 },
    itemTitle: { fontSize: typography.sizes.md, fontFamily: typography.fonts.subheading, color: colors.text.primary },
    itemTitleUnread: { color: colors.primary.main },
    itemDescription: { fontSize: typography.sizes.sm, fontFamily: typography.fonts.body, color: colors.text.secondary, marginTop: 2 },
    itemTime: { fontSize: typography.sizes.xs, fontFamily: typography.fonts.body, color: colors.text.secondary, marginTop: 4 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary.main, marginLeft: spacing.sm },
    emptyContainer: { alignItems: 'center', marginTop: 80, gap: spacing.md },
    emptyTitle: { fontSize: typography.sizes.lg, fontFamily: typography.fonts.heading, color: colors.text.primary },
    emptyText: { fontSize: typography.sizes.md, fontFamily: typography.fonts.body, color: colors.text.secondary, textAlign: 'center' },
  });
}
