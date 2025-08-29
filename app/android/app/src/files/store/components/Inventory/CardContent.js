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
import Video from 'react-native-video';
import categoriesData from '../../../../../../../services.json'

export default function CardContent({data}) {

  const getCategoryImage = (categoryName) => {
    console.log(categoriesData)
    for (let cat of categoriesData.items.category) {
      const keys = Object.keys(cat).filter(k => k !== "img"); // exclude "img"
      for (let key of keys) {
        if (key === categoryName) {
          return cat.img; // return the image if category matches
        }
      }
    }
    return null; // fallback if not found
  };


  return (
      <>
        <View style={{ width: '30%', marginLeft: 5 }}>
          {data?.purpose !== 'accomodation' ? (
            <Image 
              style={{ height: 100, width: '100%', borderRadius: 5 }} 
              source={{ uri: getCategoryImage(data?.category) || data?.thumbnail_id }} 
            />
          ) : (
            <View style={styles.container}>
              <Video
                source={{ uri: data?.thumbnail_id }}
                style={styles.video}
                resizeMode="cover"
                muted={true}
              />
            </View>
          )}
        </View>


        <View style={{display: 'flex', width: '70%', paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, height: '100%', backgroundColor: '#FFF', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <Text numberOfLines={2} 
                ellipsizeMode="tail" style={{ fontSize: 16, width: '100%', color: '#000' }}>{data?.title}</Text>
            <Text numberOfLines={2} 
                ellipsizeMode="tail" style={{ fontSize: 12, width: '100%', fontWeight: '500', color: '#000' }}>{
                  data?.purpose === 'product'
                  ?
                  '₦' + new Intl.NumberFormat('en-us').format(data?.price)
                  :
                  data?.purpose === 'accomodation'
                  ?
                  '₦' + new Intl.NumberFormat('en-us').format(data?.price) + ' To Pay ₦' + new Intl.NumberFormat('en-us').format(data?.others?.lodge_data?.upfront_pay) 
                  : 
                  ''
                }</Text> 
            <Text numberOfLines={2} 
            ellipsizeMode="tail" style={{fontSize: 10, width: '100%', color: '#000'}}>{data?.description !== 'null' ? data?.description : ''}</Text>
        </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 100,          // ✅ explicit height (same as Image for consistency)
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',   // ensures rounded corners apply to video
  },
  video: {
    height: '100%',
    width: '100%',
  },
});
