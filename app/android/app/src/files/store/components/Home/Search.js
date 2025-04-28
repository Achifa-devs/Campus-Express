import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { 
    Dimensions,
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from 'react-native';

export default function Search() {
  let screenWidth = Dimensions.get('window').width;
  let navigation = useNavigation()

  return (
    <>
      <View style={[styles.searchCnt, {width: screenWidth}]}>
        <TouchableOpacity style={styles.search} onPress={e => navigation.navigate('user-search')}>   
            <Text>What are you searching for?</Text>
        </TouchableOpacity>

        
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    searchCnt:{
        height: 'auto',
        //   width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
        marginTop: .5,
        marginBottom: -1.5
    },
    search:{
        height: 45,
          width: '100%',
      borderRadius: 15,
        paddingLeft: 20,
        display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
        padding: 0,
        backgroundColor: '#f3f3f3'
    }
  });