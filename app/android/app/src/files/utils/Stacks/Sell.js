import { useDispatch, useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Sell from "../../store/screens/Sell/Sell";
import Notice from "../../store/screens/Sell/Notice";
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
import React from "react";
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import BackSvg from '../../media/assets/back-svgrepo-com (1).svg'
import Create from "../../store/screens/Sell/Create";

const SellStack = createNativeStackNavigator();
export function SellStackScreen() {
    let dispatch = useDispatch()
    let {drawer} = useSelector(s=> s.drawer)
    const [isModalOpen, setModalOpen] = React.useState(false);
  return (
    <SellStack.Navigator>
        <SellStack.Screen  options={{
            header: ({navigation}) =>
            (
              <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 10, paddingRight: 10, elevation: 2}}>
                            
              
                <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                    <Text style={{paddingLeft: 0, fontSize: 20, color: '#000'}}>My shop</Text>
                </View>

                    
                </View>
            ),
        }}  name="user-sell" component={Sell} />
        
       

        <SellStack.Screen  options={{
            header: ({navigation}) =>
            (
               <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', elevation: 2, paddingLeft: 15, paddingRight: 25 }}>
                    <TouchableOpacity style={{
                        height: 55,
                        borderRadius: 15,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: 45,
                    }} onPress={e => navigation.goBack()}> 
                        <Ionicons name={'chevron-back'} size={25} color={'#000'} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Create new ads</Text>
                    </View>
                </View>
            ),
        }}  name="user-new-listing" component={Create} />
        
        {/* <SellStack.Screen  options={{
            header: ({navigation}) =>
            (
               <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', elevation: 2, paddingLeft: 15, paddingRight: 25 }}>
                    <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5 }}>
                        <BackSvg width={22} height={22} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Create new ads</Text>
                    </View>
                </View>
            ),
        }}  name="user-new-lodge" component={LodgeUploadScreen} />

        */}
       {/* <SellStack.Screen  options={{
            header: ({navigation}) =>
            (
               <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', elevation: 2, paddingLeft: 15, paddingRight: 25 }}>
                    <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 5 }}>
                        <BackSvg width={22} height={22} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Create new ads</Text>
                    </View>
                </View>
            ),
        }}  name="user-new-service" component={Service} /> */}
    </SellStack.Navigator>  
  );
}
