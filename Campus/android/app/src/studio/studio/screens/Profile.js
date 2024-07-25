import { 
  useEffect,
  useState 
} from "react";
import { 
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View 
} from "react-native";
import { 
  useDispatch,
  useSelector 
} from "react-redux";
import { setUserModeTo } from "../../../../../../redux/reducer/mode";

const ProfileCnt = ({navigation}) => {
  // let {selected_profession} = useSelector(s => s.selected_profession);
  let dispatch = useDispatch();
  const screenHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    
    if(isEnabled === true){
      dispatch(setUserModeTo('user'))
    }else if(isEnabled === false){
      dispatch(setUserModeTo('buyer'))
    }

  }, [isEnabled])

  return ( 
      <>
        <View style={{height: 'auto', position: 'relative', zIndex: 1500, padding: 10, width: '100%', backgroundColor: '#32CD32', opacity: .7, display: 'flex', alignItems: 'center', justifyContent: 'center',  flexDirection: 'row'}}>
          <View style={{height: 50, borderRadius: 5, width: '100%', backgroundColor: 'green', opacity: 1, display: 'flex', alignItems: 'center', zIndex: 15000, flexDirection: 'row'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'serif', color: '#fff', position: 'absolute', left: 10}}>
              Seller Mode
            </Text> 
            
            <View style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'serif', color: '#fff', position: 'absolute', right: 10}}>


              <Switch
                trackColor={{false: '#fff', true: 'yellowgreen'}}
                thumbColor={isEnabled ? '#efefef' : '#fff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />


            </View>
          </View>
        </View>

        <ScrollView style={{
            height: screenHeight - 50,
            width: '100%',
            position: 'relative',
            backgroundColor: '#f9f9f9',
            color: '#000',
            overflow: 'scroll'
            
        }}>

            <View>
                <View style={{height: 50, width: '100%', fontFamily: 'serif', display: 'flex', fontSize: 18, alignItems: 'center', justifyContent: 'left', paddingLeft: 20, flexDirection: 'row', backgroundColor: '#f9f9f9'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'serif'}}>My Shop</Text>

                </View>

                <View> 
                    {/* <TouchableOpacity onPress={e => alert('feature Coming Soon')}  style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20, marginBottom: 3, flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 500, fontSize: 15}}>Earnings</Text>
                        <Image style={styles.icons} source={require('../assets/right-arrow.png')} />
                    </TouchableOpacity>

                    

                    {/* <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20, marginBottom: 3, flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 500, fontSize: 15}}>Share Product</Text>
                        <Image style={styles.icons} source={require('../assets/right-arrow.png')} />
    </TouchableOpacity>*/}

                    
                    <TouchableOpacity onPress={e => navigation.navigate('user-invite')} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20, marginBottom: 3, flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 500, fontSize: 15}}>Invite Friends</Text>
                        {/* <Image style={styles.icons} source={require('../../assets/right-arrow.png')} /> */}
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={e => navigation.navigate('user-invites')}  style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20,  flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 500, fontSize: 15}}>Invite Friends</Text>
                        <Image style={styles.icons} source={require('../assets/right-arrow.png')} />
                    </TouchableOpacity> */}
                </View>

            </View>

            <View>

                <View style={{height: 50, width: '100%', fontFamily: 'serif', display: 'flex', fontSize: 18, alignItems: 'center', justifyContent: 'left', paddingLeft: 20, flexDirection: 'row', backgroundColor: '#f9f9f9'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'serif'}}>Settings</Text>

                </View>

                <View> 
                    <TouchableOpacity onPress={e => navigation.navigate('user-preference')} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20, marginBottom: 3, flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 500, fontSize: 15}}>Preference</Text>
                        {/* <Image style={styles.icons} source={require('../../assets/right-arrow.png')} /> */}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-account')}  style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20, flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 500, fontSize: 15}}>Acccount</Text>
                        {/* <Image style={styles.icons} source={require('../../assets/right-arrow.png')} /> */}
                    </TouchableOpacity>
                    
                </View>

            </View>

            <View>
            
                <View style={{height: 50, width: '100%', fontFamily: 'serif', display: 'flex', fontSize: 18, alignItems: 'center', justifyContent: 'left', paddingLeft: 20, flexDirection: 'row', backgroundColor: '#f9f9f9'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'serif'}}>Resources</Text>

                </View>

                <View> 
                    <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20, marginBottom: 3, flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 400, fontSize: 15}}>Support</Text>
                        {/* <Image style={styles.icons} source={require('../../assets/right-arrow.png')} /> */}
                    </TouchableOpacity>

                    <TouchableOpacity style={{display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 20, marginBottom: 3, flexDirection: 'row', height: 60, width: '100%', backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: 'serif', fontWeight: 400, fontSize: 15}}>Community and Legal</Text>
                        {/* <Image style={styles.icons} source={require('../../assets/right-arrow.png')} /> */}
                    </TouchableOpacity>
                    
                </View>

            </View>

            <View style={{height: 50, textAlign: 'center', width: '100%', fontFamily: 'serif', display: 'flex', fontSize: 18, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#f9f9f9'}}>
                <Text style={{fontSize: 15, color: '#727272', textAlign: 'center', display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontFamily: 'serif'}}>V 1.1.0</Text>

            </View>
            <View style={{height: 50, textAlign: 'center', width: '100%', fontFamily: 'serif', display: 'flex', fontSize: 18, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#f9f9f9'}}>

            </View>
            
        </ScrollView>
      </>
   );
}

export default ProfileCnt;



const styles = StyleSheet.create({
  icons: {
      height: 20,
      width: 20,
      position: 'absolute',
      right: 10,
      top: 20
    },

  
 
});
