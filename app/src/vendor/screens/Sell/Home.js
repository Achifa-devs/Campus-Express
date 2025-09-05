import { 
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Subscription from '../../components/Home/Subscription';
import UploadBtn from '../../components/Home/UploadBtn';
import Performance from '../../components/Home/Performance';

import {
  useNavigation
} from '@react-navigation/native';

import {
  useDispatch,
  useSelector
} from 'react-redux';
import { set_drawer } from '../../../../redux/vendor/drawer';

export default function Sell() {
  let screenHeight = Dimensions.get('window').height;
  let navigation = useNavigation();
  let {drawer} = useSelector(s=> s.drawer)
  let dispatch = useDispatch()
  

  toggleOpen = () => {
    dispatch(set_drawer(!drawer))
  };

  return (
    <>
     
        
      
      <ScrollView style={[styles.homeCnt,{
        height: screenHeight - 55
      }]}>
        <UploadBtn navigation={navigation} />
        <View style={{backgroundColor: '#fff', backgroundColor: '#fff', borderRadius: 5, padding: 10, height: 'auto'}}>

          <Performance />

          <Subscription /> 
          
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
    backgroundColor: '#fff',
    flex: 1,
    // marginBottom: 5
  },
  
});