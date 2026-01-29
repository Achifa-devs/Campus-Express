import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackScreen from "./stacks/Home";
import MoreStackScreen from "./stacks/More";
import { use, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function BottomTab(){



    const Tab = createBottomTabNavigator();

    let [tabBarStyle, setTabBarStyle] = useState('flex')

    function updateTabBarStyle(data) {
      setTabBarStyle(data)
    }

    return (
        <>

            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused,color,sized}) => {
                    let iconName;
                    switch(route.name){
                        case "Home":
                        iconName = focused ? 'home' : 'home-outline';
                        break;

                        case "Chat":
                        iconName = focused ? 'chat' : 'chat-outline';
                        break;

                        case "Shop":
                        iconName = focused ? 'shop' : 'shop-outline';
                        break;

                        case "More":
                        iconName = focused ? 'grid' : 'grid-outline';
                        break;

                        default:
                        iconName = 'help-circle-outline';
                    }
                    return <Ionicons  name={iconName} size={sized} color={color} />;
                },
                
                tabBarActiveTintColor: '#FFA500',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    display: tabBarStyle
                }
            })}>
                <Tab.Screen 
                name="Home" 
                component={HomeStackScreen} /> 


                <Tab.Screen 
                name="More"  
                component={MoreStackScreen} />
                
                {/* <Tab.Screen 
                name="Deals"  
                component={DealStackScreen} />

                <Tab.Screen 
                name="Refunds"  
                component={RefundStackScreen} />

                <Tab.Screen 
                name="Sell"  
                component={SellStackScreen} /> */}
            </Tab.Navigator>
        </>
    )
}