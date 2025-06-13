import {
    useEffect,
    useState
} from "react";
import {
    Dimensions, 
    Image, 
    Modal, 
    ScrollView, 
    StyleSheet, 
    Switch, 
    Text, 
    TouchableOpacity, 
    TouchableOpacityBase, 
    View
} from "react-native";
import {
    useDispatch,
    useSelector
} from "react-redux";
// import {
//     school_choices, data
// } from "../../utils/location";
import { TextInput } from "react-native-gesture-handler";
import DropdownExample from "../../../utils/DropDown";
import { school_choices } from "../../utils/location copy";


const ShopLocation = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const [isEnabled, setIsEnabled] = useState(false);
    const [isStatusEnabled, setIsStatusEnabled] = useState(false);
    // let {selected_profession} = useSelector(s => s.selected_profession);
    let dispatch = useDispatch();
    const toggleSwitch1 = () => isEnabled ? setIsEnabled(false) : setIsEnabled(true);
    const toggleSwitch2 = () => isStatusEnabled ? setIsStatusEnabled(false) : setIsStatusEnabled(true);

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
    
    return ( 
        <>

            <View style={styles.cnt}>

            </View>
            <View style={styles.divider}>

            </View>

            <ScrollView style={styles.inputCnt}>

                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{width: '100%', color: '#000'}}>State</Text>
                    <DropdownExample update_data={update_data} data={data} input_name={'state'} placeholder={'Select your state'} />
                    <Text style={{color: '#000', marginBottom: 15, display: stateErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{stateErr}</Text>
                </View>

                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{width: '100%', color: '#000'}}>Campus</Text>
                    <DropdownExample update_data={update_data} data={campusLocaleList} input_name={'campus'} placeholder={'Select your campus'} />
                    <Text style={{color: '#000', marginBottom: 15, display: campusErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{campusErr}</Text>
                </View>

                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{width: '100%', color: '#000'}}>Junction</Text>
                    <DropdownExample update_data={update_data} data={campusLocaleList} input_name={'streen name'} placeholder={'Select your junction or street name'} />
                    <Text style={{color: '#000', marginBottom: 15, display: campusErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{campusErr}</Text>
                </View>
              
                <View style={{ height: 80, display: 'flex', color: '#000', width: '100%', flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{width: '100%', color: '#000'}}>Lodge name</Text>
                    <TextInput 
 placeholderTextColor={"#333333"} style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}}   placeholder="Lodge name"  />
                    <Text style={{color: '#000', marginBottom: 15, display: campusErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{campusErr}</Text>
                </View>
                
            </ScrollView>
        </>
     );
}
    
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    cnt: {
        width: '100%',
        padding: 10,
        // position: 'absolute', 
        backgroundColor: '#929292',
        height: '35%'
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
        backgroundColor: '#fff',
        height: (screenHeight * 0.35) - 50,
        padding: 18,
    },

    label: {
        fontFamily: 'Roboto',
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '800'
    }
});
export default ShopLocation;