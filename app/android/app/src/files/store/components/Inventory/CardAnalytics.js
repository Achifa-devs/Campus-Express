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
import js_ago from 'js-ago';


export default function CardAnalytics({data, updateDelete}) {
  return (
    <>
        <View style={{display: 'flex', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.stock} in stock | </Text>
            {/* <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.orders} orders placed | </Text> */}
            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.views} views | </Text>
            <Text style={{fontSize: 10, fontWeight: '500', color: '#000'}}>{data?.reviews} 0 reviews</Text>
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
                fetch(`http://192.168.168.146:9090/vendor/delete-product?product_id=${data?.product_id}`)
                .then(async(result) => {
                    let response = await result.json();
                    if(response){
                        updateDelete(true)
                    }else{
                        updateDelete(false)
                    }
                    
                })
                .catch((error) => {
                    updateDelete(false)
                    
                    // seller_overlay_setup(false, '')
                    console.log(error)
                }) 
            }}>
                <Ionicons  name={'trash-outline'} size={15} color={'#fff'} />
                <Text style={{color: '#fff', marginLeft: 2.5, fontSize: 12, }}>Delete</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}
