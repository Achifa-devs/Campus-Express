import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import Header from './components/Header';
//import Navigation from './components/Navigation';
//import Body from './components/Body';

// import * as Clipboard from 'expo-clipboard';

export default function Deposit() {

  const [copiedText, setCopiedText] = useState('');

  const [bankName, setbankName] = useState('');
  const [bankBeneficiary, setbankBeneficiary] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  // Clipboard.setString('mail@mail.com');

  // const copyToClipboard = () => {
  //   Clipboard.setString('hello world');
  // };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  // };

  return (

    <>
      <View style={styles.item}>
          <Text>Money transfer sent to this bank account number will automatically top up your Pay-Q Wallet.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.innerCard}>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Account Name</Text>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Akpulu Fabian</Text>
        </View>

        <TouchableOpacity onPress={e => Clipboard.setString(bankName)}>
            <Text>Copy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.innerCard}>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Account Number</Text>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>1234567890</Text>
        </View>

        <TouchableOpacity onPress={e => Clipboard.setString(accountNumber)}>
          <Text>Copy</Text>          
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.innerCard}>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Bank Name</Text>
          <Text style={{marginBottom: 10, textAlign: 'left', width: '100%'}}>Pay-Q FLW</Text>
        </View>

        <TouchableOpacity onPress={e => Clipboard.setString(bankName)}>
          <Text>Copy</Text>          
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
      height: 100,
      backgroundColor: '#fff',
      borderRadius: 2,
      marginVertical: 3,
      marginHorizontal: 10,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 20

    },

    innerCard: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',

    }


});
