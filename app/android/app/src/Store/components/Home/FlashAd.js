import React from 'react'
import appliances from '../../../media/assets/appliances.png'
import phone from  '../../../media/assets/Artboard_1_copy_2.png'
import laptop from '../../../media/assets/Artboard_1_copy_3.png'
import grocery from '../../../media/assets/Artboard_1_copy_4.png'
import electronics from '../../../media/assets/Artboard_1_copy_7.png'
import fashion from '../../../media/assets/Artboard_1_copy_13.png'
import gif from '../../../media/assets/BUY-NOW-PAY-LATER_GIF-2.gif'

import { 
  Dimensions,
  Image,
  StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function FlasAds() {
  let screenWidth = Dimensions.get('window').width;
  let navigation = useNavigation()
  let list = [
    {name: 'appliances', svg: appliances, uri: '../../../media/assets/appliances.png'},
    {name: 'phone', svg: phone, uri: '../../../media/assets/Artboard_1_copy_2.png'},
    {name: 'laptop', svg: laptop, uri: '../../../media/assets/Artboard_1_copy_3.png'},
    {name: 'grocery', svg: grocery, uri: '../../../media/assets/Artboard_1_copy_4.png'},
    {name: 'electronics', svg: electronics, uri: '../../../media/assets/Artboard_1_copy_7.png'},
    {name: 'fashion', svg: fashion, uri: '../../../media/assets/Artboard_1_copy_13.png'},
    {name: 'gif', svg: gif, uri: '../../../media/assets/BUY-NOW-PAY-LATER_GIF-2.gif'},
]
  return (  
    <>
      <View style={styles.flashAdsCnt}>
        {
          list.map((item,index) => 
            <TouchableOpacity style={[styles.adsCard,{width: 
              screenWidth <= 480
              ? 
              (screenWidth * 0.25) - 15
              :
              ''
            }]} key={index} onPress={e => index+1 === list.length ? navigation.navigate('user-category') : ''}>
              <Image 
                  source={item.svg}
                  style={{height: '100%', width: '100%', borderRadius: 15}}
                />
            </TouchableOpacity>
          )
        }
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  flashAdsCnt:{
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 0,
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#fff'
  },
  adsCard:{
    height: 80,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 0,
    marginLeft: 5, 
    marginRight: 5,
    marginBottom: 10
  }
});