import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padding?: keyof typeof spacing;
}

export const Card: React.FC<CardProps> = ({ children, padding = 'md', style, ...rest }) => {
  const colors = useColors();
  return (
    <View
      style={[styles.card, { backgroundColor: colors.background.default, padding: spacing[padding] }, style]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '100%',
  },
});
