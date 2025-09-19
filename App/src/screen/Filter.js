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
// import BottomModal from '../utils/BtmModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import AccomodationOffer from '../components/Home/AccomodationOffer';
import categoriesData from '../json/services.json'
import { set_locale_modal } from '../../redux/modal/locale';
import { Favourite } from '../api';
import BottomModal from '../reusables/BtmModal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.475;

/**
 * Single Product Card Component
 */
const ProductCard = ({ item, navigation, user, Fav }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    setFavLoading(true);
    if (Fav.length > 0) {
      const isSaved = Fav.some(f => f?.order?.product_id === item?.product_id);
      setWishlisted(isSaved);
    } else {
      setWishlisted(false);
    }
    setFavLoading(false);
  }, [Fav, item?.product_id]);

  const handleSave = async () => {
    setFavLoading(true);
    if (!wishlisted) {
      const result = await Favourite.createFavourite({
        user_id: user?.user_id,
        product_id: item?.product_id
      });
      if (result?.success) setWishlisted(true);
    } else {
      const result = await Favourite.deleteFavourite({
        user_id: user?.user_id,
        product_id: item?.product_id
      });
      if (result?.success) setWishlisted(false);
    }
    setFavLoading(false);
  };

  const getCategoryImage = (categoryName) => {
    for (let cat of categoriesData.items.category) {
      const keys = Object.keys(cat).filter(k => k !== "img");
      for (let key of keys) {
        if (key === categoryName) {
          return cat.img;
        }
      }
    }
    return null; // fallback
  };
  const isPromoted = eval(item.promotion) ;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('product', { data: item })}
      style={styles.productCard}
    >
      <View style={styles.productInner}>
        <View>
          {
            item?.purpose === 'product'
            ?
            <Image
              source={{ uri: item.thumbnail_id }}
              style={styles.productImage}
              resizeMode="cover"
            />
            :
            <Image
              source={{ uri: getCategoryImage(item.category) || item.image }}
              style={styles.productImage} />
          }
          {isPromoted && (
            <View style={styles.boostBadge}>
              <Icon name="rocket" size={12} color="#FFF" />
              <Text style={styles.boostBadgeText}>  Boosted</Text>
            </View>
          )}
          {/* Wishlist Button */}
          <TouchableOpacity
            style={[styles.wishlistButton, wishlisted && styles.wishlistButtonActive]}
            onPress={handleSave}
          >
            {favLoading ? (
              <ActivityIndicator size="small" color={wishlisted ? "#FFF" : "#FF4500"} />
            ) : (
              <Icon
                name={wishlisted ? 'heart' : 'heart-outline'}
                size={18}
                color={wishlisted ? '#FFF' : '#000'}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Top badges container */}
        <View style={styles.topBadgesContainer}>
          {item?.others?.condition && (
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{item.others.condition}</Text>
            </View>
          )}
        </View>

        <View style={styles.productDetails}>
          {item?.purpose === 'product' ?<Text style={styles.price}>
            ₦{new Intl.NumberFormat('en-us').format(item?.price)}
          </Text> : ''}
          <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
          <View style={styles.metaContainer}>
            <Icon name="location-outline" size={12} color="#666" />
            <Text style={styles.subText}>{item.campus}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Main Screen
 */
export default function TypeProducts() {
  const navigation = useNavigation();
  const route = useRoute();
  const { type, category } = route.params;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterWord, setFilterWord] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const { option } = useSelector(s => s?.option);
  const { campus } = useSelector(s => s?.campus);
  const { user } = useSelector(s => s?.user);
  const [Fav, setFav] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    for (let x in filterWord) {
      if (x === 'condition') conditionFilter(filterWord[x]);
      else if (x === 'priceSort') priceFilter(filterWord[x]);
      else if (x === 'dateSort') dateFilter(filterWord[x]);
    }
  }, [filterWord]);

  useEffect(() => {
    locationFilter();
  }, [campus]);

  const toggleModal = useCallback((filterType) => {
    if (filterType === 'Location') {
      dispatch(set_locale_modal(1));
      return;
    }
    
    setActiveFilter(filterType);
    setModalVisible(true);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilterWord(prev => {
      // If value is null, remove the filter
      if (value === null) {
        const newFilter = { ...prev };
        delete newFilter[key];
        return newFilter;
      }
      
      // If value is the same as current, remove the filter (toggle off)
      if (prev[key] === value) {
        const newFilter = { ...prev };
        delete newFilter[key];
        return newFilter;
      }
      
      // Otherwise set the filter
      return { ...prev, [key]: value };
    });
    setModalVisible(false);
    setActiveFilter(null);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilterWord({});
    setModalVisible(false);
    setActiveFilter(null);
  }, []);

  // === FILTERS ===
  function conditionFilter(condition) {
    let copy = Object.values(filterWord).length === 0 ? [...data] : [...filteredData];
    setFilteredData(copy.filter(item => item?.others?.condition?.toLowerCase() === condition?.toLowerCase()));
  }

  function priceFilter(dimension) {
    let copy = Object.values(filterWord).length === 0 ? [...data] : [...filteredData];
    let sorted = [...copy].sort((a, b) => a.price - b.price);
    setFilteredData(dimension === 'Highest to Lowest' ? sorted.reverse() : sorted);
  }

  function dateFilter(dimension) {
    let copy = Object.values(filterWord).length === 0 ? [...data] : [...filteredData];
    let sorted = [...copy].sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredData(dimension === 'Newest First' ? sorted : sorted.reverse());
  }

  function locationFilter() {
    let copy = [...data];
    if (campus === 'All campus') setFilteredData(copy);
    else setFilteredData(copy.filter(item => item?.campus.toLowerCase() === campus?.toLowerCase()));
  }

  // === FETCH PRODUCTS ===
  const fetchProducts = useCallback(async () => {
    try {
      setRefreshing(true);
      const result = await fetch(
        `https://cs-node.vercel.app/products-type?category=${category}&type=${type}&purpose=${option === 'Products' ? 'product' : option === 'Lodges' ? 'accomodation' : 'service'}`,
        { headers: { 'Content-Type': 'application/json' } }
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
  }, [category, type, option]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // === FETCH FAVOURITES ===
  const fetchFavourites = async () => {
    try {
      const result = await Favourite.getFavourites(user.user_id);
      setFav(result?.success ? result?.data : []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { fetchFavourites(); }, []);

  // === RENDER ===
  const renderProductItem = useCallback(
    ({ item }) => (
      <ProductCard item={item} navigation={navigation} user={user} Fav={Fav} />
    ),
    [navigation, user, Fav]
  ); 

  const renderLodgeItem = useCallback(
    ({ item }) => (
      <AccomodationOffer data={[item]} /> 
    ),
    [navigation, user, Fav]
  ); 

  const renderModalContent = () => {
    switch (activeFilter) {
      case 'Condition':
        return (
          <>
            <Text style={styles.modalTitle}>Select Condition</Text>
            {['Brand New', 'Fairly Used', 'Refurbished', 'In Good Condition', 'Any Condition'].map((condition) => (
              <TouchableOpacity 
                key={condition} 
                onPress={() => handleFilterChange('condition', condition === 'Any Condition' ? null : condition)} 
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{condition}</Text>
                {filterWord.condition === condition && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
                {!filterWord.condition && condition === 'Any Condition' && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );

      case 'Gender':
        return (
          <>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {['Male', 'Female', 'Any Gender'].map((gender) => (
              <TouchableOpacity 
                key={gender} 
                onPress={() => handleFilterChange('gender', gender === 'Any Gender' ? null : gender)} 
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{gender}</Text>
                {filterWord.gender === gender && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
                {!filterWord.gender && gender === 'Any Gender' && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );

      case 'Price':
        return (
          <>
            <Text style={styles.modalTitle}>Sort by Price</Text>
            {['Lowest to Highest', 'Highest to Lowest', 'Default'].map((sort) => (
              <TouchableOpacity 
                key={sort} 
                onPress={() => handleFilterChange('priceSort', sort === 'Default' ? null : sort)} 
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{sort}</Text>
                {filterWord.priceSort === sort && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
                {!filterWord.priceSort && sort === 'Default' && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );

      case 'Sort':
        return (
          <>
            <Text style={styles.modalTitle}>Sort by Date</Text>
            {['Newest First', 'Oldest First', 'Default'].map((sort) => (
              <TouchableOpacity 
                key={sort} 
                onPress={() => handleFilterChange('dateSort', sort === 'Default' ? null : sort)} 
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{sort}</Text>
                {filterWord.dateSort === sort && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
                {!filterWord.dateSort && sort === 'Default' && (
                  <Icon name="checkmark" size={18} color="#FF4500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );

      default:
        return null;
    }
  };
  
  if (loading) {
      return (
      <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF4500" />
      </View>
      );
  }

  const getFilterButtonText = (label) => {
      switch (label) {
      case 'Location':
          return campus || 'Location';
      case 'Condition':
          return filterWord.condition ? filterWord.condition : 'Condition';
      case 'Gender':
          return filterWord.gender ? filterWord.gender : 'Gender';
      case 'Price':
          return filterWord.priceSort ? filterWord.priceSort : 'Price';
      case 'Sort':
          return filterWord.dateSort ? filterWord.dateSort : 'Sort';
      default:
          return label;
      }
  };

  return (
      <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={25} color="#000" />
              </TouchableOpacity>
              <Text style={styles.title}>{category} - {type}</Text>
          </View>

          {/* Filters */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContainer}
          >
            {['Location', 'Condition', 'Gender', 'Price', 'Sort']
            .filter(label => {
              if (option === 'Lodges') return label !== 'Condition';
              if (option === 'Products') return label !== 'Gender';
              if (option === 'Services') return label !== 'Condition' && label !== 'Price';
              return true;
            })
            .map(label => {
              const isActive =
                filterWord[label.toLowerCase()] ||
                (label === 'Location' && campus) ||
                (label === 'Condition' && filterWord.condition) ||
                (label === 'Gender' && filterWord.gender) ||
                (label === 'Price' && filterWord.priceSort) ||
                (label === 'Sort' && filterWord.dateSort);

              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.filterBtn, isActive && styles.activeFilterBtn]}
                  onPress={() => toggleModal(label)}
                >
                  <Text
                    style={[styles.filterBtnText, isActive && styles.activeFilterBtnText]}
                  >
                    {getFilterButtonText(label)}
                  </Text>
                  {isActive && (
                    <Icon
                      name="close-circle"
                      size={14}
                      color="#FFF"
                      style={styles.filterCloseIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}

          </ScrollView>

          {/* Active Filters Bar */}
          {Object.keys(filterWord).length > 0 && (
            <View style={styles.activeFiltersContainer}>
            <Text style={styles.activeFiltersText}>Active filters: </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.entries(filterWord).map(([key, value]) => (
                <View key={key} style={styles.activeFilterTag}>
                    <Text style={styles.activeFilterText}>{value}</Text>
                    <TouchableOpacity onPress={() => handleFilterChange(key, null)}>
                    <Icon name="close" size={14} color="#FFF" />
                    </TouchableOpacity>
                </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={clearAllFilters}>
                <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
            </View>
          )}

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
            renderItem={option === 'Lodges' ? renderLodgeItem : renderProductItem}
            keyExtractor={(item) => item.product_id}
            numColumns={option === 'Lodges' ? 1 : 2} 
            columnWrapperStyle={option !== 'Lodges' ? styles.columnWrapper : null}
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
                onPress={clearAllFilters}
            >
                <Text style={styles.resetFiltersText}>Reset Filters</Text>
            </TouchableOpacity>
            </View>
          )}

          {/* Filter Modal */}
          <BottomModal
            visible={modalVisible} 
            onClose={() => {
              setModalVisible(false);
              setActiveFilter(null);
            }}
          >
              {renderModalContent()}
          </BottomModal>
      </View>
  );
}

const styles = StyleSheet.create({
  boostBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
  },
  boostBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  wishlistButtonActive: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  topBadgesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 4,
  },
  conditionBadge: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  conditionText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212B36',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF6F2',
    borderWidth: 1,
    borderColor: '#FFE4D9',
  },
  sortText: {
    fontSize: 14,
    color: '#FF4500',
    fontWeight: '500',
    marginLeft: 4,
  },
  filterContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
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
  filterCloseIcon: {
    marginLeft: 4,
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  activeFiltersText: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  activeFilterText: {
    fontSize: 12,
    color: '#FFF',
    marginRight: 4,
  },
  clearAllText: {
    fontSize: 12,
    color: '#FF4500',
    fontWeight: '500',
    marginLeft: 8,
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
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: CARD_WIDTH,
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
    padding: 12,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF4500',
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
    flexWrap: 'wrap',
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
    textAlign: 'center',
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