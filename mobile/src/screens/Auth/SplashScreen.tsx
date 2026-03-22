import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { colors } from '../../tokens/colors';
import { Icon } from '../../components/atoms/Icon';

/**
 * SplashScreen
 * Tela de carregamento inicial com animação de fade.
 */
export const SplashScreen: React.FC = () => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, alignItems: 'center' }}>
        <Icon name="PawPrint" size={80} color="#fff" />
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
