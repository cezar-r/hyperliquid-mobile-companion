import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Trade from './trade/Trade';
import SharePosition from './trade/SharePosition';
import { NavigationArgs } from './navigation';
import Balance from './home/Balance';
import { BottomNavbar } from './navbar/BottomNavbar';


const Stack = createStackNavigator<NavigationArgs>();

const MainApp = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomNavbar" component={BottomNavbar} />
        <Stack.Screen name="Trade" component={Trade} />
        <Stack.Screen name="Balance" component={Balance} />
        <Stack.Screen name="SharePosition" component={SharePosition} />
    </Stack.Navigator>
);

export default MainApp;