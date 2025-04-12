import React, { useState } from 'react'
import { 
    Image,
    Share,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    Vibration, 
    View 
} from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

import OrderTitle from './ListingTitle';
import OrderStatus from './ListingStatus';
import { useNavigation } from '@react-navigation/native';
import js_ago from 'js-ago';

export default function ListingCard({ data, index }) {
    let [deleted, set_deleted] = useState(false)
    let navigation = useNavigation()    
    return (
        <>
            {
                !deleted &&
                <View key={index} onPress={() => navigation.navigate('order-room')} style={styles.listCardCnt}>
                    <View style={styles.listCntTop}> 
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Ionicons  name={'time-outline'} size={20} color={'#000'} />
                                
                            <Text style={{fontSize: 12, fontWeight: '500' , color: '#000', marginLeft: 2.5}}>{data?.date ? js_ago(new Date(data?.date)) : ''}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{ fontSize: 17, color: data?.state?.state === 'active' ? 'green' : 'red', fontWeight: '500'}}>{data?.state?.state}</Text>
                                <TouchableOpacity style={{ height: '90%', marginLeft: 15, paddingLeft: 5, paddingRight: 5, paddingTop: 2.5, paddingBottom: 2.5, display: 'flex', justifyContent: 'center', flexDirection: 'row', borderRadius: 3.5, width: 'auto', backgroundColor: '#1E90FF', alignItems: 'center' }} onPress={e => {
                                    navigation.navigate('user-new-listing', {update: true})
                            }}>
                                <Text style={{color: '#fff', fontSize: 12, marginRight: 5}}>Edit</Text>
                                <Ionicons  name={'create-outline'} size={20} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.listCntMid}>
                        <View style={{width: '30%', marginLeft: 5}}>
                            <Image height={100} width={'100%'} borderRadius={5} source={{uri: data?.thumbnail_id}} />
                        </View>
                        <View style={{display: 'flex', width: '70%', paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, height: '100%', backgroundColor: '#FFF', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                            <Text numberOfLines={2} 
                                ellipsizeMode="tail" style={{ fontSize: 16, width: '100%', color: '#000' }}>{data?.title}</Text>
                            <Text numberOfLines={2} 
                                ellipsizeMode="tail" style={{ fontSize: 12, width: '100%', fontWeight: '500', color: '#000' }}>₦{new Intl.NumberFormat('en-us').format(data?.price)}</Text>
                            <Text numberOfLines={2}
                            ellipsizeMode="tail" style={{fontSize: 10, width: '100%', color: '#000'}}>{data?.description !== 'null' ? data?.description : ''}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.listCntBtm}>
                        
                        <View style={{display: 'flex', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.stock} in stock | </Text>
                            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.orders} orders placed | </Text>
                            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.views} views | </Text>
                            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.reviews} reviews</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <TouchableOpacity style={{height: '90%', marginLeft: 2.5, padding: 5, display: 'flex', justifyContent: 'center', flexDirection: 'row', borderRadius: 2.5, width: 'auto', alignItems: 'center', backgroundColor: '#00BFFF', }} onPress={async(e) => {
                                const result = await Share.share({
                                    message: `Check out this product on Campus Sphere! https://campussphere.net/product/${data?.product_id}`,
                                    url: `https://campussphere.net/product/${data?.product_id}`, // works mostly on iOS
                                    title: data?.title,
                                    
                                });

                                if (result.action === Share.sharedAction) {
                                    if (result.activityType) {
                                        console.log('Shared with activity type:', result.activityType);
                                    } else {
                                        console.log('Shared successfully');
                                    }
                                } else if (result.action === Share.dismissedAction) {
                                    console.log('Share dismissed');
                                }
                            }}>
                                <Ionicons  name={'share-outline'} size={15} color={'#fff'} />
                                <Text style={{color: '#fff', fontSize: 12, }}> Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: '90%', marginLeft: 5, alignItems: 'center', padding: 5, display: 'flex', justifyContent: 'center', flexDirection: 'row', borderRadius: 2.5, width: 'auto', backgroundColor: '#ff3030', }} onPress={e => {
                                fetch(`https://ce-server.vercel.app/seller.product-delete?product_id=${data?.product_id}`)
                                .then(async(result) => {
                                    let response = await result.json();
                                    if(response){
                                        set_deleted(true)
                                    }else{
                                        set_deleted(false)
                                    }
                                    
                                })
                                .catch((error) => {
                                    set_deleted(false)
                                    
                                    // seller_overlay_setup(false, '')
                                    console.log(error)
                                }) 
                            }}>
                                <Ionicons  name={'trash-outline'} size={15} color={'#fff'} />
                                <Text style={{color: '#fff', marginLeft: 2.5, fontSize: 12, }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                </View> 
            }
        </>
    )
}


const styles = StyleSheet.create({
    listCardCnt:{
      height: 'auto',
      width: '100%',
      
    //   padding: 10,
      backgroundColor: '#fff',
      marginBottom: 2.5
    },
    listCntTop:{
      height: 45,
      padding: 8,
      width: '100%',
        // padding: 5,
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#fff'
    },
    listCntBtm:{
      height: 50,
      width: '100%',
      padding: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    listCntMid:{
      height: 100,
      width: '100%',
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 0
    }
  });
