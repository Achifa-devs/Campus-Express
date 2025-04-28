import React, { useCallback, useLayoutEffect }  from 'react'
import { 
    Dimensions,
    ScrollView, 
    StyleSheet,
    Text,
    View 
} from 'react-native'
import { useEffect, useState } from 'react';
 
import Card from './Card';
import items from './item.json';
import { useFocusEffect } from '@react-navigation/native';
 
export default function ShowCase({category, limit, bg}) {
    let screenWidth = Dimensions.get('window').width;

    let [list, set_list] = useState([])

    useEffect(() => {
      let cat = (items.items.category).splice(0,8)
      cat.push({More: []})
      set_list(cat)
    }, [])
 
    let [data, setData] = useState([])
  
   
  return (  
      <>
        {/* <View style={{padding: 10, backgroundColor: 'rgb(255, 244, 224)'}}>
            <Text style={{fontWeight: 700., fontSize: 25, color: '#FF4500'}}>Product Categories</Text>
        </View> */}
        <View style={[styles.showcase, {backgroundColor: '#FFF'}]}>
            {
                items.items.category.length > 0
                ?
                list.map((item, index) => <Card item={item} />)
                :
                <Text>No Item To Display</Text>
            }
            
        </View> 
    </>
  )
}


const styles = StyleSheet.create({
    showcase:{
        // height: 'auto',
        width: '100%',
        padding: 7,
        backgroundColor: '#FFF',
        marginBottom: .5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    search:{
        height: 55,
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#efefef'
    }
  });