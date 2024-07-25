import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BottomModal from '../../../reusables/BtmModal';
import RadioButton from '../../../reusables/RadioBtn';

export default function Type({type_list,category,updateType}) {
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    console.log(type_list)
    const handleSelect = (value) => {
        setSelectedValue(value);
        updateType(type_list[parseInt(value)])
        setTimeout(() => {
            setModalVisible(!modalVisible);
        }, 500); 
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
  return (
    <>
        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <ScrollView style={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#fff',
            position: 'relative',
            padding: .5
            }}
            contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                {
                    type_list.map((item,index) => 
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
            </ScrollView>
        </BottomModal> 
        <View style={[styles.type, {width: '100%'}]}>
            <Text style={{paddingLeft: 0, marginBottom: 8, color: '#000', fontSize: 14, fontWeight: '500'}}>Type</Text>
            
            <View style={{width: '100%', marginBottom: 10}}>

                <TouchableOpacity keyboardAppearance='none' placeholder='Enter Product Condition Here' style={styles.input} multiline={true} onPress={e => {
                    e.preventDefault();
                    toggleModal();
                }} verticalAlign='top'>
                        <Text style={{textAlign: 'left', width: '100%', color: '#000'}}>{selectedValue !== null ? type_list[parseInt(selectedValue)] : `Select ${category} Type`}</Text>
                </TouchableOpacity>
            </View> 
            <Text style={{paddingLeft: 10, color: 'red'}}>Error</Text>
        </View>
    </>
  )
}



const styles = StyleSheet.create({
    type:{
        height: 'auto',
        padding: 0,
        display: 'flex',
        alignItems: 'Flex-start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        // marginBottom: 1.5,
        backgroundColor: '#fff'
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
