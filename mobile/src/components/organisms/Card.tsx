import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padding?: keyof typeof spacing;
}

/**
 * Componente Organism: Card
 * Container básico com sombra e bordas arredondadas.
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  padding = 'md', 
  style, 
  ...rest 
}) => {
  return (
    <View 
      style={[
        styles.card, 
        { padding: spacing[padding] }, 
        style
      ]} 
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.default,
    borderRadius: 16,
    // Sombra suave (Android)
    elevation: 3,
    // Sombra suave (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '100%',
  },
});
