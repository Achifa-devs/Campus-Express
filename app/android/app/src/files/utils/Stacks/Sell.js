import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Sell from "../../store/screens/Sell/Sell";
import Notice from "../../store/screens/Sell/Notice";
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
import React, { useEffect } from "react";
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Icon  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Create from "../../store/screens/Sell/Create";
import Listing from "../../store/screens/Inventory/Listing";
import { set_sub_modal } from "../../../../../../redux/sub";
import { set_shop } from "../../../../../../redux/shop";
import Shopile from "../../store/screens/Drawer/Shop";
import Reviews from "../../store/screens/Drawer/Reviews";
import AnalyticsScreen from "../../store/screens/Analytics";
import { useNavigation } from "@react-navigation/native";
import VendorConnectionsScreen from "../../store/screens/ConnectPurchase";
import NavigationTabs from "../../store/components/Home/Ads";
import Analytics from "../../store/utils/Analytics";
import { capitalize } from "../../store/utils/Capitalize";
import PromotedAdDetailsScreen from "../../store/screens/PromotionAnalysis";

const SellStack = createNativeStackNavigator();
export function SellStackScreen() {
    const {user} = useSelector(s => s.user);
    const {shop} = useSelector(s => s.shop);
    const {subscribed} = useSelector(s => s.subscribed);
    const {campus} = useSelector(s => s.campus);
    const {tier} = useSelector(s => s.tier);
        
    let navigation = useNavigation()
    useEffect(() => {
      console.log(campus)
    }, [campus]) 

    function handleSub(params) {
      if(shop.subscription.plan === 'free'){ 
        dispatch(set_sub_modal(1))
      }else{
        navigation.navigate('Profile', {
          screen: 'user-subscription',   // 👈 nested screen name
          params: { sub: true },         // 👈 params go here
        });

      } 
    }
    
    const dispatch = useDispatch()
    useEffect(() => {
      if (!shop) {
        fetch(`https://cs-server-olive.vercel.app/details?user_id=${user?.user_id}`, {
          headers: {
          "Content-Type": "Application/json" 
          }
        })
        .then(async (result) => {
          let response = await result.json();
          dispatch(set_shop(response?.data[0]))
        })
        .catch((err) => {
          Alert.alert('Network error, please try again.');
          console.log(err);
        });
      }
    }, [user])

  return (
    <SellStack.Navigator>
      <SellStack.Screen  options={{
          header: ({navigation}) =>
          (
              <View style={styles.headerContainer}>
                  {/* Logo */}
                  <TouchableOpacity style={styles.logoContainer} onPress={() => {
                    if(shop?.shop_id){
                      navigation.navigate('user-shop')
                    }else{
                      Alert.alert('Please register your shop first!')
                    }
                  }}>
                      <Image 
                        source={{ uri: shop?.logo_url ? shop?.logo_url : 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png'}} 
                        style={styles.logo}
                        // resizeMode="contain"
                      />
                      <Text numberOfLines={1} style={{
                          fontSize: 11,
                          fontWeight: 'bold',
                          color: '#000',
                          marginLeft: 0,
                          flexShrink: 1,
                          marginBottom: 5
                      }}>
                        {shop && shop?.title}
                      </Text>
                  </TouchableOpacity>

                  {/* Right Section */}
                  <View style={styles.rightSection}>
                    {shop && (
                      <TouchableOpacity
                          style={[styles.button, shop.subscription.plan !== 'free' && styles.subscribedButton]}
                          onPress={e=> handleSub()}
                          activeOpacity={0.8}
                          >
                          <View style={styles.buttonContent}>
                            <Icon 
                            name={shop.subscription.plan !== 'free' ? "diamond" : "diamond-outline"} 
                            size={16} 
                            color={shop.subscription.plan !== 'free' ? "#FFF" : "#FF4500"} 
                            style={styles.icon}
                            />
                            <Text style={[styles.buttonText, shop.subscription.plan !== 'free' && styles.subscribedText]}>
                            {shop.subscription.plan !== 'free' ? `${capitalize(shop.subscription.plan)} Plan` : 'Upgrade Now'}
                            </Text> 
                          </View>
                      </TouchableOpacity> 
                    )}
                  </View>
              </View>
          ),
      }}  name="user-sell" component={Sell} />

      <SellStack.Screen  options={{
        header: ({navigation}) =>
        (
          <View style={styles.headerContainer}>
            {/* Logo */}
            <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: -10, paddingRight: 5 }}>
              <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 5, borderRadius: 50, padding: 5 }} onPress={e => navigation.goBack()}>
                <Ionicons name={'chevron-back'} size={20} />
              </TouchableOpacity>
              <View style={{ backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Campaign info</Text>
              </View>
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
              {shop && (
                <TouchableOpacity
                  style={[styles.button, shop.subscription.plan !== 'free' && styles.subscribedButton]}
                  onPress={e=> handleSub()}
                  activeOpacity={0.8}
                  >
                  <View style={styles.buttonContent}>
                    <Icon 
                    name={shop.subscription.plan !== 'free' ? "diamond" : "diamond-outline"} 
                    size={16} 
                    color={shop.subscription.plan !== 'free' ? "#FFF" : "#FF4500"} 
                    style={styles.icon}
                    />
                    <Text style={[styles.buttonText, shop.subscription.plan !== 'free' && styles.subscribedText]}>
                    {shop.subscription.plan !== 'free' ? `${capitalize(shop.subscription.plan)} Plan` : 'Upgrade Now'}
                    </Text> 
                  </View>
                </TouchableOpacity> 
              )}
            </View>
          </View>
        ),
      }}  name="user-promotion-data" component={PromotedAdDetailsScreen} />
      

      <SellStack.Screen  options={{
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
                      <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Create new ads</Text>
                  </View>
              </View>
          ),
      }}  name="user-new-listing" component={Create} />
      
      <SellStack.Screen  options={{
          header: ({navigation}) =>
          (
            <>
              <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', elevation: 2, paddingLeft: 15, paddingRight: 25 }}>
                <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 15, borderRadius: 50, padding: 5 }} onPress={e => navigation.goBack()}>
                  <Ionicons name={'chevron-back'} size={20} />
                </TouchableOpacity>
                <View style={{ backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                  <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Inventory</Text>
                </View>
              </View>
              <NavigationTabs />
            </>
            
          ),
      }}  name="user-inventory" component={Listing} /> 

       

        <SellStack.Screen  options={{
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
                  My Shop
                </Text>
              </View>
            </View>
          ),
          
        }}   name="user-shop" component={Shopile} />
 
        <SellStack.Screen  options={{
          header: ({navigation}) =>
          (
            <View style={styles.headerContainer}>
              <View style={[{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#FFF', alignItems: 'center', elevation: 0, paddingLeft: 5, paddingRight: 20 }]}>
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

                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  marginLeft: 0,
                  // flexShrink: 1,
                  marginBottom: 5 
                }}>
                  Performance
                </Text>
              </View>

              <View style={styles.rightSection}>
                {shop && (
                  <TouchableOpacity
                      style={[styles.button, shop.subscription.plan !== 'free' && styles.subscribedButton]}
                      onPress={e=> handleSub()}
                      activeOpacity={0.8}
                      >
                      <View style={styles.buttonContent}>
                        <Icon 
                        name={shop.subscription.plan !== 'free' ? "diamond" : "diamond-outline"} 
                        size={16} 
                        color={shop.subscription.plan !== 'free' ? "#FFF" : "#FF4500"} 
                        style={styles.icon}
                        />
                        <Text style={[styles.buttonText, shop.subscription.plan !== 'free' && styles.subscribedText]}>
                        {shop.subscription.plan !== 'free' ? `${capitalize(shop.subscription.plan)} Plan` : 'Upgrade Now'}
                        </Text> 
                      </View>
                  </TouchableOpacity> 
                )}
              </View>
            </View>
          ),
          
        }}   name="user-metrics" component={Analytics} />

        <SellStack.Screen  options={{
          header: ({navigation}) =>
          (

            <>
              <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 15, borderRadius: 50, padding: 5}}>
                  <Ionicons name={'chevron-back'} size={25} color={'#000'} />
                </TouchableOpacity>
                  <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                  <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Reviews</Text>
                </View>
              </View>
            </> 
          ),
        }} name="user-reviews" component={Reviews} />  

        <SellStack.Screen  options={{
          header: ({navigation}) =>
          (

            <>
              <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center',  elevation: 2, paddingLeft: 15, paddingRight: 25}}>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 15, borderRadius: 50, padding: 5}} onPress={e => navigation.goBack()}>
                  <Ionicons name={'chevron-back'} size={25} color={'#000'} />
                </TouchableOpacity>
                  <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                  <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Analytics</Text>
                </View>
              </View>
            </> 
          ),
        }} name="user-analytics" component={AnalyticsScreen} />  
                
    </SellStack.Navigator>  
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 80,
    
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF4500'
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