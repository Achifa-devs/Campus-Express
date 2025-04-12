import React from 'react'
import { ScrollView, StyleSheet, Switch, TextInput, View, Text, TouchableOpacity } from 'react-native'
import ClosedSvg from '../../../assets/closed-sign-svgrepo-com.svg'
import ViewSvg from '../../../assets/view-list-details-svgrepo-com.svg'
import WithdrawSvg from '../../../assets/withdraw-1-svgrepo-com.svg'
// import SellSvg from '../../../assets/sell-svgrepo-com (4).svg'

export default function CloseAcct() {
  return ( 
        <>
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Log out everywhere</Text>
    
                <ScrollView >
                  <View style={[styles.inputCnt, {justifyContent: 'center', alignItems: 'center'}]}>
                        <ClosedSvg width={120} height={120} />

                        <Text style={[styles.label, {fontWeight: '800', fontSize: 26, textAlign: 'center', width: '100%', marginTop: 20}]}>Closing your account`</Text>
                    </View>

                    

                    <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25, fontWeight: 200}]}>You wont't be able to:</Text>

                    <View style={styles.inputCnt}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 60}}>
                            {/* <SellSvg width={25} height={25} /> */}
                            <Text>&nbsp; &nbsp;</Text>

                            <Text style={[styles.label, {borderBottomColor: '#000', color: '#000', marginBottom: 5, marginTop: 5, fontWeight: 200, fontSize: 15}]}>Make transactions with Paypenz</Text>
                        </View>
                        {/* <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 60}}>
                            <WithdrawSvg width={25} height={25} />
                            <Text>&nbsp; &nbsp;</Text>

                            <Text style={[styles.label, {borderBottomColor: '#000', color: '#000', marginBottom: 5, marginTop: 5, fontWeight: 200, fontSize: 15}]}>Withdraw funds.</Text>
                        </View> */}
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 60}}>
                            <ViewSvg width={25} height={25} />
                            <Text>&nbsp; &nbsp;</Text>

                            <Text style={[styles.label, {borderBottomColor: '#000', color: '#000', marginBottom: 5, marginTop: 5, fontWeight: 200, fontSize: 15}]}>View your activities.</Text>
                        </View>
                    </View>
                </ScrollView>
    
                <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#800000', borderRadius: 8}}>
                        <Text>I'am okay with that</Text>
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
    