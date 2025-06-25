import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
    Dimensions,
    Image,
   
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View 
} from 'react-native';
import Listing from "../../store/screens/Inventory/Listing";
const InventoryStack = createNativeStackNavigator();
export function InventoryStackScreen() {
  return (
    <InventoryStack.Navigator>

        <InventoryStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 10, paddingRight: 10, elevation: 2}}>
              

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#000'}}>Inventory</Text>
                    </View>

                    {/* <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FF4500', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#fff', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> */}

                </View>
            ),
        }}   name="user-inventory" component={Listing} />

    </InventoryStack.Navigator>
  ); 
}