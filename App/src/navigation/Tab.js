
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
import { HomeStackScreen } from '../stacks/Home';
import { SellStackScreen } from '../stacks/Sell';
import { ProfileStackScreen } from '../stacks/Profile';
import { ChatStackScreen } from '../stacks/Chat';


const Tab = createBottomTabNavigator();

export default function StoreTab({navigation}) {
    
    const navigationState = useNavigationState(state => state);
    const { nested_nav } = useSelector(s => s?.nested_nav);
    

    

    let [tabBarStyle, setTabBarStyle] = React.useState('flex')

    function updateTabBarStyle(data) {
      setTabBarStyle(data)
    }

    React.useEffect(() => {
      if(nested_nav.boolean){
        setTabBarStyle('flex')
      }else{
        setTabBarStyle('none')
      }
    }, [nested_nav])
  return (
    <>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }else if (route.name === 'Sell') {
              iconName = focused ? 'storefront' : 'storefront-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }else if (route.name === 'Chat') {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
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
          name="Home" 
          component={HomeStackScreen} /> 
        <Tab.Screen 
          name="Chat"  
          component={ChatStackScreen} />
        <Tab.Screen 
          name="Sell"  
          component={SellStackScreen} />
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
  

