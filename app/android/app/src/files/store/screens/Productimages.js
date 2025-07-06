import { useRoute } from '@react-navigation/native';
import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';

export default function ProductImages() {
  const route = useRoute();
  const { files = [], index = 0 } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(index);
  const { width, height } = Dimensions.get('window');

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  if (!files || files.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Images not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ width }}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {files.map((image, idx) => (
            <View key={idx} style={[styles.imgContainer, { width }]}>
              <Image
                source={{ uri: image?.secure_url }}
                style={styles.productImage}
                onError={(e) => console.log('Image error:', e.nativeEvent.error)}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.carousel}>
          <Text style={styles.carouselText}>
            {currentIndex + 1}/{files.length}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000', // temporary to see if container is visible
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.8,
    resizeMode: 'contain',
  },
  carousel: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'center',
    width: 60,
  },
  carouselText: {
    color: '#FFF',
  },
});