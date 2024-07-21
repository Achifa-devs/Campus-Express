import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionBtn from './buttons/actionBtn';
export default function Engagement() {
  let screenWidth = Dimensions.get('window').width;
    let list = [
        {name: 'Impressions', },
        {name: 'Views', },
        {name: 'Likes', },
    ]
  return (
    <>
        <View>
            

            <View style={[
                styles.card,
                {width: '100%'}
            ]}> 
                <Text style={{padding: 10, fontSize: 18, color: '#000'}}>Engagements</Text>
                <View style={{
                    height: 'auto',
                    padding: 10,
                    marginLeft: 5,  
                    borderRadius: 15, 
                    marginRight: 5,
                    display: 'flex', 
                    justifyContent: 'space-evenly', 
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 8,
                    marginBottom: 5,
                    backgroundColor: '#fff'
                }}>
                    {
                        list.map((item,index) => 
                            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: 100, width: '31%', alignItems: 'center', backgroundColor: '#f9f9f9', marginBottom: 0, borderRadius: 10}}>
                                <Text style={{fontSize: 24, padding: 8, color: '#000', textDecorationStyle: 'dashed'}}>25</Text>
                                <Text>{item.name}</Text>
                            </View>   
                        )
                    }
                </View>
                
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 'auto',
        padding: 10,
        marginLeft: 5, 
        borderRadius: 15,
        marginRight: 5,
        display: 'flex', 
        justifyContent: 'space-evenly', 
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 8,
        marginBottom: 5,
        backgroundColor: '#fff'
    },

    cardTop:{
        height: 100,
        width: '100%',
        backgroundColor: '#efefef',
        borderRadius: 15,
        padding: 0,
        position: 'relative',

        marginBottom: 5
    },

    cardBtm:{
        height: 140,
        width: '100%',
        padding: 0,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 15,

    },

    
  });