import ChatScreen from "../../store/screens/Chat";
import Message from "../../store/screens/Message";
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
const MessageStack = createNativeStackNavigator();
export function MessageStackScreen() {
  return (
    <MessageStack.Navigator>
        <MessageStack.Screen  options={{
            header: ({navigation}) =>
            (
                <View style={{ height: 65, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#FF4500', alignItems: 'center', paddingLeft: 10, paddingRight: 10, marginBottom: 1.5}}>

                    <View style={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '40%', backgroundColor: '#FF4500', alignItems: 'center'}}>
                        <Text style={{paddingLeft: 0, fontSize: 20, color: '#fff'}}>Messages</Text>
                    </View>

                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 'auto', backgroundColor: '#FFF', alignItems: 'center', padding: '10px'}}>
                        
                    </View>

                </View>
            ),
        }}   name="user-message" component={Message} />

        <MessageStack.Screen options={{
         header: () =>
          (
            <View style={{ height: 70, display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
          

              {
              
              <View style={{display: 'flex', flexDirection: 'row', zIndex: 1000, height: '100%', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingTop: 25, justifyContent: 'center', position: 'relative'}}>
                <View style={{
                position: 'absolute',
                left: 15,
                fontSize: 20,
                bottom: 8,
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'serif',

                }}>
                  <Text style={{fontSize: 21, height: 50, paddingTop: 10, backgroundColor: '#fff4e0', width: 50, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', textAlign: 'center', borderRadius: 50}}>
                      {/* {seller_name.split(' ')[0].split('')[0]}.{seller_name.split(' ')[1].split('')[0]} */}
                      A.C
                  </Text>
                </View>

                <View style={{
                position: 'absolute',
                left: 85,
                fontSize: 20,
                bottom: 12,
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'serif',

                }}>
                <Text style={{
                fontFamily: 'serif',
                fontSize: 19,
                color: '#fff',
                fontWeight: 'bold',

                }}>
                    {/* {seller_name} */}
                    Akpulu Chinedu
                </Text>

                <Text style={{
                fontFamily: 'serif',
                fontSize: 11,
                color: '#fff',
                fontWeight: 'bold',

                }}>
                active 
                {/* {js_ago(new Date(seller_date))} */}
                </Text>
                </View> 

                <View style={{
                position: 'absolute',
                right: 25,
                fontSize: 20,
                bottom: 12,
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'serif',

                }}>

                
                
                </View> 

              </View>

              
              }
            </View>
          ),
      }} name="user-chat-room" component={ChatScreen} />
    </MessageStack.Navigator>
  ); 
}
