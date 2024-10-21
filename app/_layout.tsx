import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import store from '@/app/store';
import { Provider } from 'react-redux';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    } else if (error) {
      console.error('Error loading font: ', error);
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        {/* Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Client */}
        <Stack.Screen name="client/editPage" options={{ headerShown: false }} />
        <Stack.Screen name="client/addPage" options={{ headerShown: false }} />
        {/* Realtor */}
        <Stack.Screen name="realtor/editPage" options={{ headerShown: false }} />
        <Stack.Screen name="realtor/addPage" options={{ headerShown: false }} />
        {/* Estate */}
        {/*<Stack.Screen name="estate/editPage" options={{ headerShown: false }} />*/}
        {/*<Stack.Screen name="estate/addPage" options={{ headerShown: false }} />*/}
        {/*<Stack.Screen name="estate/filterPage" options={{ headerShown: false }} />*/}
        {/* Not Found */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
