import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Top from '../components/Product/Top';
import Mid from '../components/Product/Mid';
import Btm from '../components/Product/Btm';
import ShowCase from '../components/Home/ShowCase';
import Thumbnail from '../utils/Thumbnail';

export default function Product() {
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    let [data, setData] = useState('')

    let {product_id} = useRoute()?.params
    useEffect(() => {
        fetch(`http://192.168.144.146:9090/product?product_id=${product_id}`, {
          headers: {
            "Content-Type": "Application/json" 
          }
        })
        .then(async (result) => {
            let response = await result.json();
            console.log(response)
            setData(response.data[0]);
            
        })
        .catch((err) => {
          Alert.alert('Network error, please try again.');
          console.log(err);
        });
    }, []);
    
    let navigation = useNavigation()

  return (
      <>    
        <View>
            <ScrollView style={{
                width: '100%',
                height: screenHeight - 80,
                backgroundColor: '#fff',
                position: 'relative'
                }}
                contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}
                >

            <View style={{
                width: '100%',
                height: 300,
                backgroundColor: '#fff',
                position: 'relative'
                }}>
                <Thumbnail thumbnail_id={data?.thumbnail_id} br={0}  />
            </View>

            <Top title={data?.title} cost={data?.price} />
            <Mid description={data?.description} />
            <View>
                <Text style={{marginLeft: -2.5, fontSize: 18, color: '#000', borderRadius: 10, width: 'fit-content', padding: 10}}>Recommended For You</Text>
                
                <ShowCase limit={8} category={data?.category} bg={'#f9f9f9'}/>
            </View>
            <Btm />
            
            
            </ScrollView>

            <View style={styles.btm}>
                <TouchableOpacity onPress={e=> navigation.navigate('user-new-order', {data: data})} style={[styles.btn, {width: '78%', backgroundColor: '#FF4500'}]}>
                    <Text style={{fontSize: 15, color: '#fff'}}>Buy Now For {new Intl.NumberFormat('en-us').format(0.95 * parseInt(data?.price))}</Text>
                </TouchableOpacity>    
                
                <TouchableOpacity  style={[styles.btn, {width: '18%', backgroundColor: 'rgb(255, 244, 224)'}]}>
                    <Text style={{fontSize: 10, color: '#fff'}}>Cart</Text>
                </TouchableOpacity>
            </View>
        </View> 
    </>
  )
}


const styles = StyleSheet.create({
    btm:{
        height: 65,
        padding: 0,
        marginLeft: 5, 
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#fff'
    },

    btn:{
        height: '100%',
        color: '#fff',
        borderRadius: 15,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
  });
