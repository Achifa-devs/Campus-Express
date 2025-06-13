import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text, Linking } from 'react-native';
import FavSvg from '../../../../media/assets/more-four-svgrepo-com.svg'
import WhatsappSvg from '../../../../media/assets/whatsapp-svgrepo-com.svg'
import TwitterSvg from '../../../../media/assets/twitter-svgrepo-com.svg'
import ChatSvg from '../../../../media/assets/chat-round-svgrepo-com.svg'
import InstaSvg from '../../../../media/assets/instagram-1-svgrepo-com.svg'

export default function Support() {
    // Replace these URLs with your actual social media links
    const socialLinks = {
        whatsapp: 'https://wa.me/YOUR_PHONE_NUMBER', // Replace with your WhatsApp number
        twitter: 'https://twitter.com/YOUR_USERNAME', // Replace with your Twitter handle
        instagram: 'https://instagram.com/YOUR_USERNAME', // Replace with your Instagram handle
        liveChat: 'YOUR_LIVE_CHAT_URL' // Replace with your live chat URL
    };

    const handlePress = async (url) => {
        // Check if the link is supported
        const supported = await Linking.canOpenURL(url);
        
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error("Don't know how to open this URL: " + url);
        }
    };

    return (
        <>
            <View style={styles.cnt} >
                <View style={styles.inputCnt}>
                    <Image source={{uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746719499/ESTATE_APP_LOG-removebg-preview_fxtbye.png'}} style={{height: 160, width: '60%'}} />

                    <Text style={{textAlign: 'center', width: '100%', color: '#000', fontWeight: '600'}}>How can we help you</Text>
                    <Text style={{textAlign: 'center', width: '100%', color: '#000', fontWeight: '300'}}>At Estate Online Market, We are committed to providing the best possible experience. If you have any questions, concerns or issues, we&apos;re here to help.</Text>
                </View>

                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>

                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.liveChat)} 
                        style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}
                    >
                        <ChatSvg height={40} width={40} />
                        <Text>Live chat</Text>
                        <Text></Text> 
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.instagram)} 
                        style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}
                    >
                        <InstaSvg height={40} width={40} />                       
                        <Text>Instagram</Text>
                        <Text></Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.twitter)} 
                        style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}
                    >
                        <TwitterSvg height={40} width={40} />                    
                        <Text>Twitter</Text>
                        <Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.whatsapp)} 
                        style={{height: 180, marginBottom: 15, width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 8}}
                    >
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