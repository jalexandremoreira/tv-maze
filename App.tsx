import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './Screens/HomeScreen';
import ShowScreen from './Screens/ShowScreen';
import { useAppFonts as useFonts } from './hooks/useFonts';

export type RootStackParamList = {
  home: undefined;
  show: {
    path: 'show/:id';
    screen: string;
    exact: true;
  };
};

export default function App() {
  const fontsLoaded = useFonts();
  enableScreens();

  const [appIsReady, setAppIsReady] = React.useState(false);

  StatusBar.setBarStyle('light-content', true);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  React.useEffect(() => {
    if (!fontsLoaded) {
      setAppIsReady(true);
    }
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="show"
            component={ShowScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
