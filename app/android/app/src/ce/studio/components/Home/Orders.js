import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
export default function Orders() {
  let screenWidth = Dimensions.get('window').width;
    let list = [
      {name: 'Availble For Withdrawal', },
      {name: 'Earning This July', },
      {name: 'Avg. Selling Price', },
      {name: 'Cleared Payments', },
      {name: 'Active Orders', },
      {name: 'Inactive Orders', }
    ]
  return (
    <>
        <View>
            

            <View style={[
                styles.card,
                {width: '100%'}
            ]}> 
                <Text style={{padding: 10, fontSize: 18, color: '#000'}}>Earnings</Text>
                <View style={{
                    height: 'auto',
                    padding: 0,
                    // marginLeft: 5,  
                    borderRadius: 15, 
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
                            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: 100, width: '48%', marginBottom: 10, alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 10}}>
                                <Text style={{fontSize: 24, padding: 8, color: '#000', textDecorationStyle: 'dashed'}}>25</Text>
                                <Text style={{fontSize: 12}}>{item.name}</Text>
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