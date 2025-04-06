
import * as React from 'react';
import { 
    Dimensions,
    Image,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar
} from 'react-native';
import BellSvg from '../assets/notification-svgrepo-com (1).svg'
import SettingSvg from '../assets/settings-svgrepo-com (8).svg'
import BackSvg from '../assets/back-svgrepo-com (4).svg'

import { 
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs";
import {  
    useDispatch, 
    useSelector 
} from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
// import StackNavigator from './Nav';
// import Message from '../studio/screens/Message';
import Order from '../studio/screens/Order';
import Profile from '../studio/screens/Profile';
import Create from '../studio/screens/Create';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import Home from '../studio/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../studio/screens/Chat';
import { useRoute } from '@react-navigation/native';
import OrderRoom from '../studio/screens/OrderRoom';
import Listing from '../studio/screens/Listing';
import Account from '../studio/screens/Account';
import Invite from '../studio/screens/Invite';
import Preference from '../studio/screens/Preference';
import PersonalData from '../studio/screens/PersonalData';
import Setting from '../studio/screens/Setting';
import AccountSecurity from '../studio/screens/Settings/AccountSecurity&Privacy';
import ChangePhone from '../studio/screens/Settings/AccountSecurity/ChangePhone';
import ChangePwd from '../studio/screens/Settings/AccountSecurity/ChangePwd';
import Verification from '../studio/screens/Settings/AccountSecurity/Verification';
import Logout from '../studio/screens/Settings/AccountSecurity/Logout';
import ConnectedServices from '../studio/screens/Settings/AccountSecurity/ConnectedServices';
import Notification from '../studio/screens/Settings/Notification';
import { get_cookie } from './AsyncStore.js';
import ChangeEmail from '../studio/screens/Settings/AccountSecurity/ChangeEmail.js';
import Pin from '../studio/screens/Settings/AccountSecurity/Pin.js';
import Bio from '../studio/screens/Settings/AccountSecurity/Bio.js';
import Shop from '../studio/screens/Settings/AccountSecurity/Shop.js';
import ShopDetails from '../studio/screens/Settings/Shop/Details.js';
import ShopContact from '../studio/screens/Settings/Shop/Contact.js';
import ShopLocale from '../studio/screens/Settings/Shop/ShopLocale.js';
import Payments from '../studio/screens/Settings/Shop/Payments.js';
import Sub from '../studio/screens/Settings/Shop/Sub.js';
import Security from '../studio/screens/Settings/Shop/Security.js';
import Branding from '../studio/screens/Settings/Shop/Branding.js';
// import ExchangeAlert from '../studio/screens/Settings/ExchangeAlert';
// import ChangeEmail from '../studio/screens/Settings/AccountSecurity/ChangeEmail';

const Tab = createBottomTabNavigator();

export default function StudioTab({ navigation }) {
    
    
    const navigationState = useNavigationState(state => state);

    React.useEffect(() => {
        // console.log('Current Navigation State:', navigationState);
    }, [navigationState]);

  return (
    <>
        <Tab.Navigator  screenOptions={({ route }) => {
           
            const tabBarStyle = {
                display: 'flex',
            };

            if (route.name === 'tab-message') {
                const currentRouteName = navigationState?.routes.find(r => r.name === 'tab-message')?.state?.routes[navigationState.routes.find(r => r.name === 'tab-message')?.state.index].name;
                // console.log('Current MessageStack Route:', currentRouteName);

                if (currentRouteName === 'user-message') {
                    tabBarStyle.display = 'none';
                }
            }else if(route.name === 'tab-home') {
                const currentRouteName = navigationState?.routes.find(r => r.name === 'tab-home')?.state?.routes[navigationState.routes.find(r => r.name === 'tab-home')?.state.index].name;
                // console.log('Current HoProfileStack Route:', currentRouteName);

                if (currentRouteName === 'user-new-listing') {
                    tabBarStyle.display = 'none';
                }
            }else if(route.name === 'tab-order') {
                const currentRouteName = navigationState?.routes.find(r => r.name === 'tab-order')?.state?.routes[navigationState.routes.find(r => r.name === 'tab-order')?.state.index].name;
                // console.log('Current OrderStack Route:', currentRouteName);

                if (currentRouteName === 'user-order-room') {
                    tabBarStyle.display = 'none';
                }
            }  
            else if(route.name === 'tab-profile') {
                const currentRouteName = navigationState?.routes.find(r => r.name === 'tab-profile')?.state?.routes[navigationState.routes.find(r => r.name === 'tab-profile')?.state.index].name;
                // console.log('Current ProfileStack Route:', currentRouteName); 

                if (currentRouteName === 'user-profile') {
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
                component={HoProfileStackScreen} /> 

            {/* <Tab.Screen 
                name="tab-message" 
                component={MessageStackScreen} /> */}

            <Tab.Screen 
                options={{
                header: ({navigation}) =>
                    (
                        <View style={{ height: 200, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#007FFF', alignItems: 'center', justifyContent: 'center'}}>
                        
                            
                        </View>
                    ),
                }}  
                name="tab-listing" 
                component={ListingStackScreen} />

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



const HoProfileStack = createNativeStackNavigator();
function HoProfileStackScreen() {
  return (
    <HoProfileStack.Navigator>
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
              <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', padding: '10px' }}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" />
                    
                    <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}></View>
                        <Text>&nbsp;</Text>
                        <Text style={{color: '#fff'}}>Hue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-new-listing')}>
                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}>

                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
            ),
        }}  name="user-home" component={Home} />

        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" />
                    <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#fff',display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>A.F</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('new-listing')}>
                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}>

                        </View>
                    </View>
                    </TouchableOpacity>
                </View>
            ),
        }}  name="user-new-listing" component={Create} />


        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    
                </>
            ),
        // headerShown: false, 
        }} name="user-settings-2-details" component={ShopDetails} />
          

       
        <HoProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }} name="user-settings-2-contact" component={ShopContact} />
        
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    
                </>
            ),
        }} name="user-settings-2-location" component={ShopLocale} />
          
        
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    
                </>
            ),
        }} name="user-settings-2-payments" component={Payments} />

        
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 25, paddingRight: 25}}>
                        <TouchableOpacity onPress={e => navigation.navigate('user-setting')} style={{marginLeft: -18}}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10, padding: 4}}> 
                                    <SettingSvg width={'100%'} height={'100%'} />
                                    <Text style={{backgroundColor: 'hsl(14.086956521739133, 100%, 54.90196078431373%);', height: 'auto', display: 'flex', flexDirection: 'row',width: 'fit-content', alignItems: 'center' ,justifyContent: 'center', position: 'absolute', color: '#fff', right: -8, top: -2.5, borderRadius: 15, borderRadius: 10, fontSize: 10, padding: 3.5}}>20</Text>
                                </View>
                            </View>   
                        </TouchableOpacity>
                        {/* <Text>Profile</Text> */}
                        <TouchableOpacity>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: 20}}>
                        
                        
                        <View style={{ height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 80, borderRadius: 50, backgroundColor: '#000', alignItems: 'center', padding: 20, marginBottom: 10}}>

                        </View>

                        <View style={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: 5, marginBottom: 0}}>
                            <Text style={{color: '#000'}}>shop title</Text>
                        </View> 
                        <View>
                            <TouchableOpacity style={{borderWidth: 2,borderColor: '#efefef', padding: 8, borderRadius: 10, marginTop: 10}}>
                                <Text>Upgrade to premium</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ),
        }} name="user-shop" component={Shop} />
          
        
        
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    
                </>
            ),
          }} name="user-settings-2-security" component={Security} />


          
          <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    
                </>
            ),
        }} name="user-settings-2-branding" component={Branding} />
          
        <HoProfileStack.Screen options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-2" component={Shop} />
    </HoProfileStack.Navigator>  
  );
}

