import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigationState } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { HomeStackScreen } from '../../utils/Stacks/Home';
import { ProfileStackScreen } from '../../utils/Stacks/Profile';
import { SellStackScreen } from '../../utils/Stacks/Sell';
import { InventoryStackScreen } from '../../utils/Stacks/Inventory';

const Tab = createBottomTabNavigator();

export default function StoreTab() {
  const navigationState = useNavigationState(state => state);
  const [tabBarDisplay, setTabBarDisplay] = React.useState('flex');

  const HIDDEN_TAB_ROUTES = new Set([
    'user-search', 'user-shops', 'user-notification', 'user-category',
    'user-product', 'user-new-order', 'all-category', 'user-type', 'user-type-product',
    'user-new-listing', 'user-history', 'user-favourite', 'user-data', 'user-preference',
    'user-invite', 'user-account', 'user-logout', 'user-security', 'user-email-update',
    'user-phone-update', 'user-pwd-update', 'user-shop', 'user-reviews', 'user-report',
    'user-terms', 'user-policy', 'user-blog', 'user-support'
  ]);

  const getCurrentNestedRouteName = (tabName) => {
    const tab = navigationState?.routes.find(r => r.name === tabName);
    const nestedState = tab?.state;
    if (!nestedState) return null;
    return nestedState.routes[nestedState.index]?.name ?? null;
  };

  const updateTabBarVisibility = () => {
    if (navigationState?.routes) {
      for (const tab of navigationState?.routes) {
        const nested = tab?.state;
        const currentNestedRoute = nested?.routes[nested.index]?.name;
        if (HIDDEN_TAB_ROUTES.has(currentNestedRoute)) {
          setTabBarDisplay('none');
          return;
        }
      }
      setTabBarDisplay('flex');
    } else {
      setTabBarDisplay('flex');
    }
  };

  React.useEffect(() => {
    updateTabBarVisibility();
  }, [navigationState]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Sell') iconName = 'storefront-outline';
        else if (route.name === 'Profile') iconName = 'person-circle-outline';
        else if (route.name === 'Inventory') iconName = 'cube-outline';

        return {
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
          tabBarActiveTintColor: '#FF4500',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: { display: tabBarDisplay },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Sell" component={SellStackScreen} />
      <Tab.Screen name="Inventory" component={InventoryStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}










