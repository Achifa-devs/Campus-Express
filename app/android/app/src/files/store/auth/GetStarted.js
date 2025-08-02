import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, PanResponder } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import SchoolSvg from '../../media/assets/29659591_7605883.svg';
import BusinessSvg from '../../media/assets/23186779_6737584.svg';
import TrustSvg from '../../media/assets/7119383_3286554.svg';
import ProfitSvg from '../../media/assets/18771520_6030257.svg';
import BuySvg from '../../media/assets/10769657_4530193.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GetStarted() {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const activeSvg= useRef(0);
  let [values, setValues] = useState(activeSvg.current)


 


  useEffect(() => {
    async function get_user() {
      try {
        const data = await getData('user');
        if (data) {
          dispatch(set_user(JSON.parse(data)));
        }
      } catch (error) {
        console.error('Error getting user:', error);
      }
    }
    // get_user();
  }, []);

  const slides = [
    {
      svg: <SchoolSvg height={300} width={screenWidth * 0.9} />,
      title: 'Explore 169 Universities Across Nigeria',
      description: 'Connect with students and vendors from campuses nationwide and grow your influence.',
    },
    {
      svg: <BuySvg height={300} width={screenWidth * 0.9} />,
      title: 'Shop With Ease, Right From Your Lodge',
      description: 'Browse products, place orders, and enjoy fast delivery without leaving your hostel.',
    },
    {
      svg: <BusinessSvg height={300} width={screenWidth * 0.9} />,
      title: 'Grow Your Business and Reach More Buyers',
      description: 'Showcase your products to thousands of campus buyers and increase your daily sales.',
    },
    {
      svg: <TrustSvg height={300} width={screenWidth * 0.9} />,
      title: 'Build Trust With Every Transaction',
      description: 'Deliver great service, gain customer loyalty, and grow a trusted brand on campus.',
    },
    {
      svg: <ProfitSvg height={300} width={screenWidth * 0.9} />,
      title: 'Boost Your Profits—The Easy Way',
      description: 'Use powerful tools to sell more efficiently and earn faster than ever before.',
    },
  ];

  const handlePrev = () => {
    let newValue = activeSvg.current - 1;
    console.log('newValue: ', newValue)
    if (activeSvg.current > 0){
      activeSvg.current = newValue
      setValues(newValue);
    }
  };

  const handleNext = () => {
    let newValue = activeSvg.current + 1;
    console.log('newValue: ', newValue)
    if (activeSvg.current < (slides.length - 1)){
      activeSvg.current = newValue
      setValues(newValue);
    }
  }; 


  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20; // respond only to horizontal gestures
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          console.log('Swiped Left', activeSvg);
          handleNext();
        } else if (gestureState.dx > 50) {
          console.log('Swiped Right', activeSvg);
          handlePrev();
        }
      },
    })
  ).current;


  return (
    <>
     
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container(screenHeight, screenWidth)} {...panResponder.panHandlers}>
          <View style={styles.svgContainer(screenWidth)}>
            <View key={activeSvg} style={styles.svgWrapper}>
              <View style={styles.svgContent}>{slides[values].svg}</View>
              <TouchableOpacity onPress={handlePrev} style={styles.touchArea('left')} />
              <TouchableOpacity onPress={handleNext} style={styles.touchArea('right')} />
            </View>
          </View>
          <View style={styles.textSection(screenWidth)}>
            <Text style={styles.title(screenWidth)}>{slides[values].title}</Text>
            <Text style={styles.description(screenWidth)}>{slides[values].description}</Text>
          </View>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 50,
                  backgroundColor: values === index ? '#000' : '#EFEFEF',
                  marginHorizontal: 5,
                }}  
              />
            ))}
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.getStartedBtn}
              onPress={() => navigation.navigate('user-login')}
            >
              <Text style={{ color: '#fff' }}>Get started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: (height, width) => ({ 
    backgroundColor: '#FFF',
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  svgContainer: (width) => ({
    height: '35%',
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  svgWrapper: {
    height: '100%',
    width: '100%',
    borderRadius: 400,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  svgContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchArea: (side) => ({
    backgroundColor: 'transparent',
    height: 300,
    width: '50%',
    position: 'absolute',
    [side]: 0,
    zIndex: 100,
  }),
  textSection: (width) => ({
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    height: '15%',
  }),
  title: (width) => ({
    width: width * 0.8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  }),
  description: (width) => ({
    width: width * 0.9,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  }),
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5%',
    // marginBottom: 20, 
  },
  buttonSection: {
    height: '30%',
    width: '100%',
    // marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedBtn: {
    backgroundColor: '#000',
    height: 50,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
