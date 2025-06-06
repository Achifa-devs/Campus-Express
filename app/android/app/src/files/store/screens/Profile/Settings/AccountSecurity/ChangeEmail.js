import React, { useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native';
import { useSelector } from 'react-redux';
// import { send_token } from '../../utils/sms_token';
import axios from 'axios';
import { send_token } from '../../../../../vendor/utils/sms_token';


export default function ChangeEmail({ route, navigation }) {
     const { token } = route.params || {};
    let {
        user
    } = useSelector(s => s.user);
    let [token_sent, set_token_sent] = useState(false)
    let [phone_sent, set_phone_sent] = useState(false)

     function check_number_config(num) {
        if (parseInt(num[0]) === 0) {
            return 11
        } else {
            return 10
        }
    }


    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    // let [phone, set_phone] = useState('');
    let [new_email, set_new_email] = useState('')
    let [emailErr, setEmailErr] = useState('')

    async function update_email() {
      
        return await axios.post('https://cs-server-olive.vercel.app/vendor/email-update', {email: new_email, id: user?.id})
        .then(({ data }) => ({bool: data.success}))
        .catch(err => (err.response?.data))
    }
    return (
        <>
            
            {
                token_sent
                ?
                <View style={{ position: 'absolute', top: 0, height: screenHeight, width: screenWidth, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
                    <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ fontSize: 16, color: '#fff', marginTop: 15, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center' }}>Sending token to your email. {'\n'}please wait.</Text>
                </View>
                :
                ''
            }
            {
                phone_sent
                ?
                <View style={{ position: 'absolute', top: 0, height: screenHeight, width: screenWidth, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
                    <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ fontSize: 16, color: '#fff', marginTop: 15, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center' }}>Updating email.{'\n'}please wait.</Text>
                </View>
                :
                ''
            }
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 'auto', backgroundColor: '#fff'}}>Change primary email</Text>
    
                <ScrollView >

                    <View style={styles.inputCnt}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auot', backgroundColor: '#fff'}}>We&apos;ll text you another verification code to your new number to confirm it.</Text>
                    </View>
                   


                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto' }}>You need to use a token sent to you to update your email. This is so we can properly verify your identity.</Text>
                        
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View>
                   
                    
 
                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>Primary email</Text>
                        <View style={{flexDirection: 'row', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TextInput style={styles.input} value={user?.email} placeholder='Email' />
                        </View>
                    </View>

                    {
                        token
                        ?
                            <View style={styles.inputCnt}>
                                <Text style={styles.label}>New primary email</Text>
                                <TextInput style={styles.input} onChangeText={txt=>set_new_email(txt)} placeholder='Email' />

                                <Text style={{fontSize: 12, marginLeft: 5, color: 'red', width: '100%', fontWeight: '400', marginBottom: 10, fontFamily: 'Roboto', height: 'auto', textAlign: 'left', display: emailErr !== '' ? 'flex' : 'none'}}>{
                                    emailErr
                                }</Text>
                            </View>
                            :
                            ''
                    }

                    <Text style={{fontSize: 14, color: '#646464', marginTop: 10, padding: 0, fontWeight: '400', fontFamily: 'Roboto', height: 30, justifyContent: 'flex-start', textAlign: 'center', width: 'auto'}}>
                        <TouchableOpacity  onPress={e=> navigation.navigate('recover-pwd')}>
                            <Text style={{color: '#ff4400', height: 'auto', fontWeight: '500'}}>Register new email instead.</Text>
                        </TouchableOpacity>
                    </Text>

                </ScrollView>
    
                <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{ height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4500', borderRadius: 8 }} onPress={async (e) => {

                       if(true) {
                            setEmailErr('')

                           if (token === undefined) {
                                setEmailErr('')
                                
                                set_token_sent(true);
                          
                                let response = await send_token({email: user?.email});
                            
                                if (response) {
                                    navigation.navigate('user-token', { redirect: 'user-settings-1-email' })
                                    set_token_sent(false)
                                }
                                
                           } else {
                               
                               Vibration.vibrate(30);

                                let test = {email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}

                                // console.log(num_config)
                                if (new_email.length < 1) {
                                    Vibration.vibrate(90);
                                    setEmailErr('Invalid email...')
                                } else if (!new_email.match(test.email)) { 
                                    Vibration.vibrate(90);
                                    setEmailErr('Invalid email...')
                                } else {
                                    set_phone_sent(true)

                                    let response = await update_email();
                                    console.log(response)
                                    if (response.success) {
                                        //Alert message
                                    
                                        Alert.alert('New email was saved successfully.');
                                        set_phone_sent(false)
                                        set_new_email('')
                                        navigation.goBack()
                                    } else {
                                        set_phone_sent(false)
                                        Alert.alert('Error saving email, please try again.');
                                        
                                    }
                                }
                                
                            }
                        }
                        
                        
                    }}>
                        <Text style={{ color: '#FFF', fontWeight: '500' }}>{ 
                          token ? 'Save' : 'Send token'
                      }</Text>
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
        countryCode: {
        width: '20%',
        marginTop: 10, 
        borderColor: '#000',
        borderWidth: .7,
        borderRadius: 7,
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
        textAlign: 'center'
            

        },

        inputCnt: {
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flexDirection: 'row'
        

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
        width: '100%',
        marginLeft: 5,
        fontWeight: '900',
        marginBottom: 1
        }
    });
    