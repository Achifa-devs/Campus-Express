import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { setProfessionTo } from "../Redux/reducers/studio/Profession";
import AngleSvg from '../../media/assets/angle-right-svgrepo-com.svg'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.


const Preference = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isStatusEnabled, setIsStatusEnabled] = useState(false);
    // let {selected_profession} = useSelector(s => s.selected_profession);
    let dispatch = useDispatch();
    const toggleSwitch1 = () => isEnabled ? setIsEnabled(false) : setIsEnabled(true);
    const toggleSwitch2 = () => isStatusEnabled ? setIsStatusEnabled(false) : setIsStatusEnabled(true);

   
    
    return ( 
        <>

            <ScrollView style={{height: '100%', width: '100%',}}>

                

                {
                    ['Language'].map((item,index) => 
                        <View key={index} style={{height: 60, marginBottom: .5, width: '100%', backgroundColor: '#fff', paddingLeft: 10, paddingRight: 10, display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{fontSize: 15, fontWeight: '400', fontFamily: 'serif', color: '#000', position: 'absolute', left: 10}}>
                                {item}
                            </Text>
                            
                            
                        </View>    
                    )
                }

                    

                <View style={{height: 90, width: '100%', marginBottom: 2.5, backgroundColor: '#fff', paddingLeft: 10, paddingRight: 10, display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, position: 'absolute', fontWeight: 'bold', bottom: 50, fontFamily: 'serif', color: '#000', position: 'absolute', left: 10}}>
                        Online Status
                    </Text>

                    <Text style={{fontSize: 12, position: 'absolute', bottom: 15, fontFamily: 'serif', color: '#000', position: 'absolute', left: 10}}>
                        You will remain online aslong as the app is open
                    </Text>
                    
                    <View style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'serif', color: '#000',  position: 'absolute', right: 10}}>


                        <Switch
                            trackColor={{false: '#efefef', true: '#ffd27f'}}
                            thumbColor={isStatusEnabled ? '#orangered' : 'orangered'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={isStatusEnabled}
                        />


                    </View>
                </View>
                {/* <Text style={[styles.label, {bdisplay: 'flex', alignItems: 'center', justifyContent: 'space-between', orderBottomColor: '#000', backgroundColor: '#fff', borderBottomWidth: .5, paddingBottom: 10, }]}>Others</Text> */}
                <TouchableOpacity onPress={e=> navigation.navigate('user-settings-2-payments')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'wallet-outline'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Payment</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Methods and processing of transactions for your products or services.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity>
               
                
                
               
                 <TouchableOpacity onPress={e => navigation.navigate('user-shop-locale')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'location-outline'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Business location</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Indicates the physical address or place where a business operates. It helps customers find, visit, or contact the business easily.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={e => Alert.alert('Feature is coming soon.')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'color-palette-outline'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Branding & customization</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Ability to personalize colors, logos, and design elements to reflect your unique identity or preferences.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={e => navigation.navigate('user-settings-1-phone')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'headset-outline'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Contact & customer service</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Help customers with inquiries, complaints, or guidance. It's essential for building strong relationships and ensuring a smooth experience.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity>
                 */}
                
                <Text style={[styles.label, {bdisplay: 'flex', alignItems: 'center', justifyContent: 'space-between', orderBottomColor: '#000', backgroundColor: '#fff', borderBottomWidth: .5, paddingBottom: 10, }]}>Others</Text>
                <TouchableOpacity onPress={e => navigation.navigate('user-refund')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'return-up-back'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Refund policy</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Build trust and ensure satisfaction if the product doesn't meet buyer&apos;s expectations.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={e => navigation.navigate('user-settings-1-phone')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff' }}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'lock-closed-outline'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Privacy policy</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>How customer data is collected, used, and protected to ensure transparency and customer trust.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity> */}
                <TouchableOpacity onPress={e => navigation.navigate('user-shipping')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'cube-outline'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Shipping policy</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Delivering products to a customer. It includes logistics, delivery timelines, and tracking of packages.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={e => navigation.navigate('user-settings-1-phone')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginLeft: 5, marginRight: 15, borderRadius: 50, padding: 5}}>
                            <Ionicons name={'reader-outline'} size={18} color={'#000'} />
                        </View>
                        <View style={{width: '100%'}}>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 700, fontSize: 15, color: '#000'}}>Terms & condition</Text>
                            <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Defines the rules, responsibilities, and legal agreements your customers must accept to use your service.</Text>
                        </View>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                        <AngleSvg width={35} height={35} />
                    </View>
                    
                </TouchableOpacity> */}
            </ScrollView>
        </>
     );
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
export default Preference;