import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

//import Header from './components/Header';
//import Navigation from './components/Navigation';
//import Body from './components/Body';



export default function Network() {

  return (

    <View style={styles.item}>
        <Text>Network</Text>
    </View>


  );
}

const styles = StyleSheet.create({

    
    item: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 2,
        marginVertical: 3,
        marginHorizontal: 10,
    }
});
