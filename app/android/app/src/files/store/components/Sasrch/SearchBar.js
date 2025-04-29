import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BackSvg from '../../../media/assets/back-svgrepo-com (1).svg'
import { useNavigation } from '@react-navigation/native'
export default function SearchBar({updateSearchChar}) {
    let navigation = useNavigation()

  return ( 
    <>
      <View>
        <View style={styles.searchCnt}>
          <TouchableOpacity style={styles.back} onPress={e => navigation.navigate('user-home')}> 
            <BackSvg height={25} width={25} />
          </TouchableOpacity>
          <TextInput onChangeText={txt => {updateSearchChar(txt)}} style={styles.search} placeholder='What Are You LookinG For' />
        </View>

        {/* <View style={styles.searchFilter}>  
          <TouchableOpacity style={styles.btn}>
            <Text>Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>Shops</Text>
          </TouchableOpacity>   
          <TouchableOpacity style={styles.btn}>
            <Text>Price</Text>
          </TouchableOpacity>   
          <TouchableOpacity style={styles.btn}>
              <Text>Location</Text>
          </TouchableOpacity>   
        </View> */}
      </View>
    </>
  ) 
}




const styles = StyleSheet.create({
  searchCnt:{
      height: 100,
      //   width: '100%',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginBottom: 5
  },
  search:{
      height: 55,
      borderRadius: 15,
      padding: 10,
      width: '85%',
      backgroundColor: '#efefef',
      float: 'right'
  },
  back:{
    height: 55,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
},
  searchFilter:{
    height: 'auto',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    flexWrap: 'wrap',
    // borderRadius: 20, 
    padding: 8,
    // backgroundColor: 'rgb(255, 244, 224)',
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 1.5
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
    backgroundColor: '#f1f1f1',
    marginLeft: 5,
    marginRight: 5

},
});