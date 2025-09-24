// GetStartedScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Svg, { Circle } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { set_mode } from '../../redux/info/mode';
import Memory from '../utils/memoryHandler';
import Tools from '../utils/generalHandler';

const { width, height } = Dimensions.get('window');

const GetStartedScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const viewPagerRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: 'Discover Unique Items',
      description: 'Find handmade, vintage, and custom products from sellers worldwide.',
      backgroundColor: '#FFF',
    },
    {
      id: 2,
      title: 'Safe & Secure Shopping',
      description: 'Shop with confidence with our buyer protection and secure payment system.',
      backgroundColor: '#FFF',
    },
    {
      id: 3,
      title: 'Sell Your Creations',
      description: 'Turn your passion into profit by selling your unique items to global buyers.',
      backgroundColor: '#FFF',
    },
  ];

  const handlePageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const goToNextPage = () => {
    if (currentPage < slides.length - 1) {
      viewPagerRef.current.setPage(currentPage + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    viewPagerRef.current.setPage(slides.length - 1);
  };
  
  const dispatch = useDispatch()

  const handleGetStarted = async() => {
    const id = await Tools.getDeviceId().then((r) => r)
    Memory.store('anon', {date: new Date(), id: (id)})
    dispatch(set_mode('auth'))
  };

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <Svg height="10" width={slides.length * 20}>
        {slides.map((_, index) => (
          <Circle
            key={index}
            cx={index * 20 + 10}
            cy="5"
            r="4"
            fill={currentPage === index ? '#000' : '#ccc'}
          />
        ))}
      </Svg>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={"#FF4500"} />

      {/* Top Section */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Section (slides) */}
      <View style={styles.middleSection}>
        <ViewPager
          ref={viewPagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={handlePageSelected}
        >
          {slides.map((slide) => (
            <View key={slide.id} style={[styles.page, { backgroundColor: slide.backgroundColor }]}>
              <View style={styles.content}>
                <Image
                  source={{ uri: '' }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </View>
            </View>
          ))}
        </ViewPager>
      </View>

      {/* Bottom Section (pagination + button) */}
      <View style={styles.bottomSection}>
        {renderPagination()}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={goToNextPage}
        >
          <Text style={styles.nextButtonText}>
            {currentPage === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    height: '12%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  middleSection: {
    height: '70%',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.8,
    height: height * 0.35, // proportional height
    marginBottom: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3%',
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  bottomSection: {
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationContainer: {
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#000',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    minWidth: '60%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;
