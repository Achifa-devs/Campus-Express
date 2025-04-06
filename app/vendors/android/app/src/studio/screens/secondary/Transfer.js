import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NextSvg from '../../assets/next-svgrepo-com (5).svg'

import bank from '../../bank.json'
import { bankVerification } from '../../api';
import Modal from '../../reusables/Modal';
import { Image } from 'react-native-svg';
//import Header from './components/Header';
//import Navigation from './components/Navigation';
//import Body from './components/Body';



export default function Transfer() {

  let [acctNum, setAcctNum] = useState('')

  const [selected, setSelected] = useState("");
  let [validAcct, setValidAcct] = useState(false)
  let [data, set_data] = useState([])
  

  useEffect(() => {
    bank.map((item, index) => set_data(data => [...data,{key: index, value: `${item.name} -${item.code}`}] ) )
  },[])

  let [overlay, setOverlay] = useState(false);
  
  let openModal = (a) => {
    setOverlay(true)
    
  }

  let closeModal = e => {
    
    setOverlay(false)

  }
  let [bankName, setbankName] = useState('');
  let [logo, setlogo] = useState('');
  let [code, setcode] = useState('');
  let [acctName,setAcctName] = useState('')

  let [bank_name, setbank_name] = useState('');
  let [btn_title, setbtn_title] = useState('Verify Account Number');
  let [amount,setAmount] = useState('')

  let [bankSelected, setbankSelected] = useState(false)
  function setBank(item) {
    setbankName(item.name)
    setlogo(item.logo)
    setcode(item.code)
    setbankSelected(true)
  }

  function verifyBank(params) {
    console.log(acctNum,code)
    bankVerification(acctNum,code)
    .then((result) => {
      console.log('result: ', result)
      if(result.data.status === 'success'){
          setAcctName(result.data.data.account_name)
          setValidAcct(true)
          // console.log(data.account_name)
      }else{
          setAcctName('Account Details Not Found')
          setValidAcct(false)

      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    validAcct
    ?
    setbtn_title('Next')
    :
    setbtn_title('Verify Account Number')
  },[validAcct])



  let primaryList = [
    // {title: 'To Paypenz'}, 
    {title: 'To Paypenz'}, 
    {title: 'Other Banks'}
  ]

  return (
    <>
      {
        (
          overlay
          &&
          <Modal setBank={setBank} closeModal={closeModal} />
        )
      }
      <ScrollView style={styles.item}>

        
        <View style={[styles.card, {height: 200}]}>
          <View style={styles.innerCard}>
            <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Transfer Mode</Text>
            <ScrollView horizontal style={styles.TransferCntBox} contentContainerStyle={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              {
                  primaryList.map((item, index) =>
                    index === 0
                    ?
                    <View style={[styles.TransferToList, {marginLeft: 0}]}>
                      <TouchableOpacity onPress={e=> ''}>
                        <View></View>
                        <Text style={{fontSize: 10, color: '#000'}}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.TransferToList}>
                      <TouchableOpacity onPress={e=> ''}>
                        <View></View>
                        <Text style={{fontSize: 10, color: '#000'}}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
              }
            </ScrollView>
          </View>
        </View>

        <View> 

          <View style={styles.card}>
            <View style={styles.innerCard}>
              <TouchableOpacity onPress={e => openModal()} style={[styles.innerCard, {height: 100, zIndex: 1000}]}>
                <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Bank Name</Text>
                {
                  bankSelected
                  ?
                  <View style={styles.paymentOptions}>
                    <Image source={{uri:logo}} style={{width: 30, height: 30}} />
                    <Text>&nbsp;</Text>
                    <Text>{bankName}</Text>
                  </View>
                  :
                  ''
                }
                {
                  !bankSelected
                  ?
                  <View style={[styles.paymentOptions, {justifyContent: 'space-between', width: '100%'}]}>
                    <Text>Select Bank</Text>
                    <Text>&nbsp;</Text>
                    <NextSvg height={15} width={15} />
                  </View>
                  :
                  ''
                }
              
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.innerCard}>
              <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Account Number</Text>

              <TextInput onChangeText={text  => setAcctNum(text)} style={{height: 50, padding: 10, borderRadius: 5, width: '100%', backgroundColor: '#efefef'}} keyboardType='numeric' placeholder='Account Number' />
            </View>

          </View> 

          <View style={[styles.card, {height: 120}]}>
            <View style={styles.innerCard}>
              <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Account Beneficiary</Text>
              <TextInput editable={false} onChangeText={text  => setAcctNum(text)} style={{height: 40, paddingLeft: 10, paddingTop: 10, borderRadius: 5, width: '100%', backgroundColor: '#efefef'}} placeholder='Account Beneficiary' />

            </View>

          </View> 

          <View style={[styles.card, {height: 100}]}>
            <View style={styles.innerCard}>
              <TouchableOpacity style={{backgroundColor: '#bbbbbb', height: 60, width: '100%', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Text>Next</Text>
              </TouchableOpacity>
            </View>

          </View> 

          <View style={{height: 360, marginBottom: 5, width: '100%', padding: 0}}>
             
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: 10, flexDirection: 'row', borderRadius: 12, backgroundColor: '#fff'}}>
              <Text style={{margin: 10}}>Recent</Text>
              <Text style={{margin: 10}}>Favourite</Text>
            </View>
            <View style={{borderRadius: 12}}>

              <View style={{height: 80, width: '100%', backgroundColor: '#fff', }}>
              
              </View>
              <View style={{height: 80, width: '100%', backgroundColor: '#fff', }}>
              
              </View>
              <View style={{height: 80, width: '100%', backgroundColor: '#fff', }}>
              
              </View>
              <View style={{backgroundColor: '#fff', height: 40, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12}}>
                <TouchableOpacity>
                  <Text style={{backgroundColor: '#eeeeee', padding: 5, borderRadius: 8}}>View More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({

    
    item: {
        // backgroundColor: '#fff',
      padding: 10,
      borderRadius: 2,
      marginVertical: 0, 
      marginHorizontal: 0,
    },

    card: {
      height: 130,
      backgroundColor: '#fff',
      borderRadius: 10,
      // marginVertical: 1,
      // marginHorizontal: 10,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 20,
      width: '100%',
      marginBottom: 10
    },

    

  innerCard: {
    height: '100%',
    width: '100%',
    flexWrap: 'wrap',

  },



    TransferCntBox: {
      width: '100%',
      height: 100,
      // flex: 1,
      color: '#fff',
      padding: 5,
      marginBottom: 20,
        // backgroundColor: '#a35454',

    },

    TransferToList:{
      backgroundColor: '#bbbbbb',
      height: 100,
      width: 100,
      borderRadius: 5,
      marginLeft: 5, 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginRight: 5
    },

    bankCnt: {
      height: 100,
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 2,
      marginVertical: 3,
      marginHorizontal: 10,
    },
  
    
  
  
    innerCard: {
      height: '100%',
      width: '100%',
      flexWrap: 'wrap',
  
    },
  
    paymentOptions: {
      backgroundColor: '#fff',
      height: 60,
      padding: 10,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 2.5,
      marginVertical: 5,
      marginHorizontal: 0,
      borderColor: '#555555',
      borderWidth: 1,
    },
  
    bankCard: {
      height: 80,
      width: 80,
      flexShrink: 0,
      marginBottom: 10,
      backgroundColor: '#efefef'
    }
});
