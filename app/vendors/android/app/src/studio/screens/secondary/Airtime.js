import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
// import NetworSVG from '../../assets/network-cellular-connected-svgrepo-com.svg'
import CloseSVG from '../../assets/close-square-svgrepo-com.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import { getNetworkProvider } from '../../reusables/Network';
import NetworkSVG from '../../assets/network-svgrepo-com.svg'
import MtnSVG from '../../assets/mtn.svg'
import GloSVG from '../../assets/glo.svg'
import EtisalatSVG from '../../assets/etisalat.svg'
import AirtelSVG from '../../assets/airtel.svg'
import axios from 'axios';
//import Header from './components/Header';
//import Navigation from './components/Navigation';
//import Body from './components/Body';




export default function Airtime() {

  let [overlay, setOverlay] = useState(false);
  let [amount, setAmount] = useState(0);
  let [number, setNumber] = useState(0);
  let [payBtn, setPayBtn] = useState(0);
  let [service, setservice] = useState('');
  let [line, setline] = useState(
    <NetworkSVG height={30} width={30} />
  );

  let DATA = [
    {amount: 50, id: 1},
    {amount: 100, id: 2},
    {amount: 200, id: 3},
    {amount: 500, id: 4},
    {amount: 1000, id: 5},
    {amount: 10000, id: 6}
  ]

  let CARD = [
    {surfix: 20100, id: 1},
    {surfix: 10470, id: 2},
    {surfix: 20980, id: 3}
    
  ]

  let overlayJSX;
  


  let openModal = (a) => {

    setAmount(a);
    if(amount > 49){
      setOverlay(true)

    }





   
  }

  let closeModal = e => {
    
    setOverlay(false)

  }

useEffect(() => {
  if(number.length === 11){
    let network = getNetworkProvider(number);
    console.log(network)
    if(network.toLowerCase() === 'mtn'){
      setline(<MtnSVG height={40} width={40} />)
      setservice('mtn')
    }else if(network.toLowerCase() === 'glo'){
      setline(<GloSVG height={40} width={40} />)
      setservice('glo')
    }else if(network.toLowerCase() === '9mobile'){
      setline(<EtisalatSVG height={40} width={40} />)
      setservice('9mobile')
    }else if(network.toLowerCase() === 'airtel'){
      setline(<AirtelSVG height={40} width={40} />)
      setservice('airtel')
    }
  }else{
    setline(
      <NetworkSVG height={30} width={30} />
    )
  }
 

}, [number])

function generateRequestID(extraString = "") {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  const requestId = `${year}${month}${day}${hour}${minute}${extraString}`;
  return requestId;
}



function recharge_card(params) {
  let request_id = generateRequestID("ad8ef08acd8fc0f")
  axios.post('https://vtpass.com/api/pay', {
    request_id,
    serviceID: service,
    amount: amount,
    phone: number
  })
  .then((result) => {
    console.log(result)
  })
  .catch(err => console.log(err))
}

  return (

    <>

      {
        overlay
        &&

      
        (<View id='overlay' style={styles.overlay}>
          <View style={styles.modal}>

            <View style={{height: 40, width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
              <TouchableOpacity onPress={closeModal} style={{width: 50, height: 50}}>
                <CloseSVG height={30} width={30} />
              </TouchableOpacity>
            </View>

            <View style={{height: 80, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 15}}>&#8358; <Text style={{fontSize: 25}}>  {amount}</Text></Text>
              
            </View>

            <ScrollView>

              <TouchableOpacity style={styles.paymentOptions}>

              </TouchableOpacity>

              <TouchableOpacity style={styles.paymentOptions}>

              </TouchableOpacity>


              {CARD.map(item => <TouchableOpacity style={styles.paymentOptions}></TouchableOpacity>)}

            </ScrollView>

            <TouchableOpacity style={{height: 50, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onPress={e=>recharge_card()}>
              <Text>Pay Now</Text>
            </TouchableOpacity>

          </View>
        </View>)

      }

      <View style={styles.contactInput}>
        <View style={styles.network}>
          {line}
        </View>
        <TextInput onChangeText={text => setNumber(text)} keyboardType='numeric' placeholder='Phone number' maxLength={11} style={styles.input0} />

      </View>

      <View style={styles.amount}>

        <View style={{height: 50, width: '99%', backgroundColor: '#fff', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 20 }}>
          <Text >Top Up</Text>
        </View>

        {
          DATA.map(item => 
            <TouchableOpacity key={item.id} style={styles.priceTag} onPress={e => openModal(item.amount)}> 
              <Text style={{backgroundColor: '#efefef', height: '80%', width: '80%', borderRadius: 5, textAlign: 'center', display: 'flex', alignItems: 'center', paddingTop: '20%', justifyContent: 'center', fontSize: 18, fontWeight: '400', position: 'relative'}}>{item.amount}</Text>
            </TouchableOpacity>  
          )
        }

        <View style={{backgroundColor: '#fff', height: 80, width: '99%'}}>
          
          <TextInput keyboardType='numeric' onChangeText={text => setPayBtn(text)} placeholder='50 - 500,000' maxLength={10} style={styles.input1} />
          <View style={styles.pay}>
            <TouchableOpacity onPress={e => openModal(payBtn)} style={{padding: 15, borderRadius: 20, backgroundColor: '#e7e7e7'}}>
              <Text>Pay</Text>
            </TouchableOpacity>
          </View>
        </View> 

      </View>

    </>


  );
}

const styles = StyleSheet.create({

  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transprent',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  modal: {
    height: '60%',
    width: '100%',
    padding: 8,
    backgroundColor: '#fff'
  },

  contactInput: {
    height: 70,
    fontSize: 25,
    backgroundColor: '#fff',
    borderRadius: 2,
    
  },

  input0: {
    width: '85%',
    height: '100%',
    borderWidth: .1, 
    padding: 10,
    fontSize: 20,
    fontWeight: '300',
    position: 'absolute',
    right: 0,
    borderColor: '#000'
  },

  input1: {
    width: '70%',
    height: '100%',
    borderWidth: .1, 
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontWeight: '300',
    position: 'absolute',
    left: 0,
    borderColor: '#000'
  },

  pay: {
    width: '30%',
    height: '100%',
    position: 'absolute',
    right: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  network: {
    width: '15%',
    height: '100%',
    position: 'absolute',
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  amount: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    backgroundColor: 'transparent'
  },

  priceTag: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '33%',
    height: 100,
    backgroundColor: '#fff',
  },

  paymentOptions: {
    backgroundColor: '#fff',
    height: 70,
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2.5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#000',
    borderWidth: 1,
  }


});