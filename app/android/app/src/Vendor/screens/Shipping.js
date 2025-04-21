import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { setProfessionTo } from "../Redux/reducers/studio/Profession";
import AngleSvg from '../../media/assets/angle-right-svgrepo-com.svg'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Dropdown from "../utils/Dropdown";
import { school_choices,data } from "../utils/location";
import { TextInput } from "react-native-gesture-handler";
// import { data, school_choices } from "../reusables/location";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import BottomModal from "../utils/BtmModal";
import { Table, Row, Rows } from 'react-native-table-component';

const Shipping = ({ navigation }) => {
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
    let [shipping_range, set_shipping_range] = useState({
        in_campus: {selected: true, price: 0},
        in_state: {selected: false, price: 0},
        out_state: {selected: false, price: 0}
    })
    const tableHead = ['Selected', 'Shipping range', 'Price'];
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        let books = [
            ['Yes', 'In Unizik, Awka campus', 'NGN 10,000'],
            ['No', 'In and outside Unizik, Awka campus', 'NGN 0'],
            ['Yes', 'Outside Anambra state', 'NGN 40,000']
        ]
        books.map(item => setTableData(res => [...res, item])) 
    }, []) 
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
                            <Text style={{width: '100%', color: '#000'}}>Shipping timeline</Text>
                            <Dropdown update_data={update_data} data={[
                                { title: '1 day' },
                                { title: '2 days' },
                                { title: '3 days' },
                                { title: '4 days' },
                                { title: '5 days' },
                                { title: '6 days' },
                                { title: '1 week' },
                                { title: '2 weeks' },
                                { title: '3 weeks' },
                                { title: '1 months' }
                            ]} input_name={'shipping-timeline'} placeholder={'Select shipping timeline'} />
                            <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                        </View>

                        <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                            <Text style={{width: '100%', color: '#000'}}>Do you ship in Unizik, Awka campus</Text>
                            <Dropdown update_data={update_data} data={[{title: 'Yes'}]} input_name={'state'} placeholder={'Yes / No'} />
                            <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                        </View> 

                        <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                            <Text style={{width: '100%', color: '#000'}}>Do you ship in and outside Unizik, Awka campus</Text>
                            <Dropdown update_data={update_data} data={[{title: 'Yes'}, {title: 'No'}]} input_name={'state'} placeholder={'Yes / No'} />
                            <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                        </View> 

                        <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                            <Text style={{width: '100%', color: '#000'}}>Do you ship outside Anambra state</Text>
                            <Dropdown update_data={update_data} data={[{title: 'Yes'}, {title: 'No'}]} input_name={'state'} placeholder={'Yes / No'} />
                            <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                        </View> 
                        
                       
                        <TouchableOpacity onPress={e=> toggleModal()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 5, height: 45, width: '100%', backgroundColor: '#FF4500'}}>
                            <Text style={{color: '#FFF'}}>Set up</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </BottomModal> 

                <ScrollView>
                    
                    <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                        <Text style={{width: '100%', color: '#000'}}>Shipping timeline</Text>
                        <Text style={{height: 50, color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF'}}>2 days</Text>
                    </View>

                    <View style={{ height: 'auto', display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                        <Text style={{width: '100%', color: '#000'}}>Shipping range</Text>
                        {/* <View>
                            {
                                shipping_range.in_campus.selected 
                                ?
                                <View style={{height: 50, color: '#000', padding: 0,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>Ships in Unizik, Awka campus</Text>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>NGN 10,000</Text>
                                </View>

                                :
                                ''
 
                            }
                            {
                                shipping_range.in_state.selected 
                                ?
                                <View style={{height: 'auto', color: '#000', padding: 0,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>Ships in and outside Unizik, Awka campus</Text>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>NGN 10,000</Text>
                                </View>

                                :
                                <View style={{height: 'auto', color: '#000', padding: 0,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>Does not ships in and outside Unizik, Awka campus</Text>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>NGN 10,000</Text>
                                </View>
                            }
                            {
                                shipping_range.out_state.selected 
                                ?
                                <View style={{height: 'auto', color: '#000', padding: 0,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>Ships outside Anambra state</Text>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>NGN 10,000</Text>
                                </View>

                                :
                                <View style={{height: 'auto', color: '#000', padding: 0,  borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#E9ECEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>Does not ships outside Anambra state</Text>
                                    <Text style={{height: 'auto', color: '#000', padding: 10,  borderRadius: 5, marginBottom: 2, width: '70%',  backgroundColor: '#E9ECEF'}}>NGN 10,000</Text>
                                </View>
                            }
                        </View> */}
                        <View>
                            
                            <Table >      
                                <Row style={{ backgroundColor: '#fff', height: 40, borderBottomWidth: 2, paddingLeft: 8, paddingRight: 6, paddingTop: 4, paddingBottom: 4, borderBottomColor: '#efefef' }} data={tableHead} textStyle={{ textAlign: 'left', fontWeight: '500', color: '#000' }} widthArr={[70, 145, 145]} />
                            </Table>
                        
                        </View> 
                        <ScrollView>      
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>        
                                <Rows data={tableData} style={{backgroundColor: '#fff', height: 50}} textStyle={{ textAlign: 'left', paddingLeft: 12, paddingRight: 6, color: '#000' }} widthArr={[70, 145, 145]} />
                            </Table>
                             
                        </ScrollView> 
                    </View> 
                    
                </ScrollView>
                
                <TouchableOpacity onPress={e=> toggleModal()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 5, height: 45, width: '100%', backgroundColor: '#FF4500'}}>
                    <Text style={{color: '#FFF'}}>Edit</Text>
                </TouchableOpacity>
            </View>
        </>
     );
}
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
export default Shipping;