// const MessageStack = createNativeStackNavigator();
// function MessageStackScreen() {
//   return (
//     <MessageStack.Navigator>
//         <MessageStack.Screen  options={{
//             header: ({navigation}) =>
//             (
//                 <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
//                     <StatusBar backgroundColor="#FF4500" barStyle="light-content" />

//                     <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FF4500', alignItems: 'center'}}>
//                         <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Shopiva Chat</Text>
//                     </View>

//                     <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FF4500', alignItems: 'center', padding: '10px'}}>
//                         <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
//                             <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}></View>
//                         </TouchableOpacity>

//                         <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
//                             <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
//                                 <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}>

//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//             ),
//         }}   name="user-message" component={Message} />

//         <MessageStack.Screen options={{
//          header: () =>
//           (
//             <View style={{ height: 70, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
            
//               {
              
//               <View style={{display: 'flex', flexDirection: 'row', zIndex: 1000, height: '100%', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingTop: 25, justifyContent: 'center', position: 'relative'}}>
//                 <View style={{
//                 position: 'absolute',
//                 left: 15,
//                 fontSize: 20,
//                 bottom: 8,
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 fontFamily: 'serif',

//                 }}>
//                   <Text style={{fontSize: 21, height: 50, paddingTop: 10, backgroundColor: '#fff4e0', width: 50, color: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', textAlign: 'center', borderRadius: 50}}>
//                       {/* {seller_name.split(' ')[0].split('')[0]}.{seller_name.split(' ')[1].split('')[0]} */}
//                       A.C
//                   </Text>
//                 </View>

