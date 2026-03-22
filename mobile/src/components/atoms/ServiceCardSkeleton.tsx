import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from './Skeleton';
import { spacing } from '../../tokens/spacing';

/**
 * ServiceCardSkeleton
 * Placeholder para listagem de serviços.
 */
export const ServiceCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <Skeleton width={80} height={80} borderRadius={40} />
      <View style={styles.content}>
        <Skeleton width="60%" height={20} style={{ marginBottom: spacing.xs }} />
        <Skeleton width="40%" height={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  content: {
    marginLeft: spacing.md,
    flex: 1,
  },
});
