import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { useColors } from '../../contexts/ThemeContext';
import { Icon } from '../../components/atoms/Icon';

export const SplashScreen: React.FC = () => {
  const colors = useColors();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary.main }]}>
      <Animated.View style={{ opacity, alignItems: 'center' }}>
        <Icon name="PawPrint" size={80} color="#fff" />
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
