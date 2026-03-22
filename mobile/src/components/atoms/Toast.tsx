import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Icon } from './Icon';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

/**
 * Componente Atom: Toast
 * Feedback flutuante premium.
 */
export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2400),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [opacity]);

  const bgColor = 
    type === 'success' ? '#E8F5E9' : 
    type === 'error' ? '#FFEBEE' : 
    '#E3F2FD';
  
  const iconColor = 
    type === 'success' ? '#2E7D32' : 
    type === 'error' ? '#C62828' : 
    '#1565C0';

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor: bgColor }]}>
      <Icon 
        name={type === 'success' ? 'CheckCircle' : type === 'error' ? 'AlertCircle' : 'Info'} 
        color={iconColor} 
        size={20} 
      />
      <Text style={[styles.text, { color: iconColor }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    marginLeft: spacing.sm,
    flex: 1,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.subheading,
    fontWeight: '600',
  },
});
