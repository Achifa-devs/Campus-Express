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
import { GetItems } from '../../apis/buyer/get';
import { useFocusEffect } from '@react-navigation/native';
 
export default function ShowCase({category, limit, bg}) {
    let screenWidth = Dimensions.get('window').width;

    let [selected_limit, set_selected_limit] = useState(limit)
    let [selected_category, set_selected_category] = useState(category)

    useEffect(() => {
      set_selected_limit(limit)
      set_selected_category(category) 
    }, [])

    let [data, setData] = useState([])
  
    useFocusEffect( 
        useCallback(() => {
            if(screenWidth > 999){
                set_selected_limit(32)
            }else if(screenWidth > 761 && screenWidth < 1000){ 
                set_selected_limit(30) 
            }else if(screenWidth < 659){
                set_selected_limit(30)
            } 

            GetItems(selected_category, selected_limit)
            .then((result) => {
                if(result){ 
                setData(result)
                console.log('result: ', result)
                }
            })
            .catch(error=>{
                console.log(error)
            })  
            
        }, [])  
    )
  return (  
    <>
        <View style={[styles.showcase, {backgroundColor: bg}]}>
            {
                data.length > 0
                ?
                data.map((item, index) => <Card item={item} />)
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
        backgroundColor: '#efefef',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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