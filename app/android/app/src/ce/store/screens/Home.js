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

import { 
    createBottomTabNavigator 
} from "@react-navigation/bottom-tabs"
import FlasAds from '../components/Home/FlashAd'
import Search from '../components/Home/Search'
import ShowCase from '../components/Home/ShowCase'
import Message from './Message';
import Order from './Order';
import Profile from './Profile';
const Tab = createBottomTabNavigator();

export default function Home() {
  let screenHeight = Dimensions.get('window').height;
  return (
    <>
      <ScrollView style={[styles.homeCnt,{
            height: screenHeight - 55
        }]}>

        <Search />
        <FlasAds />
        <ShowCase />

      </ScrollView> 
    </> 
  )
}


const styles = StyleSheet.create({
    homeCnt:{
        height: 'auto',
        width: '100%',
        padding: 0,
        marginBottom: 5
    }
  });