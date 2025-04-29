import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import DropdownExample from '../../utils/DropDown';
import { data, school_choices } from '../../vendor/utils/location';

export function Location({updateFilterWord}) {
    
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [campus, setCampus] = useState([]);
    const { location } = useSelector(s => s.location);
    let [state, setState] = useState('');
    
    useEffect(() => {
        if (location?.address?.state) {
            setState(location.address.state);
        }
    }, [location]);
    
    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.title.toLowerCase() === state.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        // console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])
    }, [state])

    function updateData(data) {
        if (name = 'state') {
            setState(data)
        } else {
            setCampus(data)
        }
    }
    
    return (
        <View style={{ 
            // padding: 16,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                height: 'auto',
                padding: 0,
                width: '100%',
                borderRadius: 5,
                padding: 8,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 5,
                color: '#000',textAlign: 'center'
            }}>
                Location filter
            </Text>

            <DropdownExample name='state' updateData={updateData} data={data}  placeholder={'Select state'} />
            <DropdownExample name='campus' updateData={updateData} data={campusLocaleList} placeholder={'Select campus'} />

            <TouchableOpacity activeOpacity={.7} style={{
                height: 50,
                padding: 0,
                borderRadius: 5,
                padding: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 25,
                backgroundColor: '#FF4500',
                    width: '92%'
            }} onPress={e => {
                updateFilterWord({
                    campus, state
                })
            }}>
                <Text style={{ fontSize: 14, color: '#fff',  width: 'auto' }}>Set location</Text>
            </TouchableOpacity>
        </View>
    )
}
