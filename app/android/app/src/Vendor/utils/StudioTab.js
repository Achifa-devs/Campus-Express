
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
import BellSvg from '../../media/assets/notification-svgrepo-com (1).svg'
import SettingSvg from '../../media/assets/settings-svgrepo-com (8).svg'
import BackSvg from '../../media/assets/back-svgrepo-com (4).svg'

import { 
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs";
import {  
    useDispatch, 
    useSelector 
} from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons ';
// import StackNavigator from './Nav';
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

// import Message from '../screens/Message';
import Order from '../screens/Order';
import Profile from '../screens/Profile';
import Create from '../screens/Create';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/Chat';
import { useRoute } from '@react-navigation/native';
import OrderRoom from '../screens/OrderRoom';
import Listing from '../screens/Listing';
import Account from '../screens/Account';
import Invite from '../screens/Invite';
import Preference from '../screens/Preference';
import PersonalData from '../screens/PersonalData';
import Setting from '../screens/Setting';
import AccountSecurity from '../screens/Settings/AccountSecurity&Privacy';
import ChangePhone from '../screens/Settings/AccountSecurity/ChangePhone';
import ChangePwd from '../screens/Settings/AccountSecurity/ChangePwd';
import Verification from '../screens/Settings/AccountSecurity/Verification';
import Logout from '../screens/Settings/AccountSecurity/Logout';
import ConnectedServices from '../screens/Settings/AccountSecurity/ConnectedServices';
import Notification from '../screens/Settings/Notification';
import { get_cookie } from '../AsyncStore.js.js';
import ChangeEmail from '../screens/Settings/AccountSecurity/ChangeEmail.js';
import Pin from '../screens/Settings/AccountSecurity/Pin.js';
import Bio from '../screens/Settings/AccountSecurity/Bio.js';
import Shop from '../screens/Settings/AccountSecurity/Shop.js';
import ShopDetails from '../screens/Settings/Shop/Details.js';
import ShopContact from '../screens/Settings/Shop/Contact.js';
import ShopLocale from '../screens/Settings/Shop/ShopLocale.js';
import Payments from '../screens/Settings/Shop/Payments.js';
import Sub from '../screens/Settings/Shop/Sub.js';
import Security from '../screens/Settings/Shop/Security.js';
import Branding from '../screens/Settings/Shop/Branding.js';
import AsideModal from './Aside.js';
import Message from '../screens/Message.js';
import Notice from '../screens/Notice.js';
import Shopile from '../screens/Shop.js';
// import ExchangeAlert from '../screens/Settings/ExchangeAlert';
// import ChangeEmail from '../screens/Settings/AccountSecurity/ChangeEmail';
import { PermissionsAndroid, Platform } from 'react-native';
import Bank from '../screens/Bank.js';
import ShopLocation from '../screens/ShopLocale.js';
import Refund from '../screens/Refund.js';
import Shipping from '../screens/Shipping.js';
import Report from '../screens/Report.js';
import Analytics from '../screens/Analytics.js';
import Reviews from '../screens/Reviews.js';
import { set_drawer } from '../../../../../redux/vendor/drawer.js';

const Tab = createBottomTabNavigator();

export default function StudioTab({ navigation }) {
    
    
    const navigationState = useNavigationState(state => state);

    React.useEffect(() => {

        async function requestContactPermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: "Contacts Permission",
                message: "This app needs access to your contacts.",
                buttonPositive: "OK"
            }
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
        }
        requestContactPermission()
    }, []);

  return (
    <>
       <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Message') {
                    iconName = focused ? 'chatbox' : 'chatbox-outline';
                } else if (route.name === 'Listing') {
                    iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Order') {
                    iconName = focused ? 'receipt' : 'receipt-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                }
                
                // console.log('Icon name: ', iconName);

                return <Ionicons  name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FF4500',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    display: 'flex', // your existing logic can override this
                },
            })}
            >
              {/* Your screens here */}
                 <Tab.Screen 
                    options={{
                        header: ({navigation}) =>
                        (
                            <View style={{ height: 0, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#007FFF', alignItems: 'center', padding: '10px'}}>

                                
                            </View>
                        ),
                    }}
                    name="Home" 
                    component={HoProfileStackScreen} /> 

                <Tab.Screen 
                    name="Message" 
                    component={MessageStackScreen} />

                <Tab.Screen 
                    options={{
                    header: ({navigation}) =>
                        (
                            <View style={{ height: 200, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: '#007FFF', alignItems: 'center', justifyContent: 'center'}}>
                            
                                
                            </View>
                        ),
                    }}  
                    name="Listing" 
                    component={ListingStackScreen} />

                <Tab.Screen 
                    options={{
                        header: ({navigation}) => 
                            (
                                <View style={{ height: 60, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
                                
                                </View>
                            ),
                    }} 
                    name="Order" 
                    component={OrderStackScreen} />

                <Tab.Screen 
                    
                    name="Profile" 
                    component={ProfileStackScreen} />
        </Tab.Navigator>

    </>
  )
}



const HoProfileStack = createNativeStackNavigator();
function HoProfileStackScreen() {
    let dispatch = useDispatch()
    let {drawer} = useSelector(s=> s.drawer)
    const [isModalOpen, setModalOpen] = React.useState(false);
  return (
    <HoProfileStack.Navigator>
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (
              <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', elevation: 2, alignItems: 'center', padding: '10px' }}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 
                     
                    <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}} onPress={() => dispatch(set_drawer(!drawer))}>
                        <View style={{backgroundColor: '#fff', elevation: 0, height: '100%', width: 40, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons  name={'storefront'} size={25} color={'#FF4500'} />
                            
                        </View>
                        <Text>&nbsp;</Text>
                        {/* <Text style={{color: '#000'}}>Hue</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#fff', elevation: 0, height: '100%', width: 40, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons  name={'notifications'} size={25} color={'#FF4500'} />
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
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 5}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Notification</Text>
                    </View>


                </View>
            ),
        }}  name="user-notification" component={Notice} />

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
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Payments</Text>
                        </View>
                    </View>
                    
                </>
            ),
        }} name="user-settings-2-payments" component={Payments} />

          <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Bank setup</Text>
                        </View>
                    </View>
                </>  
            ),
          }} name="user-bank" component={Bank} /> 
        
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
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Business location</Text>
                        </View>
                    </View>
                </>
            ),
        }} name="user-shop-locale" component={ShopLocation} />
        
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
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Refund policy</Text>
                        </View>
                    </View>
                </>
            ),
        }} name="user-refund" component={Refund} /> 

        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Shipping policy</Text>
                        </View>
                    </View>
                </>
            ),
        }} name="user-shipping" component={Shipping} />   
        
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Analytics</Text>
                        </View>
                    </View>
                </> 
            ),
        }} name="user-analytics" component={Analytics} />   
        
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Report</Text>
                        </View>
                    </View>
                </> 
            ),
        }} name="user-report" component={Report} />   
          
        <HoProfileStack.Screen  options={{
            header: ({navigation}) =>
            (

                <>
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                         <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Reviews</Text>
                        </View>
                    </View>
                </> 
            ),
        }} name="user-reviews" component={Reviews} />  
        
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

        <HoProfileStack.Screen options={{
                header: ({navigation}) =>
                (

                    <>
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', elevation: 2,  alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                                <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Preference</Text>
                            </View>
                        </View>
                        
                       
                    </>
                ),
            // headerShown: false, 
        }}  name="user-preference" component={Preference} />
        
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
        }}  name="user-shopile" component={Shopile} /> 
    </HoProfileStack.Navigator>  
  );
}

const MessageStack = createNativeStackNavigator();
function MessageStackScreen() {
  return (
    <MessageStack.Navigator>
        <MessageStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FF4500', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Shopiva Chat</Text>
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
        }}   name="user-message" component={Message} />

        <MessageStack.Screen options={{
         header: () => 
          (
            <View style={{ height: 70, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
            
              {
              
              <View style={{display: 'flex', flexDirection: 'row', zIndex: 1000, height: '100%', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingTop: 25, justifyContent: 'center', position: 'relative'}}>
                <View style={{
                position: 'absolute',
                left: 15,
                fontSize: 20,
                bottom: 8,
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'serif',

                }}>
                  <Text style={{fontSize: 21, height: 50, paddingTop: 10, backgroundColor: '#fff4e0', width: 50, color: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', textAlign: 'center', borderRadius: 50}}>
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
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', elevation: 2, paddingLeft: 10, paddingRight: 10}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#fff', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#000'}}>Orders</Text>
                    </View>
  

                </View>
            ),
        }}   name="user-order" component={Order} />

        <OrderStack.Screen options={{
         header: () =>
          (
            <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', elevation: 2, alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#000'}}>Order Details</Text>
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
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 10, paddingRight: 10, elevation: 2}}>
                    <StatusBar backgroundColor="#FF4500" barStyle="light-content" /> 

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#000'}}>Inventory</Text>
                    </View>

                    {/* <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FF4500', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> */}

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
                        {/* <TouchableOpacity>
                            <Text>Edit</Text>
                        </TouchableOpacity> */}
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
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', elevation: 2, backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Settings</Text>
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
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF',  elevation: 2, alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Account security & privacy</Text>
                            </View>
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
                        <View style={{ height: 50, display: 'flex', flexDirection: 'row', elevation: 2, justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Notification</Text>
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