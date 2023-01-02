import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import ShowScreen from './Screens/ShowScreen';

export type RootStackParamList = {
  home: undefined;
  show: {
    path: 'show/:id';
    screen: string;
    exact: true;
  };
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
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
  );
}
