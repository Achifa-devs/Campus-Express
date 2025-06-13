import React, { useEffect, useState } from 'react'
import { 
    Alert,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import OrderCard from '../NewOrder/OrderCard';

export default function OrderRoomTop({ order, product }) {
    let [buyer, set_buyer] = useState('')
    function get_buyer() {
        fetch(`https://campussphere.net:3000/api/profile/buyer`, {
            method: 'post',
            headers: {
            "Content-Type": "Application/json"
            },
            body: JSON.stringify({user_id: order?.user_id})
        })
        .then(async(result) => {
            
            let response = await result.json()
           if (response.success) {
             set_buyer(response?.user)
           } else {
            Alert.alert('Network error, please try again.')
               
           }
        })
        .catch((err) => {
            Alert.alert('Network error, please try again.')
            console.log(err)
        })
    }
    useEffect(() => {
        get_buyer()
    }, [])
    
  return (
    <>
        <View style={styles.orderRoomTop}>
            <View style={{
                width: '100%',
                height: 100,
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // elevation: 2
                
                
            }}>
                <View style={{
                    width: '60%',
                    height: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                
                    flexDirection: 'row',
                    marginLeft: .5
                    
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 50,
                        height: 60,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: 60,
                        marginLeft: 2.5
                    }}>
                        <Ionicons name={'person-circle-outline'} size={60} color={'#FF4500'} />
                    </View>
                    
                    <View>
                          <Text style={{ fontSize: 15, fontWeight: '500', color: '#000', marginLeft: 2.5, marginTop: 18 }}>{buyer ? buyer?.fname : ''}.{buyer ? buyer?.lname[0].toUpperCase() : ''}</Text>
                        
                        <View style={{fontSize: 12, fontWeight: '500' , color: '#000', marginLeft: .5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Ionicons name={'school'} size={20} color={'#FF4500'} />
                            <Text style={{fontSize: 12, fontWeight: '500' , color: '#000', marginLeft: 2.5}}>{buyer ? buyer?.campus : ''}</Text>
                        </View>
                         <View style={{fontSize: 12, fontWeight: '500' , color: '#000', marginLeft: .5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text style={{fontSize: 12, fontWeight: '500' , color: '#000', marginLeft: 2.5}}>{buyer ? buyer?.state : ''} state</Text>
                        </View>
                    </View>
                </View>

                <View style={{ 
                    width: '30%', 
                    height: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        width: '45%',
                        height: '100%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }} activeOpacity={.9}>
                        <View style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#fff',
                            display: 'flex',
                            borderRadius: 10,
                            justifyContent: 'space-evenly',
                              alignItems: 'center',
                            elevation: 2,
                            flexDirection: 'row'
                        }}> 
                            <Ionicons name={'chatbox'} size={20} color={'#FF4500'} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: '45%',
                        height: '100%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }} activeOpacity={.9}>
                        <View style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#fff',
                            display: 'flex',
                            borderRadius: 10,
                            elevation: 2,
                            
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}> 
                            <Ionicons name={'call'} size={20} color={'#FF4500'} />
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            <OrderCard order={order} product={product} />

        </View> 
    </>
  )
}

const styles = StyleSheet.create({
    orderRoomTop:{
        height: 'auto',
        width: '100%',
        position: 'relative',
        padding: 0,
        backgroundColor: '#FF4500'
    }
});