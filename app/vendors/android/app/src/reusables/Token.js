import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, StatusBar, View, Text, TouchableOpacity, Vibration } from 'react-native'
import { useSelector } from 'react-redux';
import BackSvg from '../assets/back-svgrepo-com (4).svg'
import { set_token } from "../../../../redux/token";
import { useDispatch } from "react-redux";
import { getData } from './AsyncStore.js';
export default function Token({navigation, route}) {
    let dispatch = useDispatch()
    const { redirect } = route.params || {};
    let [token, set_token] = useState('')
    let [input_token, set_input_token] = useState('')
    let [tokenErr, setTokenErr] = useState('')

    useEffect(() => {
        console.log('redirect: ', redirect)
        get_token()
    }, [])

    async function get_token() {
        let token = await getData('token')
        set_token(token)
    }

    let {
        user
    } = useSelector(s=>s.user);
    return (
        <>
            <StatusBar backgroundColor="#FF4500" barStyle="light-content" />
           
            <View style={styles.cnt} >
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>

                    <Text style={{fontSize: 26, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Confirm token</Text>
                </View>
    
                <ScrollView >
                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>Token</Text>
                        <TextInput style={styles.input} onChangeText={e => set_input_token(e)} placeholder='Token' />
                        <Text style={{fontSize: 12, marginLeft: 5, color: 'red', fontWeight: '400', marginBottom: 10, fontFamily: 'Roboto', height: 'auto', width: '100%', textAlign: 'left', display: tokenErr !== '' ? 'flex' : 'none'}}>{
                            tokenErr
                        }</Text>
                    </View>


                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>Enter the token sent to your current email to continue.</Text>
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View>


                    
                    <Text style={{fontSize: 14, color: '#646464', padding: 0, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center', width: 'auto'}}>
                        <TouchableOpacity  onPress={e=> set_active_screen(active_screen - 1)}>
                            <Text style={{color: '#000', height: 'auto'}}>Resend token in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={e=> set_active_screen(active_screen - 1)}>
                            <Text style={{color: '#FF4500', height: 'auto'}}> 0:00</Text>
                        </TouchableOpacity>
                    </Text>
                 
                </ScrollView>
    
                <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={e => {
                        if (token !== '' && token === input_token) {
                            navigation.navigate(redirect, {token: token === input_token ? true : false})
                            setTokenErr('')
                            
                        } else {
                            Vibration.vibrate(100)
                            setTokenErr('Invalid token')
                        }
                        // navigation.navigate(redirect, {token: token === input_token ? true : false})
                    }} style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4500', borderRadius: 8}}>
                        <Text style={{color: '#FFF', fontWeight: '500'}}>Confirm token</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
    
    
const styles = StyleSheet.create({
    cnt: {
        width: '100%',
        padding: 10,
        // position: 'absolute', 
        backgroundColor: '#fff',
        height: '100%'
            

        },
        dateInputCnt: {
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
        },
        dateInput: {
        width: '30%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto'
            

        },

        inputCnt: {
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
        paddingLeft: 8,
        paddingRight: 8,
        

        },
        input: {
        width: '100%',
        padding: 15,
        // position: 'absolute', 
        backgroundColor: '#fff',
        height: 50,
        borderColor: '#000',
        borderWidth: .7,
        borderRadius: 7

        },

        label: {
        fontFamily: 'Roboto',
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '800',
        marginBottom: 10
        }
    });
    