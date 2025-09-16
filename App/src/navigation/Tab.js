
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
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.


import { HomeStackScreen } from '../stacks/Home';
// import { ProfileStackScreen } from '../stacks/Profile';
// import { SellStackScreen } from '../stacks/Sell';

const Tab = createBottomTabNavigator();

export default function Main({navigation}) {
    
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
                        HomeRoute(navigationState, updateTabBarStyle);
                    } else if (route.name === 'Sell') {
                        iconName = focused ? 'storefront' : 'storefront-outline';
                        CreateRoute(navigationState, updateTabBarStyle); 
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                        ProfileRoute(navigationState, updateTabBarStyle);
                    }
                    return <Ionicons  name={iconName} size={size} color={color} />;
                
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

            {/* <Tab.Screen 
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
                 
                name="Profile" 
                component={ProfileStackScreen} sub={false} /> */}

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
    if (currentRouteName === 'home') {
        updateTabBarStyle('flex');
    }else if(currentRouteName === 'lodge-room'){
        updateTabBarStyle('none');
    }else if(currentRouteName === 'service-room'){
        updateTabBarStyle('none');
    }else if (currentRouteName === 'search') {
        updateTabBarStyle('none');
    }else if(currentRouteName === 'shops') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'notification') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'category') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'product') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'new-order') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'all-category') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'type') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'shops') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'type-product') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'payment'){
        updateTabBarStyle('none'); 
    }
}


function CreateRoute(navigationState, updateTabBarStyle) {
    const currentRouteName = navigationState?.routes.find(r => r.name === 'Sell')?.state?.routes[navigationState.routes.find(r => r.name === 'Sell')?.state.index].name;
    if (currentRouteName === 'sell') {
        updateTabBarStyle('flex');
    }else if (currentRouteName === 'new-listing') {
        updateTabBarStyle('none');
    }else if(currentRouteName === 'shop'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'metrics'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'reviews'){
        updateTabBarStyle('none'); 
    }
}

function ProfileRoute(navigationState, updateTabBarStyle) {
    const currentRouteName = navigationState?.routes.find(r => r.name === 'Profile')?.state?.routes[navigationState.routes.find(r => r.name === 'Profile')?.state.index].name;
    if (currentRouteName === 'profile') {
        updateTabBarStyle('flex');
    }else if (currentRouteName === 'history') {
        updateTabBarStyle('none');
    }else if (currentRouteName === 'subscription') {
        updateTabBarStyle('none');
    }else if(currentRouteName === 'favourite') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'data') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'preference') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'invite') {
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'account'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'logout'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'security'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'email-update'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'phone-update'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'pwd-update'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'notification'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'report'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'terms'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'policy'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'blog'){
        updateTabBarStyle('none'); 
    }else if(currentRouteName === 'support'){
        updateTabBarStyle('none'); 
    }
}

