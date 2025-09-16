import * as React from 'react';
import { 
  View, 
  StyleSheet, 
  Text 
} from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigationState } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HomeStackScreen } from '../stacks/Home';
// import { ProfileStackScreen } from '../stacks/Profile';
import { SellStackScreen } from '../stacks/Sell';

const Tab = createBottomTabNavigator();

export default function Main() {
  const navigationState = useNavigationState(state => state);
  const [tabBarStyle, setTabBarStyle] = React.useState('flex');

  React.useEffect(() => {
    if (!navigationState) return;

    const getCurrentRoute = (tabName) => {
      const tabState = navigationState?.routes.find(r => r.name === tabName)?.state;
      return tabState?.routes?.[tabState.index]?.name;
    };

    const homeRoute = getCurrentRoute('Home');
    const sellRoute = getCurrentRoute('Sell');
    const profileRoute = getCurrentRoute('Profile');

    // Routes where tab bar should be hidden
    const hideHomeRoutes = [
      'lodge-room', 'service-room', 'search', 'shops', 'notification', 
      'category', 'product', 'new-order', 'all-category', 'type', 
      'type-product', 'payment'
    ];
    const hideSellRoutes = ['new-listing', 'shop', 'metrics', 'reviews'];
    const hideProfileRoutes = [
      'history', 'subscription', 'favourite', 'data', 'preference', 'invite',
      'account', 'logout', 'security', 'email-update', 'phone-update', 
      'pwd-update', 'notification', 'report', 'terms', 'policy', 'blog', 'support'
    ];

    if (
      hideHomeRoutes.includes(homeRoute) ||
      hideSellRoutes.includes(sellRoute) ||
      hideProfileRoutes.includes(profileRoute)
    ) {
      setTabBarStyle('none');
    } else {
      setTabBarStyle('flex');
    }
  }, [navigationState]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sell') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4500',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { display: tabBarStyle },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          header: () => (
            <View
              style={{
                height: 0,
                display: 'none',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                backgroundColor: '#007FFF',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <Text style={{ color: '#fff' }}>Hidden Header</Text>
            </View>
          ),
        }}
      />

      {/* Uncomment these if you have them implemented */}
      
      <Tab.Screen 
        name="Sell"  
        component={SellStackScreen} 
      />
      {/* <Tab.Screen 
        name="Profile" 
        component={ProfileStackScreen} 
      />  */}
     
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  searchCnt: {
    height: 'auto',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  search: {
    height: 55,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#efefef',
  },
});
