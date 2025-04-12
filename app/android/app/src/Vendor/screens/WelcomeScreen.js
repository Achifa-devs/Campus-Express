import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';
// import LossSvg from '../../assets/loss-graph-finance-svgrepo-com.svg'
import { set_cookie } from '../../../../../redux/vendor/cookie';
// import { validate_jwt } from '../../reusables/Cookie';
import { useDispatch } from 'react-redux';
import CookieManager from '@react-native-cookies/cookies';
import { set_user } from '../../../../../redux/vendor/user';
export default function WelcomeScreen({navigation}) {
    let screenHeight = Dimensions.get("screen").height;
    let screenWidth = Dimensions.get("screen").width;
    let dispatch = useDispatch();
    let [btn, set_bnt] = useState(false)

    // useEffect(() => {
    //     async function home_data() {
    //         let seller_id = await validate_jwt();
    //         console.log('seller_id: ', seller_id)
    //         if (!seller_id.bool) {
    //             set_bnt(true) 
                
    //         } else {
    //             set_bnt(false);
    //             dispatch(set_cookie(true))
    //         }
    //     }
    //     home_data()
    // }, [])
    useEffect(() => {
      CookieManager.get('https://campussphere.net')
      .then((result) => {
        console.log(result)
        if(result.jwt_token.value !== null && result.jwt_token.value !== '') {
          dispatch(set_cookie(true))
        }else{
          dispatch(set_cookie(false))
        }
      })
      .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      async function get_user() {
        let data = await getData('user');
        dispatch(set_user(JSON.parse(data)))
      }
      get_user() 
    }, []) 
    let screens = [
        {img: '', message: '169 Universities In Nigeria'},
        {img: '', message: 'Sell Instantly And Get Paid'},
        {img: '', message: 'Sell Your Way Into Profilts'},
        {img: '', message: 'Build Strong Customer Relationship'},
        {img: '', message: 'One Account For All The Shops You Want'}
    ]
    let [active_screen, set_active_screen] = useState(0);  

    useEffect(() => { 
        const interval = setInterval(() => {
            set_active_screen((prevIndex) => (prevIndex + 1) % screens.length);
        }, 6000); // Change text every 2 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [])


    return ( 
      <>
        <StatusBar backgroundColor="#FF4500" barStyle="light-content" />

        <View style={[styles.cnt, {height: screenHeight}]}>
            <View style={styles.loader_cnt}>
                    {/* <ProgressBar progress={((active_screen + 2) / 10)}
                        width={'100%'} 
                        height={20} 
                        borderWidth={0} 
                        borderRadius={10} 
                        color="#00B4FF"
                    /> */}
                    <Progress.Bar 
                        progress={((active_screen + 1) / 10)*2} // Value between 0 and 1
                        width={screenWidth - 20}
                        height={15} // Adjust thickness
                        color="#00d46a" // Progress bar color
                        unfilledColor="#E0E0E0" // Background color
                        borderRadius={10}
                        borderWidth={0} // Remove border
                    /> 
            </View> 
            <View style={[styles.mid, { height: (0.8 * screenHeight) - 30, position: 'relative' }]} >
                    
                <TouchableOpacity style={{
                    height: '100%', width: '45%', backgroundColor: 'transparent', position: 'absolute', top: 0, left: 0
                    }} onPress={e => {
                        active_screen === 0
                        ?
                        ''
                        :
                        set_active_screen((prevIndex) => (prevIndex - 1) % screens.length);
                    }}>
                </TouchableOpacity>
                {
                    active_screen === 0
                    ?
                        <View style={{height: 360, width: '100%', padding: 10}}>
                            <Image 
                                source={require('../../assets/10473220-removebg-preview.png')} 
                                style={styles.image} 
                            />
                                        
                        </View>
                    :
                    active_screen === 1
                    ?
                        <View style={{height: 360, width: '100%', padding: 10}}>
                            <Image 
                                source={require('../../assets/10613770-removebg-preview.png')} 
                                style={styles.image} 
                            />
                                        
                        </View>
                    :
                    active_screen === 2
                    ?
                        <View style={{height: 300, width: '100%', padding: 10}}>
                            <Image 
                                source={require('../../assets/5143422-removebg-preview-removebg-preview.png')} 
                                style={[styles.image, {width: '100%'}]} 
                            />
                                        
                        </View>
                    :
                    active_screen === 3
                    ?
                        <View style={{height: 360, width: '100%', padding: 10}}>
                            <Image 
                                source={require('../../assets/9994025-removebg-preview.png')} 
                                style={[styles.image, {width: '100%'}]} 
                            />
                                        
                        </View>
                    :
                    active_screen === 4
                    ? 
                        <View style={{height: 360, width: '100%', padding: 10}}>
                            <Image 
                                source={require('../../assets/10632520-removebg-preview.png')} 
                                style={[styles.image, {width: '100%'}]} 
                            />   
                        </View>
                    
                    :
                    ''

                }
                <TouchableOpacity style={{
                    height: '100%', width: '45%', backgroundColor: 'transparent', position: 'absolute', top: 0, right: 0
                    }} onPress={e => {
                        active_screen === 4
                        ?
                        ''
                        :
                        set_active_screen((prevIndex) => (prevIndex + 1) % screens.length);
                    }}>
                        
                </TouchableOpacity>
                        
                <View style={{height: 'auto', width: '100%', paddingLeft: 20, paddingRight: 20}}> 
                    <Text style={{fontSize: 30, color: '#fff', fontWeight: '900', fontFamily: 'Roboto', height: 'auto', textAlign: 'center'}}>{screens[active_screen]?.message}</Text>
                </View>
            </View>
                  
            <View style={styles.btn_cnt}>
                {
                    active_screen === screens.length - 1
                        ?
                        <View style={{
                            width: '100%',
                            padding: 10,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#fff', 
                                borderRadius: 50,
                                height: 60,
                                width: '48%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={e=> navigation.navigate('login')}>
                                <Text style={{fontSize: 16, color: '#FF4500', fontWeight: '700', fontFamily: 'Roboto', height: 'auto'}}>Log in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#fff', 
                                borderRadius: 50,
                                height: 60,
                                width: '48%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={e=> navigation.navigate('register')}>
                                <Text style={{fontSize: 16, color: '#FF4500', fontWeight: '700', fontFamily: 'Roboto', height: 'auto'}}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        btn
                        ?
                        <View style={{
                width: '100%',
                padding: 10,
                
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#fff', 
                        borderRadius: 50,
                        height: 60,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={e => {
                        set_active_screen(4)
                    }}>
                        <Text style={{fontSize: 16, color: '#FF4500', fontWeight: '700', fontFamily: 'Roboto', height: 'auto'}}>Get started</Text>
                    </TouchableOpacity>
                        </View>
                        :
                        ''
                }
            </View> 
        </View>
    </>
  )
}



const styles = StyleSheet.create({
    
    cnt:{
        position: 'relative',
        width: '100%',
        padding: 0,
        backgroundColor: '#FF4500',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between'
      
      // marginBottom: 5
    },
    image: {
        height: '100%',
        width: '100%',
    },
    gradient: {
    flex: 1,
    borderRadius: 10,
  },
    mid:{
        position: 'relative',
        width: '100%',
        padding: 0,
        backgroundColor: '#FF4500',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
        // marginBottom: 5
    },
    loader_cnt: {
        height: 30,
        position: 'relative',
        width: '100%',
        padding: 10,
        backgroundColor: '#FF4500',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center'
        // marginBottom: 5
    },
    btn_cnt: {
        height: '10%',
        position: 'relative',
        width: '100%',
        padding: 0,
        backgroundColor: '#FF4500',
    }

  });