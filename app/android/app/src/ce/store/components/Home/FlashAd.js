import React from 'react'
import { 
  Dimensions,
  StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from 'react-native'

export default function FlasAds() {
  let screenWidth = Dimensions.get('window').width;
  let list = [
    {name: 'Phones', svg: '', uri: ''},
    {name: 'Laptops', svg: '', uri: ''},
    {name: 'Fashion', svg: '', uri: ''},
    {name: 'Appliances', svg: '', uri: ''},
    {name: 'Gadgets', svg: '', uri: ''},
    {name: 'Furnitures', svg: '', uri: ''},
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
            }]} key={index}>
              <View>

              </View>

              <Text>
                {item.name}
              </Text>
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
    marginBottom: 5,
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
    padding: 10,
    marginLeft: 5, 
    marginRight: 5,
    marginBottom: 10
  }
});