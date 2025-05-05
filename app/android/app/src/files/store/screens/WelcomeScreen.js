import React from 'react'
import { Dimensions, Image, StatusBar, Text, View } from 'react-native'
import FavSvg from '../../media/icons/20240610_160824_0000 (1).png';

export default function WelcomeScreen() {
  let screenHeight = Dimensions.get('window').height;

  return (
    <>
        <StatusBar backgroundColor={'#FFF'} barStyle={"dark-content"} />
    
        <View style={{
                height: screenHeight,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFF',
                justifyContent: 'center',
            }}>
            
            <View style={{
                height: 120,
                width: 120,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFF',
                justifyContent: 'center',
                padding: 15,
                  borderWidth: 4,
                borderColor: '#FF4500', borderRadius: 100, marginBottom: 20
            }}>
                <Image height={130} width={130} source={{ uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png' }} />
            </View>
            <Text style={{color: '#FF4500', fontWeight: 'bold',fontSize: 20}}>Campus Sphere</Text>
            <Text style={{color: '#000', fontWeight: '500',fontSize: 12, position: 'absolute', bottom: 20}}>Sponsored by U-COMMERCE LIMITED</Text>
              
        </View>
        
    </>
  )
}
