import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductOffer';

const OfferContainer = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const { option } = useSelector(s => s?.option);
  const navigation = useNavigation();

  useEffect(() => {
    if (data && data.length >= 0) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="search-outline" size={48} color="#DFE3E8" />
        <Text style={styles.emptyTitle}>Loading data</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your filter or location
        </Text>
      </View>
    );
  }

  const renderOffer = ({ item }) => {
    return <ProductCard item={item} type={option} />;
  };


  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderOffer}
        keyExtractor={(item, index) => item.id?.toString() || item.product_id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-outline" size={48} color="#DFE3E8" />
            <Text style={styles.emptyTitle}>No data found</Text>
            <Text style={styles.emptySubtitle}>
              Try refreshing and also adjust your filter or location
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#212B36',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#637381',
    textAlign: 'center',
  },
});

export default OfferContainer;
