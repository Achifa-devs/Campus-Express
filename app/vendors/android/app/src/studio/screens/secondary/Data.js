import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import NetworSVG from '../../assets/network-cellular-connected-svgrepo-com.svg'
import CloseSVG from '../../assets/close-square-svgrepo-com.svg'
import { useState } from 'react';
import { useEffect } from 'react';

//import Header from './components/Header';
//import Navigation from './components/Navigation';
//import Body from './components/Body';



export default function Data() {

  let [overlay, setOverlay] = useState(false);
  let [amount, setAmount] = useState(0);
  let [number, setNumber] = useState(0);
  let [payBtn, setPayBtn] = useState(0);

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

  return (

    <>

      {
        overlay
        &&

      
        (<View id='overlay' style={styles.overlay}>
          <View style={styles.modal}>

            <View style={{height: 40, width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
              <TouchableOpacity onPress={closeModal} style={{width: 50, height: 50}}>
                <CloseSVG height={25} width={25} />
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

            <TouchableOpacity style={{height: 50, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Text>Pay Now</Text>
            </TouchableOpacity>

          </View>
        </View>)

      }

      <View style={styles.contactInput}>
        <View style={styles.network}>
          <NetworSVG width={25} height={25}  />
        </View>
        <TextInput onChangeText={text => setNumber(text)} keyboardType='numeric' placeholder='Phone number' maxLength={10} style={styles.input0} />

      </View>

      <View style={styles.amount} onTouchStart={e => this.touchY = e.nativeEvent.pageY} onTouchEnd={e => this.touchY - e.nativeEvent.pageY > 20 ? console.log('swiped'): console.log('not swiped')}>

        <View style={{height: 50, width: '99%', backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'scroll', paddingLeft: 20 }}>
          <Text style={{marginLeft: 10, marginRight: 10}}>Hot</Text>
          <Text style={{marginLeft: 10, marginRight: 10}}>Daily</Text>
          <Text style={{marginLeft: 10, marginRight: 10}}>Weekly</Text>
          <Text style={{marginLeft: 10, marginRight: 10}}>Monthly</Text>
          <Text style={{marginLeft: 10, marginRight: 10}}>2-Months</Text>
          <Text style={{marginLeft: 10, marginRight: 10}}>3-months</Text>
          <Text style={{marginLeft: 10, marginRight: 10}}>Yearly</Text>
        </View>


        {
          DATA.map(item => 
            <TouchableOpacity key={item.id} style={styles.priceTag} onPress={e => openModal(item.amount)}> 
              <Text style={{backgroundColor: '#efefef', height: '80%', width: '80%', borderRadius: 5, textAlign: 'center', display: 'flex', alignItems: 'center', paddingTop: '20%', justifyContent: 'center', fontSize: 18, fontWeight: '400', position: 'relative'}}>{item.amount}</Text>
            </TouchableOpacity>  
          )
        }

        

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

