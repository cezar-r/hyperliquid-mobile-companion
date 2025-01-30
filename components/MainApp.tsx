import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';
import Home from './home/Home';
import Search from './search/Search';
import Feed from './feed/Feed';
import Trade from './trade/Trade';
import Profile from './profile/Profile';
import { Colors } from '../styles/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
        tabBarStyle: {
            backgroundColor: Colors.DARK_DARK_GREEN,
            borderTopWidth: 1,
            borderTopColor: Colors.GRAY,
            height: 80,
            position: 'absolute',
            bottom: 0,
            borderRadius: 5,
            paddingBottom: 20,
            paddingTop: 4,
        },
        tabBarActiveTintColor: Colors.BRIGHT_GREEN,
        tabBarInactiveTintColor: Colors.GRAY,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: Colors.DARK_DARK_GREEN,
          borderBottomWidth: 1,
          height: 100,
          borderBottomColor: Colors.GRAY,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
            // fontWeight: 'bold',
            fontSize: 22,
          },
        headerTitle: 'Hyperliquid',
      }}>
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={26} 
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={Search}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'search' : 'search-outline'} 
                size={26} 
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen 
          name="X Feed" 
          component={Feed}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'newspaper' : 'newspaper-outline'} 
                size={26} 
                color={color}
              />
            ),
          }}
        />
         <Tab.Screen 
          name="Profile" 
          component={Profile}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'person' : 'person-outline'} 
                size={26} 
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
);

const MainApp = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Trade" component={Trade} />
    </Stack.Navigator>
);

export default MainApp;
