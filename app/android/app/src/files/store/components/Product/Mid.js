import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Mid({size, description}) {
    return (
        <>
         
            
            <View style={styles.card}>
                {/* <Text style={{marginBottom: 10, fontSize: 17, color: '#000', fontWeight: 'bold'}}>Description</Text> */}
                <Text style={{fontSize: size ? size :  12, color: '#000', padding: 5,backgroundColor: '#fff', width: '100%'}}>
                    {description}
                </Text>
            </View>

            

        </>
      )
    }
    
    
    const styles = StyleSheet.create({
        card:{
            height: 'auto',
            width: '100%',
            padding: 0,
            padding: 8,
            // marginBottom: 2.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
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
    
        
      });
    