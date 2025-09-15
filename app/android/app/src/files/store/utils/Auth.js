
import * as React from 'react';
import { 
    Dimensions,
    Image,
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
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import GetStarted from '../auth/GetStarted';
import { useNavigation } from '@react-navigation/native';
import { getDeviceId } from './IdGen';
import { setUserAuthTo } from '../../../../../../redux/reducer/auth';
import EmailScreen from '../auth/ConfirmEmail';
import PasswordScreen from '../auth/PwdRecovery';
const Tab = createBottomTabNavigator();


const AuthStack = createNativeStackNavigator();
export default function AuthStackScreen({updateActiveJsx}) {
    const navigation = useNavigation();
      const dispatch = useDispatch()
    
    
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{color: '#FF4500', fontSize: 20, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                        {/* <TouchableOpacity onPress={e=> {
                            navigation.navigate('user-login')
                        }} style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>

                            <Ionicons name={'log-out'} size={24} color={'#FF4500'} />
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            
                        </TouchableOpacity> */}
                    </View>
                ),
            }} 
                
                name="user-starter" component={GetStarted} />
            
            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            {/* <Image height={45} width={45} source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} /> */}
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                        <TouchableOpacity onPress={async(e)=> {
                            let user = await getDeviceId();
                           
                            dispatch(setUserAuthTo(false))
                            
                        }} style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: 'bold' }}>Skip</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>

                            <Ionicons name={'log-out'} size={24} color={'#FF4500'} />
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            
                        </TouchableOpacity>
                    </View>
                ),
            }}  name="user-login" component={Login} />
            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            {/* <Image height={45} width={45} source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} /> */}
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                        <TouchableOpacity onPress={async(e) => {
                            let user = await getDeviceId();
                           
                            dispatch(setUserAuthTo(false))

                        }} style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: 'bold' }}>Skip</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>

                            <Ionicons name={'log-out'} size={24} color={'#FF4500'} />
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            
                        </TouchableOpacity>
                    </View>
                ),
            }}   name="user-signup" component={Signup} />

           

            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            {/* <Image height={45} width={45} source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} /> */}
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                        <TouchableOpacity onPress={async(e)=> {
                            let user = await getDeviceId();
                           
                            dispatch(setUserAuthTo(false))
                            
                        }} style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: 'bold' }}>Skip</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>

                            <Ionicons name={'log-out'} size={24} color={'#FF4500'} />
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            
                        </TouchableOpacity>
                    </View>
                ),
            }}  name="user-email-confirmation" component={EmailScreen} />

            <AuthStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            {/* <Image height={45} width={45} source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} /> */}
                            <Text style={{color: '#FF4500', fontSize: 16, fontWeight: 'bold'}}>Campus Sphere</Text>
                        </View>

                        <TouchableOpacity onPress={async(e)=> {
                            let user = await getDeviceId();
                           
                            dispatch(setUserAuthTo(false))
                            
                        }} style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'center'}}>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: 'bold' }}>Skip</Text>
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>

                            <Ionicons name={'log-out'} size={24} color={'#FF4500'} />
                            <Text>&nbsp;</Text>
                            <Text>&nbsp;</Text>
                            
                        </TouchableOpacity>
                    </View>
                ),
            }}  name="user-password-recovery" component={PasswordScreen} />
        </AuthStack.Navigator>
    );
}

