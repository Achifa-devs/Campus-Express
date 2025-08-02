import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import Dropdown from "../../utils/Dropdown";
import { school_choices,data } from "../../utils/location";
// import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import BottomModal from "../../utils/BtmModal";
import DropdownExample from "../../../utils/DropDown";
const Refund = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const [isEnabled, setIsEnabled] = useState(false);
    const [isStatusEnabled, setIsStatusEnabled] = useState(false);
    // let {selected_profession} = useSelector(s => s.selected_profession);
    let dispatch = useDispatch();
    const toggleSwitch1 = () => isEnabled ? setIsEnabled(false) : setIsEnabled(true);
    const toggleSwitch2 = () => isStatusEnabled ? setIsStatusEnabled(false) : setIsStatusEnabled(true);
    const richText = useRef();
    let [state, setState] = useState('')
    let [campusLocaleList, setCampusLocaleList] = useState([]);
    let [stateErr, setStateErr] = useState('')
    let [campusErr, setCampusErr] = useState('')
    function update_data(data, name) {
        console.log(data,name)
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
        console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])
    const [modalVisible, setModalVisible] = useState(false);
       
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    return ( 
        <>

            
            <View style={styles.cnt}>

                

                <BottomModal visible={modalVisible} onClose={toggleModal}>
                    <ScrollView >
                        <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                            <Text style={{ fontSize: 16, color: '#000', width: '100%', fontWeight: '400', fontFamily: 'Roboto', height: 'auto' }}>Tell us how you want to get your customer trust.</Text>
                            
                            <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'underline'}}>Learn more in our help articles.</Text>
                        </View>
                        <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                            <Text style={{width: '100%', color: '#000'}}>Refund terms</Text>
                            <DropdownExample update_data={update_data} data={[{title: 'I do not accept refund'}, {title: 'I accept refund'}]} input_name={'state'} placeholder={'Select your state'} />
                            <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                        </View>

                        <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                            <Text style={{width: '100%', color: '#000'}}>Refund timeline</Text>
                            <DropdownExample update_data={update_data} data={[{title: '1 day'}, {title: '2 days'}, {title: '3 days'}, {title: '4 days'}, {title: '5 days'}, {title: '6 days'}, {title: '1 week'}, {title: '2 weeks'}, {title: '3 weeks'}, {title: '1 month'}]} input_name={'state'} placeholder={'Select your state'} />
                            <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                        </View> 
                        
                        <View style={{ height: 'auto', display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                            <Text style={{ width: '100%', color: '#000' }}>Refund conditions & terms</Text>
                        
                            {/* <RichToolbar
                                editor={richText}
                                actions={[actions.insertLink, actions.redo, actions.undo, actions.setBold, actions.setItalic, actions.keyboard, actions.setUnderline, actions.insertBulletsList, actions.insertOrderedList]}
                                iconTint="#000"
                            />  */}
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                            {/* <RichEditor
                                    ref={richText}
                                    placeholder="Start writing here..."
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#E9ECEF',
                                        height: 250, // Container height
                                        padding: 5,
                                    }}
                                    editorStyle={{
                                        height: 250, // Content height inside the editor
                                        backgroundColor: '#FFF', // For editor content background
                                        contentCSSText: 'background-color: #FFF; height: 250px;', // Force inner HTML background and height
                                    }}
                                /> */}
                            </KeyboardAvoidingView>
                            <Text style={{ color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red' }}>{stateErr}</Text>
                            
                        </View> 
                        <TouchableOpacity onPress={e=> toggleModal()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 5, height: 45, width: '100%', backgroundColor: '#FF4500'}}>
                            <Text style={{color: '#FFF'}}>Set up</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </BottomModal> 

                <ScrollView>
                    
                    <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                        <Text style={{width: '100%', color: '#000'}}>Refund terms</Text>
                        <Text style={{height: 50, color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF'}}>I do not accept refund</Text>
                    </View>

                    <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                        <Text style={{width: '100%', color: '#000'}}>Refund timeline</Text>
                        <Text style={{height: 50, color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF'}}>I accept refund</Text>
                    </View> 
                    
                    <View style={{ height: 'auto', display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                        <Text style={{ width: '100%', color: '#000' }}>Refund conditions & terms</Text>
                        <Text style={{height: 150, fontSize: 16, lineHeight: 20, padding: 10, color: '#000', borderRadius: 5, width: '100%',  backgroundColor: '#E9ECEF'}}>
                            In this case, you're setting the height on both the style and editorStyle props, but React Native’s RichEditor might be rendering its content inside a WebView, which can sometimes behave differently with styles. Here's how you can approach the issue.
                        </Text>
                    </View> 
                </ScrollView>
                
                <TouchableOpacity onPress={e=> toggleModal()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 5, height: 45, width: '100%', backgroundColor: '#FF4500'}}>
                    <Text style={{color: '#FFF'}}>Update</Text>
                </TouchableOpacity>
            </View>
        </>
     );
}
    
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    cnt: {
        width: '100%',
        padding: 15,
        // position: 'absolute', 
        backgroundColor: '#fff',
        height: '100%'
            

    },
    editor: {
        height: 300,
        padding: 5,
        // 
        borderRadius: 5,
        // marginBottom: 2,
        overflow: 'scroll',
        width: '100%',
        backgroundColor: '#E9ECEF',
        fontSize: 16,
    },
    divider: {
        height: 50,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        elevation: 2, 
        borderColor: '#f9f9f9', 
        borderStyle: 'solid',
        borderWidth: 1, 
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    inputCnt: {  
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
            paddingLeft: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        paddingRight: 8,
        

    },


    label: {
        fontFamily: 'Roboto',
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '800'
    }
});
export default Refund;