import React, { useState, useRef } from 'react';
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Animated,
  Easing,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function SearchBtn() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.8)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleFocus = () => {
    setIsFocused(true);
    navigation.navigate('user-search');
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.searchContainer}>
      <Animated.View 
        style={[
          styles.searchContent,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            shadowOpacity: isFocused ? 0.2 : 0.1,
            elevation: isFocused ? 4 : 2,
            borderColor: isFocused ? '#FF4500' : '#f9f9f9',
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.searchInputContainer}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleFocus}
          activeOpacity={0.9}
        >
          <Icon 
            name="search" 
            size={20} 
            color={isFocused ? '#FF4500' : '#000'} 
            style={styles.searchIcon}
          />
          
          <View style={styles.searchTextContainer}>
            <Text style={styles.placeholderText}>
              What are you looking for?
            </Text>
          </View>

          {searchText.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchText('')}
            >
              <Icon name="close-circle" size={18} color="#888" />
            </TouchableOpacity>
          )}
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => console.log('Open filters')}
          >
            <Icon name="options-outline" size={20} color="#FF4500" />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>

      {/* Recent searches suggestions (appears when focused) */}
      {/* {isFocused && (
        <Animated.View style={styles.suggestionsContainer}>
          <View style={styles.suggestionHeader}>
            <Text style={styles.suggestionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.suggestionList}>
            <TouchableOpacity style={styles.suggestionItem}>
              <Icon name="time-outline" size={16} color="#666" />
              <Text style={styles.suggestionText}>Restaurants nearby</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.suggestionItem}>
              <Icon name="time-outline" size={16} color="#666" />
              <Text style={styles.suggestionText}>Coffee shops</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.suggestionItem}>
              <Icon name="time-outline" size={16} color="#666" />
              <Text style={styles.suggestionText}>Hair salon</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  searchContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 52,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
    marginRight: 8,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 12,
  },
  filterButton: {
    padding: 4,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  clearAllText: {
    fontSize: 14,
    color: '#FF4500',
    fontWeight: '500',
  },
  suggestionList: {
    // Suggestions list styling
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  suggestionText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
});

// For a more advanced version with actual search functionality:
const AdvancedSearchBar = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <View style={advancedStyles.container}>
      <View style={advancedStyles.searchBar}>
        <Icon name="search" size={22} color="#FF4500" style={advancedStyles.icon} />
        <TextInput
          style={advancedStyles.input}
          placeholder="Search for services, products, or businesses..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Icon name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      {isSearching && (
        <View style={advancedStyles.suggestionsPanel}>
          <Text style={advancedStyles.suggestionTitle}>Trending Searches</Text>
          {/* Render trending searches here */}
        </View>
      )}
    </View>
  );
};

const advancedStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  suggestionsPanel: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
});