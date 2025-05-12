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
              <View style={{ height: 55, display: 'none', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#fff', elevation: 2, alignItems: 'center', padding: '10px' }}>
                  
                     
                    <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}} onPress={() => dispatch(set_drawer(!drawer))}>
                        <View style={{backgroundColor: '#fff', elevation: 0, height: '100%', width: 40, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons  name={'storefront'} size={25} color={'#FF4500'} />
                            
                        </View>
                        <Text>&nbsp;</Text>
                        {/* <Text style={{color: '#000'}}>Hue</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                        <View style={{backgroundColor: '#fff', elevation: 0, height: '100%', width: 40, borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons  name={'notifications'} size={25} color={'#FF4500'} />
                        </View>
                    </View>
                    </TouchableOpacity>


                    
                </View>
            ),
        }}  name="user-sell" component={Sell} />

        <SellStack.Screen  options={{
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
