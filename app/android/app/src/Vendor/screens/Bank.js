import React, { useEffect, useState } from 'react'
import bank from '../../../../../bank.json'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, Button, Alert, ActivityIndicator } from "react-native";

import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
  

export default function Bank() {
    let {user}=useSelector(s=>s.user)
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    let navigation = useNavigation()
    let [bankName, setBankName] = useState('')
    let [acctNo, setAcctNo] = useState('')
    let [beneficiary, setBeneficiary] = useState('')

    let [indicator, setindicator] = useState(false)

    let [fnameErr, setFnameErr] = useState('')
    let [lnameErr, setLnameErr] = useState('')
    let [emailErr, setEmailErr] = useState('')

    function update_data(data, name) {
        if (name === 'bank') {
            setBankName(data)
        } 
    }

    function verify() {
        fetch(`https://ce-server.vercel.app/bank-verification`, {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({acct: acctNo, code: bankName})
        })   
        .then(async(result) => {
            let response = await result.json();
            if (response.bool) {
                setindicator(false)
                setBeneficiary(response.name)
            }else {
                setindicator(false)
                
            }
        })
        .catch((err) => {
            setindicator(false)
            console.log(err)
        })
    }

    function create() {
        fetch(`http://192.168.234.146:3000/api/shop/payment/create`, {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({acct_num: acctNo, beneficiary: beneficiary, bank: bankName, seller_id: user?.seller_id })
        })   
        .then(async(result) => {
            let response = await result.json();
            if (response.bool) {
                setindicator(false)
                
                navigation.navigate('')
                
            } else {
                setindicator(false)
                
            }
        })
            .catch((err) => {
            setindicator(false)
            
            console.log(err)
        })
    }
  return (
    
    <>
        {
            indicator ?
            <View style={{ position: 'absolute', top: 0, height: screenHeight, width: screenWidth, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> 
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ fontSize: 16, color: '#fff', marginTop: 15, fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textAlign: 'center' }}>{ beneficiary !== '' ? 'Creating your payment method' : 'Validating bank details'}</Text>
            </View>
            :''
        }
        <ScrollView style={{height: '100%', width: '100%', padding: 10, backgroundColor: '#fff'}}>
        
            <View>
            
                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{width: '100%', color: '#000', marginLeft: 4}}>Account number</Text>
                    <TextInput style={{height: 50, fontFamily: 'Roboto', padding: 10, borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} maxLength={10} keyboardType='numeric' name="account-number" onChangeText={txt=> setAcctNo(txt)}  placeholder="Account number"  />
                    {/* <Text style={{color: '#000', marginBottom: 15, display: emailErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{emailErr}</Text> */}
                </View>
                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{width: '100%', color: '#000', marginLeft: 4}}>Bank</Text>
                    <Dropdown update_data={update_data} data={bank} input_name={'bank'} placeholder={'Select your bank'} />
                    {/* <Text style={{color: '#000', marginBottom: 15, display: emailErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{emailErr}</Text> */}
                </View>
                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{width: '100%', color: '#000', marginLeft: 4}}>Beneficiary</Text>
                    <Text style={{height: 50, fontFamily: 'Roboto', olor: '#000', padding: 10, borderRadius: 5,width: '100%',  backgroundColor: '#efefef'}} name="email" >{beneficiary}</Text> 
                    {/* <Text style={{color: '#000', marginBottom: 15, display: emailErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{emailErr}</Text> */}
                </View>
                
            </View>
            
            <TouchableOpacity style={{height: 50, fontFamily: 'Roboto', padding: 0, borderRadius: 5, marginBottom: 0, width: '100%',  backgroundColor: '#FF4500',  display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'row',}} onPress={e => {
                if(beneficiary !== ''){
                    setindicator(true)
                    create()
                } else {
                    setindicator(true)
                    verify()
                }
            }}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', textDecorationLine: 'none', width: '100%', textAlign: 'center' }}>{ beneficiary !== '' ? 'Add bank' : 'Verify Bank Account'}</Text>
            </TouchableOpacity>
        </ScrollView>
    </>
  )
}




function Dropdown({ placeholder, data, update_data, input_name, default_value }) {
  return (
    <>
      <SelectDropdown
        data={data}
        
        defaultValue={default_value} // ✅ this sets the default selected item
        searchInputStyle={{
          borderRadius: 5, 
          width: '100%'
        }}
        onSelect={(selectedItem, index) => {
          update_data(selectedItem?.code, input_name);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              {selectedItem && (
                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
              )}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.name) || placeholder}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
              <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={true}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </>
  )
}

  
  const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: '100%',
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      // fontSize: 18,
      fontFamily: 'roboto',
      // fontWeight: '300',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 2.5,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      // fontSize: 18,
      // fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  }); 