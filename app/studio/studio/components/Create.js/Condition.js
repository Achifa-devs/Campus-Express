import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import BottomModal from '../../../reusables/BtmModal';
import RadioButton from '../../../reusables/RadioBtn';

export default function Condition() {
    let screenWidth = Dimensions.get('window').width;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = (value) => {
        setSelectedValue(value);
        setTimeout(() => {
            setModalVisible(!modalVisible);
        }, 500); 
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    let list = [
    'Brand New',
    'Fairly Used',
    'Refurbished',
    'Used'
    ]
  return (
    <>

        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <View style={{padding: 10}}>
                {
                    list.map((item,index) => 
                        <View key={index} style={{height: 50, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#000'}}>{item}</Text>
                            <RadioButton
                                // label="Option 2"
                                value={`${index}`}
                                selected={selectedValue === `${index}`}
                                onSelect={handleSelect}
                            />
                        </View>
                    )
                }
            </View>
        </BottomModal> 
      <View style={[styles.condition, {width: '100%'}]}>
        <Text style={{paddingLeft: 0, marginBottom: 8, color: '#000', fontSize: 14, fontWeight: '500'}}>Condition</Text>
        
        <View style={{width: '100%', marginBottom: 10}}>
            {/* <TextInput placeholder='Enter Product Condition Here' style={styles.input} multiline={true} verticalAlign='top' /> */}
            

            {/* <TouchableOpacity onPress={toggleModal} style={styles.btn}>
                
            </TouchableOpacity> */}

            <TouchableOpacity keyboardAppearance='none' placeholder='Enter Product Condition Here' style={styles.input} multiline={true} onPress={e => {
                e.preventDefault();
                toggleModal();
            }} verticalAlign='top'>
                <Text style={{textAlign: 'left', width: '100%', color: '#000'}}>{selectedValue !== null ? list[parseInt(selectedValue)] : 'Select Condition'}</Text>
          </TouchableOpacity>
        </View> 
        <Text style={{paddingLeft: 10, color: 'red'}}>Error</Text>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
    condition:{
        height: 'auto',
        padding: 0,
        display: 'flex',
        alignItems: 'Flex-start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: .5,
        backgroundColor: '#fff'
    },

    btn:{
        height: 'auto',
        width: '100%',
        padding: 0,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF4500',
        marginTop: 15,
        color: '#fff'
    },

    input:{
        height: 60, 
        padding: 10,
        width: '100%',
        backgroundColor: '#f9f9f9',
        color: '#000',
        fontSize: 15,
        borderRadius: 5,
        position: 'relative', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
  });
