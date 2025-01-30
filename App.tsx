import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalStateProvider } from './context/GlobalStateContext';
import Onboarding from './components/onboarding/Onboarding';
import MainApp from './components/MainApp';

const Stack = createStackNavigator();

const App = () => (
  <GlobalStateProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  </GlobalStateProvider>
);

export default App;
