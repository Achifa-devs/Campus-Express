import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity, Button, Alert } from 'react-native'
import { useSelector, useStore } from 'react-redux';
// import dayjs from 'dayjs';
import locations from '../../../location.json'
// import DatePicker from 'react-native-date-picker'
import Dropdown from '../../../utils/Dropdown';
import { data, school_choices } from '../../../utils/location';
// import { data, school_choices } from "../reusables/location";
export default function PersonalData() {
    let {
        user
    } = useSelector(s => s.user);
    console.log(user)
 
    
    let [states, set_states] =  useState('')
    let [cities, set_cities] =  useState('')
    let [home_address, set_home_address] = useState('')
    let [gender, setGender] = useState('')
    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')
    const [campusLocaleList, setCampusLocaleList] = useState([]);

    function update_user(){
        axios.post('http://192.168.168.146:9090/system.profile-update', {
            id:user?.id,gender,birth,address: {"state": state, "city": city, "country": "Nigeria", "home_address": home_address, "postal_code": postal_code},
        })
        .then((result) => {
            
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    useEffect(() => {
        if (user !== null && user !== undefined && user !== 'null' && user !== 'undefined') { 
            // setState(user?.state)
            update_data(user?.state, 'state')
            update_data(user?.campus, 'campus')
            update_data(user?.gender, 'gender')
        }
    }, [user])

    
    function update_data(data, name) {
        console.log('update_data',data)
        if (name === 'gender') {
            setGender(data)
        } else if (name === 'state') {
            setState(data)
        } else {
            setCampus(data)
        }
    }
    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.title.toLowerCase() === state.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])
    }, [state])

    useEffect(() => {
        locations.map((item,index) => set_states(data => [...data, {key: index+1, title: item.name}]));
    }, [])
    
    useEffect(() => {
        if (states.length > 0) {
            console.log(locations.filter(item => item.name === state)[0]?.cities)
            let cities = locations.filter(item => item.name === state)[0]?.cities;
            set_cities([])
            cities?.map((item,index) => set_cities(data => [...data, {key: index+1, title: item}]));
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
                     <Dropdown update_data={update_data} default_value={{title: user?.gender}} data={[{ title: 'Male' }, { title: 'Female' }]} input_name={'gender'} placeholder={'Select your gender'} />
                </View>

                {/* <View style={{marginTop: 10}}>
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
                </View> */}

                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput style={styles.input} value={`${user?.phone}`} />
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={`${user?.email}`} />
                </View>

                {/* <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: 1}]}>Change phone number</Text> */}


                <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Address</Text>

                {/* <View style={styles.inputCnt}>
                    <Text style={styles.label}>Street or junction (e.g. Yahoo junction)</Text>
                    <TextInput style={styles.input} defaultValue={home_address} onChangeText={txt=> set_home_address(txt)}/>
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Lodge Name</Text>
                    <TextInput style={styles.input} defaultValue={home_address} onChangeText={txt=> set_home_address(txt)}/>
                </View> */}
                
                {/* <View style={styles.inputCnt}>
                    <Text style={styles.label}>Postal code</Text>
                    <TextInput style={styles.input} defaultValue={postal_code} keyboardType='numeric' onChangeText={txt=> set_postal_code(txt)}/>
                </View> */}

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
                    {/* <SelectList 
                        setSelected={(val) => set_state(val)} 
                        data={states} 
                        defaultOption={{key:'1', value:user?.address?.state}}
                        
                        save="value"
                        placeholder='Select state'
                    /> */}
                    <Dropdown update_data={update_data} default_value={{title: user?.state}} data={data}  input_name={'state'} placeholder={'Select your state'} />
                    
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Campus</Text>
                    {/* <SelectList 
                        setSelected={(val) => set_city(val)} 
                        data={cities} 
                        defaultOption={{key:'1', value:user?.address?.city}}
                        save="value"
                        placeholder='Select city'
                        
                    /> */}
                    <Dropdown update_data={update_data} default_value={{title: user?.campus}}  data={campusLocaleList} input_name={'campus'} placeholder={'Select your campus'} />
                    
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
