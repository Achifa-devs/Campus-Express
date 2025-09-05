
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const OrderCard = ({data}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: data?.thumbnail_id }} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.stock}>Stock: {data?.stock}</Text>
        <Text style={styles.price}>₦{data?.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: .5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
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

export default OrderCard;
