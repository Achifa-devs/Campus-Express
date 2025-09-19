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
import History from "../screen/History";
import Wishlist from "../screen/Favourite";
import User from "../screen/User";
import UserModification from "../screen/UserModification";
import Invite from "../screen/Invite";
import AccountSecurity from "../screen/Account";
import Subscription from "../screen/Subscription";
import ChangeEmail from "../screen/ChangeEmail";
import ChangePhone from "../screen/ChangePhone";
import ChangePwd from "../screen/ChangePwd";
import TermsOfServiceScreen from "../screen/TermsOfUse";
import PrivacyPolicyScreen from "../screen/PrivacyPolicy";
import ForumScreen from "../screen/Forum";
import Support from "../screen/Support";
const ProfileStack = createNativeStackNavigator();
export function ProfileStackScreen() {
  const dispatch = useDispatch()

    const { user } = useSelector(s => s.user);
    const { nested_nav } = useSelector(s => s.nested_nav);
    const navigation = useNavigation();

    return (
        <ProfileStack.Navigator>

            <ProfileStack.Screen
                options={{
                    header: ({ navigation }) => (
                        <View
                            style={{
                            width: '100%',
                            height: 100,
                            backgroundColor: '#FF4500',
                            paddingHorizontal: 15,
                            paddingTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            }}
                        >
                            
                            {/* Left: User Avatar */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {
                                    user?.photo
                                    ?
                                    <Image
                                        source={{ uri: user.photo }}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 50,
                                            marginBottom: 16,
                                            borderWidth: 3,
                                            borderColor: '#FF4500',
                                        }}
                                        onError={() => console.log('Error loading image')}
                                    />
                                    :
                                    <View style={{height: 60, width: 60}}>
                                        <Ionicons name={"person-circle"} size={60} color={"#fff"} />
                                    </View> 
                                }
                                <View>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                        {user && user?.fname}{user && '.'}{user && user?.lname[0]}
                                    
                                    </Text>
                                
                                </View>
                            </View>

                            {!user && 
                                <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 15, borderRadius: 4, paddingVertical: 7, paddingHorizontal: 15}} onPress={e => {
                                    dispatch(set_mode('auth'))
                                }}>
                                    <Text style={{
                                        color: '#FF4500',
                                        paddingRight: 8
                                    }}>Login</Text>
                                    <Ionicons name={"enter-outline"} size={18} color={"#FF4500"} />

                                </TouchableOpacity>
                            }

                        </View>
                    ),
                }}
                name="profile" component={Profile}
            />

            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>History</Text>
                        </View>
                    </View>
                ),
                
            }}   name="history" component={History} />


            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Favourite</Text>
                        </View>
                    </View>
                ),
                
            }} name="favourite" component={Wishlist} />

            <ProfileStack.Screen  options={{
                header: ({navigation}) =>
                (
                    <View style={{ height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%', backgroundColor: '#FFF', alignItems: 'center', paddingLeft: 15, paddingRight: 25}}>
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
                        <View style={{backgroundColor: '#fff', height: '100%', width: 'auto', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>My Campus Identity</Text>
                        </View>
                    </View>
                ),
                
            }} name="user" component={User} />

            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Edit Your Campus Identity</Text>
                        </View>
                    </View>
                ),
                
            }}   name="edit-profile" component={UserModification} />

            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Invite your friends</Text>
                        </View>
                    </View>
                ),
                
            }}   name="invite" component={Invite} />

            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Account setting</Text>
                        </View>
                    </View>
                ),
                
            }}   name="account" component={AccountSecurity} />

            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Subscription</Text>
                        </View>
                    </View>
                ),
                
            }} name="subscription" component={Subscription} />
    
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Change email</Text>
                        </View>
                    </View>
                ),
                
            }}   name="email-update" component={ChangeEmail} />
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Change phone</Text>
                        </View>
                    </View>
                ),
                
            }}   name="phone-update" component={ChangePhone} />
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Change password</Text>
                        </View>
                    </View>
                ),
                
            }}   name="pwd-update" component={ChangePwd} />


            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Terms of service</Text>
                        </View>
                    </View>
                ),
                
            }}   name="terms" component={TermsOfServiceScreen} />
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Privacy policy</Text>
                        </View>
                    </View>
                ),
                
            }}   name="privacy" component={PrivacyPolicyScreen} />
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Campus forum</Text>
                        </View>
                    </View>
                ),
                
            }}   name="support" component={Support} />
            

            {/*
            

            

            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Campus forum</Text>
                        </View>
                    </View>
                ),
                
            }}   name="forum" component={ForumScreen} />
 
            
            <ProfileStack.Screen options={{
                header: ({ navigation }) =>
                (

                    <>
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
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>New topic</Text>
                    </View>
                </View>
                    </>
                ),
            }}   name="thread" component={CreateTopicScreen} />
            
            <ProfileStack.Screen options={{
                header: ({ navigation }) =>
                (

                    <>
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
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Balance sheet</Text>
                    </View>
                </View>
                    </>
                ),
            }}   name="topic-replies" component={TopicDetailScreen} />

            <ProfileStack.Screen options={{
                header: ({ navigation }) =>
                (

                    <>
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
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Balance sheet</Text>
                    </View>
                </View>
                    </>
                ),
            }}   name="report" component={Report} />
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Logout</Text>
                        </View>
                    </View>
                ),
                
            }}   name="logout" component={Logout} />
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}></Text>
                        </View>
                    </View>
                ),
                
            }}   name="security" component={Security} />
            
            
            
            <ProfileStack.Screen  options={{
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
                            <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Blogs</Text>
                        </View>
                    </View>
                ),
                
            }}   name="blog" component={Blog} />

            
            
 */}
        </ProfileStack.Navigator>  
    ); 
}
