import React from 'react'
import { ScrollView, StyleSheet, Switch, TextInput, View, Text, TouchableOpacity } from 'react-native'

export default function Logout() {
  return (
        <>
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Log out everywhere</Text>
    
                <ScrollView >
                    <View style={styles.inputCnt}>
                        <Text style={[styles.label, {fontWeight: '200'}]}>Are you sure you want to log out of your Campus Sphere account on all device</Text>
                    </View>

                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto' }}>Keep in mind --- once you&apos;re logged out, you&apos;ll be asked to reset your password the next time you log in.</Text>
                        
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View>


                  
                </ScrollView>
    
                <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2962FF', borderRadius: 8}}>
                        <Text style={{ color: '#FFF', fontWeight: '500' }}>Confirm log out</Text>
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
        fontSize: 16,
        marginLeft: 5,
        fontWeight: '800',
        marginBottom: 10,
        color: '#000'
        }
    });
    