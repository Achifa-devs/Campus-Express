import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function OptionCard({question, options}) {
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
                        <TouchableOpacity key={index} style={[styles.btn, {backgroundColor: index === 0 ? '#FFA500' : '#2F2F2F'}]}>
                            <Text style={{color: '#FFF'}}>
                                {
                                    item
                                }
                            </Text>
                        </TouchableOpacity>
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
        width: '48%',
        height: 35,
        backgroundColor: '#FFA500',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})