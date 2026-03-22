import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { colors } from '../../tokens/colors';

export type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

/**
 * Componente Atom: Icon
 * Wrapper para a biblioteca Lucide para garantir consistência visual.
 */
export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = colors.primary.main 
}) => {
  const LucideIcon = LucideIcons[name] as React.FC<any>;
  
  if (!LucideIcon) return null;
  
  return <LucideIcon size={size} color={color} />;
};
