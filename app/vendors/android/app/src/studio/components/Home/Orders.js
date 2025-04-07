import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
export default function Orders() {
  let screenWidth = Dimensions.get('window').width;
    let list = [
      {name: 'Earning This Month', value: 100000},
      {name: 'Cleared Ordered', value: 50},
      {name: 'Active Orders', value: 30},
      {name: 'Cancelled Orders', value: 12},
      {name: 'Total Reports', value: 12},
      {name: 'Total Reviews', value: 12}
    ]
  return (
    <>
        <View>
            
            {/* <Text style={{padding: 10, color: '#000', fontSize: 25, fontWeight: 400}}>Overview</Text> */}
            <View style={[
                styles.card,
                  { width: '100%',marginTop: 20 },
                
              ]}> 
                <View style={{width: '100%'}}> 
                    <Text style={{fontSize: 17, fontWeight: '500', margin: 5, color: '#000', textAlign: 'left'}}>Earnings</Text>
                </View>
                
                <View style={{ 
                    height: 'auto',
                    // marginLeft: 5,  
                    borderRadius: 5, 
                    // marginRight: 5,
                    display: 'flex', 
                    justifyContent: 'space-evenly', 
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                      padding: 0,
                    elevation: 2, // Higher values increase shadow intensity
        
                    // borderWidth: 2,borderColor: '#000',
                    marginBottom: 5,
                    backgroundColor: '#fff'
                }}>
                    {
                        list.map((item,index) => 
                            <View style={{
                                display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: 80, width: '45%', marginBottom: 5, alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 2.5, borderWidth: 1, borderColor: '#fff',shadowColor: '#000', // Shadow color
                                shadowOffset: { width: 0, height: 4 }, // Shadow position
                                shadowOpacity: 0.3, // Shadow transparency
                                shadowRadius: 4.65, // Shadow blur radius
                                padding: 10,
                                // Shadow for Android
                                // elevation: 2, // Higher values increase shadow intensity
                            }}> 
                                <Text style={{fontSize: 18, padding: 0, color: index === 0 ? '#3fcd32' : '#000', textDecorationStyle: 'dashed', textAlign: 'left', fontWeight: '500'}}>{
                                    index === 0 ? <>&#8358;{new Intl.NumberFormat('en-us').format(item.value)}</> : item.value
                                }</Text>
                                <Text style={{fontSize: 12, color: '#000', textAlign: 'left'}}>{item.name}</Text>
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
        width: '100%',
        display: 'flex', 
        justifyContent: 'space-evenly', 
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
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