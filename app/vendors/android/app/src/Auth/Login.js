

import { Dimensions, ScrollView, Vibration, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Alert } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserAuthTo } from "../../../redux/reducer/auth";
// GoogleSignInSetup.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackSvg from '../assets/back-svgrepo-com (4).svg'
import CookieManager from '@react-native-cookies/cookies';
import { getData, storeData } from "../reusables/AsyncStore.js";
import { set_cookie } from "../../../../redux/cookie.js";

const Login = ({}) => {

    let navigation = useNavigation();
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    let [userId, setUserId] = useState('');

    let [input, setInput] = useState('email')
    let dispatch = useDispatch() 


    const handleVibrate = (timer) => {Vibration.vibrate(timer)};
    
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [pwd, setPwd] = useState('')

    let [emailErr, setEmailErr] = useState('')
    let [phoneErr, setPhoneErr] = useState('')
    let [pwdErr, setPwdErr] = useState('')

    useEffect(() => {
        async function get_stored_data() {
            let email = await getData('email')
            setEmail(email)
            let phone = await getData('phone')
            setPhone(phone)
        }
        get_stored_data()
    }, [])
    
     
   
    let loginHandler = async() => {
        let response = await validateInput()

        response.map(item => {

            let name = item._j.name;
            let err = item._j.mssg;

            if(name.toLowerCase() === 'email'){
                setEmailErr(err)
            }else if(name.toLowerCase() === 'phone number'){
                setPhoneErr(err)
            }else if(name.toLowerCase() === 'password'){
                setPwdErr(err)
            }
        })

        let data = response.filter((item) => item._j.mssg === '').length > 1 ? true : false;

        if(data){
            let input_data = input === 'email' ? email : phone
            fetch('http://192.168.249.146:2003/system.login', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({input: input,input_data,pwd,provider: 'local'})
            })
            .then(async(result) => {
                let response = await result.json()
                // console.log(result)
                // console.log(response)
                if(response.bool){
                    setUserId(response.id)
                    CookieManager.set('https://paypenz.com', {
                        name: 'jwt_token',
                        value: response.cookie,
                        domain: 'paypenz.com',
                        path: '/',
                        version: '1',
                        secure: true,
                        expires: `'${90 * 24 * 60 * 60}'`
                    })
                    .then((done) => {
                        console.log('Cookie set!', done);
                        storeData('email', response.user.email)
                        storeData('phone', response.user.phone)
                        storeData('user', JSON.stringify(response.user)) 
                        storeData('user_id', response.id)
                        dispatch(set_cookie(true))
                        // openModal()
                    })
                    .catch(err => console.log(err))
                    
                }else{
                    if(response.data === 'duplicate email'){
                        setEmailErr('Email Already Exist')
                    }else if(response.data === 'duplicate phone'){
                        setPhoneErr('Phone Number Already Exist')
                    }
                    // console.log(response.data)

                }

            })
            .catch((err) => {
                // set_server_err(err)
                console.log(err)
                
            })
        }
        
    }

    
    async function validateInput() {

        let data = [  
            {value: phone, name: 'Phone number'},
            {value: email, name: 'Email'},
            {value: pwd, name: 'Password'}
        ];

        let result =  data.map(async(item) => {
            let test = {email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}

            if(item.name.toLowerCase() === 'email'){

                if(item.value.length < 1){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else if(!item.value.match(test.email)){
                    return ({bool: false, mssg: `${item.name} is invalid`, name: item.name})
                }else{ 
                    return ({bool: true, mssg: ``, name: item.name})
                } 
                
            }else if(item.name.toLowerCase() === 'phone number'){

                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else if(item.value.length > 0 && item.value.length < 10){
                    return {bool: false, mssg: `${item.name} is invalid`, name: item.name}
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }

            }else if(item.name.toLowerCase() === 'password'){

                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else if(item.value.length > 0 && item.value.length < 6){
                    return {bool: false, mssg: `${item.name} must be at least 6 numbers`, name: item.name}
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }

            }
        })

        // console.log('result1: ', result1)

        return [...result];
    } 

    return ( 
        <> 

           
            <View style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                backgroundColor: '#FF4500',
                color: '#000',
                padding: 15
            }} contentContainerStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  justifyContent: 'center'}}>

                <View style={{height: 'auto', width: '100%', padding: 5, backgroundColor: '#fff', borderRadius: 10, marginTop: '30%'}} >
                    
                    <View contentContainerStyle={{ display: 'flex', alignItems: 'center', flexDirection: 'column',  justifyContent: 'center'}} style={{height: 'auto', width: '100%', padding: 25, backgroundColor: '#fff'}}>
                    
                        <View style={{
                            height: 'auto',
                            width: '100%',
                            position: 'relative',
                            backgroundColor: '#fff',
                            color: '#000',
                            overflow: 'scroll',
                            marginBottom: 10
                        }}>
                      
                        
                            <ScrollView style={{height: 'auto', width: '100%'}}>
                                <Text style={{width: '100%', color: '#FF4500', fontSize: 20, fontWeight: '500', marginLeft: 8, marginBottom: 25}}>Login Form</Text>
                                
                                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                                    <Text style={{width: '100%', color: '#000', marginLeft: 8}}>Email</Text>
                                    <TextInput style={{height: 50, fontFamily: 'Roboto', padding: 10, borderRadius: 10, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} defaultValue={email} onChangeText={e => setEmail(e)} name="email"  placeholder="Email"  />
                                    <Text style={{color: '#000', marginBottom: 15, display: emailErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{emailErr}</Text>
                                </View>

                                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                                    <Text style={{width: '100%', color: '#000', marginLeft: 8}}>Password</Text>
                                    <TextInput maxLength={6} keyboardType="numeric" style={{height: 50, fontFamily: 'Roboto', padding: 10, borderRadius: 10, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} onChangeText={e => setPwd(e)} name="pwd"  placeholder="Password"  />
                                    <Text style={{color: '#000', marginBottom: 15, display: pwdErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{pwdErr}</Text>
                                </View>

                            </ScrollView>
                        </View>
                    
                    </View>

                    <View style={{
                        height: 'auto',
                        width: '100%',
                        position: 'relative',
                        backgroundColor: '#fff',
                        color: '#000',
                        padding: 20, 
                        overflow: 'scroll'
                    }}>
                        <TouchableOpacity activeOpacity={.6} onPress={e => loginHandler()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, marginBottom: 3, flexDirection: 'row', borderRadius: 15, height: 60, width: '100%', backgroundColor: '#FF4500'}} >
                            <Text style={{fontWeight: 'bold', borderRadius: 15, color: '#fff', textAlign: 'center', fontSize: 15}}>Login</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={e => navigation.navigate('registration')}  style={{height: 60, width: 'auto', marginTop: 5, marginBottom: 5, display: 'flex', alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', flexDirection: 'column'}}>
                                
                            <Text style={{height: 'auto', width: 'auto', fontSize: 10, backgroundColor: '#fff', color: '#FF4500'}}>Don't Have An Account, Register Here</Text>

                        </TouchableOpacity>

                    </View>
                </View>
                
            </View>
        </>
     );
}
 
export default Login;

const styles = StyleSheet.create({
 
    icon: {
      marginRight: 5,
      
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      fontFamily: 'Roboto',
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

          overlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    modal: {
        height: '100%',
        width: '100%',
        padding: 8,
        backgroundColor: '#fff'
    },

    contactInput: {
        height: 70,
        fontSize: 25,
        backgroundColor: '#fff',
        borderRadius: 2,
        
    },

    input0: {
        width: '85%',
        height: '100%',
        borderWidth: .1, 
        padding: 10,
        fontSize: 20,
        fontWeight: '300',
        position: 'absolute',
        right: 0,
        borderColor: 'rgb(0, 0, 0)'
    },

    input1: {
        width: '70%',
        height: '100%',
        borderWidth: .1, 
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        fontWeight: '300',
        position: 'absolute',
        left: 0,
        borderColor: '#000'
    },

    pay: {
        width: '30%',
        height: '100%',
        position: 'absolute',
        right: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    network: {
        width: '15%',
        height: '100%',
        position: 'absolute',
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    amount: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5,
        backgroundColor: 'transparent'
    },

    priceTag: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: '33%',
        height: 100,
        backgroundColor: '#fff',
    },
    paymentOptions: {
        backgroundColor: '#fff',
        height: 70,
        padding: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 2.5,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: '#000',
        borderWidth: 1,
    }
  });