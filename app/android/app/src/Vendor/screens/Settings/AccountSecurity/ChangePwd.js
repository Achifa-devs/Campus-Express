import React, { useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { send_token } from '../../../utils/sms_token';
// import { send_token } from '../../utils/sms_token';
// import { send_token } from '../../../utils/sms_token';

export default function ChangePwd({ route, navigation }) {
    const { token } = route.params || {};
    let [token_sent, set_token_sent] = useState(false)
    let [pwd_set, set_pwd_set] = useState(false)

    let {
        user
    }=useSelector(s=> s.user)
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    let [pwd, set_pwd] = useState('');
    let [current_pwd, set_current_pwd] = useState('');
    let [c_pwd, set_c_pwd] = useState('');

    let [pwdErr, setPwdErr] = useState('')
    let [c_pwdErr, set_c_pwdErr] = useState('');
    let [currentPwdErr, set_currentPwdErr] = useState('');

    async function update_pwd_pin() {
      
        return await axios.post('http://192.168.249.146:2003/system.passcode-update', {pin: pwd, old_pin: current_pwd, id: user?.id})
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
                        <Text style={{ fontSize: 16, color: '#fff', marginTop: 15, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center' }}>Sending token. {'\n'}please wait.</Text>
                </View>
                :
                ''
          }
          {
                pwd_set
                ?
                <View style={{ position: 'absolute', top: 0, height: screenHeight, width: screenWidth, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
                    <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ fontSize: 16, color: '#fff', marginTop: 15, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center' }}>Updating passcode.{'\n'}please wait.</Text>
                </View>
                :
                ''
            }
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Change passcode</Text>
    
                <ScrollView >

                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>You need to use a token sent to you to update your pin. This is so we can properly verify your identity.</Text>
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View>
                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>We will never send you a temporary passcode by phone, email or text message. When changing your passcode, always use something that&apos;s only known to you.</Text>
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View>
                    <Text style={{fontSize: 14, color: '#646464', marginTop: 10, padding: 0, fontWeight: '400', fontFamily: 'Roboto', height: 30, justifyContent: 'flex-start', textAlign: 'center', width: 'auto'}}>
                        <TouchableOpacity  onPress={e=> navigation.navigate('recover-pwd')}>
                            <Text style={{color: '#000', height: 'auto'}}>Forgot passcode? </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={e=> navigation.navigate('recover-pwd')}>
                            <Text style={{color: '#FF4500', height: 'auto'}}>Recover it now.</Text>
                        </TouchableOpacity>
                    </Text>
                    {
                        token
                        ?
                        <>
                        <View style={styles.inputCnt}>
                            <Text style={styles.label}>Current passcode</Text>
                            <TextInput onChangeText={(text) => set_current_pwd(text)} style={styles.input} placeholder='Current Passcode' />
                            <Text style={{fontSize: 12, marginLeft: 5, color: 'red', fontWeight: '400', marginBottom: 10, fontFamily: 'Roboto', height: 'auto', width: '100%', textAlign: 'left', display: currentPwdErr !== '' ? 'flex' : 'none'}}>{
                                currentPwdErr
                            }</Text>
                        </View>

                        <View style={styles.inputCnt}>
                            <Text style={styles.label}>New passcode</Text>
                            <TextInput  onChangeText={(text) => set_pwd(text)} style={styles.input} placeholder='New Passcode' />
                            <Text style={{fontSize: 12, marginLeft: 5, color: 'red', fontWeight: '400', marginBottom: 10, fontFamily: 'Roboto', height: 'auto', width: '100%', textAlign: 'left', display: pwdErr !== '' ? 'flex' : 'none'}}>{
                                pwdErr
                            }</Text>
                        </View>

                        <View style={styles.inputCnt}>
                            <Text style={styles.label}>Confirm new passcode</Text>
                            <TextInput onChangeText={(text) => set_c_pwd(text)} style={styles.input} placeholder='Confirm new Passcode' />
                            <Text style={{fontSize: 12, marginLeft: 5, color: 'red', fontWeight: '400', marginBottom: 10, fontFamily: 'Roboto', height: 'auto', width: '100%', textAlign: 'left', display: c_pwdErr !== '' ? 'flex' : 'none'}}>{
                                c_pwdErr
                            }</Text>
                        </View>
                        </>
                        :
                        ''
                    }

                </ScrollView>
    
                <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4500', borderRadius: 8}} onPress={async () => {
                     
                    
                      if (token === undefined) {
                        set_token_sent(true);
                          
                        let response = await send_token(user?.phone);
                          
                        if (response) {
                        navigation.navigate('user-token', { redirect: 'user-settings-1-password' })
                        set_token_sent(false)
                        }
                      } else {
                            setPwdErr('')
                            set_c_pwdErr('')
                            let data = {
                                pwd: false,
                                c_pwd: false,
                                current_pwd: false
                            };

                            function validate_pwd() {
                                if (pwd !== null && pwd !== '' && pwd.length === 6) {
                                    data.pwd = true;
                                }else{
                                    if(pwd.length === 0) {
                                        data.pwd = false;
                                        setPwdErr('Passcode cannot be empty')
                                    } else if(pwd.length < 6){
                                        data.pwd = false;
                                        setPwdErr('Passcode must contain at least 6 digits')
                                    }
                                }

                                if (pwd !== '' && pwd === c_pwd) {
                                    data.c_pwd = true;
                                    set_c_pwdErr('')

                                }else{
                                    data.c_pwd = false;
                                    set_c_pwdErr('Passcode mismatch')
                                }

                                if (current_pwd !== '' && current_pwd.length > 0) {
                                    data.current_pwd = true;
                                    set_currentPwdErr('')

                                }else{
                                    data.c_pwd = false;
                                    set_currentPwdErr('Current passcode cannot be empty.')
                                }

                            }

                          validate_pwd()
                            if (data.pwd && data.c_pwd && data.current_pwd) {
                                set_pwd_set(true)

                                let response = await update_pwd_pin();
                                console.log(response)
                                if (response.success) {
                                    //Alert message
                                    
                                    Alert.alert('Passcode was saved successfully.');
                                    set_pwd_set(false)
                                    set_pwd('')
                                    set_c_pwd('')
                                    navigation.goBack()
                                } else {
                                    Alert.alert(response.err);
                                    set_pwd_set(false)
                                }
                            } else {
                                Vibration.vibrate(100)
                                Alert.alert('Passcode was not saved successfully, please try again.');
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
        marginLeft: 3.5,
        fontWeight: '800',
        marginBottom: 5
        }
    });
    