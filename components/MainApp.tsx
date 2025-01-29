import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from './home/Home';
import Search from './search/Search';
import Feed from './feed/Feed';
import Profile from './profile/Profile';
import { Colors } from '../styles/colors';


const Tab = createBottomTabNavigator();

const MainApp = () => (
  <Tab.Navigator initialRouteName="Home" screenOptions={{
    tabBarStyle: {
        backgroundColor: Colors.DARK_DARK_GREEN,
        borderTopWidth: 1,
        borderTopColor: Colors.GRAY,
        height: 80,
        position: 'absolute',
        bottom: 0,
        borderRadius: 15,
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

export default MainApp;
