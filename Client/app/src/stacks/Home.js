import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Icon from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { 
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { set_connect_modal } from "../../redux/modal/connect";
import Home from "../screen/Home";
import Offers from "../components/Home/Offers"; 
import SearchBar from "../components/Home/Search";
import Type from "../screen/Type";
import TypeProducts from "../screen/Filter";
import Category from "../screen/Category";
import Product from "../screen/Product";
import ProductImages from "../screen/ProductImages";
import ReviewSubmissionScreen from "../screen/Review";
import Shop from "../screen/ExploreShop";
import Service from "../screen/Service";
import Accommodation from "../screen/Accomodation";
import Search from "../screen/Search";
const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
   
    const {user} = useSelector(s => s.user);
    const {campus} = useSelector(s => s.campus);
    
    const dispatch = useDispatch()
    
    function handleSub(params) {
        dispatch(set_connect_modal(1))

    }

    return (  
      
    <HomeStack.Navigator>
        
        
      <HomeStack.Screen  options={{
        header: ({navigation}) =>
          (
          <>
            <View style={styles.headerContainer}>
                
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
                {/* {user && (
                
                  <TouchableOpacity
                    style={[styles.button, styles.subscribedButton]}
                    onPress={e=> handleSub()}
                    activeOpacity={0.8}
                    >
                    <View style={styles.buttonContent}>
                      <Icon 
                        name={"people-outline"} 
                        size={16} 
                        color={"#fff"} 
                        style={styles.icon}
                      />
                      <Text style={[styles.buttonText, styles.subscribedText]}>
                        {user.connects} {user.connects > 1 ? 'vendor connects' : 'vendor connect'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )} */}

                {
                  !user && (
                    <TouchableOpacity 
                      style={styles.loginButton}
                      onPress={() => dispatch(setUserAuthTo(true))}
                      activeOpacity={0.9}
                    >
                      <Text style={styles.loginText}>Login</Text>
                      <Icon name="log-in-outline" size={16} color="#FFF" />
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
                                    
            <SearchBar />
            <Offers />
          </>
        ),
      }} name="home" component={Home} />
      <HomeStack.Screen  options={{
        header: ({navigation}) =>
        (
            <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

            </View>
        ), 
        // headerShown: false,  
      }}  name="type" component={Type} />

      <HomeStack.Screen  options={{
        header: ({navigation}) =>
        (
            <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

            </View>
        ), 
        // headerShown: false,  
      }}  name="search" component={Search} />
      <HomeStack.Screen  options={{
        header: ({navigation}) =>
        (
          <View style={{ height: 60, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>  
              
          </View>  
        ), 
        // headerShown: false,  
        }}  name="type-product" component={TypeProducts} />

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
        }}  name="product" component={Product} />

        <HomeStack.Screen  options={{
          header: ({navigation}) =>
          (
            <View style={{ height: 45, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

            </View>
          ), 
          // headerShown: false,  
        }}  name="product-images" component={ProductImages} />

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
        }}  name="review-submission" component={ReviewSubmissionScreen} />

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
            
        }}   name="explore-shop" component={Shop} />

        <HomeStack.Screen  options={{
          header: ({navigation}) =>
          (
            <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

            </View>
          ), 
            // headerShown: false, 
        }} name="service-room" component={Service} />
          
    
       

        <HomeStack.Screen  options={{
          header: ({navigation}) =>
          (
            <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', alignItems: 'center', padding: '10px'}}>

            </View>
          ), 
          // headerShown: false,  
        }}  name="lodge-room" component={Accommodation} />
        

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