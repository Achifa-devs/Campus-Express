
import * as React from 'react';
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
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

import { 
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs";
import {  
    useDispatch, 
    useSelector 
} from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
// import { setUserAuthTo } from '../../../../../../redux/reducer/auth';
import Login from '../screen/Auth/Login';
import Signup from '../screen/Auth/Signup';
import EmailScreen from '../screen/Auth/ConfirmEmail';
import PasswordScreen from '../screen/Auth/PwdRecovery';
const Tab = createBottomTabNavigator();


const AuthStack = createNativeStackNavigator();
export default function AuthStackScreen({updateActiveJsx}) {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    
    
    return (
        <AuthStack.Navigator> 
            
            
            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                    </View>
                ),
            }}  name="login" component={Login} />

            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                    </View>
                ),
            }}   name="signup" component={Signup} />

           

            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>
                    </View>
                ),
            }}  name="email-confirmation" component={EmailScreen} />

            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                    </View>
                ),
            }}  name="password-recovery" component={PasswordScreen} />
        </AuthStack.Navigator>
    );
}

