import React, { useEffect, useState } from 'react'

import { 
  Dimensions,
  Image,
  StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Banner() {
  const images = [
    'https://res.cloudinary.com/daqbhghwq/image/upload/v1746302994/IMG-20250503-WA0031_gsxkbk.jpg',
    'https://res.cloudinary.com/daqbhghwq/image/upload/v1746302994/IMG-20250503-WA0032_vnrmqb.jpg',
    'https://res.cloudinary.com/daqbhghwq/image/upload/v1746302994/IMG-20250503-WA0036_laocvz.jpg'
  ];
   const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // change image every 4 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, []);

  return (  
    <>
      <View style={styles.flashAdsCnt}>
        <Image 
          source={{ uri: images[currentIndex] }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  flashAdsCnt:{
    height: 180,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -1,
    marginBottom: -10,
    flexWrap: 'wrap',
    borderRadius: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: .5,
    paddingRight: .5,
    backgroundColor: '#fff'
  },
  
  adsCard:{
    height: 80,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 0,
    marginLeft: 5, 
    marginRight: 5,
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: .5
  }
});