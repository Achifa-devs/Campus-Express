import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, Dimensions, TouchableOpacity, View, Image, ActivityIndicator, Alert } from 'react-native'
// import Title from '../../../studio/components/Home/data/Title';
import Date from '../Order/OrderDate';
import js_ago from 'js-ago';
import { useNavigation } from '@react-navigation/native';

export default function SearchResult({ search_word, isReady, search_char }) {
    let screenHeight = Dimensions.get('window').height;
  let navigation = useNavigation();

  
  return (
    <>
      
        
      
      <View style={{
        width: '100%',
        height: screenHeight,
        backgroundColor: '#efefef',
        position: 'relative'
      }}>
        {(!isReady && <View style={{
          position: 'absolute',
          top: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'rgba(255, 244, 224, .4)',
          height: '100%',
        }}>
          <ActivityIndicator color={'#FF4500'} size={'large'}>
            
          </ActivityIndicator>
        </View>)}
        <ScrollView style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#efefef',
          position: 'relative'
        }}
        contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', flex: search_char !== '' ? 0 : 1}}>
          {
            search_word?.length < 1 || search_char === ''
            ?
              <Text style={{fontSize: 18, color: '#FF4500', borderRadius: 10, width: 'fit-content', padding: 10}}> Search What You Need Here </Text>
            :
            search_word?.map((data,index) => {
              return(
                <TouchableOpacity key={index} onPress={()=>navigation.navigate('user-product', {product_id: data.product_id})} style={styles.orderCardCnt}>
                  <View style={styles.orderCntLeft}>
                    <Image style={{height: '100%', width: '100%'}} source={{uri: data.thumbnail_id}} />
                  </View>
                  <View style={styles.orderCntRight}>
                    <View style={styles.orderCntRightTop}>
                      <View>
                        <Text numberOfLines={2}
                          ellipsizeMode="tail" style={{fontSize: 16, color: '#000'}}>{data.title}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 10, color: '#000'}}>{data.state.state}</Text>
    
                      </View>
                    </View>
      
                    <View style={styles.orderCntRightBtm}>
                      <View>
                        <Text style={{ fontSize: 10, color: '#000' }}>{data.campus}-{(data.others).condition}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 10, color: '#000'}}>{data.date ? js_ago(new Date(data.date)) : ''}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    </>
  ) 
}




const styles = StyleSheet.create({
  searchCnt:{
      height: 'auto',
      //   width: '100%',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: '#fff',
      marginTop: 5,
      marginBottom: 5
  },
  search:{
      height: 55,
      borderRadius: 15,
      padding: 10,
      backgroundColor: '#efefef'
  },
  searchFilter:{
    height: 50,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20, 
    padding: 5,
    marginBottom: 10
  },

  btn:{
    height: '100%',
    padding: 0,
    padding: 8,
    display: 'flex',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
    },

    searchCardCnt:{
        height: 140,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 5
      },
      searchCntLeft:{
        height: '100%',
        width: '30%',
        padding: 0,
        backgroundColor: '#fff',
        marginBottom: 5
      },
      searchCntRight:{
        height: '100%',
        width: '70%',
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 5
      },
      searchCntRightTop:{
        height: '70%',
        width: '100%',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 5
      },
      searchCntRightBtm:{
        height: '30%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#fff',
        marginBottom: 5
  },
      orderCardCnt:{
      height: 140,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      marginBottom: .5
    },
    orderCntLeft:{
      height: '100%',
      width: '30%',
      padding: 0,
      backgroundColor: '#fff',
      marginBottom: 5
    },
    orderCntRight:{
      height: '100%',
      width: '70%',
      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 5
    },
    orderCntRightTop:{
      height: '70%',
      width: '100%',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      marginBottom: 5
    },
    orderCntRightBtm:{
      height: '30%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
      backgroundColor: '#fff',
      marginBottom: 5
    }
});