import React, { useEffect, useState } from 'react'
import appliances from '../../../media/assets/appliances.png'
import phone from  '../../../media/assets/Artboard_1_copy_2.png'
import laptop from '../../../media/assets/Artboard_1_copy_3.png'
import grocery from '../../../media/assets/Artboard_1_copy_4.png'
import electronics from '../../../media/assets/Artboard_1_copy_7.png'
// import fashion from '../../../media/assets/Artboard_1_copy_13.png'
// import gif from '../../../media/assets/BUY-NOW-PAY-LATER_GIF-2.gif'

import { 
  Dimensions,
  Image,
  StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function FlasAds() {
  let screenWidth = Dimensions.get('window').width;
  let navigation = useNavigation()
  const images = [
  'https://res.cloudinary.com/daqbhghwq/image/upload/v1745880357/ECSF_712X384_jy7nz3.png',
  'https://res.cloudinary.com/daqbhghwq/image/upload/v1745880357/Desktop_Homepage_Slider__712x384_ctaxcb.jpg',
  'https://res.cloudinary.com/daqbhghwq/image/upload/v1745880356/DesktopHomepageSlider_712x384_eergve.jpg'
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
    // marginBottom: 0,
    flexWrap: 'wrap',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    borderRadius: 5
  }
});