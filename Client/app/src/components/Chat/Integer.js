import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function IntegerCard({question, unit, options, updateUnit}) {
    useEffect(() => {
    
    }, [unit])
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
                        <TouchableOpacity activeOpacity={.8} onPress={e => {
                            index === 0 
                            ? 
                            updateUnit(unit+1)
                            :
                            index === 2
                            ?
                            updateUnit(unit-1)
                            :
                            ''
                        }} key={index} style={[styles.btn, {backgroundColor: index === 0 ? '#FFA500': index === 1 ? "#FFF" : '#000'}]}>
                            <Text style={{color: index === 1 ? '#000' : '#FFF'}}>
                                {
                                    index === 1 ? unit : item
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
           }
        </View>
        <View style={styles.btnCnt}>
            <TouchableOpacity style={[styles.btn, {
                width: '100%',
                height: 40,
                backgroundColor: '#00BAFF'
            }]}>
                <Text style={{color: '#FFF'}}>Set</Text>
            </TouchableOpacity>
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
        backgroundColor: '#f9f9f9',
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
        backgroundColor: '#FFA500',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})