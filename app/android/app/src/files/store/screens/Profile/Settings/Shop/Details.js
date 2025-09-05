import React from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';

export default function ShopDetails({navigation}) {
  return (
     <>
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Change shop details</Text>
    
                <ScrollView >
                   <View style={styles.inputCnt}>
                        <Text style={{fontSize: 20, color: '#000', fontWeight: '800', fontFamily: 'Roboto', height: 'auto', marginBottom: 15, backgroundColor: '#fff'}}>Need to change your shop details?</Text>
                    </View>


                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>You need to use a token sent to you to update your email address. This is so we can properly verify your identity.</Text>
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View>
                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>Shop name</Text>
                        <TextInput 
 placeholderTextColor={"#333333"} style={styles.input} defaultValue={''} placeholder='Shop name' />
                    </View>
                    
                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>Shop category</Text>
                        <TextInput 
 placeholderTextColor={"#333333"} style={styles.input} defaultValue={''} placeholder='Shop category' />
                    </View>
                    
                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>Shop logo</Text>
                        <TextInput 
 placeholderTextColor={"#333333"} style={[styles.input]} multiline defaultValue={''} placeholder='Shop logo' />
                    </View>

                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>Shop description</Text>
                        <TextInput 
 placeholderTextColor={"#333333"} style={[styles.input, {height: 170, alignItems: 'flex-start'}]} multiline defaultValue={''} textAlignVertical="top" placeholder='Shop description' />
                    </View>
                   
                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>Token</Text>
                        <TextInput 
 placeholderTextColor={"#333333"} style={styles.input} placeholder='Token' />
                    </View>

                    <View style={styles.inputCnt}>
                        <Text style={styles.label}>New email</Text>
                        <TextInput 
 placeholderTextColor={"#333333"} style={styles.input} placeholder='New Email' />
                    </View>

                </ScrollView>
    
                <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 8}}>
                        <Text>Send token</Text>
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
    