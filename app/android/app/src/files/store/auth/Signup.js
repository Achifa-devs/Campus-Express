import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, StatusBar, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import { storeData } from '../../utils/AsyncStore.js'
import { generateId, getDeviceId } from '../utils/IdGen.js'
import { useNavigation } from '@react-navigation/native'

// import SeeSvg from '../../../assets/see-svgrepo-com.svg'
const Signup = () => {
    const screenHeight = Dimensions.get("screen").height 
    const screenWidth = Dimensions.get("screen").width 
    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [pwd, setPwd] = useState('')
    let [server_err, set_server_err] = useState(false)

    let [fnameErr, setFnameErr] = useState('')
    let [lnameErr, setLnameErr] = useState('')
    let [emailErr, setEmailErr] = useState('')
    let [pwdErr, setPwdErr] = useState('')


    const [isPwdVisible, setIsPwdVisible] = useState(true);
    useEffect(() => {
        if (!isPwdVisible) {
            setTimeout(() => {
                setIsPwdVisible(!isPwdVisible)
            }, 800)
        }
    }, [isPwdVisible])

    let signupHandler = async() => {
       

        let response = await validateInput()

        response.map(item => {

            let name = item._j.name;
            let err = item._j.mssg;

            console.log('errs: ', name, err)


            if(name.toLowerCase() === 'firstname'){
                setFnameErr(err)
            }else if(name.toLowerCase() === 'lastname'){
                setLnameErr(err)
            }else if(name.toLowerCase() === 'email'){
                setEmailErr(err)
            }else if(name.toLowerCase() === 'password'){
                setPwdErr(err)
            }
        })

        let data = response.filter((item) => item._j.mssg === '').length === 4 ? true : false;

        
        if(data){
            set_server_err(true)

            
            // fetch('https://campussphere.net/api/registration/seller', {
            //     method: 'post',
            //     headers: {
            //         "Content-Type": "Application/json"
            //     },
            //     body: JSON.stringify({fname,lname,email,phone,pwd,state,campus,gender})
            // })
            // .then(async(result) => {
            //     let response = await result.json();
            //     console.log(response)
            //     if(response.success){
            //         CookieManager.set('https://campussphere.net', {
            //             name: 'jwt_token',
            //             value: response.cookie,
            //             domain: 'campussphere.net',
            //             path: '/',
            //             version: '1',
            //             secure: true,
            //             expires: `'${90 * 24 * 60 * 60}'`
            //         })
            //         .then((done) => {
            //             console.log('Cookie set!', done);
            //             dispatch(set_cookie(true))
            //         })
            //         .catch(err => console.log(err))
            //     } else {
            //         set_server_err(!true)

            //         Vibration.vibrate(300)
            //         if(response.message === 'Email already exists'){
            //             setEmailErr('Email Already Exist')
            //         }else if(response.message === 'Phone already exists'){
            //             setPhoneErr('Phone Number Already Exist')
            //         }
            //     }
            // })
            // .catch((err) => {
            //     set_server_err(!true)

            //     console.log(err)
            //     setBtn("Signup")
            //     seller_overlay_setup(false, '')
            //     e.target.disabled = false;
            // })
        } else {
            set_server_err(!true)

            Vibration.vibrate(300)
            
        }
        
    }
    
        
    async function validateInput() {

        let data = [  
            {value: fname, name: 'Firstname'},
            {value: lname, name: 'Lastname'},
            {value: email, name: 'Email'},
            {value: pwd, name: 'Password'},
        ];

        let result =  data.map(async(item) => {
            let test = {email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}

            if(item.name.toLowerCase() === 'firstname'){
                
                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else if(item.value.length < 3){
                    return ({bool: false, mssg: `Characters must be at least 3`, name: item.name})
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }

            }else if(item.name.toLowerCase() === 'lastname'){

                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else if(item.value.length < 3){
                    return ({bool: false, mssg: `Characters must be at least 3`, name: item.name})
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }
                
            }else if(item.name.toLowerCase() === 'email'){

                if(item.value.length < 1){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else if(!item.value.match(test.email)){
                    return ({bool: false, mssg: `${item.name} is invalid`, name: item.name})
                }else{ 
                    return ({bool: true, mssg: ``, name: item.name})
                } 
                
            }else if(item.name.toLowerCase() === 'password'){

                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else if(item.value.length > 0 && item.value.length < 8){
                    return {bool: false, mssg: `${item.name} must be at least 8 characters`, name: item.name}
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }

            }
        })

        // console.log('result1: ', result1)

        return [...result];
    } 
    const navigation = useNavigation();

    return ( 
        <> 
            {
                server_err
                ?
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'background-color: rgba(0, 0, 0, 0.5);',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    zIndex: 10
                }}>
                    <ActivityIndicator style={{opacity: 1}} size={'large'} color={'#000'}></ActivityIndicator>
                </View>
                :
                ''
            }
            
            <StatusBar backgroundColor={'#FFF'} barStyle={"dark-content"} />
        
            <View style={{
                backgroundColor: '#FFF',
                height: screenHeight*.75,
                width: screenWidth,
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
               
                <View style={{
                    backgroundColor: '#FFF',
                    height: 'auto',
                    width: screenWidth,
                    padding: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        height: 100,
                        width: 100,
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#FFF',
                        justifyContent: 'center',
                        padding: 15,
                            borderWidth: 4,
                        borderColor: '#fff', borderRadius: 100, marginBottom: 6
                    }}>
                        <Image height={100} width={100} source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} />
                    </View>
                    <Text style={{color: '#FF4500', fontWeight: '500',fontSize: 20, marginBottom: 6}}>Registration Form</Text>
                    
                    
                    <View style={{
                        backgroundColor: '#FFF',
                        height: 'auto',
                        width: '100%',
                        marginTop: 18,
                    
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            backgroundColor: '#FFF',
                            height: 'auto',
                            width: '48%',
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                width: '100%',
                                textAlign: 'left',
                                marginLeft: 3
                            }}>First name</Text>
                    
                            <TextInput keyboardType='alphabet' style={{
                                backgroundColor: '#FFF',
                                height: 50,
                                width: '100%',
                                borderWidth: 1,
                                borderRadius: 2.5,
                    
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} onChangeText={txt => setFname(txt)} />
                            <Text style={{color: '#000', marginBottom: 5, display: fnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{fnameErr}</Text>
                        </View>
                        <View style={{
                            backgroundColor: '#FFF',
                            height: 'auto',
                            width: '48%',
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                width: '100%',
                                textAlign: 'left',
                                marginLeft: 3
                            }}>Last name</Text>
                            <TextInput keyboardType='alphabet' style={{
                                backgroundColor: '#FFF',
                                height: 50,
                                width: '100%',
                                borderRadius: 2.5,
                    
                                borderWidth: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} onChangeText={txt => setLname(txt)}  />
                            <Text style={{color: '#000', marginBottom: 5, display: lnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{lnameErr}</Text>
                        </View>
                    
                    </View>
                    
                    <View style={{
                        backgroundColor: '#FFF',
                        height: 'auto',
                        width: '100%',
                        marginTop: 18,
                    
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <Text style={{
                            width: '100%',
                            textAlign: 'left',
                            marginLeft: 3
                        }}>Email</Text>
                        <TextInput keyboardType='alphabet' style={{
                            backgroundColor: '#FFF',
                            height: 50,
                            width: '100%',
                            borderRadius: 2.5,
                    
                            borderWidth: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} onChangeText={txt => setEmail(txt)} />
                        <Text style={{color: '#000', marginBottom: 5, display: emailErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{emailErr}</Text>
                    </View>
                    
                    <View style={{
                        backgroundColor: '#FFF',
                        height: 'auto',
                        width: '100%',
                        display: 'flex',
                        marginTop: 18,
                    
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            backgroundColor: '#FFF',
                            height: 'auto',
                            width: '100%',
                            display: 'flex',
                            marginTop: 18,
                    
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                backgroundColor: '#FFF',
                                height: 'auto',
                                width: '82%',
                                borderRadius: 2.5,
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <Text style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    marginLeft: 3
                                }}>Password</Text>
                    
                                <TextInput keyboardType='alphabet' style={{
                                    backgroundColor: '#FFF',
                                    height: 50,
                                    width: '100%',
                                    borderWidth: 1,
                                    borderRadius: 2.5,
                    
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} secureTextEntry={isPwdVisible} onChangeText={txt => setPwd(txt)}  />
                    
                            </View>
                            <TouchableOpacity style={{
                                backgroundColor: '#FF4500',
                                height: 'auto',
                                height: 50,
                                width: '15%',
                                marginTop: 18,
                                // borderWidth: 1,
                                borderRadius: 2.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }} onPress={e=> setIsPwdVisible(!isPwdVisible)}>
                                {/* <SeeSvg height={30} width={30} /> */}
                            </TouchableOpacity>
                        </View>
                        <Text style={{color: '#000', marginBottom: 5, display: pwdErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{pwdErr}</Text>
                    
                    </View>
                </View>
                <TouchableOpacity onPress={e => navigation.navigate('user-login')}  style={{height: 50, width: 'auto', marginTop: 10, marginBottom: 5, display: 'flex', alignItems: 'center', backgroundColor: '#FFF', justifyContent: 'center', flexDirection: 'row'}}>
                    <Text style={{height: 'auto', width: 'auto', fontSize: 13, backgroundColor: '#fff', fontFamily: 'roboto', color: '#FF4500'}}>Already Have An Account?</Text>
                    <Text style={{height: 'auto', width: 'auto', fontSize: 13, backgroundColor: '#fff', fontFamily: 'roboto', fontWeight: 'bold', color: '#FF4500'}}> SignIn Here</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                backgroundColor: '#FFF',
                height: screenHeight*.15,
                width: screenWidth,
                position: 'absolute', 
                bottom: 0,
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',flex: 1
            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#FF4500',
                    height: 'auto',
                    height: 50,
                    width: '100%',
                    marginTop: 28,
                    // borderWidth: 1,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }} onPress={e=> signupHandler()}>
                    <Text style={{color: '#fff'}}>Signup</Text>
                </TouchableOpacity>
                
            </View>
        </>
    )
}


export default Signup;
