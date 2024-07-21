import React from 'react'
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity 
} from 'react-native';

export default function SaveBtn() {
  return (
    <>
      <TouchableOpacity style={styles.saveBtn}>
            <Text>save</Text>
        </TouchableOpacity>
    </>
  )
}



const styles = StyleSheet.create({
    
    saveBtn:{
        height: 'auto',
        width: 'auto',
        zIndex: 1000,
        position: 'absolute',
        top: 3,
        padding: 8,
        left: 3,
        backgroundColor: 'blue',
        borderRadius: 15,
        marginBottom: 5
    },
  });