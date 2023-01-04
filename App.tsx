import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import * as SplashScreen from 'expo-splash-screen';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

import HomeScreen from './Screens/HomeScreen';
import ShowScreen from './Screens/ShowScreen';
import { Close } from './Components/Icons';
import { useAppFonts as useFonts } from './hooks/useFonts';
import { Theme } from './theme';

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
  const [isOpen, setIsOpen] = React.useState(true);
  const [connectionState, setConnectionState] =
    React.useState<NetInfoState | null>(null);

  StatusBar.setBarStyle('light-content', true);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  React.useEffect(() => {
    if (!fontsLoaded) {
      setAppIsReady(true);
    }
  }, []);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionState(state);
    });

    return () => {
      unsubscribe();
    };
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const { colors, font } = Theme;

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  const SnackBar = () => {
    if (connectionState?.isConnected === false) {
      setIsOpen(true);
    }

    const message =
      connectionState?.isConnected === false
        ? 'No internet connection!'
        : connectionState?.details?.isConnectionExpensive
        ? 'You are using a mobile data connection'
        : null;

    if (isOpen && message)
      return (
        <View
          style={{
            left: 0,
            position: 'relative',
            top: 0,
            width: '100%',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.white.main,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              left: 0,
              // margin: 20,
              padding: 10,
              width: '100%',
            }}
          >
            <Text style={{ color: colors.black, fontSize: font.size.h4 }}>
              {message}
            </Text>

            <Pressable onPress={() => setIsOpen(false)}>
              <Close color={colors.black} size={22} />
            </Pressable>
          </View>
        </View>
      );

    return null;
  };

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.black }}
      onLayout={onLayoutRootView}
    >
      <SafeAreaView
        style={{
          backgroundColor: colors.black,
          flex: 1,
          width: '100%',
        }}
      >
        <SnackBar />
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
