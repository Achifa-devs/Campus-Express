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
import Video from 'react-native-video';


export default function CardContent({data}) {
  return (
      <>
        <View style={{ width: '30%', marginLeft: 5 }}>
            {data?.purpose !== 'accomodation'
                ? (
                <Image 
                    style={{ height: 100, width: '100%', borderRadius: 5 }} 
                    source={{ uri: data?.thumbnail_id }} 
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
                )
            }
        </View>

        <View style={{display: 'flex', width: '70%', paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, height: '100%', backgroundColor: '#FFF', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <Text numberOfLines={2} 
                ellipsizeMode="tail" style={{ fontSize: 16, width: '100%', color: '#000' }}>{data?.title}</Text>
            <Text numberOfLines={2} 
                ellipsizeMode="tail" style={{ fontSize: 12, width: '100%', fontWeight: '500', color: '#000' }}>₦{new Intl.NumberFormat('en-us').format(data?.price)}</Text>
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
