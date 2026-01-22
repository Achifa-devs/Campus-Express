import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View 
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import Profile from "../screen/Profile";
import { set_mode } from "../../redux/info/mode";
import Deals from "../screen/Deals";
import DealForBuyer from "../screen/DealForBuyer";
import DealForVendor from "../screen/DealForVendor";
import Tools from "../utils/generalHandler";
import ProofOfDeliveryUpload from "../screen/Evidence";
import Satisfaction from "../screen/Satisfaction";
import Shipping from "../screen/Shipping";
import Payment from "../screen/Payment";
import Receipt from "../screen/Receipt";
import ReleaseFunds from "../screen/ReleaseFund";
import Refunds from "../screen/Refunds";
// import ChatList from "../screen/ChatList";
// import ChatRoom from "../screen/ChatRoom";

const RefundStack = createNativeStackNavigator();
export function RefundStackScreen() {
  const dispatch = useDispatch()

    const { user } = useSelector(s => s.user);
    const { deal } = useSelector(s => s.deal);
    const navigation = useNavigation();
    const route = useRoute()

    return (
        <RefundStack.Navigator>

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Refunds
                            </Text>
                        </View>
                    ),
                }}
                
                name="refunds" component={Refunds}
            />

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Refund
                            </Text>


                            <TouchableOpacity onPress={e => {
                                navigation.navigate('Chat', {
                                    from: 'product', 
                                    room: { ...deal },
                                    id: Tools.generateId(0)
                                });
                            }}>
                                <Ionicons name={'chatbubbles-outline'} color={'#FFA500'} size={25} />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
                
                name="refund_buyer" component={DealForBuyer}
            />

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Refund
                            </Text>

                            <TouchableOpacity onPress={e => {
                                navigation.navigate('Chat', {
                                    from: 'product', 
                                    room: { ...deal },
                                    id: Tools.generateId(0)
                                });
                            }}>
                                <Ionicons name={'chatbubbles-outline'} color={'#FFA500'} size={25} />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
                
                name="refund_vendor" component={DealForVendor}
            />

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Proof of Refund
                            </Text>

                        </View>
                    ),
                }}
                
                name="refund_proof" component={ProofOfDeliveryUpload}
            />

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Refund Confirmation
                            </Text>

                        </View>
                    ),
                }}
                
                name="refund_satisfaction" component={Satisfaction}
            />

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Refund Configuration
                            </Text>

                        </View>
                    ),
                }}
                
                name="refund_shipping" component={Shipping}
            />

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Refund Receipt
                            </Text>

                        </View>
                    ),
                }}
                
                name="refund_receipt" component={Receipt}
            />

            <RefundStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View style={{
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#FFF',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F0F0F0',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 3.84,
                            elevation: 2,
                            ...Platform.select({
                                ios: {
                                    paddingTop: 10,
                                },
                            })
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold', 
                                color: '#111',
                            }}>
                                Release Funds
                            </Text>

                        </View>
                    ),
                }}
                
                name="release_funds" component={ReleaseFunds}
            />


        </RefundStack.Navigator>  
    ); 
}
