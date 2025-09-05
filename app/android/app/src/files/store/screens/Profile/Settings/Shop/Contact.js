import React from 'react'
import GoogleSvg from '../../../../media/assets/google-color-svgrepo-com (2).svg'
import { ScrollView, StyleSheet, Switch, TextInput, View, Text, TouchableOpacity } from 'react-native'

export default function ShopContact() {
  return (
    <>
    <View style={styles.cnt} >
        <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 'auto', backgroundColor: '#fff'}}>Shop contacts & communication</Text>

        {/* <Text style={[styles.label, {fontWeight: '200'}]}>Your shop is connected to: </Text> */}


              <ScrollView >
                  
                <Text style={[styles.label, { borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25 }]}>Contacts</Text>
                  

                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Account email</Text>
                    <TextInput 
 placeholderTextColor={"#333333"} style={styles.input} defaultValue={''} placeholder='akpulufabian@gmail.com' />
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Account phone number</Text>
                    <TextInput 
 placeholderTextColor={"#333333"} style={styles.input} defaultValue={''} placeholder='phone number' />
                </View>

                <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Social links</Text>

                <TouchableOpacity onPress={e => navigation.navigate('user-data')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <GoogleSvg width={35} height={35} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Google</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', borderRadius: 20, paddingLeft: 15, paddingRight: 15, paddingTop: 8, paddingBottom: 8}}>
                        <Text>Disconnect</Text>
                    </View>
                    
                </TouchableOpacity>


          
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
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '400',
    marginBottom: 10,
    color: '#000'
}
});
