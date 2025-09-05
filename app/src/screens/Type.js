import React from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackSvg from '../../assets/back-svgrepo-com (4).svg';

export default function Type() {
  const navigation = useNavigation();
  const { params } = useRoute();

  let { types, category } = params;

  // ✅ Ensure types is always an array
  if (!Array.isArray(types)) {
    types = [types];
  }

  return (
    <>
      {/* Header */}
      <View style={styles.searchCnt}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name={'chevron-back'} size={25} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      {/* Scrollable list of types */}
      <ScrollView style={styles.homeCnt}>
        {types.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.typeRow}
            onPress={() =>
              navigation.navigate('user-type-product', { category, type: item })
            }
          >
            <View style={{ padding: 2.5 }}>
              <Text style={{ fontSize: 15, color: '#000' }}>{item}</Text>
            </View>
            <View style={{ padding: 2.5, transform: [{ rotate: '180deg' }] }}>
              <BackSvg height={20} width={20} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  searchCnt: {
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1.5,
  },
  backButton: {
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 25,
  },
  categoryText: {
    fontSize: 15,
    color: '#000',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  homeCnt: {
    width: '100%',
    marginTop: 0.5,
    backgroundColor: '#f9f9f9',
  },
  typeRow: {
    backgroundColor: '#FFF',
    height: 65,
    paddingVertical: 10,
    paddingHorizontal: 9,
    marginBottom: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
