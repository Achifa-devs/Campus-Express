import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text  } from 'react-native';
import FavSvg from '../assets/freepik__background__78851.png'
import WhatsappSvg from '../assets/whatsapp-svgrepo-com.svg'
import TwitterSvg from '../assets/twitter-svgrepo-com.svg'
import ChatSvg from '../assets/chat-round-svgrepo-com.svg'
import InstaSvg from '../assets/instagram-1-svgrepo-com.svg'
export default function Support() {
    return (
        <>
            <View style={styles.cnt} >
                {/* <Text style={{fontSize: 21, marginLeft: 10, color: '#000', fontWeight: '600', height: 'auto', backgroundColor: '#fff'}}>Invite your friends to start earning</Text> */}
                <View style={styles.inputCnt}>
                    
                    <Image source={FavSvg} style={{height: 160, width: '50%'}} />

                    <Text style={{textAlign: 'center', width: '100%', color: '#000', fontWeight: '600'}}>How can we help you</Text>
                    <Text style={{textAlign: 'center', width: '100%', color: '#000', fontWeight: '300'}}>At Paypenz we are committed to providing the best possible experience. If you have any questions, concerns or issues, we&apos;re here to help.</Text>

                </View>

                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>

                    <TouchableOpacity onPress={() => setOpen(true)} style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}>
                        <ChatSvg height={40} width={40} />
                        <Text>Live chat</Text>
                        <Text></Text> 
                    </TouchableOpacity>

                   <TouchableOpacity onPress={() => setOpen(true)} style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}>
                        <InstaSvg height={40} width={40} />                       
                        <Text>Instagram</Text>
                        <Text></Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setOpen(true)} style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}>
                        <TwitterSvg height={40} width={40} />                    
                        <Text>Twitter</Text>
                        <Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setOpen(true)} style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}>
                        <WhatsappSvg height={40} width={40} />                      
                        <Text>Whatsapp</Text>
                        <Text></Text>
                    </TouchableOpacity>

                    
                </View>

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
            height: '40%',
            paddingLeft: 8,
            paddingRight: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            
    
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
      