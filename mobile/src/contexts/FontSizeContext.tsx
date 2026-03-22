import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FontSizeLevel = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSizeLevel: FontSizeLevel;
  setFontSizeLevel: (level: FontSizeLevel) => void;
  getScale: () => number;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

/**
 * FontSizeProvider
 * Controla o tamanho da fonte globalmente para acessibilidade.
 * Níveis: Pequeno (0.8x), Médio (1.0x), Grande (1.2x).
 */
export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<FontSizeLevel>('medium');

  useEffect(() => {
    const loadFontSize = async () => {
      const saved = await AsyncStorage.getItem('@univet_font_size');
      if (saved) setFontSizeLevel(saved as FontSizeLevel);
    };
    loadFontSize();
  }, []);

  const updateFontSize = async (level: FontSizeLevel) => {
    setFontSizeLevel(level);
    await AsyncStorage.setItem('@univet_font_size', level);
  };

  const getScale = () => {
    switch (fontSizeLevel) {
      case 'small': return 0.85;
      case 'large': return 1.25;
      default: return 1.0;
    }
  };

  return (
    <FontSizeContext.Provider value={{ fontSizeLevel, setFontSizeLevel: updateFontSize, getScale }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) throw new Error('useFontSize must be used within a FontSizeProvider');
  return context;
};
