import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import { useNavigation } from '@react-navigation/native';
import BottomModal from '../../../utils/BtmModal';
import { useSelector } from 'react-redux';
import bank from '../../../../../../../../bank.json'

export default function Payments() {
    let {user}=useSelector(s=>s.user)
    
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    let navigation = useNavigation()
    let [indicator, setindicator] = useState(false)
    let [payment_data, set_payment_data] = useState('')
    
    const [modalVisible, setModalVisible] = useState(false);
   
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
   function get() {
        fetch(`https://cs-node.vercel.app/:9090/api/shop/payment/`, {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({user_id: user?.user_id })
        })   
        .then(async(result) => {
            let response = await result.json();
            if (response.success) {
                set_payment_data(response.data)
                setindicator(false)
            } else {
                setindicator(false)
                set_payment_data('')
            }
        })
        .catch((err) => {
            setindicator(false)
            set_payment_data('')
            console.log(err)
        })
   }
    useEffect(() => {
        setindicator(true)
        get()
    }, [user?.user_id])
    useEffect(() => {
        console.log('payment_data: ', payment_data)
    }, [payment_data])
  return (
      <>
          
        {
            indicator ?
            <View style={{ position: 'absolute', top: 0, height: screenHeight, width: screenWidth, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
                <ActivityIndicator size="large" color="#fff" />
                {/* <Text style={{ fontSize: 16, color: '#fff', marginTop: 15, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center' }}>{ beneficiary !== '' ? 'Creating your payment method' : 'Validating bank details'}</Text> */}
            </View>
            :''
        }
        
        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <ScrollView style={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#fff',
            position: 'relative',
            }}
            contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                    
                <View style={{padding: 5, width: '100%'}}>
                    {/* <View style={styles.inputBox}>
                        <Text style={{fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', backgroundColor: '#fff'}}>Tell us how you want to get your funds. For all account types, it may take up to 3 days to activate.</Text>
                    </View> */}
                    <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto' }}>Tell us how you want to get your funds. For all account types, it may take up to 3 days to activate.</Text>
                        
                        <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'underline'}}>Learn more in our help articles.</Text>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 5, flexDirection: 'column', borderRadius: 10, height: 'auto', width: '100%', backgroundColor: '#fff', elevation: 2, borderBottomWidth: 0}}>
                        <Text style={{fontSize: 20, marginTop: 10, color: '#000', fontWeight: '600', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'none'}}>Recommended for you</Text>
                        <View style={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',}}>
                            <View style={{width: '20%'}}>
                                <Ionicons name={'business-outline'} size={48} color={'#FF4500'} />
                            </View>
                            <View style={{width: '80%', backgroundColor: '#ffffff'}}>
                                
                                <View style={[styles.inputCnt, {backgroundColor: '#ffffff', paddingLeft: 0, paddingRight: 0, paddingTop: 20, paddingBottom: 20, width: '100%', borderRadius: 10}]}>
                                    <Text style={{fontSize: 18, color: '#000', fontWeight: '500', fontFamily: 'Roboto', height: 'auto', width: '100%'}}>Direct to local bank (NGN)</Text>
                                <View style={{width: '100%', padding: 5}}>
                                    <Text style={{fontSize: 13, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>NGN250 withdrawal fee</Text>
                                    <Text style={{fontSize: 13, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto'}}>Deposit to your local bank in NGN</Text>
                                </View>
                            </View>
                            
                            
                            
                            </View>
                        </View>
                        <TouchableOpacity onPress={e=> navigation.navigate('user-bank')} style={{
                            height: 50,
                            width: '100%',
                            backgroundColor: '#FF4500',
                            borderRadius: 8,
                            marginTop: 0,
                            display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                        }}>
                            <Text style={{color: '#fff'}}>Set up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 5, flexDirection: 'column', borderRadius: 10,  elevation: 2, height: 'auto', width: '100%', backgroundColor: '#fff',}}>
                        <Text style={{fontSize: 20, marginTop: 10, color: '#000', fontWeight: '600', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'none'}}>Also available</Text>
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: .5, flexDirection: 'row', borderRadius: 10, height: 'auto', width: '100%', backgroundColor: '#fff', borderBottomColor: '#d3d3d3', borderBottomWidth: 0}}>
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
                            marginTop: 0,
                            display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                        }}>
                            <Text style={{color: '#fff'}}>Set up</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

            </ScrollView>
        </BottomModal> 
        <View style={styles.cnt} >
            <ScrollView>
                
                <View style={{borderWidth: 2, borderRadius: 8, borderColor: '#efefef', padding: 8}}>
                <View style={[styles.inputCnt, {backgroundColor: '#ffffff', paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 20, borderRadius: 10, alignItems: 'flex-start'}]}>
                    <Text style={{ fontSize: 16, marginTop: 0, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none' , width: '100%', textAlign: 'left', marginBottom: 6}}>Available balance</Text>
                    <Text style={{ fontSize: 26, marginTop: 0, color: 'green', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none', width: '100%', textAlign: 'left', marginBottom: 6 }}>$0.00</Text>
                    <Text style={{ fontSize: 16, marginTop: 0, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none', width: '100%', textAlign: 'left', marginBottom: 10 }}>+$0.00 pending</Text>
                </View>
                
                
                {!payment_data  ?<View style={[styles.inputCnt, {backgroundColor: '#f8f8f8', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                    <Text style={{fontSize: 22, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none', width: '100%', textAlign: 'center'}}>To withdraw earnings, first you need to set up a withdrawal method.</Text>
                    <Text style={{ fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline' , width: '100%', textAlign: 'center'}}>It may take up to 3 days to activate your withdrawal method</Text>
                    

                        <TouchableOpacity onPress={toggleModal} style={{
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
                    
                </View>: ''}
                
                
                </View>
                <View style={[styles.inputCnt, {backgroundColor: '#f8f8f8', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                        <Text style={{ fontSize: 20, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline' , width: '100%', textAlign: 'center', marginBottom: 10}}>Last withdrawal</Text>
                        <Text>You haven't made any withdrawals yet.</Text>
                    
                </View>
                
                <View style={[styles.inputCnt, {backgroundColor: '#f8f8f8', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                    <Text style={{ fontSize: 20, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'underline' , width: '100%', textAlign: 'center', marginBottom: 10}}>Withdrawal methods</Text>
                    <Text >
                        {
                            bank.filter((item) => item?.code === payment_data?.bank)[0]?.name
                        }
                    </Text>
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
            height: '50%',
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

        inputBox: {
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
        paddingLeft: 0,
        paddingRight: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flexDirection: 'row'
        

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