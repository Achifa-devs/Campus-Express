import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity, Button, Alert } from 'react-native'
import { useSelector, useStore } from 'react-redux';
// import dayjs from 'dayjs';
import locations from '../location.json'
// import DatePicker from 'react-native-date-picker'
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker'
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
export default function PersonalData() {
    let {
        user
    } = useSelector(s=>s.user);
 
    
    let [states, set_states] =  useState('')
    let [state, set_state] =  useState('')
    
    let [cities, set_cities] =  useState('')
    let [city, set_city] = useState('')

    let [home_address, set_home_address] = useState('')
    let [postal_code, set_postal_code] = useState('')
    
    let [gender, set_gender] = useState('')
    let [birth, set_birth] = useState('')



    function update_user(){
        axios.post('http://192.168.249.146:2003/system.profile-update', {
            id:user?.id,gender,birth,address: {"state": state, "city": city, "country": "Nigeria", "home_address": home_address, "postal_code": postal_code},
        })
        .then((result) => {
            
        })
        .catch(err => {
            console.log(err)
        }) 
    }
    let [date, setDate] = useState(new Date())
    let [open, setOpen] = useState(false)


    let [day, setday] = useState('');
    let [month, setmonth] = useState('');
    let [year, setyear] = useState('');

    
    useEffect(() => {
        date_converter()
    }, [date])

    let months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function date_converter() {
        // const dateString = date;
        const d = new Date(date); // Convert the string to a Date object

        const day = d.getUTCDate(); // Get the day of the month (1-31)
        const month = d.getUTCMonth() + 1; // Get the month (0-11), so add 1 to make it 1-12
        const year = d.getUTCFullYear(); // Get the full year (e.g., 2025)

        setmonth(months[month - 1]);
        setday(day);
        setyear(year)
        set_birth(`${day} ${months[month - 1]}, ${year}`)

    }
    

    
 
    // const [selected, setSelected] = React.useState("");
  
    let data = [
        {key:'1', value:'Male'},
        {key:'2', value:'Female'}
    ]
  
   
  
    useEffect(() => {
        if (user) {
            set_gender(user?.gender)
            setday(user?.birth?.split(' ')[0])
            setmonth(user?.birth?.split(' ')[1].split(',')[0])
            setyear(user?.birth?.split(' ')[2])
            set_state(user?.address?.state)
            set_city(user?.address?.city)
            set_home_address(user?.address?.home_address)
            set_postal_code(user?.address?.postal_code)

        }
    }, [user])
    

    useEffect(() => {
        locations.map((item,index) => set_states(data => [...data, {key: index+1, value: item.name}]));
    }, [])
    
    useEffect(() => {
        if (states.length > 0) {
            console.log(locations.filter(item => item.name === state)[0]?.cities)
            let cities = locations.filter(item => item.name === state)[0]?.cities;
            set_cities([])
            cities?.map((item,index) => set_cities(data => [...data, {key: index+1, value: item}]));
        }

    },[state])
    
  return (
    <>
        <View style={styles.cnt} >
            <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Tell us about yourself</Text>

            <ScrollView >
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Country of residence</Text>
                    <TextInput style={styles.input} defaultValue='Nigeria' />
                </View>


                <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Personal Details</Text>
                <View style={{height: 'auto', width: '100%', display: 'flex', marginBottom: 35,  alignItems: 'center', justifyContent: 'space-between', padding: 8, flexDirection: 'row'}}>

                    <View style={{display: 'flex', height: 60, color: '#000', width: '48%', flexDirection: 'column'}}>
                        <Text style={{width: '100%', color: '#000', marginLeft: 4}}>Firstname</Text>
                        <TextInput style={{height: 50, fontFamily: 'Roboto', padding: 10, borderRadius: 10, marginBottom: 2, width: '100%',  backgroundColor: '#fff', borderColor: '#000',borderWidth: .7,borderRadius: 7}}   placeholder="FirstName" value={user?.fname} />
                        {/* <Text style={{color: '#000', marginBottom: 15, display: fnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{fnameErr}</Text> */}
                    </View>
        

                    <View style={{display: 'flex', height: 60, color: '#000', width: '48%', flexDirection: 'column'}}>
                        <Text style={{width: '100%', color: '#000', marginLeft: 4}}>Lastname</Text>
                        <TextInput style={{height: 50, fontFamily: 'Roboto', padding: 10, borderRadius: 10, marginBottom: 2, width: '100%',  backgroundColor: '#fff', borderColor: '#000',borderWidth: .7,borderRadius: 7}} placeholder="LastName" value={user?.lname} />
                        {/* <Text style={{color: '#000', marginBottom: 15, display: lnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{lnameErr}</Text> */}
                    </View>

                </View>
                
                 <View style={styles.inputCnt}>
                    <Text style={styles.label}>Gender</Text>
                    <SelectList 
                        setSelected={(val) => { set_gender(val)}} 
                        data={data} 
                        defaultOption={{key:'1', value:user?.gender}}
                        save="value"
                    />
                </View>

                <View style={{marginTop: 10}}>
                    <Text style={[styles.label, {marginLeft: 15, marginBottom: -12, margintTop: 10}]}>Date Of Birth</Text>
                      
                    <View style={[styles.dateInputCnt, {padding: 10}]}>
                        <View style={styles.dateInput}>
                            <Text style={styles.label}>Date</Text>
                            <TouchableOpacity onPress={() => setOpen(true)} style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#000', borderRadius: 8}}>
                                <Text>{day}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateInput}>
                            <Text style={styles.label}>Month</Text>
                            <TouchableOpacity onPress={() => setOpen(true)} style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#000', borderRadius: 8}}>
                                <Text>{month}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateInput}>
                            <Text style={styles.label}>Year</Text>
                            <TouchableOpacity onPress={() => setOpen(true)} style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#000', borderRadius: 8}}>
                                <Text>{year}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                          }}
                          mode='date'
                    />
                </View>

                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput style={styles.input} value={`${user?.phone_number}`} />
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={`${user?.email}`} />
                </View>

                {/* <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: 1}]}>Change phone number</Text> */}


                <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Address</Text>

                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Home address</Text>
                    <TextInput style={styles.input} defaultValue={home_address} onChangeText={txt=> set_home_address(txt)}/>
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Postal code</Text>
                    <TextInput style={styles.input} defaultValue={postal_code} keyboardType='numeric' onChangeText={txt=> set_postal_code(txt)}/>
                </View>

                {/* <View style={styles.inputCnt}>
                    <Text style={styles.label}>Country</Text>
                    <SelectList 
                        setSelected={(val) => set_country(val)} 
                        data={[{key: 1, value: 'Nigeria'}]} 
                        save="value"
                    />
                </View> */}
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>State</Text>
                    <SelectList 
                        setSelected={(val) => set_state(val)} 
                        data={states} 
                        defaultOption={{key:'1', value:user?.address?.state}}
                        
                        save="value"
                        placeholder='Select state'
                    />
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>City</Text>
                    <SelectList 
                        setSelected={(val) => set_city(val)} 
                        data={cities} 
                        defaultOption={{key:'1', value:user?.address?.city}}
                        save="value"
                        placeholder='Select city'
                        
                    />
                </View>
                
                

                
            </ScrollView>

            <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={e=> update_user()} style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 8}}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#f9f9f9',
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
