
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
import BellSvg from '../assets/notification-svgrepo-com (1).svg'
import {  
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs";
import {  
    useDispatch, 
    useSelector 
} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import StackNavigator from './Nav';
import Message from '../store/screens/Message';
import Order from '../store/screens/Order';
import Profile from '../store/screens/Profile';
import Create from '../store/screens/Create';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import Home from '../store/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../store/screens/Chat';
import { useRoute } from '@react-navigation/native';
import OrderRoom from '../store/screens/OrderRoom';
import Preference from '../store/screens/Preference';
import Invite from '../store/screens/Invite';
import Account from '../store/screens/Account';
import Notification from '../store/screens/Notification';
import Category from '../store/screens/Category';
import Search from '../store/screens/Search';
import Product from '../store/screens/Product';
const Tab = createBottomTabNavigator();

export default function StoreTab({navigation}) {
    
    const navigationState = useNavigationState(state => state);

    React.useEffect(() => {
        console.log('Current Navigation State:', navigationState);
    }, [navigationState]);

  return (
    <>
        <Tab.Navigator  screenOptions={({ route }) => {
           
            const tabBarStyle = {
                display: 'flex',
            };

            if (route.name === 'tab-message') {
                const currentRouteName = navigationState?.routes.find(r => r.name === 'tab-message')?.state?.routes[navigationState.routes.find(r => r.name === 'tab-message')?.state.index].name;
                console.log('Current MessageStack Route:', currentRouteName);

                if (currentRouteName === 'user-chat-room') {
                    tabBarStyle.display = 'none';
                }
            }else if(route.name === 'tab-order') {
                const currentRouteName = navigationState?.routes.find(r => r.name === 'tab-order')?.state?.routes[navigationState.routes.find(r => r.name === 'tab-order')?.state.index].name;
                console.log('Current MessageStack Route:', currentRouteName);

                if (currentRouteName === 'order-room') {
                    tabBarStyle.display = 'none';
                }
            } else if(route.name === 'tab-home') {
                const currentRouteName = navigationState?.routes.find(r => r.name === 'tab-home')?.state?.routes[navigationState.routes.find(r => r.name === 'tab-home')?.state.index].name;
                console.log('Current MessageStack Route:', currentRouteName);

                if (currentRouteName === 'user-search') {
                    tabBarStyle.display = 'none';
                }else if(currentRouteName === 'user-notification') {
                    tabBarStyle.display = 'none'; 
                }else if(currentRouteName === 'user-category') {
                    tabBarStyle.display = 'none'; 
                }else if(currentRouteName === 'user-product') {
                    tabBarStyle.display = 'none'; 
                }
            } 
            
            
            return {
                tabBarStyle,
                headerShown: false,
            };

        }}> 
            <Tab.Screen 
                options={{
                    header: ({navigation}) =>
                    (
                        <View style={{ height: 0, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#007FFF', alignItems: 'center', padding: '10px'}}>

                            
                        </View>
                    ),
                }}
                name="tab-home" 
                component={HomeStackScreen} /> 

            <Tab.Screen 
                name="tab-message" 
                component={MessageStackScreen} />

            <Tab.Screen 
                options={{
                header: ({navigation}) =>
                    (
                        <View style={{ height: 200, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#007FFF', alignItems: 'center', justifyContent: 'center'}}>
                        
                            
                        </View>
                    ),
                }} 
                name="user-cart" 
                component={Create} />

            <Tab.Screen 
                options={{
                    header: ({navigation}) => 
                        (
                            <View style={{ height: 60, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
                            
                            </View>
                        ),
                }} 
                name="tab-order" 
                component={OrderStackScreen} />

            <Tab.Screen 
                
                name="tab-profile" 
                component={ProfileStackScreen} />

        </Tab.Navigator> 
    </>
  )
}



const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}></View>
                        <Text>&nbsp;</Text>
                        <Text>Akpulu.F</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                        <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10, padding: 4}}> 
                                <Text style={{backgroundColor: 'hsl(14.086956521739133, 100%, 54.90196078431373%);', height: 'auto', display: 'flex', flexDirection: 'row',width: 'fit-content', alignItems: 'center' ,justifyContent: 'center', position: 'absolute', color: '#fff', left: -8, top: -2.5, borderRadius: 15, borderRadius: 10, fontSize: 10, padding: 3.5}}>20</Text>
                                <BellSvg width={'100%'} height={'100%'} />
                            </View>
                        </View>   
                        </TouchableOpacity>
                    </View>
                ),
            // headerShown: false, 
            }}  name="user-home" component={Home} />
        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px', margin: '0'}}>

                </View>
            ),
            // headerShown: false, 
            }}  name="user-search" component={Search} />
        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false, 
        }}  name="user-notification" component={Notification} /> 

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }}  name="user-category" component={Category} />

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }}  name="user-product" component={Product} />
    </HomeStack.Navigator>
  );
}   



