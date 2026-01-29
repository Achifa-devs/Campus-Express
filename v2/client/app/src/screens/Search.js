import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  StatusBar,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tools from '../utils/tools';
import Options from '../components/Options';
import Video from 'react-native-video';
import service from '../json/services.json';

// Constants
const API_BASE_URL = 'https://cs-node.vercel.app/search';
const PURPOSE_MAP = {
  'Products': 'product',
  'Lodges': 'accomodation',
  'Services': 'service',
};
const REFRESH_COLORS = ['#FFA500'];

/**
 * Search Screen Component
 * Allows users to search for products, lodges, and services
 */
const Search = ({ route, navigation }) => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [deviceId, setDeviceId] = useState('');

  // Redux selectors
  const selectedOption = useSelector(state => state?.option?.option);
  const selectedCampus = useSelector(state => state?.campus?.campus);
  const currentUser = useSelector(state => state?.user?.user);

  // Fetch device ID if user is not logged in
  useEffect(() => {
    const fetchDeviceIdentifier = async () => {
      if (!currentUser?.user_id) {
        try {
          const identifier = await tools.getDeviceId();
          setDeviceId(identifier);
        } catch (error) {
          console.error('Device ID fetch error:', error);
        }
      }
    };
    
    fetchDeviceIdentifier();
  }, [currentUser]);

  // Build search API URL
  const buildSearchUrl = useCallback((searchTerm) => {
    const campusParam = selectedCampus === 'All campus' ? 'null' : selectedCampus;
    const purposeParam = PURPOSE_MAP[selectedOption] || 'service';
    const userIdParam = currentUser?.user_id || deviceId;
    
    return `${API_BASE_URL}?word=${searchTerm}&campus=${campusParam}&purpose=${purposeParam}&user_id=${userIdParam}`;
  }, [selectedCampus, selectedOption, currentUser, deviceId]);

  // Perform search operation
  const executeSearch = useCallback(async (isRefresh = false) => {
    if (!searchQuery || searchQuery.trim() === '') {
      setIsLoading(false);
      if (isRefresh) setIsRefreshing(false);
      return;
    }

    setIsLoading(true);
    if (isRefresh) setIsRefreshing(true);

    try {
      const apiUrl = buildSearchUrl(searchQuery);
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "Application/json" 
        }
      });

      const responseData = await response.json();
      setSearchResults(responseData.data || []);
    } catch (error) {
      console.error('Search execution error:', error);
      Alert.alert('Network error, please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
      if (isRefresh) setIsRefreshing(false);
    }
  }, [searchQuery, buildSearchUrl]);

  // Handle search query changes
  useEffect(() => {
    executeSearch(false);
  }, [searchQuery]);

  // Handle option changes - refresh search
  useEffect(() => {
    if (searchQuery) {
      setIsRefreshing(true);
      executeSearch(true);
    }
  }, [selectedOption]);

  // Get category image from JSON data
  const findCategoryImage = useCallback((categoryName) => {
    const categoryList = service?.items?.category || [];

    for (const categoryItem of categoryList) {
      const categoryKeys = Object.keys(categoryItem).filter(key => key !== "img");

      for (const key of categoryKeys) {
        if (key.toLowerCase() === categoryName.toLowerCase()) {
          return categoryItem.img;
        }
      }
    }

    return null;
  }, []);

  // Handle refresh action
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    executeSearch(true);
  }, [executeSearch]);

  // Handle search submission
  const handleSearchSubmit = useCallback(() => {
    executeSearch(false);
  }, [executeSearch]);

  // Handle back button press
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Navigate to product detail
  const navigateToProduct = useCallback((item) => {
    navigation.navigate('product', { data: item });
  }, [navigation]);

  // Render media based on purpose type
  const renderMediaContent = useCallback((item) => {
    const { purpose, thumbnail_id, category } = item;

    if (purpose === 'product') {
      return (
        <Image
          source={{ uri: thumbnail_id }}
          style={screenStyles.mediaImage}
          resizeMode="cover"
        />
      );
    }

    if (purpose === 'service') {
      const categoryImage = findCategoryImage(category);
      return (
        <Image 
          source={{ uri: categoryImage || thumbnail_id }} 
          style={screenStyles.mediaImage} 
          resizeMode="cover"
        />
      );
    }

    // Accommodation - video
    return (
      <Video 
        muted
        source={{ uri: thumbnail_id }}
        style={screenStyles.mediaImage}
        resizeMode="cover"
      />
    );
  }, [findCategoryImage]);

  // Render price/description based on purpose
  const renderPriceInfo = useCallback((item) => {
    const { purpose, price, description, others } = item;

    if (purpose === 'accomodation') {
      const upfrontPay = others?.lodge_data?.upfront_pay || 0;
      return (
        <Text 
          style={[screenStyles.priceText, screenStyles.accommodationPrice]} 
          numberOfLines={1}
        >
          ₦{tools.formatNumber(price)} to pay ₦{tools.formatNumber(parseInt(upfrontPay))}
        </Text>
      );
    }

    if (purpose === 'product') {
      return (
        <Text 
          style={[screenStyles.priceText, screenStyles.productPrice]} 
          numberOfLines={1}
        >
          ₦{tools.formatNumber(price)}
        </Text>
      );
    }

    return (
      <Text style={screenStyles.descriptionText} numberOfLines={1}>
        {description}
      </Text>
    );
  }, []);

  // Render search result item
  const renderSearchResult = useCallback(({ item }) => (
    <TouchableOpacity
      style={screenStyles.resultCard}
      onPress={() => navigateToProduct(item)}
      activeOpacity={0.7}
    >
      {renderMediaContent(item)}
      <View style={screenStyles.resultInfo}>
        <Text style={screenStyles.resultTitle} numberOfLines={1}>
          {item.title}
        </Text>
        {renderPriceInfo(item)}
        <View style={screenStyles.categoryBadge}>
          <Text style={screenStyles.categoryLabel}>
            {item.others?.cType || 'N/A'}
          </Text>
        </View> 
      </View>
    </TouchableOpacity>
  ), [navigateToProduct, renderMediaContent, renderPriceInfo]);

  // Render empty state
  const renderEmptyState = useCallback(() => (
    <View style={screenStyles.emptyContainer}>
      <Text style={screenStyles.emptyTitle}>
        {searchQuery ? 'No results found' : 'Search for something...'}
      </Text>
      <Text style={screenStyles.emptySubtitle}>
        {searchQuery 
          ? 'Try different keywords or check your spelling' 
          : 'Enter a search term to begin'}
      </Text>
    </View>
  ), [searchQuery]);

  // Extract unique key for list items
  const getItemKey = useCallback((item, index) => {
    return item.id || `search-result-${index}`;
  }, []);

  // Loading indicator component
  const LoadingIndicator = useMemo(() => (
    <View style={screenStyles.loadingWrapper}>
      <ActivityIndicator size="large" color="#FFA500" />
      <Text style={screenStyles.loadingLabel}>Searching...</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={screenStyles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* Search Input Section */}
      <View style={screenStyles.searchSection}>
        <TouchableOpacity
          style={screenStyles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={screenStyles.inputField}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[
            screenStyles.submitButton,
            !searchQuery.trim() && screenStyles.submitButtonDisabled
          ]}
          onPress={handleSearchSubmit}
          disabled={!searchQuery.trim()}
          activeOpacity={0.7}
        >
          <Text style={screenStyles.submitButtonLabel}>Search</Text>
        </TouchableOpacity>
      </View>

      <Options />

      {/* Results Display Section */}
      <View style={screenStyles.resultsSection}>
        {isLoading ? (
          LoadingIndicator
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={getItemKey}
            contentContainerStyle={screenStyles.listContainer}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={REFRESH_COLORS}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

// Screen Styles
const screenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  inputField: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    backgroundColor: '#ffffff',
    fontSize: 15,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonLabel: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultsSection: {
    flex: 1,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLabel: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexGrow: 1,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginBottom: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mediaImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 12,
  },
  accommodationPrice: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
    lineHeight: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Search;
