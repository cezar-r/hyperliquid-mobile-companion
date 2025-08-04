import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, StyleSheet } from 'react-native';
import { GlobalStateProvider } from './context/GlobalStateContext';
import { AnimationProvider } from './context/AnimationContext';
import Onboarding from './components/onboarding/Onboarding';
import MainApp from './components/MainApp';
import Splash from './components/Splash';


const Stack = createStackNavigator();

const App = () => (
  <AnimationProvider>
    <GlobalStateProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="MainApp" component={MainApp} />
          </Stack.Navigator>
        </NavigationContainer>
        
        {/* Persistent GIF overlay - renders at app level, never remounts */}
        <View style={styles.gifOverlay} pointerEvents="none">
          <Image
            source={require('./assets/blob_green.gif')}
            style={styles.persistentGif}
          />
        </View>
      </View>
    </GlobalStateProvider>
  </AnimationProvider>
);

const styles = StyleSheet.create({
  gifOverlay: {
    position: 'absolute',
    top: 50, // Adjust to match your header position
    left: '50%',
    marginLeft: -25, // Half of width (50/2) to center horizontally
    zIndex: 1000,
  },
  persistentGif: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default App;
