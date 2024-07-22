import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionBtn from './buttons/actionBtn';
import BalanceLabel from './BalanceBoard/BalanceLabel';
import BalanceVisibility from './BalanceBoard/BalanceVisibility';
import BalanceValue from './BalanceBoard/BalanceValue';
import Currency from './BalanceBoard/Currency';
import AddMoney from './BalanceBoard/AddMoney';
export default function Engagement() {
  let screenWidth = Dimensions.get('window').width;
    let list = [
        {name: 'Impressions', },
        {name: 'Views', },
        {name: 'Likes', },
    ]
  return (
    <>
        <View >
            

            <View style={[
                styles.card,
                {width: '100%'}
            ]}> 
                {/* <Text style={{padding: 10, fontSize: 18, color: '#000'}}>Engagements</Text> */}
                <View style={styles.BalanceBoard}>

                    <View style={styles.BalanceLeftBoard}>

                        <View style={styles.BalanceLabel}>
                        <BalanceLabel />
                        <BalanceVisibility />
                        </View>
                        <BalanceValue />

                    </View>

                    <View style={styles.BalanceRightBoard}>
                        <Currency />
                        <AddMoney />
                    </View>

                </View>
                
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 'auto',
        padding: 10,
        // marginLeft: 5, 
        // borderRadius: 15,
        // marginRight: 5,
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25,
        display: 'flex', 
        justifyContent: 'space-evenly', 
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 8,
        marginBottom: 5,
        backgroundColor: '#FF4500'
    },

    cardTop:{
        height: 100,
        width: '100%',
        backgroundColor: '#efefef',
        borderRadius: 15,
        padding: 0,
        position: 'relative',

        marginBottom: 5
    },

    cardBtm:{
        height: 140,
        width: '100%',
        padding: 0,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 15,

    },
    BalanceLeftBoard:{
        width: '50%',
        height: '100%',
        display: 'flex',
        // flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#000',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    
      },
    
      BalanceRightBoard:{
        width: '50%',
        height: '100%',
        display: 'flex',
        // flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#000',
        alignItems: 'flex-end',
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
    
    
      BalanceBoard: {
        height: 200,
        borderRadius: 15,
        width: '100%', 
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex', 
        padding: 20,
        fontFamily: 'serif',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10
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
    
    
      SecondaryService: {
        height: 'auto',
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
        flexWrap: 'wrap',
        marginBottom: 15
      },
    
      SecondaryServiceBox: {
        height: 90,
        width: '25%', 
        borderRadius: 15,
        flexShrink: 0,
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex', 
        padding: 10,
        fontFamily: 'serif',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // marginBottom: 5
      }
      
    
  });