import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import SchoolSvg from '../../media/assets/29659591_7605883.svg'
import BusinessSvg from '../../media/assets/23186779_6737584.svg'
import TrustSvg from '../../media/assets/7119383_3286554.svg'
import ProfitSvg from '../../media/assets/18771520_6030257.svg'
import BuySvg from '../../media/assets/10769657_4530193.svg'
import { useNavigation } from '@react-navigation/native';
export default function GetStarted() {
    let screenHeight = Dimensions.get("screen").height;
    let screenWidth = Dimensions.get("screen").width;
    const navigation = useNavigation();
    let dispatch = useDispatch();
    let [btn, set_bnt] = useState(false)

   
    // useEffect(() => {
    //   CookieManager.get('https://campussphere.net')
    //   .then((result) => {
    //     console.log(result)
    //     if(result.jwt_token.value !== null && result.jwt_token.value !== '') {
    //       dispatch(set_cookie(true))
    //     }else{
    //       dispatch(set_cookie(false))
    //     }
    //   })
    //   .catch(err => console.log(err))
    // }, [])

    useEffect(() => {
      async function get_user() {
        let data = await getData('user');
        dispatch(set_user(JSON.parse(data)))
      }
      get_user() 
    }, []) 
    let screens = [
        
    ]
    let [activeSvg, setActiveSvg] = useState(0)
    let [svg, setSvg] = useState(
        [
            {
                svg: <SchoolSvg height={300} width={screenWidth * 0.9} />,
                title: 'Explore 169 Universities Across Nigeria',
                description: 'Connect with students and vendors from campuses nationwide and grow your influence.',
            },
            {
                svg: <BuySvg height={300} width={screenWidth * 0.9} />,
                title: 'Shop With Ease, Right From Your Lodge',
                description: 'Browse products, place orders, and enjoy fast delivery without leaving your hostel.',
            },
            {
                svg: <BusinessSvg height={300} width={screenWidth * 0.9} />,
                title: 'Grow Your Business and Reach More Buyers',
                description: 'Showcase your products to thousands of campus buyers and increase your daily sales.',
            },
            {
                svg: <TrustSvg height={300} width={screenWidth * 0.9} />,
                title: 'Build Trust With Every Transaction',
                description: 'Deliver great service, gain customer loyalty, and grow a trusted brand on campus.',
            },
            {
                svg: <ProfitSvg height={300} width={screenWidth * 0.9} />,
                title: 'Boost Your Profits—The Easy Way',
                description: 'Use powerful tools to sell more efficiently and earn faster than ever before.',
            }
        ]


    );

  return (
    <>
        <StatusBar backgroundColor={'#FFF'} barStyle={"dark-content"} />
        <View style={{
            backgroundColor: '#FFF',
            height: screenHeight,
            width: screenWidth,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{
                backgroundColor: '#FFF',
                height: 350,
                width: screenWidth*.9, 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View key={activeSvg} style={{
                    backgroundColor: '#FFF',
                    height: '100%',
                    width: '100%', 
                    display: 'flex',
                    borderRadius: 400,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }} >
                    <View style={{
                        // backgroundColor: '#000', 
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>{svg[activeSvg].svg}</View>
                    
                    <TouchableOpacity onPress={e=> {
                        activeSvg === 0 ? '' : setActiveSvg(activeSvg-=1)
                    }} style={{
                        backgroundColor: 'transparent', 
                        height: 300,
                        width: '50%',
                        position: 'absolute',
                        left: 0,
                        zIndex: 100 
                    }}></TouchableOpacity>
                    <TouchableOpacity onPress={e=> {
                        activeSvg === (svg.length-1) ? '': setActiveSvg(activeSvg+=1)
                    }} style={{
                        backgroundColor: 'transparent', 
                        height: 300,
                        width: '50%',
                        position: 'absolute',
                        right: 0,
                        zIndex: 100 
                    }}></TouchableOpacity>
                    
                </View>
            </View> 
            
            <View style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                    marginBottom: 20,
                  width: '100%',
                height: 100
            }}>
                <Text style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: screenWidth * .8,
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500',
                    marginBottom: 10
                }}>
                    {svg[activeSvg].title}
                </Text>
                <Text style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: screenWidth * .9,
                    textAlign: 'center',
                    fontSize: 14,
                    marginBottom: 10
                }}>
                    {svg[activeSvg].description}
                </Text>
            </View>
            
            <View style={{
                backgroundColor: '#FFF',
                height: 15,
                width: screenWidth * .3,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity style={{
                    height: 10, width: 10, borderRadius: 50, backgroundColor: activeSvg === 0 ? '#000' : '#EFEFEF', marginLeft: 5, marginRight: 5
                }}></TouchableOpacity>
                <TouchableOpacity style={{
                    height: 10, width: 10, borderRadius: 50, backgroundColor: activeSvg === 1 ? '#000' : '#EFEFEF', marginLeft: 5, marginRight: 5
                }}></TouchableOpacity>
                <TouchableOpacity style={{
                    height: 10, width: 10, borderRadius: 50, backgroundColor: activeSvg === 2 ? '#000' : '#EFEFEF', marginLeft: 5, marginRight: 5
                }}></TouchableOpacity>
                <TouchableOpacity style={{
                    height: 10, width: 10, borderRadius: 50, backgroundColor: activeSvg === 3 ? '#000' : '#EFEFEF', marginLeft: 5, marginRight: 5
                }}></TouchableOpacity>
                <TouchableOpacity style={{
                    height: 10, width: 10, borderRadius: 50, backgroundColor: activeSvg === 4 ? '#000' : '#EFEFEF', marginLeft: 5, marginRight: 5
                }}></TouchableOpacity>
            </View>
            
            <View style={{
                backgroundColor: '#FFF',
                height: 70,
                width: '100%',
                marginTop: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity activeOpacity={.8} style={{
                    backgroundColor: '#000',
                    height: 50,
                    width: '80%',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' 
                }} onPress={e=> navigation.navigate('user-signup')}>
                    <Text style={{color: '#fff'}}>Get started</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    </>
  )
}


