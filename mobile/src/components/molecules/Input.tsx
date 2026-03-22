import React from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps 
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

/**
 * Componente Molecule: Input
 * Campo de texto com label e suporte a ícones e mensagens de erro.
 */
export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  leftIcon, 
  style, 
  ...rest 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        !!error && styles.inputError,
        style
      ]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.text.hint}
          {...rest}
        />
      </View>
      
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.subheading,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  inputError: {
    borderColor: colors.error,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.body,
    color: colors.text.primary,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: 4,
  },
});
