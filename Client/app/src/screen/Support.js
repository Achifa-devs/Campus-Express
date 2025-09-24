import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Support() {
    // Replace these URLs with your actual social media links
    const socialLinks = {
        whatsapp: 'https://whatsapp.com/channel/0029Vb5WQNQ6xCSTfXow583w',
        twitter: 'https://x.com/CampusSphere?t=sldj96XcP5CLDUMwUOpY2g&s=09',
        instagram: 'https://www.instagram.com/campusspheree?igsh=MTdxaXRyYnppNWwxaw==',
        liveChat: 'https://www.facebook.com/share/16mAKy5P7T/'
    };
    
    const handlePress = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <>
            <View style={styles.cnt}>
                <View style={styles.inputCnt}>
                    <Image 
                        source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} 
                        style={{ height: 160, width: '60%' }} 
                    />

                    <Text style={{ textAlign: 'center', width: '100%', color: '#000', fontWeight: '600' }}>
                        How can we help you
                    </Text>
                    <Text style={{ textAlign: 'center', width: '100%', color: '#000', fontWeight: '300' }}>
                        At Campus Sphere, We are committed to providing the best possible experience. 
                        If you have any questions, concerns or issues, we&apos;re here to help.
                    </Text>
                </View>

                <View style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    flexWrap: 'wrap' 
                }}>
                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.liveChat)} 
                        style={styles.socialCard}
                    >
                        <Icon name="logo-facebook" size={40} color="#1877F2" />
                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.instagram)} 
                        style={styles.socialCard}
                    >
                        <Icon name="logo-instagram" size={40} color="#C13584" />                     
                        <Text>Instagram</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.twitter)} 
                        style={styles.socialCard}
                    >
                        <Icon name="logo-twitter" size={40} color="#1DA1F2" />                    
                        <Text>Twitter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => handlePress(socialLinks.whatsapp)} 
                        style={styles.socialCard}
                    >
                        <Icon name="logo-whatsapp" size={40} color="#25D366" />                      
                        <Text>Whatsapp</Text>
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
    socialCard: {
        height: 180, 
        marginBottom: 15, 
        width: '48%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f9f9f9', 
        borderRadius: 8
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 12,
        marginLeft: 5,
        fontWeight: '800'
    }
});
