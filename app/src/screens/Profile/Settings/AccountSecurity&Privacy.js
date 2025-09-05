import React, {
    useState
} from 'react'
import {
    ScrollView,
    StyleSheet,
    Linking,
    Dimensions,
    Switch,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Alert,
    DevSettings
} from 'react-native'
import DailPadSvg from '../../../../assets/dialpad-svgrepo-com.svg'
import PwdSvg from '../../../../assets/password-svgrepo-com (1).svg'
import EmailSvg from '../../../../assets/email-svgrepo-com (2).svg'
import PhoneSvg from '../../../../assets/phone-svgrepo-com (4).svg'
import LogoutSvg from '../../../../assets/logout-svgrepo-com (1).svg'
import SyncSvg from '../../../../assets/add-contact-svgrepo-com.svg'
import InfoSvg from '../../../../assets/info-circle-svgrepo-com.svg'
import AngleSvg from '../../../../assets/angle-right-svgrepo-com.svg'
import LinkSvg from '../../../../assets/link-square-svgrepo-com (1).svg'
import CloseSvg from '../../../../assets/close-circle-svgrepo-com.svg'
import DialPadSvg from '../../../../assets/dialpad-svgrepo-com.svg'
import BioSvg from '../../../../assets/fingerprint-svgrepo-com.svg'
import RNRestart from 'react-native-restart';
import {
    useSelector
} from 'react-redux'
import BottomModal from '../../../utils/BtmModal'
import { binData, storeData } from '../../../utils/AppStorage'
// import BottomModal from '../../../../utils/BtmModal'
// import BottomModal from '../../../utils/BtmModal'
// import BottomModal from '../utils/BtmModal'

// import InAppBrowser from 'react-native-inappbrowser-reborn';
export default function AccountSecurity({navigation}) {

        const openInAppBrowser = async () => {
            const url = 'https://www.example.com';
        
        
        };
        

        // State to track switch state (on/off)
    const [isEnabled, setIsEnabled] = useState(false);

    // Toggle the switch
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    let [overlay, setOverlay] = useState(false);
    
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    let openModal = (a) => {
        setOverlay(true)

    }

    let closeModal = e => {
        
        setOverlay(false)

    }
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    let {
        user
    } = useSelector(s=>s.user);
    return (
        <>
            <BottomModal visible={modalVisible} onClose={toggleModal}>
                <ScrollView style={{
                    width: '100%',
                    height: 170,
                    backgroundColor: '#fff',
                    position: 'relative',
                    }}>
                        
                    <View style={{padding: 5, width: '100%'}}>

                        <TouchableOpacity onPress={e => navigation.navigate('user-settings-1-pin')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 5, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                    <DialPadSvg width={25} height={25} />
                                </View>

                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Change transfer pin</Text>
                                
                            </View>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                                <AngleSvg width={35} height={35} />
                            </View>
                    
                        </TouchableOpacity>

                        <TouchableOpacity onPress={e => navigation.navigate('user-settings-1-biometrics')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                    <BioSvg width={25} height={25} />
                                </View>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Setup biometrics</Text>
                                
                            </View>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                                <AngleSvg width={35} height={35} />
                            </View>
                        
                        </TouchableOpacity>
                    </View>



                </ScrollView>
            </BottomModal> 
           
            <View style={styles.cnt}>

                {/* <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Account Security & Privacy</Text> */}
    
                <ScrollView >
                    <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25, color: '#000'}]}>Security</Text>

                    {/* <TouchableOpacity onPress={e => toggleModal()} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <DailPadSvg width={25} height={25} />
                            </View>
                            
                            <View style={{width: '100%'}}>
                                <Text style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000' }}>App security</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Require biometric for login, transactions and after 24 hours of inactivity
                                </Text>
                            </View>
                            
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity> */}
                        
                        

                    <TouchableOpacity onPress={e => navigation.navigate('user-email-update')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <EmailSvg width={25} height={25} />
                            </View>
                            <View style={{width: '100%'}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Change email</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>{user?.email}</Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-phone-update')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <PhoneSvg width={25} height={25} />
                            </View>
                            <View style={{width: '100%'}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Change primary phone number</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>+234 {user?.phone}</Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={e => navigation.navigate('user-settings-1-connected-services')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <LinkSvg width={25} height={25} />
                            </View>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Connected services</Text>
                            
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={e => navigation.navigate('user-pwd-update')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <PwdSvg width={25} height={25} />
                            </View>
                            <View style={{width: '100%'}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Change passcode</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>*********</Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity>




                    {/* <TouchableOpacity onPress={e => navigation.navigate('user-settings-1-verification')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <FaSvg width={25} height={25} />
                            </View>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>2 step verification</Text>
                            
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={async(e) => {
                        await binData();
                        RNRestart.Restart();

                    }} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <LogoutSvg width={25} height={25} />
                            </View>
                            
                            <View style={{width: '100%'}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Log out</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Securely log out of your account</Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity>

                    
                    <Text style={[styles.label, {borderBottomColor: '#000', color: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Privacy</Text>

                    <TouchableOpacity onPress={e => navigation.navigate('user-data')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '80%'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <SyncSvg width={25} height={25} />
                            </View>

                            <View style={{width: '100%'}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Sync your contact</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Send and request from contacts on your device who have a Campus Sphere account.</Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <Switch
                                
                                trackColor={{ false: '#767577', true: '#FF4500' }} // Customize colors
                                thumbColor={isEnabled ? '#f19472' : '#f4f3f4'}   // Thumb color
                                ios_backgroundColor="#3e3e3e"                    // iOS background color
                                onValueChange={toggleSwitch}                    // Function to call on toggle
                                value={isEnabled}    
                                
                            />
                        
                        </View>
                        
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={openInAppBrowser} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <InfoSvg width={25} height={25} />
                            </View>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Privacy policy</Text>
                            
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                        
                    </TouchableOpacity> */}

                    
                </ScrollView>

            </View>
        </>
    )
}
    
    
const styles = StyleSheet.create({
    cnt: {
        width: '100%',
        padding: 10,
        // position: 'absolute', 
        backgroundColor: '#fff',
        height: '100%'
            

    },
    overlay: {
            height: 'auto',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'transprent',
            zIndex: 1000,
            backgroundColor: '#fdfdfd',
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },

        modal: {
            height: 60,
            width: '100%',
            padding: 8,
            backgroundColor: '#fff'
        },
        dateInputCnt: {
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
        },
        dateInput: {
        width: '30%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto'
            

        },

        inputCnt: {
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
        paddingLeft: 8,
        paddingRight: 8,
        

        },
        input: {
        width: '100%',
        padding: 15,
        // position: 'absolute', 
        backgroundColor: '#fff',
        height: 50,
        borderColor: '#000',
        borderWidth: .7,
        borderRadius: 7

        },

        label: {
        fontFamily: 'Roboto',
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '800'
        }
});
    
