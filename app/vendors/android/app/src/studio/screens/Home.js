import { 
  Dimensions,
  DrawerLayoutAndroid,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { 
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs"
import Search from '../components/Home/Search'
import Card from '../components/Home/Card';
import Engagement from '../components/Home/Engagements';
import Orders from '../components/Home/Orders';
import { useNavigation } from '@react-navigation/native';
import Aside from '../../reusables/Aside';
import MenuDrawer from 'react-native-side-drawer'
import { useState } from 'react';
import { set_drawer } from '../../../../../redux/drawer';
import { useDispatch, useSelector } from 'react-redux';
export default function Home() {
  let screenHeight = Dimensions.get('window').height;
  let navigation = useNavigation();
  let {drawer} = useSelector(s=> s.drawer)
  let dispatch = useDispatch()
  

  toggleOpen = () => {
    dispatch(set_drawer(!drawer))
  };

  const drawerContent = () => {
    return (
      <TouchableOpacity onPress={toggleOpen} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  }; 
  return (
    <>
     
      {/* <View> */}
        
      
        <ScrollView style={[styles.homeCnt,{
            height: screenHeight - 55
          }]}>
          <Engagement />
          <View style={{backgroundColor: '#fff', backgroundColor: '#fff', borderRadius: 5, padding: 10, height: 'auto'}}>
            {/* <Text style={{padding: 20, fontSize: 18, color: '#000'}}>Earnings</Text> */}

            <Orders />

            <Card /> 
            
          </View>
        </ScrollView>
      {/* </View>  */}
    </> 
  )
}


const styles = StyleSheet.create({
    homeCnt:{
      height: 'auto',
      position: 'relative',
      width: '100%',
      padding: 0,
      backgroundColor: '#fff',
      flex: 1,
      // marginBottom: 5
  },
  
  });