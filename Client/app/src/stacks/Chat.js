import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View 
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import Profile from "../screen/Profile";
import { set_mode } from "../../redux/info/mode";
import ChatList from "../screen/ChatList";
import ChatRoom from "../screen/ChatRoom";

const ChatStack = createNativeStackNavigator();
export function ChatStackScreen() {
  const dispatch = useDispatch()

    const { user } = useSelector(s => s.user);
    const { nested_nav } = useSelector(s => s.nested_nav);
    const navigation = useNavigation();

    return (
        <ChatStack.Navigator>

            <ChatStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{ display: 'none'}}
                        >
                        </View>
                    ),
                }}
                
                name="chat" component={ChatList}
            />

            <ChatStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{ display: 'none'}}
                        >
                        </View>
                    ),
                }}
                
                name="chat-room" component={ChatRoom}
            />


        </ChatStack.Navigator>  
    ); 
}