const MessageStack = createNativeStackNavigator();
function MessageStackScreen() {
  return (
    <MessageStack.Navigator>
        <MessageStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Shopiva Chat</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            ),
        }}   name="user-message" component={Message} />

        <MessageStack.Screen options={{
         header: () =>
          (
            <View style={{ height: 70, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
            
              {
              
              <View style={{display: 'flex', flexDirection: 'row', zIndex: 1000, height: '100%', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingTop: 25, justifyContent: 'center', position: 'relative'}}>
                <View style={{
                position: 'absolute',
                left: 15,
                fontSize: 20,
                bottom: 8,
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'serif',

                }}>
                  <Text style={{fontSize: 21, height: 50, paddingTop: 10, backgroundColor: '#fff4e0', width: 50, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', textAlign: 'center', borderRadius: 50}}>
                      {/* {seller_name.split(' ')[0].split('')[0]}.{seller_name.split(' ')[1].split('')[0]} */}
                      A.C
                  </Text>
                </View>

                <View style={{
                position: 'absolute',
                left: 85,
                fontSize: 20,
                bottom: 12,
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'serif',

                }}>
                <Text style={{
                fontFamily: 'serif',
                fontSize: 19,
                color: '#fff',
                fontWeight: 'bold',

                }}>
                    {/* {seller_name} */}
                    Akpulu Chinedu
                </Text>

                <Text style={{
                fontFamily: 'serif',
                fontSize: 11,
                color: '#fff',
                fontWeight: 'bold',

                }}>
                active 
                {/* {js_ago(new Date(seller_date))} */}
                </Text>
                </View> 

                <View style={{
                position: 'absolute',
                right: 25,
                fontSize: 20,
                bottom: 12,
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'serif',

                }}>

                
                
                </View> 

              </View>

              
              }
            </View>
          ),
      }} name="user-chat-room" component={ChatScreen} />
    </MessageStack.Navigator>
  ); 
}

const OrderStack = createNativeStackNavigator();
function OrderStackScreen() {
  return (
    <OrderStack.Navigator>

        <OrderStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Shopiva Orders</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            ),
        }}   name="user-order" component={Order} />

        <OrderStack.Screen options={{
         header: () =>
          (
            <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Order Details</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
          ),
      }} name="order-room" component={OrderRoom} />

    </OrderStack.Navigator>
  ); 
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>

        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ 
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    display: 'flex',
                    width: '100%',
                    height: 180,
                    padding: 0,
                    margin: 0,
                    // borderBottomLeftRadius: 15,
                    // borderBottomRightRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                    backgroundColor: '#FFF',
                    position: 'relative'
                }}>

                    

                </View>
            ),
        }}   name="user-profile" component={Profile} />

        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ 
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    display: 'flex',
                    width: '100%',
                    height: 60,
                    padding: 0,
                    margin: 0,
                    // borderBottomLeftRadius: 15,
                    // borderBottomRightRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                    backgroundColor: '#FFF',
                    position: 'relative'
                }}>

                    

                </View>
            ),
            
        }}   name="user-preference" component={Preference} />

        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ 
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    display: 'flex',
                    width: '100%',
                    height: 60,
                    padding: 0,
                    margin: 0,
                    // borderBottomLeftRadius: 15,
                    // borderBottomRightRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                    backgroundColor: '#FFF',
                    position: 'relative'
                }}>

                    

                </View>
            ),
            
        }}   name="user-invite" component={Invite} />

        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ 
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    display: 'flex',
                    width: '100%',
                    height: 60,
                    padding: 0,
                    margin: 0,
                    // borderBottomLeftRadius: 15,
                    // borderBottomRightRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000',
                    backgroundColor: '#FFF',
                    position: 'relative'
                }}>

                    

                </View>
            ),
            
        }}   name="user-account" component={Account} />

        {/* <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                    
                    <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                    <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}></View>
                    <Text>&nbsp;</Text>
                    <Text>Akpulu.F</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}>

                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
            ),
        }}  name="user-signup" component={Signup} />

        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                    
                    <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                    <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}></View>
                    <Text>&nbsp;</Text>
                    <Text>Akpulu.F</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}>

                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
            ),
        }}  name="user-login" component={Login} /> */}

    </ProfileStack.Navigator>
  ); 
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