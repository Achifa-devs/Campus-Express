import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card.js/CardDisplay/CreditCard';

export default function Cards() {
  const screenHeight = Dimensions.get('window').height;
  let primaryList = [
    {title: 'Fund Card'}, 
    {title: 'Cash Out'}, 
    {title: 'Show Details'}, 
    {title: 'More'}
  ]
  return (
    <>
      <ScrollView style={styles.Card}>
        <View style={styles.CardBoard}>

          <View style={styles.CardTopBoard}>
            <View style={{width: '50%'}}>
              <Text>Add Card</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text>NGN</Text>
            </View>
          </View>

          <View style={styles.CardBtmBoard}>
            <Text>2 Cards Availble</Text>
          </View> 


        </View>

        <View style={[styles.CardDisplay, {height: screenHeight - 200}]}>
           {/* Primary Board Jsx */}
          <View style={styles.PrimaryService}>

            {
              primaryList.map((item) => 
                <View style={styles.PrimaryServiceBox}>
                  <View>
                    <Text style={{fontSize: 10}}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              )
            }

          </View>

          <View></View>
        </View>

      </ScrollView> 
    </>
  )
}


const styles = StyleSheet.create({
  Card: {
    height: '100%',
    width: '100%',
    padding: 10
      
  },

  CardTopBoard:{
    width: '100%',
    height: '75%',
    display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'

  },

  CardBtmBoard:{
    width: '100%',
    height: '25%',
    display: 'flex',
    // flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'

 
  },

  
  BalanceLabel:{
    width: '100%',
    height: '20%',
    display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },


  CardBoard: {
    height: 250,
    borderRadius: 15,
    width: '100%', 
    borderRadius: 5,
    backgroundColor: '#fff',
    display: 'flex', 
    padding: 20,
    fontFamily: 'serif',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom: 10
  },


  CardDisplay: {
    borderRadius: 15,
    width: '100%', 
    borderRadius: 5,
    backgroundColor: '#efefef',
    display: 'flex', 
    // padding: 20,
    fontFamily: 'serif',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15
  },

  PrimaryService: {
    height: 90,
    borderRadius: 15,
    width: '100%', 
    borderRadius: 5,
    backgroundColor: '#fff',
    display: 'flex', 
    // padding: 20,
    fontFamily: 'serif',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 15
  },

  PrimaryServiceBox: {
    height: 90,
    width: '25%', 
    borderRadius: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    display: 'flex', 
    padding: 10,
    fontFamily: 'serif',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // marginBottom: 5
  },
  
});
