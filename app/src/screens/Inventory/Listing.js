// screens/MyAdsScreen.js
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import ProductCard from '../../components/Inventory/ProductCard';
import LodgeCard from '../../components/Inventory/LodgeCard';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

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

    <>
      {  
        data.length > 0
        ?
        <View style={{ flex: 1, padding: 10 }}>
          
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        :
        <View style={styles.emptyState}>
          <Icon name="images" size={50} color="#CCC" />
          <Text style={styles.emptyStateText}>No ads published yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Start by publishing your first ad to get noticed!
          </Text>
        </View>
      }
    </>


  );
};


const styles = StyleSheet.create({
  emptyState: {
    backgroundColor: '#FFF',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
})
export default Listing;