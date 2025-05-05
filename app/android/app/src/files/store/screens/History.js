
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getData } from '../../utils/AsyncStore.js';
import { useNavigation } from '@react-navigation/native';

export default function History() {
  const [data, setData] = useState([])
  useEffect(() => {
    getData('history').then(result => setData(JSON.parse(result))).catch(err => console.log(err));
  }, [])
  return (
    <View style={{
      padding: 6
    }}>
      <FlatList 
        data={data}
        keyExtractor={(data, index) => index.toString()}
        renderItem={({ item: data }) => (
          <Card data={data}/>
        )}
      />
    </View>
  )
}



const Card = ({ data }) => {
  let navigation = useNavigation()
  
  return (
    <TouchableOpacity style={styles.card} onPress={e=> navigation.navigate('user-product', {product_id: data?.product_id})} >
      <Image source={{ uri: data?.thumbnail_id }} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.stock}>Stock: {data?.stock}</Text>
        <Text style={styles.price}>₦{data?.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: .5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 120,
  },
  details: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stock: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    color: '#FF4500',
    fontWeight: '600',
  },
});
