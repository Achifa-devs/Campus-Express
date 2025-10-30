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
import ProofOfDeliveryUpload from "../components/Deals/Evidence";
import Satisfaction from "../screen/Satisfaction";
import Shipping from "../screen/Shipping";
import Payment from "../screen/Payment";
import Receipt from "../screen/Receipt";
// import ChatList from "../screen/ChatList";
// import ChatRoom from "../screen/ChatRoom";

const DealStack = createNativeStackNavigator();
export function DealStackScreen() {
  const dispatch = useDispatch()

    const { user } = useSelector(s => s.user);
    const { deal } = useSelector(s => s.deal);
    const navigation = useNavigation();
    const route = useRoute()

    return (
        <DealStack.Navigator>

            <DealStack.Screen
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
                                Deals
                            </Text>
                        </View>
                    ),
                }}
                
                name="deals" component={Deals}
            />

            <DealStack.Screen
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
                                Deal
                            </Text>


                            <TouchableOpacity onPress={e => {
                                navigation.navigate('Chat', {
                                    from: 'product', 
                                    room: { ...deal },
                                    id: Tools.generateId(0)
                                });
                            }}>
                                <Ionicons name={'chatbubbles-outline'} color={'#FF4500'} size={25} />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
                
                name="deal_buyer" component={DealForBuyer}
            />

            <DealStack.Screen
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
                                Deal
                            </Text>

                            <TouchableOpacity onPress={e => {
                                navigation.navigate('Chat', {
                                    from: 'product', 
                                    room: { ...deal },
                                    id: Tools.generateId(0)
                                });
                            }}>
                                <Ionicons name={'chatbubbles-outline'} color={'#FF4500'} size={25} />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
                
                name="deal_vendor" component={DealForVendor}
            />

            <DealStack.Screen
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
                                Proof of Delivery
                            </Text>

                        </View>
                    ),
                }}
                
                name="deal_proof" component={ProofOfDeliveryUpload}
            />

            <DealStack.Screen
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
                                Delivery Confirmation
                            </Text>

                        </View>
                    ),
                }}
                
                name="deal_satisfaction" component={Satisfaction}
            />

            <DealStack.Screen
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
                                Delivery Configuration
                            </Text>

                        </View>
                    ),
                }}
                
                name="deal_shipping" component={Shipping}
            />

            <DealStack.Screen
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
                                Delivery Receipt
                            </Text>

                        </View>
                    ),
                }}
                
                name="deal_receipt" component={Receipt}
            />



          


        </DealStack.Navigator>  
    ); 
}
