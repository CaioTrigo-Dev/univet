import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { Icon } from '../atoms/Icon';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onHide: () => void;
}

/**
 * Componente Toast
 * Notificação flutuante com suporte a diferentes tipos.
 */
export const Toast: React.FC<ToastProps> = ({ message, type, onHide }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2400),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [message]);

  const backgroundColor = 
    type === 'success' ? '#4CAF50' : 
    type === 'error' ? '#F44336' : '#2196F3';

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
      <Icon name={type === 'success' ? 'CheckCircle' : 'AlertCircle'} color="#fff" size={20} />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    marginLeft: 12,
    fontSize: 14,
    fontFamily: typography.fonts.subheading,
    flex: 1,
  },
});
