import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  Text,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { <Icon } from '@expo/vector-icons';
import BottomModal from '../utils/BtmModal';
import { filterProducts } from '../../utils/Filter';
import { Location } from '../utils/Location';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.475;
const CARD_MARGIN = width * 0.02;

export default function TypeProducts() {
  const navigation = useNavigation();
  const route = useRoute();
  const { type, category } = route.params;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Location');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterWord, setFilterWord] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const toggleModal = useCallback((filter) => {
    setModalVisible(v => !v);
    setFilter(filter);
  }, []);

  const updateFilterWord = useCallback((data) => {
    setFilterWord(data);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setRefreshing(true);
      const result = await fetch(
        `http://192.168.209.146:9090/products-type?category=${category}&type=${type}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await result.json();
      const products = response.data || [];
      
      setData(products);
      setFilteredData(products);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      Alert.alert('Network Error', 'Please check your connection and try again.');
      setLoading(false);
      setRefreshing(false);
      console.error(err);
    }
  }, [category, type]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = filterProducts(data, filterWord);
      setFilteredData(filtered);
    }
  }, [filterWord, data]);

  const handleFilterChange = useCallback((key, value) => {
    setFilterWord(prev => ({ ...prev, [key]: value }));
    setModalVisible(false);
  }, []);

  const renderProductItem = useCallback(({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('user-product', { product_id: item.product_id })}
      style={styles.productCard}
    >
      <View style={styles.productInner}>
        <Image
          source={{ uri: item.thumbnail_id }}
          style={styles.productImage}
          resizeMode="cover"
          // defaultSource={require('../../media/placeholder-image.png')}
        />
        <View style={styles.productDetails}>
          <Text style={styles.price}>₦{new Intl.NumberFormat('en-us').format(item?.price)}</Text>
          <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
          <View style={styles.metaContainer}>
            <Icon name="location-outline" size={12} color="#666" />
            <Text style={styles.subText}>{item.campus}</Text>
            {item?.others?.condition && (
              <>
                <Text style={styles.divider}>•</Text>
                <Text style={styles.subText}>{item.others.condition}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{category} - {type}</Text>
        <TouchableOpacity 
          onPress={() => toggleModal('Sort')} 
          style={styles.sortBtn}
        >
          <Icon name="filter" size={18} color="#FF4500" />
          <Text style={styles.sortText}> Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {['Location', 'Condition', 'Price'].map((label) => (
          <TouchableOpacity 
            key={label} 
            style={[
              styles.filterBtn,
              filterWord[label.toLowerCase()] && styles.activeFilterBtn
            ]} 
            onPress={() => toggleModal(label)}
          >
            <Text style={[
              styles.filterBtnText,
              filterWord[label.toLowerCase()] && styles.activeFilterBtnText
            ]}>
              {label === 'Price' ? '₦ Price' : label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'} found
        </Text>
      </View>

      {/* Products Grid */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.product_id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={fetchProducts}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="search-outline" size={50} color="#ccc" />
          <Text style={styles.emptyText}>No products match your filters</Text>
          <TouchableOpacity 
            style={styles.resetFiltersBtn}
            onPress={() => setFilterWord({})}
          >
            <Text style={styles.resetFiltersText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Filter Modal */}
      <BottomModal visible={modalVisible} onClose={toggleModal}>
        <Text style={styles.modalTitle}>
          Select {filter}
        </Text>

        {filter === 'Location' && <Location toggleModal={toggleModal} updateFilterWord={updateFilterWord} onSelect={handleFilterChange} />}

        {filter === 'Condition' &&
          ['Brand New', 'Fairly Used', 'Refurbished', 'Used'].map((condition) => (
            <TouchableOpacity 
              key={condition} 
              onPress={() => handleFilterChange('condition', condition)} 
              style={styles.modalOption}
            >
              <Text style={styles.modalOptionText}>{condition}</Text>
              {filterWord.condition === condition && (
                <Icon name="checkmark" size={18} color="#FF4500" />
              )}
            </TouchableOpacity>
          ))}

        {filter === 'Price' &&
          ['Lowest to Highest', 'Highest to Lowest'].map((sort) => (
            <TouchableOpacity 
              key={sort} 
              onPress={() => handleFilterChange('priceSort', sort)} 
              style={styles.modalOption}
            >
              <Text style={styles.modalOptionText}>{sort}</Text>
              {filterWord.priceSort === sort && (
                <Icon name="checkmark" size={18} color="#FF4500" />
              )}
            </TouchableOpacity>
          ))}
        
        {filter === 'Sort' &&
          ['Sort From Newest To Oldest', 'Sort From Oldest To Newest'].map((sort) => (
            <TouchableOpacity 
              key={sort} 
              onPress={() => handleFilterChange('priceSort', sort)} 
              style={styles.modalOption}
            >
              <Text style={styles.modalOptionText}>{sort}</Text>
              {filterWord.priceSort === sort && (
                <Icon name="checkmark" size={18} color="#FF4500" />
              )}
            </TouchableOpacity>
          ))}
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212B36',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  sortText: {
    fontSize: 14,
    color: '#FF4500',
    fontWeight: '500',
    marginLeft: 4,
  },
  filterContainer: {
    paddingHorizontal: 16,
    height: 60,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
  },
  filterBtn: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 16,

    // flex: 1,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
  },
  activeFilterBtn: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  filterBtnText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterBtnText: {
    color: '#FFF',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingHorizontal: 4,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: CARD_WIDTH,
    margin: 0,
    marginBottom: 16,
  },
  productInner: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: '#f5f5f5',
  },
  productDetails: {
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 14,
    color: '#212B36',
    marginBottom: 6,
    lineHeight: 18,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  divider: {
    marginHorizontal: 4,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  resetFiltersBtn: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF4500',
  },
  resetFiltersText: {
    color: '#FFF',
    fontWeight: '500',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212B36',
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#212B36',
  },
});