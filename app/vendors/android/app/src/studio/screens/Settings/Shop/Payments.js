import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CloseSvg from '../../../../assets/close-circle-svgrepo-com.svg'
import DialPadSvg from '../../../../assets/dialpad-svgrepo-com.svg'

export default function Payments() {

    let [overlay, setOverlay] = useState(false);
    

    let openModal = (a) => {
        setOverlay(true)

    }

    let closeModal = e => {
        
        setOverlay(false)

    }
  return (
      <>
          
           {
                overlay
                &&

            
                (<View id='overlay' style={[styles.overlay, {
                     borderWidth: 1, borderColor: '#efefef',
                    shadowColor: '#000', // Shadow color
                    shadowOffset: { width: 0, height: 4 }, // Shadow position
                    shadowOpacity: 0.3, // Shadow transparency
                    shadowRadius: 4.65, // Shadow blur radius
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,

                    // Shadow for Android
                    elevation: 2, // Higher values increase shadow intensity
                }]}>
                    <View style={[styles.modal, {
                        borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,

                    }]}>

                        <View style={{height: 40, width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
                            <TouchableOpacity onPress={closeModal} style={{width: 50, height: 50}}>
                                <CloseSvg height={30} width={30} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                    <ScrollView style={{height: 'auto', width: '100%'}}>
                        
                        <View style={{padding: 5, width: '100%'}}>

                          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 5, flexDirection: 'column', borderRadius: 10, height: 'auto', width: '100%', backgroundColor: '#fff', borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}>
                              <Text style={{fontSize: 20, marginTop: 10, color: '#000', fontWeight: '600', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'none'}}>Recommended for you</Text>
                                <View>
                                    <View style={{width: '20%'}}>
                                  
                                    </View>
                                    <View style={{width: '80%', backgroundColor: '#ffffff'}}>
                                        
                                        <View style={[styles.inputCnt, {backgroundColor: '#ffffff', paddingLeft: 0, paddingRight: 0, paddingTop: 20, paddingBottom: 20, width: '100%', borderRadius: 10}]}>
                                            <Text style={{fontSize: 18, color: '#000', fontWeight: '500', fontFamily: 'Roboto', height: 'auto', width: '100%'}}>Direct to local bank (NGN)</Text>
                                        <View style={{width: '100%', padding: 5}}>
                                            <Text style={{fontSize: 13, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>NGN250 withdrawal fee</Text>
                                            <Text style={{fontSize: 13, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Deposit to your local bank in NGN</Text>
                                        </View>
                                    </View>
                                    
                                    
                                    
                                    </View>
                                </View>
                                <TouchableOpacity onPress={openModal} style={{
                                    height: 50,
                                    width: '100%',
                                    backgroundColor: '#FF4500',
                                    borderRadius: 8,
                                    marginTop: 20,
                                    display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                }}>
                                    <Text style={{color: '#fff'}}>Set up</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 5, flexDirection: 'column', borderRadius: 10, height: 'auto', width: '100%', backgroundColor: '#fff', borderBottomColor: '#d3d3d3', borderBottomWidth: 0}}>
                              <Text style={{fontSize: 20, marginTop: 10, color: '#000', fontWeight: '600', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'none'}}>Also available</Text>
                                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 5, flexDirection: 'row', borderRadius: 10, height: 'auto', width: '100%', backgroundColor: '#fff', borderBottomColor: '#d3d3d3', borderBottomWidth: 0}}>
                                    <View style={{width: '20%'}}>
                                  
                                    </View>
                                    <View style={{width: '80%', backgroundColor: '#ffffff'}}>
                                        
                                        <View style={[styles.inputCnt, {backgroundColor: '#ffffff', paddingLeft: 0, paddingRight: 0, paddingTop: 20, paddingBottom: 20, width: '100%', borderRadius: 10}]}>
                                            <Text style={{fontSize: 18, color: '#000', fontWeight: '500', fontFamily: 'Roboto', height: 'auto', width: '100%', textAlign: 'left', backgroundColor: '#fff'}}>Paypal ($)</Text>
                                            <View style={{width: '100%', padding: 5}}>
                                                <Text style={{fontSize: 13, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>$2.00 withdrawal fee</Text>
                                                <Text style={{fontSize: 13, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Paypal may charge addional fees for sending and withdrawing funds</Text>
                                                <Text style={{fontSize: 13, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Setup will take you to paypal</Text>
                                            </View>
                                        </View>
                                    
                                    
                                    
                                    </View>
                                </View>
                                <TouchableOpacity onPress={openModal} style={{
                                    height: 50,
                                    width: '100%',
                                    backgroundColor: '#FF4500',
                                    borderRadius: 8,
                                    marginTop: 20,
                                    display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                }}>
                                    <Text style={{color: '#fff'}}>Set up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/* {CARD.map(item => <TouchableOpacity style={styles.paymentOptions}></TouchableOpacity>)} */}

                    </ScrollView>

                    {/* </View> */}
                </View>)

            }
          <View style={styles.cnt} >
              <ScrollView>
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 'auto', backgroundColor: '#fff', padding: 10, marginBottom: 10}}>Shop payments settings</Text>
                  
                <View style={{borderWidth: 2, borderRadius: 8, borderColor: '#efefef', padding: 8}}>
                    <View style={[styles.inputCnt, {backgroundColor: '#ffffff', paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 20, borderRadius: 10, alignItems: 'flex-start'}]}>
                        <Text style={{ fontSize: 16, marginTop: 0, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none' , width: '100%', textAlign: 'left', marginBottom: 6}}>Available balance</Text>
                          <Text style={{ fontSize: 26, marginTop: 0, color: 'green', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none', width: '100%', textAlign: 'left', marginBottom: 6 }}>$0.00</Text>
                        {/* <Text style={{ fontSize: 16, marginTop: 0, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none', width: '100%', textAlign: 'left', marginBottom: 10 }}>+$0.00 pending</Text> */}
                    </View>
                    {/* <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>You need to use a token sent to you to update your email address. This is so we can properly verify your identity.</Text>
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline'}}>Learn to keep your account safe.</Text>
                    </View> */}
                    
                    <View style={[styles.inputCnt, {backgroundColor: '#f8f8f8', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{fontSize: 22, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none', width: '100%', textAlign: 'center'}}>To withdraw earnings, first you need to set up a withdrawal method.</Text>
                        <Text style={{ fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline' , width: '100%', textAlign: 'center'}}>It may take up to 3 days to activate your withdrawal method</Text>
                        

                          <TouchableOpacity onPress={openModal} style={{
                              height: 50,
                              width: '60%',
                              backgroundColor: '#FF4500',
                              borderRadius: 8,
                              marginTop: 20,
                              display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                        }}>
                            <Text style={{color: '#fff'}}>Add a method</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                    
                  </View>
                  <View style={[styles.inputCnt, {backgroundColor: '#f8f8f8', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                            <Text style={{ fontSize: 20, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline' , width: '100%', textAlign: 'center', marginBottom: 10}}>Withdrawal schedule</Text>
                            <Text>You haven't made any withdrawals yet.</Text>
                        
                    </View>
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
     overlay: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'transprent',
            zIndex: 1000,
            backgroundColor: '#fdfdfd',
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },

        modal: {
            height: 60,
            width: '100%',
            padding: 8,
            backgroundColor: '#fff'
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
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