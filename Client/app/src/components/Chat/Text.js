import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function TextCard({question, txt, options, updateTxt}) {
   
  return (
    <> 
      <View style={styles.container}>
        <Text style={styles.question}>
            {
                question
            }
        </Text>
        <View style={styles.btnCnt}>
           {
                options.map((item, index) => {
                    return(
                        ''
                    )
                })
           }
        </View>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    container:{
        height: 'auto',
        width: '60%',
        backgroundColor: '#FFF',
        borderRadius: 6,
        padding: 5,
        marginTop: 5,
    },
    question:{
        width: '100%',
        paddingVertical: 7,
        paddingHorizontal: 8,
        color: '#2E2E2E',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '500',
    },
    btnCnt: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 6,
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        width: '33.3%',
        height: 35,
        backgroundColor: '#FF4500',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})