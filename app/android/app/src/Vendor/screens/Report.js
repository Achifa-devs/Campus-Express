import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { setProfessionTo } from "../Redux/reducers/studio/Profession";
import AngleSvg from '../../assets/angle-right-svgrepo-com.svg'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import Dropdown from "../../reusables/Dropdown";
import { school_choices,data } from "../../reusables/location";
import { TextInput } from "react-native-gesture-handler";
// import { data, school_choices } from "../reusables/location";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import BottomModal from "../../reusables/BtmModal";
import { Table, Row, Rows } from 'react-native-table-component';

const Report = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const [isEnabled, setIsEnabled] = useState(false);
    const [isStatusEnabled, setIsStatusEnabled] = useState(false);
    // let {selected_profession} = useSelector(s => s.selected_profession);
    let dispatch = useDispatch();
    const toggleSwitch1 = () => isEnabled ? setIsEnabled(false) : setIsEnabled(true);
    const toggleSwitch2 = () => isStatusEnabled ? setIsStatusEnabled(false) : setIsStatusEnabled(true);
    const richText = useRef();
    const tableHead = ['S/N', 'Source', 'Amount', 'Balance before', 'Balance after', 'Date'];

    
    return ( 
        <>

            
            <View style={styles.cnt}>
                
                <View>
                            
                    <Table >      
                        <Row style={{ backgroundColor: '#fff', height: 50, borderBottomWidth: 2, paddingLeft: 8, paddingRight: 6, paddingTop: 4, paddingBottom: 4, borderBottomColor: '#efefef' }} data={tableHead} textStyle={{ textAlign: 'center', fontWeight: '500', color: '#000' }} widthArr={[30, 85, 65, 65, 65, 50]} />
                    </Table>
                
                </View> 
                <ScrollView>      
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>        
                        {/* <Rows data={tableData} style={{backgroundColor: '#fff', height: 50}} textStyle={{ textAlign: 'left', paddingLeft: 12, paddingRight: 6, color: '#000' }} widthArr={[70, 145, 145]} /> */}
                    </Table>
                        
                </ScrollView> 
                
            </View>
        </>
     );
}
    
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    cnt: {
        width: '100%',
        padding: 5,
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
export default Report;