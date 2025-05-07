
import * as React from 'react';
import { 
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View 
} from 'react-native';

import {  
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs";
import {  
    useDispatch, 
    useSelector 
} from 'react-redux';
// import Create from '../screens/Create';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.


import { HomeStackScreen } from '../../utils/Stacks/Home';
import { MessageStackScreen } from '../../utils/Stacks/Message';
import { OrderStackScreen } from '../../utils/Stacks/Order';
import { ProfileStackScreen } from '../../utils/Stacks/Profile';
import { SellStackScreen } from '../../utils/Stacks/Sell';
import { InventoryStackScreen } from '../../utils/Stacks/Inventory';
import { SalesStackScreen } from '../../utils/Stacks/Sales';

const Tab = createBottomTabNavigator();

export default function StoreTab({navigation}) {
    
    const navigationState = useNavigationState(state => state);

    React.useEffect(() => {
        // console.log('Current Navigation State:', navigationState);
    }, [navigationState]);

    let [tabBarStyle, setTabBarStyle] = React.useState('flex')

    function updateTabBarStyle(data) {
        setTabBarStyle(data)
    }

  return (
    <>
        <Tab.Navigator 
         
            screenOptions={({ route }) => ({
                
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                        HomeRoute(navigationState, updateTabBarStyle)
                    } else if (route.name === 'Messages') {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (route.name === 'Sales') {
                        iconName = focused ? 'pricetags-outline' : 'pricetags-outline';
                    } else if (route.name === 'Sell') {
                        iconName = focused ? 'storefront' : 'storefront-outline';
                        CreateRoute(navigationState, updateTabBarStyle) 
                    } else if (route.name === 'Inventory') {
                        iconName = focused ? 'cube' : 'cube-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                        ProfileRoute(navigationState, updateTabBarStyle)
                    }
                    return <Ionicons  name={iconName} size={size} color={color} />;
                    // console.log('Icon name: ', iconName);

                
                },
                
                tabBarActiveTintColor: '#FF4500',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    display: tabBarStyle
                },
                

        })}>
        
         
            <Tab.Screen 
                
                options={{
                    header: ({navigation}) =>
                    (
                        <View style={{ height: 0, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#007FFF', alignItems: 'center', padding: '10px'}}>

                            
                        </View>
                    ),
                }}
                name="Home" 
                component={HomeStackScreen} /> 

            

            <Tab.Screen 
                name="Messages" 
                component={MessageStackScreen} />
            <Tab.Screen 
                options={{
                    header: ({navigation}) => 
                        (
                            <View style={{ height: 65, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center'}}>
                            
                            </View>
                        ),
                }} 
                name="Orders" 
                component={OrderStackScreen} />
                
            <Tab.Screen 
                options={{
                header: ({navigation}) =>
                    (
                        <View style={{ height: 200, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#007FFF', alignItems: 'center', justifyContent: 'center'}}>
                        
                            
                        </View>
                    ),
                }} 
                name="Sell"  
                component={SellStackScreen} />
                
            <Tab.Screen 
                name="Inventory" 
                component={InventoryStackScreen} />
            <Tab.Screen 
                options={{
                    header: ({navigation}) => 
                        (
                            <View style={{ height: 65, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center'}}>
                            
                            </View>
                        ),
                }} 
                name="Sales" 
                component={SalesStackScreen} />

            <Tab.Screen 
                 
                name="Profile" 
                component={ProfileStackScreen} />

        </Tab.Navigator> 
    </>
  )
}






 

const styles = StyleSheet.create({
    searchCnt:{
        height: 'auto',
        //   width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
        marginBottom: 5
    },
    search:{
        height: 55,
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#efefef'
    }
});
  




function HomeRoute(navigationState, updateTabBarStyle) {
    const currentRouteName = navigationState?.routes.find(r => r.name === 'Home')?.state?.routes[navigationState.routes.find(r => r.name === 'Home')?.state.index].name;
    // console.log('Current MessageStack Route:', currentRouteName);

    if (currentRouteName === 'user-home') {
        updateTabBarStyle('flex');
    }else if (currentRouteName === 'user-search') {
        updateTabBarStyle('none');
    }else if(currentRouteName === 'user-shops') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-notification') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-category') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-product') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-new-order'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'all-category'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-type'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-shops'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-type-product'){
        updateTabBarStyle('none'); 
    }
}


function CreateRoute(navigationState, updateTabBarStyle) {
    const currentRouteName = navigationState?.routes.find(r => r.name === 'Sell')?.state?.routes[navigationState.routes.find(r => r.name === 'Sell')?.state.index].name;
    // console.log('Current SellStack Route:', currentRouteName);

    if (currentRouteName === 'user-sell') {
        updateTabBarStyle('flex');
    }else if (currentRouteName === 'user-new-listing') {
        updateTabBarStyle('none');
    }
}

function ProfileRoute(navigationState, updateTabBarStyle) {
    const currentRouteName = navigationState?.routes.find(r => r.name === 'Profile')?.state?.routes[navigationState.routes.find(r => r.name === 'Profile')?.state.index].name;
    // console.log('Current MessageStack Route:', currentRouteName);

    if (currentRouteName === 'user-profile') {
        updateTabBarStyle('flex');
    }else if (currentRouteName === 'user-history') {
        updateTabBarStyle('none');
    }else if(currentRouteName === 'user-favourite') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-data') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-preference') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-invite') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-account'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-logout'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-security'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-email-update'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-phone-update'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-pwd-update'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-notification'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-shop'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-reviews'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-report'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-terms'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-policy'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'user-blog'){
        updateTabBarStyle('none'); 
    }
}

