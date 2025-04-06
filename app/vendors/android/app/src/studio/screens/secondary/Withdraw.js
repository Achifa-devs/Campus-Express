import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NextSvg from '../../assets/next-svgrepo-com (5).svg'
import Modal from '../../reusables/Modal';
import { useEffect, useState } from 'react';
//import Header from './components/Header';
//import Navigation from './components/Navigation';
//import Body from './components/Body';

import bank from '../../bank.json'
import { bankVerification } from '../../api';
import { useSelector } from 'react-redux';

export default function Withdraw() {
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


  return (

    <>

      {
        (
          overlay
          &&
          <Modal setBank={setBank} closeModal={closeModal} />
        )
      }
    
      <View style={styles.item}>
          <Text>Current Balance</Text>
          <Text>5000.00</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.innerCard}>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Amount</Text>

          <TextInput onChangeText={text  => setAmount(text)} style={{height: 50, padding: 10, borderRadius: 5, width: '100%', backgroundColor: '#efefef'}} keyboardType='numeric' placeholder='Amount' />
        </View>

      </View>

      <View style={styles.card}>
        <View style={styles.innerCard}>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Account Number</Text>

          <TextInput onChangeText={text  => setAcctNum(text)} style={{height: 50, padding: 10, borderRadius: 5, width: '100%', backgroundColor: '#efefef'}} keyboardType='numeric' placeholder='Account Number' />
        </View>

      </View>

      

      <View style={[styles.card, {height: 'auto'}]}>
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
        <>
          <Text style={{width: '100%', textAlign: 'left'}}>Beneficiary</Text>

          <View style={[styles.paymentOptions, {width: '100%', borderColor: 'green', borderWidth: 1}]}>
            <Text>{acctName}</Text>
          </View>
        </>

        
      </View>

      <View style={[{height: 80, position: 'absolute',bottom: 0, width: '100%', display: 'flex', alignItems: 'center', padding: 10, flexDirection: 'row', justifyContent: 'center'}]}>
        <TouchableOpacity onPress={e=>verifyBank()} style={{height: 50, width: '100%', display: 'flex', margin: 'auto', backgroundColor: '#fff', alignItems: 'center',borderColor: '#efefef',borderWidth: 1, justifyContent: 'center'}}>
            <Text>{btn_title}</Text>
        </TouchableOpacity>

      </View>
      
    </>


  );
}

const styles = StyleSheet.create({

    
  item: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 2,
      marginVertical: 3,
      marginHorizontal: 10,
  },

  card: {
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginVertical: 1,
    marginHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20

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
