import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Animated,
  Alert,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { set_locale_modal } from '../../../redux/modals/locale';
import tools from '../../utils/tools';

const SCREEN_WIDTH = Dimensions.get('window').width;

// API Configuration
const API_BASE_URL = 'https://cs-node.vercel.app/search';

// Icon mappings for different option types
const OPTION_ICON_MAP = {
  'Products': 'cart',
  'Lodges': 'bed',
  'Services': 'construct'
};

// Purpose mapping for API
const PURPOSE_MAP = {
  'Products': 'product',
  'Lodges': 'accomodation',
  'Services': 'service'
};

const SearchBar = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [deviceIdentifier, setDeviceIdentifier] = useState('');

  // Redux hooks
  const dispatch = useDispatch();
  const selectedOption = useSelector(state => state?.option?.option);
  const selectedCampus = useSelector(state => state?.campus?.campus);
  const currentUser = useSelector(state => state?.user?.user);
  
  // Navigation
  const nav = useNavigation();

  // Fetch device ID if user is not logged in
  useEffect(() => {
    const fetchDeviceId = async () => {
      if (!currentUser?.user_id) {
        try {
          const deviceId = await tools.getDeviceId();
          setDeviceIdentifier(deviceId);
        } catch (error) {
          console.error('Failed to fetch device ID:', error);
        }
      }
    };
    
    fetchDeviceId();
  }, [currentUser]);

  // Build API URL
  const buildSearchUrl = useCallback((term) => {
    const campusParam = selectedCampus === 'All campus' ? 'null' : selectedCampus;
    const purposeParam = PURPOSE_MAP[selectedOption] || 'service';
    const userIdParam = currentUser?.user_id || deviceIdentifier;
    
    return `${API_BASE_URL}?word=${term}&campus=${campusParam}&purpose=${purposeParam}&user_id=${userIdParam}`;
  }, [selectedCampus, selectedOption, currentUser, deviceIdentifier]);

  // Perform search
  const performSearch = useCallback(async (term) => {
    if (!term || term.trim() === '') {
      setShowResults(false);
      setSearchResults([]);
      return;
    }

    try {
      const url = buildSearchUrl(term);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "Application/json" 
        }
      });
      
      const data = await response.json();
      setSearchResults(data.data || []);
      setShowResults(true);
    } catch (error) {
      setShowResults(false);
      Alert.alert('Network error, please try again.');
      console.error('Search error:', error);
    }
  }, [buildSearchUrl]);

  // Handle search term changes
  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm, performSearch]);

  // Update results visibility based on results array
  useEffect(() => {
    setShowResults(searchResults.length > 0);
  }, [searchResults]);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  }, []);

  // Navigate to search screen
  const handleSearchPress = useCallback(() => {
    nav.navigate('search');
  }, [nav]);

  // Navigate to product detail
  const handleResultPress = useCallback((item) => {
    nav.navigate('product', { data: item });
  }, [nav]);

  // Open campus selector
  const handleCampusPress = useCallback(() => {
    dispatch(set_locale_modal(1));
  }, [dispatch]);

  // Get icon name for current option
  const getOptionIcon = useMemo(() => {
    return OPTION_ICON_MAP[selectedOption] || 'construct';
  }, [selectedOption]);

  // Get display text for campus
  const campusDisplayText = useMemo(() => {
    return selectedCampus || 'Select Campus';
  }, [selectedCampus]);

  return (
    <View style={componentStyles.wrapper}>
      <View style={componentStyles.searchContainer}>
        {/* Search Icon */}
        <Icon 
          name="search" 
          size={22} 
          color="#FFA500" 
          style={componentStyles.searchIcon} 
        />
        
        {/* Search Input Placeholder */}
        <TouchableOpacity 
          style={componentStyles.searchInputWrapper} 
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Text style={componentStyles.placeholderText} numberOfLines={1}>
            Search for products, accomodation, or services ...
          </Text>
        </TouchableOpacity>
        
        {/* Clear Button */}
        {searchTerm.length > 0 && (
          <TouchableOpacity 
            onPress={handleClearSearch}
            style={componentStyles.clearIconWrapper}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
        
        {/* Vertical Divider */}
        <View style={componentStyles.verticalSeparator} />
        
        {/* Campus Selector Button */}
        <TouchableOpacity 
          style={componentStyles.campusSelector}
          onPress={handleCampusPress}
          activeOpacity={0.7}
        >
          <Icon name="location-outline" size={16} color="#FFA500" />
          <Text style={componentStyles.campusText} numberOfLines={1}>
            {campusDisplayText}
          </Text>
          <Icon name="chevron-down" size={14} color="#FFA500" />
        </TouchableOpacity>
      </View>
      
      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <Animated.View style={resultsStyles.dropdownContainer}>
          <View style={resultsStyles.resultsWrapper}>
            {searchResults.map((item, idx) => (
              <TouchableOpacity 
                key={`result-${idx}-${item?.title || idx}`}
                onPress={() => handleResultPress(item)} 
                style={resultsStyles.resultRow}
                activeOpacity={0.6}
              >
                <Icon 
                  name={getOptionIcon} 
                  size={16} 
                  color="#FFA500" 
                  style={resultsStyles.resultIcon}
                />
                <Text style={resultsStyles.resultLabel} numberOfLines={1}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

// Component Styles
const componentStyles = StyleSheet.create({
  wrapper: {
    padding: 8,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    paddingHorizontal: 12,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#fff',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInputWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
    height: '100%',
  },
  placeholderText: {
    color: '#999',
    fontSize: 15,
  },
  clearIconWrapper: {
    padding: 4,
    marginRight: 4,
  },
  verticalSeparator: {
    width: 1,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  campusSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFE5D9',
    minWidth: 100,
    maxWidth: 140,
    height: 36,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  campusText: {
    color: '#FFA500',
    fontWeight: '600',
    fontSize: 12,
    marginHorizontal: 4,
    flexShrink: 1,
  },
});

// Results Styles
const resultsStyles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  resultsWrapper: {
    // Container for results list
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  resultIcon: {
    marginRight: 10,
  },
  resultLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default SearchBar;
