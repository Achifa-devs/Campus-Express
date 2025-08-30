// screens/MyAdsScreen.js
import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ProductCard from '../../components/Inventory/ProductCard';
import LodgeCard from '../../components/Inventory/LodgeCard';
import { useRoute } from '@react-navigation/native';

const Listing = () => {

  const route = useRoute();
  const { data } = route?.params
  
  const handleShare = (item) => {
    console.log('Share:', item);
  };

  const handleDelete = (item) => {
    console.log('Delete:', item);
  };

  const handleStatusChange = (item) => {
    console.log('Change status:', item);
  };

  const renderItem = ({ item }) => {
    if (item.purpose === 'product') {
      return (
        <ProductCard
          item={item}
          onShare={() => handleShare(item)}
          onDelete={() => handleDelete(item)}
          onStatusChange={() => handleStatusChange(item)}
        />
      );
    } else if (item.purpose === 'accomodation') {
      return (
        <LodgeCard
          item={item}
          onShare={() => handleShare(item)}
          onDelete={() => handleDelete(item)}
          onStatusChange={() => handleStatusChange(item)}
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Listing;