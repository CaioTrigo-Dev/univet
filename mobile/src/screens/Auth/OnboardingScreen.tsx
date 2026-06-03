import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../../contexts/ThemeContext';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Button } from '../../components/atoms/Button';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Bem-vindo à UniVet',
    description: 'O cuidado que seu melhor amigo merece, na palma da sua mão.',
    image: 'https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    title: 'Agendamento Simples',
    description: 'Escolha o serviço, o veterinário e o melhor horário em segundos.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    title: 'Histórico Completo',
    description: 'Acompanhe vacinas, prontuários e receba lembretes automáticos.',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=400',
  },
];

export const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => makeStyles(colors, insets.top), [colors, insets.top]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: SLIDES[currentSlide].image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[styles.indicator, index === currentSlide && styles.activeIndicator]}
            />
          ))}
        </View>

        <Text style={styles.title}>{SLIDES[currentSlide].title}</Text>
        <Text style={styles.description}>{SLIDES[currentSlide].description}</Text>
      </View>

      <View style={styles.footer}>
        <Button
          title={currentSlide === SLIDES.length - 1 ? 'Começar' : 'Próximo'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

function makeStyles(colors: ReturnType<typeof useColors>, topInset: number) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },
    header: { paddingHorizontal: spacing.xl, paddingTop: topInset + spacing.lg, alignItems: 'flex-end' },
    skipText: { color: colors.text.secondary, fontFamily: typography.fonts.body, fontSize: typography.sizes.md },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
    image: { width: width * 0.8, height: width * 0.8, borderRadius: 160, marginBottom: spacing.xxl },
    indicatorContainer: { flexDirection: 'row', marginBottom: spacing.xl },
    indicator: {
      width: 8, height: 8, borderRadius: 4,
      backgroundColor: colors.primary.light, marginHorizontal: 4,
    },
    activeIndicator: { width: 24, backgroundColor: colors.primary.main },
    title: {
      fontSize: typography.sizes.xxl,
      fontFamily: typography.fonts.heading,
      color: colors.primary.main,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    description: {
      fontSize: typography.sizes.md,
      fontFamily: typography.fonts.body,
      color: colors.text.secondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    footer: { padding: spacing.xl },
  });
}
