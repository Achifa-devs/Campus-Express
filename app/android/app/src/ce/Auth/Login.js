import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
const Login = ({navigation}) => {
    const screenHeight = Dimensions.get('window').height;

    let [overlay, setOverlay] = useState(false)
    let [type, setType] = useState('')

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [pwd, setPwd] = useState('')
    
    const [isFocus, setIsFocus] = useState(false); 

    let signupHandler = () => {
        // singup(fname,lname,email,phone,pwd)
        // .then((result) => {
        //     console.log(result)
        //     result ? navigation.navigate('seller-login') : ''
        // })
        // .catch((err) => console.log(err))
    }

    

    return ( 
        <> 
            <View style={{
                height: 200,
                width: '100%',
                position: 'relative',
                backgroundColor: '#32CD32',
                color: '#000',
                overflow: 'scroll'
            }}>

            </View>
            <View style={{
                height: 'auto',
                width: '100%',
                position: 'relative',
                backgroundColor: '#32CD32',
                color: '#000',
                overflow: 'scroll'
            }}>
                <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center', flexDirection: 'column',  justifyContent: 'space-between'}} style={{height: screenHeight, width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, backgroundColor: '#fff'}}>

                    <TouchableOpacity onPress={e => signupHandler()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, justifyContent: 'space-between', marginBottom: 8, flexDirection: 'row', borderRadius: 15, height: 60, width: '100%', backgroundColor: '#fff', 
                    borderWidth: .5,
                    borderColor: '#004cff'
                    // ...Platform.select({
                    //     ios: {
                    //         shadowColor: '#000',
                    //         shadowOffset: { width: 0, height: 2 },
                    //         shadowOpacity: 0.25,
                    //         shadowRadius: 3.84,
                    //     },
                    //     android: {
                    //         elevation: 5,
                    //     },
                    //     }),
                    }} >
                        <View></View>
                        <Text style={{fontFamily: 'serif', fontWeight: 'bold', borderRadius: 15, color: '#004cff', textAlign: 'center', fontSize: 15}}>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => signupHandler()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, justifyContent: 'space-between', marginBottom: 25, flexDirection: 'row', borderRadius: 15, height: 60, width: '100%', backgroundColor: '#fff', 
                    borderWidth: .5,
                    borderColor: '#32CD32'
                    // ...Platform.select({
                    //     ios: {
                    //         shadowColor: '#000',
                    //         shadowOffset: { width: 0, height: 2 },
                    //         shadowOpacity: 0.25,
                    //         shadowRadius: 3.84,
                    //     },
                    //     android: {
                    //         elevation: 5,
                    //     },
                    //     }),
                    }} >
                        <View></View>
                        <Text style={{fontFamily: 'serif', fontWeight: 'bold', borderRadius: 15, color: '#32CD32', textAlign: 'center', fontSize: 15}}>Google</Text>
                    </TouchableOpacity>


                    <View style={{
                        height: 'auto',
                        width: '100%',
                        position: 'relative',
                        backgroundColor: '#fff',
                        color: '#000',
                        overflow: 'scroll',
                        marginBottom: 20
                    }}>
                        

                        <View style={{height: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                          
                            <View style={{height: 60, width: '100%', display: 'flex', marginBottom: 15,  alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>

                                <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 15, marginBottom: 15, width: '100%', position: 'absolute', left: 0, backgroundColor: '#efefef'}} onChangeText={e => setEmail(e)}   placeholder="Email"/>

                                {/* <TouchableOpacity style={{height: 50, fontFamily: 'serif', borderRadius: 15, marginBottom: 15, width: '27%', position: 'absolute', right: 0, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}} onPress={e => {setefefefrlay(true); setType('Email');}}>

                                    <Text style={{height: '100%', width: '100%', fontSize: 15, fontFamily: 'serif', textAlign: 'center', paddingTop: '15%', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', color: '#fff'}}>Verify</Text>

                                </TouchableOpacity> */}

                            </View>
                            
                            <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 15, marginBottom: 15, width: '100%', backgroundColor: '#efefef'}} onChangeText={e => setPwd(e)}   placeholder="Password"  />
                            {/*<TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 15, marginBottom: 15, width: '100%', backgroundColor: '#efefef'}} onChangeText={e => setState(e)}   placeholder="State"  />*/}
                            
                            
                        </View>
                    </View>

                    <View style={{
                        height: 'auto',
                        width: '100%',
                        position: 'relative',
                        backgroundColor: '#fff',
                        color: '#000',
                        overflow: 'scroll'
                    }}>
                        <TouchableOpacity activeOpacity={.6} onPress={e => signupHandler()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, marginBottom: 3, flexDirection: 'row', borderRadius: 15, height: 60, width: '100%', backgroundColor: '#32CD32'}} >
                            <Text style={{fontFamily: 'serif', fontWeight: 'bold', borderRadius: 15, color: '#fff', textAlign: 'center', fontSize: 15}}>Signup</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-signup')}  style={{height: 20, width: 'auto', marginTop: 20, marginBottom: 5, display: 'flex', alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', flexDirection: 'column'}}>
                                
                            <Text style={{height: 'auto', width: 'auto', fontSize: 10, backgroundColor: '#fff', fontFamily: 'serif', color: '#32CD32'}}>Already Have An Account Login Here</Text>

                        
                                
                        </TouchableOpacity>

                        <View style={{height: 20, width: 'auto', marginTop: 5, marginBottom: 15, display: 'flex', alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', flexDirection: 'column'}}>
                                
                        

                            <Text style={{height: 'auto', width: 'auto', fontSize: 8, backgroundColor: '#fff', fontFamily: 'serif', color: '#32CD32'}}>Powered By AChiFa</Text>
                                
                        </View>
                    </View>
                </ScrollView>
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