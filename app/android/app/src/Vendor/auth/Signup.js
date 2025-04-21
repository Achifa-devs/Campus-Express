import { Dimensions, ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, Button, Vibration, ActivityIndicatorBase, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
// GoogleSignInSetup.js
import { data, school_choices } from "../utils/location";
import { set_cookie } from "../../../../../redux/vendor/cookie";
import Dropdown from "../utils/Dropdown";
// import Dropdown from "../utils/Vendor/Dropdown";

const Signup = ({}) => {
    const screenHeight = Dimensions.get('window').height;

    let dispatch = useDispatch()
    let navigation = useNavigation()
    
   

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [pwd, setPwd] = useState('')
    let [server_err, set_server_err] = useState(false)
    let [gender, setGender] = useState('')
    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    let [fnameErr, setFnameErr] = useState('')
    let [lnameErr, setLnameErr] = useState('')
    let [emailErr, setEmailErr] = useState('')
    let [phoneErr, setPhoneErr] = useState('')
    let [pwdErr, setPwdErr] = useState('')
    let [genderErr, setGenderErr] = useState('')
    let [stateErr, setStateErr] = useState('')
    let [campusErr, setCampusErr] = useState('')

    
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    
    function update_data(data, name) {
        console.log(data,name)
        if (name === 'gender') {
            setGender(data)
        } else if (name === 'state') {
            setState(data)
        } else {
            setCampus(data)
        }
    }
    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.title.toLowerCase() === state.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        // let campuses = Object.values(school_choices).reverse();
        console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])
   
    let signupHandler = async() => {
        // dispatch(setUserAuthTo(true))   
        // navigation.navigate('user-home')
        
        // singup(fname,lname,email,phone,pwd)
        // .then((result) => {
        //     console.log(result)
        //     result ? navigation.navigate('seller-login') : ''
        // })
        // .catch((err) => console.log(err))

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
            }else if(name.toLowerCase() === 'phone number'){
                setPhoneErr(err)
            }else if(name.toLowerCase() === 'password'){
                setPwdErr(err)
            }else if(name.toLowerCase() === 'gender'){
                setGenderErr(err)
            }else if(name.toLowerCase() === 'state'){
                setStateErr(err)
            }else if(name.toLowerCase() === 'campus'){
                setCampusErr(err)
            }
        })

        let data = response.filter((item) => item._j.mssg === '').length === 5 ? true : false;

        
        if(data){
            set_server_err(true)

            
            fetch('https://campussphere.net/api/registration/seller', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({fname,lname,email,phone,pwd,state,campus,gender})
            })
            .then(async(result) => {
                let response = await result.json();
                console.log(response)
                if(response.success){
                    CookieManager.set('https://campussphere.net', {
                        name: 'jwt_token',
                        value: response.cookie,
                        domain: 'campussphere.net',
                        path: '/',
                        version: '1',
                        secure: true,
                        expires: `'${90 * 24 * 60 * 60}'`
                    })
                    .then((done) => {
                        console.log('Cookie set!', done);
                        dispatch(set_cookie(true))
                    })
                    .catch(err => console.log(err))
                } else {
                    set_server_err(!true)

                    Vibration.vibrate(300)
                    if(response.message === 'Email already exists'){
                        setEmailErr('Email Already Exist')
                    }else if(response.message === 'Phone already exists'){
                        setPhoneErr('Phone Number Already Exist')
                    }
                }
            })
            .catch((err) => {
                set_server_err(!true)

                console.log(err)
                setBtn("Signup")
                seller_overlay_setup(false, '')
                e.target.disabled = false;
            })
        } else {
            set_server_err(!true)

            Vibration.vibrate(300)
            
        }
        
    }

    
    async function validateInput() {

        let data = [  
            {value: fname, name: 'FirstName'},
            {value: lname, name: 'LastName'},
            {value: email, name: 'Email'},
            {value: phone, name: 'Phone Number'},
            {value: pwd, name: 'Password'},
            {value: gender, name: 'Gender'},
            {value: state, name: 'State'},
            {value: campus, name: 'Campus'},
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
                }else if(item.value.length > 0 && item.value.length < 8){
                    return {bool: false, mssg: `${item.name} must be at least 8 characters`, name: item.name}
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }

            }else if(item.name.toLowerCase() === 'gender'){

                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }

            }else if(item.name.toLowerCase() === 'state'){

                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
                }else{
                    return ({bool: true, mssg: ``, name: item.name})
                }

            }else if(item.name.toLowerCase() === 'campus'){

                if(item.value === ''){
                    return ({bool: false, mssg: `${item.name} cannot be empty`, name: item.name})
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
            {
                server_err
                ?
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    zIndex: 10
                }}>
                    <ActivityIndicator style={{opacity: 1}} size={'large'} color={'#FF4500'}></ActivityIndicator>
                </View>
                :
                ''
            }

            <View style={{
                height: screenHeight - 0,
                width: '100%',
                flex: 1, 
                position: 'relative',
                backgroundColor: '#FF4500',
                color: '#000',
                overflow: 'scroll',
                padding: 15
            }}  >
                <View contentContainerStyle={{ flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}} style={{height: '100%', width: '100%', padding: 5, backgroundColor: '#fff', borderRadius: 10}} >

                    <View contentContainerStyle={{ display: 'flex', alignItems: 'space-between', flexDirection: 'column',  justifyContent: 'center'}} style={{height: 'auto', width: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 20, backgroundColor: '#fff'}}>
                    
                        
                            
                            
                        <View style={{height: '90%', width: '100%', backgroundColor: '#fff'}}>
                            
                            <View style={{width: '100%', height: 'auto', display: 'flex', alignItems: 'flex-en', justifyContent: 'space-between', marginBottom: 0, flexDirection: 'row'}}>
                                <View style={{height: 40, width: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}} >
                                    <Image
                                        source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1743769930/2024-06-27_dqlq3a.png' }} 
                                        style={{height: 40, width: 40, borderRadius: 5}} 
                                    />
                                </View>
                                <View style={{height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, flexDirection: 'row'}}>
                                    
                                    
                                    <Text style={{width: 'auto', color: '#FF4500', fontSize: 20, fontWeight: '500', }}>Signup Form</Text>
                                </View>
                            </View>

                            <ScrollView style={{
                                height: '100%',
                                width: '100%', 
                                position: 'relative',
                                backgroundColor: '#fff',
                                color: '#000',
                                overflow: 'scroll',
                                marginTop: 15 
                                
                            }}>
                                <View style={{height: 'auto', width: '100%', display: 'flex', marginBottom: 35,  alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>

                                    <View style={{display: 'flex', height: 60, color: '#000', width: '48%', flexDirection: 'column'}}>
                                        <Text style={{width: '100%', color: '#000'}}>FirstName</Text>
                                        <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} onChangeText={e => setFname(e)}   placeholder="FirstName"  />
                                        <Text style={{color: '#000', marginBottom: 15, display: fnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{fnameErr}</Text>
                                    </View>
                

                                    <View style={{display: 'flex', height: 60, color: '#000', width: '48%', flexDirection: 'column'}}>
                                        <Text style={{width: '100%', color: '#000'}}>LastName</Text>
                                        <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} onChangeText={e => setLname(e)}   placeholder="LastName"  />
                                        <Text style={{color: '#000', marginBottom: 15, display: lnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{lnameErr}</Text>
                                    </View>

                                </View>

                                 <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                                    <Text style={{width: '100%', color: '#000'}}>Gender</Text>
                                    <Dropdown update_data={update_data} data={[{ title: 'Male' }, { title: 'Female' }]} input_name={'gender'} placeholder={'Select your gender'} />
                                    <Text style={{color: '#000', marginBottom: 15, display: genderErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{genderErr}</Text>
                                </View>

                                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                                    <Text style={{width: '100%', color: '#000'}}>State</Text>
                                    <Dropdown update_data={update_data} data={data} input_name={'state'} placeholder={'Select your state'} />
                                    <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                                </View>

                                 <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                                    <Text style={{width: '100%', color: '#000'}}>Campus</Text>
                                    <Dropdown update_data={update_data} data={campusLocaleList} input_name={'campus'} placeholder={'Select your campus'} />
                                    <Text style={{color: '#000', marginBottom: 15, display: campusErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{campusErr}</Text>
                                </View>

                                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                                    <Text style={{width: '100%', color: '#000'}}>Email</Text>
                                    <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} onChangeText={e => setEmail(e)} name="email"  placeholder="Email"  />
                                    <Text style={{color: '#000', marginBottom: 15, display: emailErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{emailErr}</Text>
                                </View>

                                <View style={{height: 'auto', width: '100%', display: 'flex', marginBottom: 2,  alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'column'}}>
                                    <Text style={{width: '100%', color: '#000'}}>Phone</Text>

                                    <View style={{height: 'auto', width: '100%', display: 'flex', marginBottom: 0,  alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                        <View style={{display: 'flex', color: '#000', width: '18%', flexDirection: 'column'}}>
                                            <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%', backgroundColor: '#efefef'}} value="+234"   placeholder="NIG"  />
                                        </View>
                    

                                        <View style={{display: 'flex', color: '#000', width: '80%', flexDirection: 'column'}}>
                                            <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%', backgroundColor: '#efefef'}} onChangeText={e => setPhone(e)} keyboardType="numeric" name="email"  placeholder="Phone Number"  />
                                        </View>
                                    </View>
                                    <Text style={{color: '#000', marginBottom: 15, display: phoneErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{phoneErr}</Text>

                                </View>

                                <View style={{ height: 'auto', display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 18}}>
                                    <Text style={{width: '100%', color: '#000'}}>Password</Text>
                                    <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} onChangeText={e => setPwd(e)} name="Password"  placeholder="Password"  />
                                    <Text style={{color: '#000', marginBottom: 2, display: pwdErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{pwdErr}</Text>
                                </View> 
                                    
                                

                            </ScrollView>
                        </View>

                        <View style={{
                            height: '10%',
                            width: '100%',
                            position: 'relative',
                            backgroundColor: '#fff',
                            color: '#000',
                        }}>
                            <TouchableOpacity activeOpacity={.6} onPress={e => signupHandler()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, marginBottom: 3, flexDirection: 'row', borderRadius: 5, height: 60, width: '100%', backgroundColor: '#FF4500'}} >
                                <Text style={{fontFamily: 'serif', fontWeight: 'bold', borderRadius: 5, color: '#fff', textAlign: 'center', fontSize: 15}}>Signup</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={e => navigation.navigate('login')}  style={{height: 'auto', width: '100%', padding: 5, display: 'flex', alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', flexDirection: 'column', borderRadius: 5}}>
                                    
                                <Text style={{width: 'auto', color: '#FF4500', fontSize: 10, fontWeight: '500', }}>Already have an account? Login Here</Text>

                            </TouchableOpacity>

                        </View>
                    </View>

                </View>

            </View>

        </>
     );
}
 
export default Signup;

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
  });