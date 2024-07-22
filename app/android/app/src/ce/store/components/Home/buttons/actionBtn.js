import React from 'react'
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View
} from 'react-native';

export default function ActionBtn({cost}) {
  return (
    <>
        <View style={styles.actionBtn}>

            <TouchableOpacity style={{width: '68%',borderRadius: 15, height: '100%', backgroundColor: '#FF4500',  display: 'flex', flexDirection: 'row',justifyContent: 'center', paddingLeft: 6, paddingRight: 6,alignItems: 'center'}}>
                <Text style={{fontSize: 10, color: '#fff'}}>Buy Now At {new Intl.NumberFormat('en-us').format(0.95 * cost)}</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={{width: '28%', backgroundColor: 'rgb(255, 244, 224);', height: '100%',borderRadius: 15,display: 'flex', flexDirection: 'row',justifyContent: 'center', paddingLeft: 6, paddingRight: 6,alignItems: 'center'}}>
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