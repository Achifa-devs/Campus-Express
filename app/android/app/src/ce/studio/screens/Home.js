import { 
  Dimensions,
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

export default function Home() {
  let screenHeight = Dimensions.get('window').height;
  let navigation = useNavigation();
  return (
    <>
      <ScrollView style={[styles.homeCnt,{
          height: screenHeight - 55
        }]}>
        <Engagement />
        <View style={{backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: 30}}>
          <Text style={{padding: 20, fontSize: 18, color: '#000'}}>Earnings</Text>

          <Orders />
          <Card /> 
        </View>
      </ScrollView> 
    </> 
  )
}


const styles = StyleSheet.create({
    homeCnt:{
      height: 'auto',
      position: 'relative',
      width: '100%',
      padding: 0,
      backgroundColor: '#FF4500',
      flex: 1,
      // marginBottom: 5
    }
  });