//                 <View style={{
//                 position: 'absolute',
//                 left: 85,
//                 fontSize: 20,
//                 bottom: 12,
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 fontFamily: 'serif',

//                 }}>
//                 <Text style={{
//                 fontFamily: 'serif',
//                 fontSize: 19,
//                 color: '#fff',
//                 fontWeight: 'bold',

//                 }}>
//                     {/* {seller_name} */}
//                     Akpulu Chinedu
//                 </Text>

//                 <Text style={{
//                 fontFamily: 'serif',
//                 fontSize: 11,
//                 color: '#fff',
//                 fontWeight: 'bold',

//                 }}>
//                 active 
//                 {/* {js_ago(new Date(seller_date))} */}
//                 </Text>
//                 </View> 

//                 <View style={{
//                 position: 'absolute',
//                 right: 25,
//                 fontSize: 20,
//                 bottom: 12,
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 fontFamily: 'serif',

//                 }}>

                
                
//                 </View> 

//               </View>

              
//               }
//             </View>
//           ),
//       }} name="user-chat-room" component={ChatScreen} />
//     </MessageStack.Navigator>
//   ); 
// }

const OrderStack = createNativeStackNavigator();
function OrderStackScreen() {
  return (
    <OrderStack.Navigator>

        <OrderStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" />

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FF4500', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Shopiva Orders</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FF4500', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}>

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
            <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                <StatusBar backgroundColor="#FF4500" barStyle="light-content" />

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FF4500', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Order Details</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FF4500', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
          ),
      }} name="user-order-room" component={OrderRoom} />

    </OrderStack.Navigator>
  ); 
}

const ListingStack = createNativeStackNavigator();
function ListingStackScreen() {
  return (
    <ListingStack.Navigator>

        <ListingStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" />

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FF4500', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Shopiva Orders</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FF4500', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            ),
        }}   name="user-listing" component={Listing} />

    </ListingStack.Navigator>
  ); 
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
    let {
        user
    } = useSelector(s => s.user);
    
    

  return (
    <ProfileStack.Navigator>

        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 25, paddingRight: 25}}>
                        <TouchableOpacity onPress={e => navigation.navigate('user-setting')} style={{marginLeft: -18}}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10, padding: 4}}> 
                                    <SettingSvg width={'100%'} height={'100%'} />
                                    <Text style={{backgroundColor: 'hsl(14.086956521739133, 100%, 54.90196078431373%);', height: 'auto', display: 'flex', flexDirection: 'row',width: 'fit-content', alignItems: 'center' ,justifyContent: 'center', position: 'absolute', color: '#fff', right: -8, top: -2.5, borderRadius: 15, borderRadius: 10, fontSize: 10, padding: 3.5}}>20</Text>
                                </View>
                            </View>   
                        </TouchableOpacity>
                        {/* <Text>Profile</Text> */}
                        <TouchableOpacity>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: 20}}>
                        
                        
                        <View style={{ height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 80, borderRadius: 50, backgroundColor: '#000', alignItems: 'center', padding: 20, marginBottom: 10}}>

                        </View>

                        <View style={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: 5, marginBottom: 0}}>
                            <Text style={{color: '#000'}}>{user?.fname} {user?.lname}</Text>
                            <Text style={{color: '#000'}}>{user?.email}</Text>
                        </View> 
                        <View>
                            <TouchableOpacity style={{borderWidth: 2,borderColor: '#efefef', padding: 8, borderRadius: 10, marginTop: 10}}>
                                <Text>Upgrade to premium</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ),
        }}   name="user-profile" component={Profile} />

       
        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-data" component={PersonalData} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-invite" component={Invite} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-setting" component={Setting} />
        

        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    
                </>
            ),
            // headerShown: false, 
        }} name="user-settings-1-pin" component={Pin} />
        
        <ProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    
                </>
            ),
            // headerShown: false, 
        }}  name="user-settings-1-biometrics" component={Bio} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-1" component={AccountSecurity} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-1-email" component={ChangeEmail} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-1-phone" component={ChangePhone} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-1-password" component={ChangePwd} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-1-verification" component={Verification} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-1-logout" component={Logout} />

        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-1-connected-services" component={ConnectedServices} />

        
        <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-3" component={Notification} />

        {/* <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            
                        </View>
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-settings-3" component={ExchangeAlert} />
 */}

    </ProfileStack.Navigator>
  ); 
}