import React, { useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { send_token } from '../../utils/sms_token';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { send_token } from '../../../../utils/sms_token';

export default function Pin({ route, navigation }) {
    const { token } = route.params || {};
    let [token_sent, set_token_sent] = useState(false)
    let [pwd_set, set_pwd_set] = useState(false)
    let {
        user
    }=useSelector(s=> s.user)
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    let [pwd, set_pwd] = useState('');
    let [c_pwd, set_c_pwd] = useState('');

    let [pwdErr, setPwdErr] = useState('')
    let [c_pwdErr, set_c_pwdErr] = useState('');

    async function update_transfer_pin() {
      
        return await axios.post('http://192.168.144.146:9090/seller.update-pin', {pwd: pwd,seller_id: user?.seller_id})
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
                        <Text style={{ fontSize: 16, color: '#fff', marginTop: 15, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center' }}>Updating transfer pin.{'\n'}please wait.</Text>
                </View>
                :
                ''
            }
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Change transfer pin</Text>

                <ScrollView >
                    

                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>You need to use a token sent to you to update your pin. This is so we can properly verify your identity.</Text>
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View>
                    {/* <View style={styles.inputCnt}>
                        <Text style={styles.label}>Token</Text>
                        <TextInput style={styles.input} placeholder='Token' />
                    </View> */}

                    {
                        token
                        ?
                        <>
                            <View style={styles.inputCnt}>
                                <Text style={styles.label}>New pin</Text>
                                  <TextInput keyboardType='numeric' maxLength={4} onChangeText={(text) => set_pwd(text)} style={styles.input} placeholder='New pin' />
                                  <Text style={{fontSize: 12, marginLeft: 5, color: 'red', fontWeight: '400', marginBottom: 10, fontFamily: 'Roboto', height: 'auto', width: '100%', textAlign: 'left', display: pwdErr !== '' ? 'flex' : 'none'}}>{
                                    pwdErr
                                }</Text>
                            </View>
                            
                            <View style={styles.inputCnt}>
                                <Text style={styles.label}>Confirm new pin</Text>
                                  <TextInput keyboardType='numeric' maxLength={4} onChangeText={(text) => set_c_pwd(text)} style={styles.input} placeholder='Confirm new pin' />
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
                    <TouchableOpacity onPress={async () => {
                     
                    

                      if (token === undefined) {
                        set_token_sent(true);
                          
                        let response = await send_token(user?.phone);
                          
                        if (response) {
                        navigation.navigate('user-token', { redirect: 'user-settings-1-pin' })
                        set_token_sent(false)
                        }
                      } else {
                            setPwdErr('')
                            set_c_pwdErr('')
                            let data = {
                                pwd: false,
                                c_pwd: false
                            };

                            function validate_pwd() {
                                if (pwd !== null && pwd !== '' && pwd.length === 4) {
                                    data.pwd = true;
                                }else{
                                    if(pwd.length === 0) {
                                        data.pwd = false;
                                        setPwdErr('Passcode cannot be empty')
                                    } else if(pwd.length < 4){
                                        data.pwd = false;
                                        setPwdErr('Passcode must contain at least 4 digits')
                                    }
                                }

                                if (pwd !== '' && pwd === c_pwd) {
                                    data.c_pwd = true;
                                }else{
                                    data.c_pwd = false;
                                    set_c_pwdErr('Passcode mismatch')
                                }

                            }

                          validate_pwd()
                          console.log(data.pwd , data.c_pwd)
                            if (data.pwd && data.c_pwd) {
                                set_pwd_set(true)

                                let response = await update_transfer_pin();
                                console.log(response)
                                if (response.success) {
                                    //Alert message
                                    Alert.alert('Pin was saved successfully.');
                                    set_pwd_set(false)
                                    set_pwd('')
                                    set_c_pwd('')
                                } else {
                                    Alert.alert(response.err);
                                    set_pwd_set(false)
                                }
                            }
                      }
                    }} style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4500', borderRadius: 8}}>
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
        marginLeft: 5,
        fontWeight: '800',
        marginBottom: 10
        }
    });
    