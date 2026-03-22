import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps 
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

/**
 * Componente Atom: Button
 * Botão principal seguindo a estética Organic Clean.
 */
export const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary', 
  loading = false, 
  style, 
  disabled, 
  ...rest 
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        variant === 'outline' && styles.outline,
        (disabled || loading) && styles.disabled,
        style
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary || isSecondary ? '#FFF' : colors.primary.main} />
      ) : (
        <Text style={[
          styles.text,
          isPrimary || isSecondary ? styles.textLight : styles.textPrimary
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  primary: {
    backgroundColor: colors.primary.main,
  },
  secondary: {
    backgroundColor: colors.secondary.main,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary.main,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.subheading,
    fontWeight: '600',
  },
  textLight: {
    color: '#FFFFFF',
  },
  textPrimary: {
    color: colors.primary.main,
  },
});
