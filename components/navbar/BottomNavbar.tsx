import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pages } from '../../common/constants';
import Colors from '../../styles/colors';
import  styles  from "./styles";

import { Header } from './Header';
import { TabButton } from './tabs/BaseTab';
import { Home } from '../home';
import { HomeTabIcon } from './tabs/HomeTab';
import Chart from '../chart/Chart';
import { ChartTabIcon } from './tabs/ChartTab';
import Search from '../search/Search';
import { SearchTabIcon } from './tabs/SearchTab';
import History from '../history/History';
import { HistoryTabIcon } from './tabs/HistoryTab';
import Profile from '../profile/Profile';
import { ProfileTabIcon } from './tabs/ProfileTab';
 
const Tab = createBottomTabNavigator();

export const BottomNavbar = () => (
    <Tab.Navigator initialRouteName={Pages.HOME} screenOptions={{
      tabBarStyle: styles.tabBarStyle,
      tabBarActiveTintColor: Colors.BRIGHT_ACCENT,
      tabBarInactiveTintColor: Colors.FG_3,
      tabBarShowLabel: false,
      headerStyle: styles.headerStyle,
      headerTintColor: Colors.FG_1,
      headerTitle: () => <Header />,
      tabBarButton: (props) => <TabButton {...props}/>,
    }}>

      <Tab.Screen 
        name={Pages.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeTabIcon 
              color={color}
            />
          )
        }}
      />

      <Tab.Screen 
        name={Pages.CHART} 
        component={Chart}
        options={{
          tabBarIcon: ({ color }) => (
              <ChartTabIcon
                color={color}
              />
          )
        }}
      />

      <Tab.Screen 
        name={Pages.SEARCH} 
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
              <SearchTabIcon
                color={color}
              />
          )
        }}
      />  

      <Tab.Screen 
        name={Pages.HISTORY}
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
              <HistoryTabIcon
                color={color}
              />
          )
        }}
      />

      <Tab.Screen 
        name={Pages.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileTabIcon
              color={color}
            />
          ),
        }}
      />

    </Tab.Navigator>
);