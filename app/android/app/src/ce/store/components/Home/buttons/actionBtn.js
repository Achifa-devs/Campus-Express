import React from 'react'
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View
} from 'react-native';

export default function ActionBtn() {
  return (
    <>
        <View style={styles.actionBtn}>

            <TouchableOpacity style={{width: '68%',borderRadius: 15, height: '100%', backgroundColor: '#32CD32',  display: 'flex', flexDirection: 'row',justifyContent: 'center', paddingLeft: 6, paddingRight: 6,alignItems: 'center'}}>
                <Text style={{fontSize: 10}}>Buy Now At 49,000</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={{width: '28%', backgroundColor: '#efefef', height: '100%',borderRadius: 15,display: 'flex', flexDirection: 'row',justifyContent: 'center', paddingLeft: 6, paddingRight: 6,alignItems: 'center'}}>
                <Text style={{fontSize: 10,}}>cart</Text>
            </TouchableOpacity> 

        </View>
    </>
  ) 
}



const styles = StyleSheet.create({
    
    actionBtn:{
        height: 50,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 5,
        
        left: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
  });