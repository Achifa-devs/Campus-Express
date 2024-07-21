import React from 'react'
import { 
    Dimensions,
    ScrollView, 
    StyleSheet,
    View 
} from 'react-native'
import Card from './Card';

export default function ShowCase() {
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;

  return (
    <>
        <View style={styles.showcase}>
            <Card />
            <Card />
        </View>
    </>
  )
}


const styles = StyleSheet.create({
    showcase:{
        height: 'auto',
        width: '100%',
        padding: 10,
        backgroundColor: '#efefef',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    search:{
        height: 55,
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#efefef'
    }
  });