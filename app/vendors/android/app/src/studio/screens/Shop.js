import React, {useEffect, useState} from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import { ScrollView, Text } from 'react-native-gesture-handler'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import ReviewSvg from '../../assets/review-svgrepo-com.svg'
import { useSelector } from 'react-redux';
export default function Shopile() {
    let [review, set_review] = useState('')
    let { user } = useSelector(s => s.user)
    let [server_err, set_server_err] = useState(false)
    let [shop, set_shop] = useState('')
    
    useEffect(() => {
        if (user) {
            console.log(user)
            get_shop_data()
        }
    },[user])

    function get_shop_data() {
        fetch('https://campussphere.net:3000/api/shop/retrieve', {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({seller_id: user?.seller_id})
        })
        .then(async(result) => {
            
            let response = await result.json()
            console.log(result)
            console.log(response)
            if (response.bool) {
                console.log(response)
                set_shop(response.shop)
            } else {
                set_server_err(!true)
                Alert.alert('Error occured, please try again later')
            }

        })
        .catch((err) => {
            set_server_err(!true)
            Alert.alert('Network error, please try again.')
            console.log(err)
        })
    }
  return (
    <>
      <View>
        <ScrollView style={{height: '100%', overflow: 'scroll'}}>
            <View style={{
                height: 120,
                width: '100%',
                backgroundColor: '#efefef'
            }}>
                
            </View>
            <View style={{
                height: 120,
                width: '100%',
                backgroundColor: '#fff'
            }}>
                <View style={{
                    height: 80,
                    width: 80,
                    zIndex: 100,
                    // marginTop: 80,
                    position: 'absolute',
                    left: 10,
                    borderWidth: 3,
                    borderColor: shop?.logo_url ? '#fff' : '#FF4500',
                    top: -40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                    borderRadius: 50,
                    backgroundColor: '#fff'
                }}>
                    {shop?.logo_url ? <Image height={'100%'} borderRadius={50} width={'100%'} source={{uri: shop?.logo_url}} /> : <Ionicons name={'storefront'} size={40} color={'#FF4500'} />}
                </View>
                 
                <View style={{
                    height: '100%',
                    width: 'auto',
                    zIndex: 100,
                    // marginTop: 80,
                    position: 'absolute',
                    left: 10,
                    borderWidth: 3,
                    borderColor: '#fff',
                    bottom: -45,
                    borderRadius: 50,
                    // backgroundColor: '#FF4500'
                }}>
                    <Text style={{ fontWeight: '500', fontSize: 18, color: '#000', marginLeft: 8, marginBottom: 5 }}>{shop?.title}</Text>
                    <View style={{ marginLeft: 8, borderWidth: 1, borderColor: '#FF4500', borderStyle: 'dashed', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 50, paddingLeft: 14, paddingRight: 14, paddingTop: 3, paddingBottom: 3 }}>
                    <Ionicons name={'shield-outline'} size={17} color={'#FF4500'} />
                    <Text style={{fontWeight: '400', marginLeft: 8, fontSize: 12, color: '#FF4500'}}>
                        Add your verification badge
                    </Text>
                    </View>
                </View>  
                <View style={{
                    height: '100%',
                    width: 'auto', 
                    zIndex: 100,
                    // marginTop: 80,
                    position: 'absolute',
                    right: 10,
                          borderWidth: 3,
                    borderColor: '#fff',
                    bottom: -10,
                    borderRadius: 50,
                    // backgroundColor: '#FF4500'
                }}>
                    <TouchableOpacity style={{elevation: 2, height: 30, width: 30}}>
                        <Ionicons  name={'create-outline'} size={25} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={{
                height: 'auto',
                width: '100%',
                
                backgroundColor: '#fff'
            }}>
                <Text  style={{ fontWeight: '400',  padding: shop?.description? 8 : '0', fontSize: 15, color: '#000', marginLeft: 8, marginBottom: 5 }}>{shop?.description}</Text>
            </View> 
            
            <View style={{
                height: 'auto',
                width: '100%',
                marginTop: 5,
                
                backgroundColor: '#fff'
            }}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 2, backgroundColor: '#fff', flexDirection: 'row', borderStyle: 'solid'}}>
                
                    <Text style={{ fontWeight: '500',  padding: 8, fontSize: 17, color: '#000', marginLeft: 4, marginBottom: 0 }}>
                    Category </Text> 
                    
                    <TouchableOpacity style={{elevation: 2, height: 30, width: 30, marginRight: 12}}>
                        <Ionicons  name={'create-outline'} size={25} color={'#000'} />
                    </TouchableOpacity>
                    
                </View>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 7, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        shop?.category
                        &&
                        JSON.parse(shop?.category).map((item, index) =>
                            <View key={index} style={{borderRadius: 15, borderWidth: 1, borderColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 5, backgroundColor: '#efefef', flexDirection: 'row', borderStyle: 'solid'}}>
                                <Text style={{ fontWeight: '400',  paddingLeft: 9, paddingRight: 9, paddingTop: 5, paddingBottom: 5, fontSize: 15, color: '#000', marginBottom: 0 }}>{item}</Text>
                                
                            </View> 
                        )
                    }
                    
                </View>
                 
            </View> 
            
            <View style={{
                height: 'auto',
                width: '100%',
                marginTop: 5,
                
                backgroundColor: '#fff'
            }}>
                <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', margin: 2, backgroundColor: '#fff', flexDirection: 'column', borderStyle: 'solid'}}>
                
                    <Text style={{ fontWeight: '500',  padding: 4, fontSize: 18, color: '#000', marginLeft: 12}}>Reviews</Text> 
                    <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -8, justifyContent: 'flex-start'}}>
                        <Ionicons name={'eye'} size={20} color={'#000'} />
                        <Text style={{ fontWeight: '400',  padding: 8, fontSize: 14, color: '#000'}}>Visible to the public</Text>
                    </View>
                   
                    
                </View>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 7, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        (
                            review
                            ?
                            <View>
                                
                            </View> 
                            :
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: 15, margin: 0, width: '100%', flexDirection: 'column', flexWrap: 'wrap'}}>
                                <ReviewSvg width={90} height={90} />
                                <Text style={{textAlign: 'center', marginTop: 25, marginBottom: 10, fontWeight: '500', width: '100%',  padding: 0, fontSize: 16, color: '#000', opacity: .5}}>Your reviews from clients will be shown here.</Text>
                            </View>    
                        )
                    }
                    
                </View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 2, backgroundColor: '#fff', flexDirection: 'row', borderStyle: 'solid', opacity: .7 , borderTopColor: '#efefef', borderTopWidth: 1}}>
                
                    <Text style={{ fontWeight: '400',  padding: 8, fontSize: 17, color: '#000', marginLeft: 4, marginBottom: 5, textAlign: 'center' }}>Show all reviews</Text> 
                    <Ionicons  name={'arrow-forward'} size={18} color={'#000'} />
                    
                </View>
            </View>  
            
            <View style={{
                height: 'auto',
                width: '100%',
                marginTop: 5,
                
                backgroundColor: '#fff'
            }}>
                <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', margin: 2, backgroundColor: '#fff', flexDirection: 'column', borderStyle: 'solid'}}>
                
                    <Text style={{ fontWeight: '500',  padding: 4, fontSize: 18, color: '#000', marginLeft: 12}}>Analytics</Text> 
                    <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -8, justifyContent: 'flex-start'}}>
                        <Ionicons name={'eye'} size={20} color={'#000'} />
                        <Text style={{ fontWeight: '400',  padding: 8, fontSize: 14, color: '#000'}}>Private to you only</Text>
                    </View>
                   
                    
                </View>
                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 0, flexDirection: 'column'}}>
                    {
                        [{title: '18 shop views', summary: 'Discover who viewed your shop', icon: 'people'}, {title: '84 post impressions', summary: 'Checkout who"s engaging with your product', icon: 'stats-chart'}, {title: '7 search appearances', summary: 'See how often your product appear in searches', icon: 'compass'}].map((item, index) =>
                            <TouchableOpacity key={index} style={{ borderRadius: 5, borderBottomWidth: 2, borderColor: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff', marginBottom: 0, flexDirection: 'row', borderStyle: 'solid', width: '100%', height: 80 }}>
                                <View style={{width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Ionicons  name={item.icon} size={25} color={'#000'} />
                                </View>
                                <View style={{width: '85%'}}>
                                    <Text style={{ fontWeight: '600', padding: 5, fontSize: 15, color: '#000', marginBottom: 0 }}>{item.title}</Text>
                                    <Text style={{ fontWeight: '400', padding: 5, fontSize: 15, color: '#000', marginBottom: 0 }}>{item.summary}</Text>
                                </View>
                                
                            </TouchableOpacity>
                        )
                    }
                    
                </View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, backgroundColor: '#fff', flexDirection: 'row', borderStyle: 'solid', opacity: .7 , borderTopColor: '#efefef', borderTopWidth: 0}}>
                
                    <Text style={{ fontWeight: '500',  padding: 8, fontSize: 17, color: '#000', marginLeft: 4, marginBottom: 5, textAlign: 'center' }}>Show all analytics</Text> 
                    <Ionicons  name={'arrow-forward'} size={18} color={'#000'} />
                    
                </View>
            </View> 
        </ScrollView>
      </View>
    </>
  )
}
