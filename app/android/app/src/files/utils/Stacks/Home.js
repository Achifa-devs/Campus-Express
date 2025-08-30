import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Category from "../../store/screens/Category";
import Home from "../../store/screens/Home";
import NewOrder from "../../store/screens/NewOrder";
import Notification from "../../store/screens/Notification";
import Product from "../../store/screens/Product";
import TypeProducts from "../../store/screens/Products";
import Search from "../../store/screens/Search";
import Shops from "../../store/screens/Shops";
import Type from "../../store/screens/Type";
import ShopDetails from "../../store/screens/Drawer/Shop/Details";
import ShopContact from "../../store/screens/Drawer/Shop/Contact";
import ShopLocale from "../../store/screens/Drawer/Shop/ShopLocale";
import Payments from "../../store/screens/Drawer/Shop/Payments";
import Bank from "../../store/screens/Drawer/Bank";
import ShopLocation from "../../store/screens/Drawer/ShopLocale";
import Security from "../../store/screens/Drawer/Shop/Security";
import Refund from "../../store/screens/Drawer/Refund";
import Shipping from "../../store/screens/Drawer/Shipping";
import Report from "../../store/screens/Drawer/Report";
import Reviews from "../../store/screens/Drawer/Reviews";
import Branding from "../../store/screens/Drawer/Shop/Branding";
import Preference from "../../store/screens/Drawer/Preference";
import Shopile from "../../store/screens/Drawer/Shop";
import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Icon from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from "react-redux";
import BackSvg from '../../media/assets/back-svgrepo-com (1).svg'
import React, { useEffect, useState } from "react";
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
import LodgeListScreen from "../../store/screens/Lodge";
import AccommodationDetailScreen from "../../store/screens/LodgeRoom";
import CampusNewsScreen from "../../store/screens/News";
import NotificationScreen from "../../store/screens/NotificationScreen";
import Editor from "../../store/screens/HiddenScreens/Editor";
import Productimages from "../../store/screens/Productimages";
import NavigationTabs from "../../store/components/Home/Ads";
import AdvancedSearchBar from "../../store/components/Home/Search";
import { set_sub_modal } from "../../../../../../redux/sub";
import ServiceDetailScreen from "../../store/screens/ServiceRoom";
import PaymentScreen from "../../store/utils/Paystack";
import ReviewSubmissionScreen from "../../store/screens/Review";
import Shop from "../../store/screens/Shop";
const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
   
    const {user} = useSelector(s => s.user);
    const {subscribed} = useSelector(s => s.subscribed);
    const {campus} = useSelector(s => s.campus);
    
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(campus)
    }, [campus])

    function handleSub(params) {
        dispatch(set_sub_modal(1))

        // if(!subscribed){
        // }
    }
     

    return (  
      
    <HomeStack.Navigator>
        
        
        <HomeStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <>
                        <View style={styles.headerContainer}>
                            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
                            
                            {/* Logo */}
                            <View style={styles.logoContainer}>
                                <Image 
                                source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} 
                                style={styles.logo}
                                resizeMode="contain"
                                />
                            </View>

                            {/* Right Section */}
                            <View style={styles.rightSection}>
                                {/* Location Selector */}
                                

                                {/* Subscribe Button */}
                                {user && (
                                // <TouchableOpacity 
                                //     style={styles.loginButton}
                                //     onPress={() => dispatch(setUserAuthTo(true))}
                                //     activeOpacity={0.9}
                                // >
                                //     <Text style={styles.loginText}>Login</Text>
                                //     <Icon name="log-in-outline" size={16} color="#FFF" />
                                // </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, subscribed && styles.subscribedButton]}
                                    onPress={e=> handleSub()}
                                    activeOpacity={0.8}
                                    >
                                    <View style={styles.buttonContent}>
                                        <Icon 
                                        name={subscribed ? "diamond" : "diamond-outline"} 
                                        size={16} 
                                        color={subscribed ? "#FFF" : "#FF4500"} 
                                        style={styles.icon}
                                        />
                                        <Text style={[styles.buttonText, subscribed && styles.subscribedText]}>
                                        {subscribed ? 'Subscribed' : 'Subscribe'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                )}
                            </View>
                        </View>
                                                
                        <AdvancedSearchBar />
                        <NavigationTabs />
                    </>
                ),
            // headerShown: false, 
          }} name="user-home" component={Home} /> 

          <HomeStack.Screen 
            name="user-subscription" 
            component={PaymentScreen}
            options={{ headerShown: false }}
        />

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
            <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', elevation: 2, paddingLeft: 15, paddingRight: 25 }}>
                <TouchableOpacity style={{
                height: 55,
                borderRadius: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 45,
                }} onPress={e => navigation.goBack()}> 
                    <Ionicons name={'chevron-back'} size={25} color={'#000'} />
                </TouchableOpacity>
                <View style={{ backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    marginLeft: 0,
                    // flexShrink: 1,
                    marginBottom: 5
                }}>
                    Explore Campus Vendors
                </Text>
                </View>
            </View>
            ),
            
        }}   name="user-explore-shop" component={Shop} />
        <HomeStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <>
                        <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px' }}>
                            <TouchableOpacity onPress={e=> navigation.goBack()} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 2.5}}>
                                <Ionicons name={"chevron-back"} size={25} /> 
                            </TouchableOpacity>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold', 
                                    color: '#111',
                                }}>Publish your review</Text>
                                
                            </View>
                        </View>
                    
                        
                    </> 
                ),
            // headerShown: false, 
        }}  name="user-review-submission" component={ReviewSubmissionScreen} />

        <HomeStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <>
                        <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px' }}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold', 
                                    color: '#111',
                                }}>Notification details</Text>
                                
                            </View>
                        </View>
                    
                        
                    </>
                ),
            // headerShown: false, 
          }} name="user-notification-details" component={Notification} />
          
        <HomeStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <>
                        <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px' }}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold', 
                                    color: '#111',
                                }}>Editor (Hidden Screen)</Text>
                                
                            </View>
                        </View>
                    
                        
                    </>
                ),
            // headerShown: false, 
        }}  name="user-editor" component={Editor} />
           
        <HomeStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <>
                        <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px' }}>
                            <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                                <BackSvg width={22} height={22} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold', 
                                    color: '#111',
                                }}>Campus Lodge</Text>
                                <Text style={{
                                    fontSize: 13,
                                    color: '#777',
                                    marginTop: .4,
                                }}>Find lodges at your campus area</Text>
                            </View>
                        </View>
                    
                        
                    </>
                ),
            // headerShown: false, 
            }}  name="user-lodge" component={LodgeListScreen} />

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false, 
          }} name="user-service-room" component={ServiceDetailScreen} />
          
        <HomeStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <>
                    <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px' }}>
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                            <BackSvg width={22} height={22} />
                        </TouchableOpacity>
                        <View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>Campus News</Text>
                            <Text style={{
                                fontSize: 13,
                                color: '#777',
                                marginTop: .4,
                            }}>Stay informed with the latest updates</Text>
                        </View>
                    </View>
                    
                        
                    </>
                ),
            // headerShown: false, 
            }}  name="user-news" component={CampusNewsScreen} />

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
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, width: '100%', backgroundColor: '#FFF', alignItems: 'center', padding: '10px' }}>
                    <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5}}>
                        <BackSvg width={22} height={22} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold', 
                            color: '#111',
                        }}>Notification</Text>
                        
                    </View>
                </View>
            ), 
            // headerShown: false, 
        }}  name="user-notification" component={NotificationScreen} /> 

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }} name="user-shops" component={Shops} />
          
        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 0, display: 'none ', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }}  name="all-category" component={Category} />

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 45, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }}  name="user-product" component={Product} />

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 45, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }}  name="user-product-images" component={Productimages} />
        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }}  name="user-lodge-room" component={AccommodationDetailScreen} />
        
         <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 60, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>  
                    
                </View>  
            ), 
            // headerShown: false,  
        }}  name="user-type-product" component={TypeProducts} />
        
        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

                </View>
            ), 
            // headerShown: false,  
        }}  name="user-type" component={Type} />

        <HomeStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
                    <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 7}}>
                        <BackSvg width={19} height={19} />
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>New order</Text>
                    </View>
                </View>
            ), 
            // headerShown: false,  
        }}  name="user-new-order" component={NewOrder} />
        
        

        <HomeStack.Screen  options={{
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
          

       
        <HomeStack.Screen  options={{
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
        
        <HomeStack.Screen  options={{
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
          
        
        <HomeStack.Screen  options={{
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

          <HomeStack.Screen  options={{
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
        
        {/* <HomeStack.Screen  options={{
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
        }} name="user-shop" component={Shop} /> */}
          
        <HomeStack.Screen  options={{
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
        
        <HomeStack.Screen  options={{
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

        <HomeStack.Screen  options={{
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

        <HomeStack.Screen  options={{
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
        
        {/* <HomeStack.Screen  options={{
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
        }} name="user-analytics" component={Analytics} />    */}
        
        <HomeStack.Screen  options={{
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
          
        <HomeStack.Screen  options={{
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
        
        <HomeStack.Screen  options={{
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
          
        {/* <HomeStack.Screen options={{
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
        }}  name="user-settings-2" component={Shop} /> */}

        <HomeStack.Screen options={{
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
        
        <HomeStack.Screen options={{
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
    </HomeStack.Navigator>
  );
}   

const styles = StyleSheet.create({
    headerContainer: { 
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 40,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE5D9',
    minWidth: 120,
    maxWidth: 160,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  locationText: {
    color: '#FF4500',
    fontWeight: '600',
    fontSize: 13,
    marginHorizontal: 6,
    flexShrink: 1,
  },
  notificationButton: {
    padding: 8,
  },
  notificationContainer: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#FFF6F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#FF4500',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  subscribedButton: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  subscribedText: {
    color: '#FFF',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4500',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#FF4500',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  loginText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
})