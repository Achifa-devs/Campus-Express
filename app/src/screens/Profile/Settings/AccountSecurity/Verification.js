import React from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
// import { StyleSheet, TouchableOpacity } from 'react-native';
import AngleSvg from '../../../../../assets/angle-right-svgrepo-com.svg'

import DailPadSvg from '../../../../../assets/dialpad-svgrepo-com.svg'
import PhoneSvg from '../../../../../assets/phone-svgrepo-com (4).svg'
import MssgSvg from '../../../../../assets/message-square-dots-svgrepo-com.svg'

export default function Verification() {
  return (

        <>
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>2-step-verification</Text>

                <ScrollView >

                    <View style={[styles.inputCnt, {paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 17, lineHeight: 24, color: '#575757', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>Manage how you complete 2-step-verification. it&apos;s an extra layer of security on your account, on top of your password</Text>
                    </View>


                    <View style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}]}>
                        <Text >Your verification methods</Text>
                        <TouchableOpacity>
                            <Text style={{fontWeight: '800'}}>Change Default</Text>
                        </TouchableOpacity>
                    </View>

                    

                    <TouchableOpacity onPress={''} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10,  flexDirection: 'row', height: 'auto', width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '85%'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <PhoneSvg width={20} height={20} />
                            </View>
                            <View >
                                <Text style={{fontFamily: 'Roboto', fontWeight: 800, fontSize: 15, color: '#000'}}>Paypenz app (default)</Text>

                                <View style={{width: '98%'}}> 
                                    <Text>
                                        Verify yourself with this app. No need to wait for a text, and you just need an internet connection.
                                    </Text>

                                    <Text style={{fontWeight: '800', marginTop: 8}}>Very secure</Text>
                                </View>
                            </View>
                        </View>
                         
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={''} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10,  flexDirection: 'row', height: 'auto', width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '85%'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <MssgSvg width={20} height={20} />
                            </View>
                            <View >
                                <Text style={{fontFamily: 'Roboto', fontWeight: 800, fontSize: 15, color: '#000'}}>Text message</Text>

                                <View style={{width: '98%'}}> 
                                    <Text>
                                        Receive a verification code by text. we&apos;ll only use this if you can&apos;t verify via other methods
                                    </Text>

                                    <Text style={{fontWeight: '800', marginTop: 8}}>Fairly secure</Text>
                                </View>
                            </View>
                        </View>
                         
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                    </TouchableOpacity>

                    <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Other verification methods</Text>


                    <TouchableOpacity onPress={''} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10,  flexDirection: 'row', height: 'auto', width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '85%'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <DailPadSvg width={20} height={20} />
                            </View>
                            <View >
                                <Text style={{fontFamily: 'Roboto', fontWeight: 800, fontSize: 15, color: '#000'}}>Authenticator app</Text>

                                <View style={{width: '98%'}}> 
                                    <Text>
                                        Verify using a separate authenticator app. No need to wait for text, and you just need an internet connection.
                                    </Text>

                                    <Text style={{fontWeight: '800', marginTop: 8}}>Secure</Text>
                                </View>
                            </View>
                        </View>
                         
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                    </TouchableOpacity>
                    

                </ScrollView>

                
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
    