import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Haptics from 'expo-haptics';

import { Ionicons } from '@expo/vector-icons';
import Home from './home/Home';
import Search from './search/Search';
import Feed from './feed/Feed';
import Trade from './trade/Trade';
import Profile from './profile/Profile';
import SharePosition from './trade/SharePosition';
import { Colors } from '../styles/colors';
import { NAVBAR_HEIGHT } from '../common/constants';
import { styles } from "../styles/main_app";
import { RootStackParamList } from './navigation';
import Balance from './home/Balance';
import History from './history/History';

const PersistentHeader = () => {
  // Using React.memo to prevent unnecessary re-renders
  return React.memo(() => (
      <Image 
          source={require('../assets/blob_green.gif')}
          style={{ 
              width: 50,
              height: 50,
              resizeMode: 'contain'
          }}
      />
  ));
};

const HeaderComponent = PersistentHeader();


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type TabBarButtonProps = {
    [key: string]: any;
}
  
const TabButton = (props: TabBarButtonProps) => {
      const { children, accessibilityState, onPress } = props;
      const focused = accessibilityState?.selected;
      
      const handlePress = async (e: any) => {
        await Haptics.impactAsync(
            Haptics.ImpactFeedbackStyle.Medium
        );
        onPress?.(e);
    };
    
    return (
        <Pressable {...props} onPress={handlePress} style={styles.tabButton}>
            <View style={styles.tabIconContainer}>
                {focused && <View style={styles.activeLine} />}
                {children}
            </View>
        </Pressable>
    );
  };

const TabNavigator = () => (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
        tabBarStyle: {
            backgroundColor: Colors.DARK_BLACK,
            borderTopWidth: 1,
            borderTopColor: Colors.BLACK,
            height: NAVBAR_HEIGHT,
            position: 'absolute',
            bottom: 0,
            borderRadius: 5,
            paddingBottom: 25,
            paddingTop: 4,
        },
        tabBarActiveTintColor: Colors.BRIGHT_GREEN,
        tabBarInactiveTintColor: Colors.LIGHT_GRAY,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: Colors.DARK_DARK_GREEN,
          borderBottomWidth: 1,
          height: 100,
          borderBottomColor: Colors.BLACK,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.WHITE,
        headerTitle: () => <HeaderComponent />,
        tabBarButton: (props) => <TabButton {...props} />,
      }}>
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons 
                  name={'home'} 
                  size={28}
                  color={color}
                />
            )
          }}
        />
        <Tab.Screen 
          name="History" 
          component={History}
          options={{
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons 
                  name={'history'} 
                  size={28}
                  color={color}
                />
            )
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={Search}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons 
                name={'search'} 
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
            tabBarIcon: ({ color }) => (
                <FontAwesome6 
                  name={'x-twitter'} 
                  size={24}
                  color={color}
                />
            )
          }}
        />
         <Tab.Screen 
          name="Profile" 
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
                name={'account'} 
                size={28}
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
        <Stack.Screen name="Balance" component={Balance} />
        <Stack.Screen name="SharePosition" component={SharePosition} />
    </Stack.Navigator>
);

export default MainApp;