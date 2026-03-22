import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { FontSizeProvider } from './src/contexts/FontSizeContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { BookingProvider } from './src/contexts/BookingContext';
import { RootNavigator } from './src/navigation/RootNavigator';

/**
 * App (Entry Point)
 * Ponto de entrada do aplicativo mobile Expo.
 * Configura os provedores de contexto globais.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FontSizeProvider>
          <ToastProvider>
            <AuthProvider>
              <BookingProvider>
                <RootNavigator />
              </BookingProvider>
            </AuthProvider>
          </ToastProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
