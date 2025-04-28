import { 
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { 
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs"
import FlasAds from '../components/Home/FlashAd'
import Search from '../components/Home/Search'
import ShowCase from '../components/Home/ShowCase'
import Message from './Message';
import Order from './Order'; 
import Profile from './Profile';
import { useEffect, useState } from 'react';
import Hot from '../components/Home/Hot';
import Ads from '../components/Home/Ads';
const Tab = createBottomTabNavigator();

export default function Home() {
  let screenHeight = Dimensions.get('window').height;
  

  return (
    <>
      <ScrollView style={[styles.homeCnt,{
            // height: '100%'
      }]}>
       

        <View style={{padding: 2.5}}>
          <Ads /> 
        </View>
        <View style={{padding: 2.5}}>
          <FlasAds /> 
        </View>
        <ShowCase category={'trends'} bg={'rgb(255, 244, 224)'} limit={30} />
        <Hot />
      </ScrollView> 
    </> 
  )
}


const styles = StyleSheet.create({
    homeCnt:{
        height: 'auto',
        width: '100%',
        padding: 0,
    // marginBottom: 5,
        backgroundColor: '#f9f9f9'
    }
  });