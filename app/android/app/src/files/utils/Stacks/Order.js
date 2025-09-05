import Order from "../../store/screens/Order";
import OrderRoom from "../../store/screens/OrderRoom";
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
const OrderStack = createNativeStackNavigator();
export function OrderStackScreen() {
  return (
    <OrderStack.Navigator>

        <OrderStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 65, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FF4500', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Orders</Text>
                    </View>


                </View>
            ),
        }}   name="user-order" component={Order} />

        <OrderStack.Screen options={{
         header: () =>
          (
            <View style={{ height: 55, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FFF', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Order Details</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        <TouchableOpacity style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                            <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-notification')}>
                            <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', padding: 8, alignItems: 'flex-end'}}>
                                <View style={{backgroundColor: '#FF4500', height: '100%', width: 40, borderRadius: 10}}>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
          ),
      }} name="order-room" component={OrderRoom} />

    </OrderStack.Navigator>
  ); 
}