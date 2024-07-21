import React from 'react'
import { 
    Dimensions,
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    View 
} from 'react-native';

export default function Search() {
  let screenWidth = Dimensions.get('window').width;

  return (
    <>
      <View style={[styles.searchCnt, {width: screenWidth}]}>
        <TouchableOpacity style={styles.search} placeholder='Search Here'>
            
        </TouchableOpacity>
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
        marginBottom: 5
    },
    search:{
        height: 55,
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#efefef'
    }
  });