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
import BackSvg from '../../media/assets/back-svgrepo-com (4).svg'
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Type() {
  let screenHeight = Dimensions.get('window').height;
      let navigation = useNavigation();
  

    let { types } = useRoute()?.params;
    let { category } = useRoute()?.params;
  return (
    <>
        <View style={styles.searchCnt}>
            <TouchableOpacity style={styles.back}> 
                <BackSvg height={25} width={25} />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, color: '#000', marginLeft: 20, fontWeight: 'bold'}}>{ category }</Text>
        </View>
      <ScrollView style={[styles.homeCnt,{
            // height: '100%'
      }]}>
       

        
        {
            types.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={{
                        backgroundColor: '#FFF',
                        height: 65,
                        display: 'flex',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 9,
                        marginBottom: 1.5,

                        paddingRight: 9,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }} onPress={e => navigation.navigate('user-type-product', {category, type: item})}>
                        
                        <View style={{padding: 2.5}}>
                            <Text style={{ fontSize: 15, color: '#000' }}>{item}</Text>
                        </View>
                        <View style={{padding: 2.5, transform: [{ rotate: '180deg' }]}}>
                            <BackSvg height={20} width={20} />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView> 
    </> 
  )
}


const styles = StyleSheet.create({
    searchCnt:{
      height: 50,
      //   width: '100%',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
    //   justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 1.5
  },
    homeCnt:{
        height: 'auto',
        width: '100%',
        padding: 0,
        marginTop: .5,
        backgroundColor: '#f9f9f9'
    }

  });