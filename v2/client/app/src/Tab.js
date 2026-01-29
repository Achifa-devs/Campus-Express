import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./stacks/Home";
import SellStackScreen from "./stacks/Sell";
import SearchStackScreen from "./stacks/Search";
import ChatStackScreen from "./stacks/Chat";
import MoreStackScreen from "./stacks/More";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TAB_ICONS = {
  Home: { active: "home", inactive: "home-outline" },
  Search: { active: "text-search", inactive: "text-search" },
  Sell: { active: "tag", inactive: "tag-outline" },
  Chat: { active: "message", inactive: "message-outline" },
  More: { active: "menu", inactive: "menu" },
};

export default function BottomTab() {
  const Tab = createBottomTabNavigator();
  const [tabBarStyle, setTabBarStyle] = useState("flex");

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const icons = TAB_ICONS[route.name] ?? { active: "help", inactive: "help" };
            const iconName = focused ? icons.active : icons.inactive;
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size ?? 26}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#FFA500",
          tabBarInactiveTintColor: "#9CA3AF",
          headerShown: false,
          tabBarStyle: { display: tabBarStyle },
        })}
      >
                <Tab.Screen 
                name="Home" 
                component={HomeStackScreen} /> 


                <Tab.Screen 
                name="Search"  
                component={SearchStackScreen} />

                <Tab.Screen 
                name="Sell"  
                component={SellStackScreen} />

                <Tab.Screen 
                name="Chat"  
                component={ChatStackScreen} />

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