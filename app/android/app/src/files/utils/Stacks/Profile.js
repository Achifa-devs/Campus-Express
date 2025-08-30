import Preference from "../../store/screens/Drawer/Preference";
import Invite from "../../store/screens/Invite";
import ProfileCnt from "../../store/screens/Profile";
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
import Notification from "../../store/screens/Profile/Settings/Notification";
import AccountSecurity from "../../store/screens/Profile/Settings/AccountSecurity&Privacy";
import History from "../../store/screens/History";
import Favourite from "../../store/screens/Favourite";
import PersonalData from "../../store/screens/PersonalData";
import Security from "../../store/screens/Drawer/Shop/Security";
import ChangeEmail from "../../store/screens/Profile/Settings/AccountSecurity/ChangeEmail";
import ChangePhone from "../../store/screens/Profile/Settings/AccountSecurity/ChangePhone";
import ChangePwd from "../../store/screens/Profile/Settings/AccountSecurity/ChangePwd";
import Logout from "../../store/screens/Profile/Settings/AccountSecurity/Logout";

import Report from "../../store/screens/Drawer/Report";
import Blog from "../../store/screens/Blog";
import TermsOfService from "../../store/screens/TermsOfUse";
import PrivacyPolicy from "../../store/screens/PrivacyPolicy";
import ForumScreen from "../../store/screens/Forum";
import CreateTopicScreen from "../../store/screens/NewTopic";
import TopicDetailScreen from "../../store/screens/Replies";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

import Support from "../../store/screens/Profile/Profiles/Support";
import { setUserAuthTo } from "../../../../../../redux/reducer/auth";
const ProfileStack = createNativeStackNavigator();
export function ProfileStackScreen() {
  const dispatch = useDispatch()

    const {user} = useSelector(s => s.user)
  return (
    <ProfileStack.Navigator>

        <ProfileStack.Screen
            name="user-profile"
            component={ProfileCnt}
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
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1743769930/2024-06-27_dqlq3a.png' }} // Replace with user.profilePic
                            style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            marginRight: 10,
                            borderWidth: 2,
                            borderColor: '#fff',
                            }}
                        />
                        <View>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                {user && user?.fname}{user && '.'}{user && user?.lname[0]}
                            
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('user-shop')}>
                            <Text style={{ color: '#fff', textDecorationLine: 'underline', fontSize: 13 }}>
                                Visit Shop
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                     {!user && 
                        <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', marginRight: 15, borderRadius: 50, paddingVertical: 7, paddingHorizontal: 15}} onPress={e => {
                            dispatch(setUserAuthTo(true))
                        }}>
                            <Text style={{
                                color: '#FF4500',
                                paddingRight: 8
                            }}>Login</Text>
                            <Ionicons name={"enter-outline"} size={18} color={"#FF4500"} />

                        </TouchableOpacity>
                    }

                    {/* Right: Shop Balance */}
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('user-report')}>
                            <Text style={{ color: '#fff', textDecorationLine: 'underline', fontSize: 13 }}>
                                Balance
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                            ₦3,500.00 
                        </Text>
                    </View>
                </View>
                ),
            }}
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
            
        }}   name="user-history" component={History} />
        
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
            
        }} name="user-favourite" component={Favourite} />
          
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
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Tell us about yourself</Text>
                    </View>
                </View>
            ),
            
        }} name="user-data" component={PersonalData} />
          
          

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
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Preference</Text>
                    </View>
                </View>
            ),
            
        }}   name="user-preference" component={Preference} />

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
            
        }}   name="user-invite" component={Invite} />

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
            
        }}   name="user-account" component={AccountSecurity} />
        
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
                        <Text style={{ color: '#000', display: 'flex', fontSize: 20, fontWeight: '500', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Notification setting</Text>
                    </View>
                </View>
            ),
            
        }}   name="user-notification" component={Notification} />
        
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
        }}   name="user-thread" component={CreateTopicScreen} />
          
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
        }}   name="user-topic-replies" component={TopicDetailScreen} />

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
          }}   name="user-report" component={Report} />
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
            
        }}   name="user-logout" component={Logout} />
        
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
            
        }}   name="user-security" component={Security} />
        
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
            
        }}   name="user-email-update" component={ChangeEmail} />
        
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
            
        }}   name="user-phone-update" component={ChangePhone} />
        
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
            
        }}   name="user-pwd-update" component={ChangePwd} />
        
        
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
            
        }}   name="user-blog" component={Blog} />

          
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
            
        }}   name="user-terms" component={TermsOfService} />
        
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
            
        }}   name="user-privacy" component={PrivacyPolicy} />
        
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
            
        }}   name="user-forum" component={ForumScreen} />
        
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
            
        }}   name="user-support" component={Support} />
    </ProfileStack.Navigator>  
  ); 
}
