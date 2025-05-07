import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Linking, Switch, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native'
import FaSvg from '../../../media/assets/two-factor-authentication-svgrepo-com.svg'
import DailPadSvg from '../../../media/assets/dialpad-svgrepo-com.svg'
import PwdSvg from '../../../media/assets/password-svgrepo-com (1).svg'
import EmailSvg from '../../../media/assets/email-svgrepo-com (2).svg'
import PhoneSvg from '../../../media/assets/phone-svgrepo-com (4).svg'
import LogoutSvg from '../../../media/assets/logout-svgrepo-com (1).svg'
import SyncSvg from '../../../media/assets/add-contact-svgrepo-com.svg'
import BellSvg from '../../../media/assets/bell-svgrepo-com (3).svg'
import AngleSvg from '../../../media/assets/angle-right-svgrepo-com.svg'
import LinkSvg from '../../../media/assets/link-square-svgrepo-com (1).svg'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Notification() {

    
    // State to track switch state (on/off)
  const [isEnabled1, setIsEnabled1] = useState('');
  const [isEnabled2, setIsEnabled2] = useState('');
  const [isEnabled3, setIsEnabled3] = useState('');
  const [isEnabled4, setIsEnabled4] = useState('');
  const [isEnabled5, setIsEnabled5] = useState('');
  const [isEnabled6, setIsEnabled6] = useState('');
  const [isEnabled7, setIsEnabled7] = useState('');
  const [isEnabled8, setIsEnabled8] = useState('');
  const [isEnabled9, setIsEnabled9] = useState('');

  // Toggle the switch
    // const setIsEnabled9(!isEnabled9) () => ;
    let {
            user
        } = useSelector(s=>s.user);

    function update_notification(target, src, value) {
        axios.post('http://192.168.209.146:9090/system.notice-update', {
            id: user?.id,
            data: {
                target: target,
                src: src,
                value: value
            }
        })
        .then((result) => {
            console.log(result)
        })
            .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log(user?.notification)
        if (user) {
            for (x in user?.notification) { 
                if (x === 'campaigns') {
                    setIsEnabled7(user?.notification[x][0]["email"])
                    setIsEnabled8(user?.notification[x][0]["sms"])
                } else if (x === 'interviews_surveys') {
                    setIsEnabled5(user?.notification[x][0]["email"])
                    setIsEnabled6(user?.notification[x][0]["sms"])
                }else if (x === 'transfers_balances') {
                    setIsEnabled1(user?.notification[x][0]["email"])
                    setIsEnabled2(user?.notification[x][0]["sms"])
                }else if (x === 'currencies_features') {
                    setIsEnabled3(user?.notification[x][0]["email"])
                    setIsEnabled4(user?.notification[x][0]["sms"])
                }
            }

            console.log()
            function checkAllTrue(data) {
                let response = data?
                Object?.values(data)?.every(array => array.every(item => item.email === true && item.sms === true) )
                :
                ''
                return response;
            }

            const allTrue = checkAllTrue(user?.notification);
            allTrue ? setIsEnabled9(!isEnabled9) : ''
            // console.log(allTrue); 
        }
    }, [user])


    useEffect(() => {isEnabled1 === ''? '' : update_notification('email', 'transfers_balances', isEnabled1)}, [isEnabled1])
    useEffect(() => {isEnabled2 === ''? '' : update_notification('sms', 'transfers_balances', isEnabled2)}, [isEnabled2])
    useEffect(() => {isEnabled3 === ''? '' : update_notification('email', 'currencies_features', isEnabled3)}, [isEnabled3])
    useEffect(() => {isEnabled4 === ''? '' : update_notification('sms', 'currencies_features', isEnabled4)}, [isEnabled4])
    useEffect(() => {isEnabled5 === ''? '' : update_notification('email', 'interviews_surveys', isEnabled5)}, [isEnabled5])
    useEffect(() => {isEnabled6 === ''? '' : update_notification('sms', 'interviews_surveys', isEnabled6)}, [isEnabled6])
    useEffect(() => {isEnabled7 === ''? '' : update_notification('email', 'campaigns', isEnabled7)}, [isEnabled7])
    useEffect(() => {isEnabled8 === ''? '' : update_notification('sms', 'campaigns', isEnabled8)}, [isEnabled8])
    useEffect(() => {isEnabled9 === ''? '' : update_notification('*', '*', isEnabled9)}, [isEnabled9])
    
  return (
    <>
        <View style={styles.cnt}>

            {/* <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Notification</Text> */}
 
            <ScrollView >
                <Text style={[styles.label, {paddingBottom: 10, fontSize: 16, marginBottom: 10, marginTop: 25, color: '#000', fontWeight: '300', lineHeight: 25}]}>Get notified about important updates and spot any suspicious account activity.</Text>

                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 125, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <BellSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Allow notifications</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled9 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                            onValueChange={e => setIsEnabled9(!isEnabled9)}                    // Function to call on toggle
                            value={isEnabled9}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>




                <View style={{padding: 10}}>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 17, color: '#000', marginBottom: 10, marginTop: 25, fontWeight: '800'}]}>Your transfer and balances</Text>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 15, color: '#000', marginBottom: 10, marginTop: -5, fontWeight: '300'}]}>Notification about where your money is.</Text>

                </View>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <EmailSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Email</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled1(!isEnabled1)}                  // Function to call on toggle
                            value={isEnabled1}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>

                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <PhoneSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Push</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled2(!isEnabled2)}               // Function to call on toggle
                            value={isEnabled2}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>

                {/* <View style={{padding: 10}}>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 17, color: '#000', marginBottom: 10, marginTop: 25, fontWeight: '800'}]}>Your debit card</Text>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 15, color: '#000', marginBottom: 10, marginTop: -5, fontWeight: '300'}]}>Notification about your card transactions.</Text>

                </View>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <EmailSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Email</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                            onValueChange={e=>setIsEnabled9(!isEnabled9)                   // Function to call on toggle
                            value={isEnabled}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>

                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <PhoneSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Push</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                            onValueChange={e=>setIsEnabled9(!isEnabled9)                   // Function to call on toggle
                            value={isEnabled}    
                            
                        />
                    </View>
                    
                </TouchableOpacity> */}




                <View style={{padding: 10}}>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 17, color: '#000', marginBottom: 10, marginTop: 25, fontWeight: '800'}]}>Currencies and features</Text>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 15, color: '#000', marginBottom: 10, marginTop: -5, fontWeight: '300'}]}>New about our latest and greatest work. Plus tips on using Paypenz.</Text>

                </View>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <EmailSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Email</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled3 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled3(!isEnabled3)}                   // Function to call on toggle
                            value={isEnabled3}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>

                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <PhoneSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Push</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled4 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled4(!isEnabled4)}                  // Function to call on toggle
                            value={isEnabled4}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>


                <View style={{padding: 10}}>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 17, color: '#000', marginBottom: 10, marginTop: 25, fontWeight: '800'}]}>Interviews, Reviews and Surveys</Text>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 15, color: '#000', marginBottom: 10, marginTop: -5, fontWeight: '300'}]}>Invites to test new product and sharre your thoughts.</Text>

                </View>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <EmailSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Email</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled5 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled5(!isEnabled5)}                // Function to call on toggle
                            value={isEnabled5}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>

                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <PhoneSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Push</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled6 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled6(!isEnabled6)}                   // Function to call on toggle
                            value={isEnabled6}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>


                <View style={{padding: 10}}>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 17, color: '#000', marginBottom: 10, marginTop: 25, fontWeight: '800'}]}>Our campaigns</Text>
                    <Text style={[styles.label, {paddingBottom: 10, fontSize: 15, color: '#000', marginBottom: 10, marginTop: -5, fontWeight: '300'}]}>Updates about causes we care about. Chances to get involved.</Text>

                </View>
                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <EmailSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Email</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled7 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled7(!isEnabled7)}                // Function to call on toggle
                            value={isEnabled7}    
                            
                        />
                    </View>
                    
                </TouchableOpacity>

                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                            <PhoneSvg width={25} height={25} />
                        </View>
                        <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Push</Text>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <Switch
                            
                            trackColor={{ false: '#767577', true: '#81b0ff' }} // Customize colors
                            thumbColor={isEnabled8 ? '#f5dd4b' : '#f4f3f4'}   // Thumb color
                            ios_backgroundColor="#3e3e3e"                    // iOS background color
                              onValueChange={e=>setIsEnabled8(!isEnabled8)}                // Function to call on toggle
                            value={isEnabled8}    
                            
                        />
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
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '800'
        }
});
