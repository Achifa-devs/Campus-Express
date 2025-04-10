import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';
import { useDispatch, useSelector } from 'react-redux';
import { set_drawer } from '../../../../redux/drawer';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.

export default function Aside() {

    let navigation = useNavigation()

    let {drawer} = useSelector(s=> s.drawer)
    let dispatch = useDispatch()
      
    let [left, set_left] = useState(0)
    toggleOpen = () => {
        dispatch(set_drawer(!drawer))
    };
    
    function toggleClose() {
        dispatch(set_drawer(!drawer))
    }

    useEffect(() => {
        drawer ?
        set_left('-1000%')
        :set_left(0)
    }, [drawer])
    
    return (
        <>
            <TouchableOpacity onPress={e => {
                toggleClose()
            }} activeOpacity={1} style={{
                position: 'absolute',
                top: 0,
                left: left,
                width: '100%',
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                justifyContent: 'flex-start', 
                alignItems: 'flex-start',
                zIndex: 10
            }}>
                <View style={{
                    height: '100%',
                    width: '70%',
                    backgroundColor: '#FFF',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <View>
                        <View style={{padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',}}>
                            <TouchableOpacity onPress={e=> navigation.navigate('user-shopile')}>
                                <View style={{borderStyle: 'solid', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderColor: '#fff', marginLeft: -7, marginBottom: 6, backgroundColor: '#efefef', borderWidth: 2, height: 65, width: 65, padding: 5}}>
                                    <Ionicons  name={'storefront'} size={30} color={'#FF4500'} /> 
                                </View>
                                <View style={{marginLeft: -5}}> 
                                    <Text>@shop_name</Text>
                                </View> 
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={{fontWeight: 'bold', fontSize: 20, borderColor: '#000', color: '#000', borderRadius: 50, borderStyle: 'solid', borderWidth: 2, height: 28, width: 28, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Ionicons  name={'ellipsis-horizontal'} size={18} color={'#000'} />
                                
                            </TouchableOpacity> */}
                        </View>
                        <ScrollView style={{padding: 20}}>
                            
                            {/* <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <View>
                                    <Ionicons  name={'star-outline'} size={24} color={'#000'} />
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8}}>Reviews</Text>
                            </TouchableOpacity> */}
                           
                            <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <View>
                                    <Ionicons  name={'gift-outline'} size={24} color={'#000'} />
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8}}>Reward</Text>
                            </TouchableOpacity>
                             <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                <View>
                                    <Ionicons  name={'document-text-outline'} size={24} color={'#000'} />
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8}}>Reports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }} onPress={e=> navigation.navigate('user-settings-2-payments')}>
                                <View>
                                    <Ionicons  name={'wallet-outline'} size={24} color={'#000'} />
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8}}>Payment</Text>
                            </TouchableOpacity>
                            
                            
                            
                            
                            <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }} onPress={e=> navigation.navigate('user-settings-2')}>
                                <View>
                                    <Ionicons  name={'cog-outline'} size={27} color={'#000'} />
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8, marginBottom: 3.5}}>Preference</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }} onPress={e=> navigation.navigate('user-settings-2')}>
                                <View>
                                    <Ionicons  name={'shield-checkmark-outline'} size={25} color={'#000'} />
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8, marginBottom: 3.5}}>Security & privacy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }} onPress={e=> navigation.navigate('user-settings-2')}>
                                <View>
                                    <Ionicons  name={'card-outline'} size={25} color={'#000'} />
                                </View>
                                <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8, marginBottom: 3.5}}>Subscriptions & billing</Text>
                            </TouchableOpacity>
                        
                            {/* <View style={{margin: 10}}> 
                                <Text style={{fontWeight: '500', fontSize: 20, color: '#000'}}>Settings</Text>
                            </View> */}
                        </ScrollView>
                    </View>

                    <View style={{ padding: 20 }}>
                        
                        
                        
                        <TouchableOpacity style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View>
                                <Ionicons  name={'log-out'} size={24} color={'#FF4500'} />
                            </View>
                            <Text style={{fontWeight: '500', fontSize: 14, color: '#FF4500', marginLeft: 8}}>Logout</Text>
                        </TouchableOpacity>

                        <View style={{ marginBottom: 35, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            
                            <Text style={{fontWeight: '500', fontSize: 14, color: '#000', marginLeft: 8}}>Version 1.0.0 (Beta)</Text>
                        </View>


                        
                    </View>
                </View>
            </TouchableOpacity>
        </>
    ) 
}
