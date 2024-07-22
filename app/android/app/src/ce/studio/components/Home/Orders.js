import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
export default function Orders() {
  let screenWidth = Dimensions.get('window').width;
    let list = [
      {name: 'Earning This Month', value: 100000},
      {name: 'Cleared Ordered', value: 50},
      {name: 'Active Orders', value: 30},
      {name: 'Cancelled Orders', value: 12}
    ]
  return (
    <>
        <View>
            
            <Text style={{padding: 10, color: '#000', fontSize: 18}}>Overview</Text>
            <View style={[
                styles.card,
                {width: '100%'}
            ]}> 
                <View style={{
                    height: 'auto',
                    padding: 0,
                    // marginLeft: 5,  
                    borderRadius: 5, 
                    marginRight: 5,
                    display: 'flex', 
                    justifyContent: 'space-evenly', 
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 0,
                    marginBottom: 5,
                    backgroundColor: '#fff'
                }}>
                    {
                        list.map((item,index) => 
                            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: 100, width: '48%', marginBottom: 10, alignItems: 'center', backgroundColor: 'rgb(255, 238, 223)', borderRadius: 10, borderWidth: 0, borderColor: '#FF4500'}}>
                                <Text style={{fontSize: 24, padding: 8, color: '#000', textDecorationStyle: 'dashed'}}>{
                                    index === 0 ? <>&#8358;{new Intl.NumberFormat('en-us').format(item.value)}</> : item.value
                                }</Text>
                                <Text style={{fontSize: 12, color: '#000'}}>{item.name}</Text>
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
        padding: 0,
        // marginLeft: 5, 
        borderRadius: 5,
        // marginRight: 5,
        display: 'flex', 
        justifyContent: 'space-evenly', 
        flexDirection: 'column',
        flexWrap: 'wrap',
        // padding: 8,
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