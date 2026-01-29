import React, { useMemo, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
} from 'react-native';

import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { school_choices } from '../json/location.json';
import { set_campus } from '../../redux/campus';
import { set_locale_modal } from '../../redux/modals/locale';

// Constants
const ALL_CAMPUS_OPTION = { value: -1, title: "All campus" };
const LIST_CONFIG = {
  initialRender: 20,
  batchSize: 20,
  windowSize: 10,
  itemHeight: 60,
};

/**
 * Campus Selection Modal Component
 * Allows users to search and select a campus from available options
 */
const LocaleSelection = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  
  // Process and prepare campus list on mount
  const campusList = useMemo(() => {
    // Extract all schools from nested object structure
    const extractAllCampuses = () => {
      const campuses = [];
      for (const key in school_choices) {
        if (Array.isArray(school_choices[key])) {
          campuses.push(...school_choices[key]);
        }
      }
      return campuses;
    };

    const allCampuses = extractAllCampuses();
    
    // Transform to consistent format
    const formattedCampuses = allCampuses.map(campus => ({
      value: campus.value,
      title: campus.title || campus.text,
    }));

    // Add "All campus" as first option
    return [ALL_CAMPUS_OPTION, ...formattedCampuses];
  }, []);

  // Filter campuses based on search query
  const displayedCampuses = useMemo(() => {
    if (!query || query.trim() === '') {
      return campusList;
    }

    const normalizedQuery = query.toLowerCase().trim();
    return campusList.filter(campus => 
      campus.title.toLowerCase().includes(normalizedQuery)
    );
  }, [query, campusList]);

  // Handle campus selection
  const selectCampus = useCallback((selectedCampus) => {
    dispatch(set_campus(selectedCampus.title));
    dispatch(set_locale_modal(0));
  }, [dispatch]);

  // Close modal handler
  const closeModal = useCallback(() => {
    dispatch(set_locale_modal(0));
  }, [dispatch]);

  // Clear search input
  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  // Render individual campus item
  const CampusListItem = useCallback(({ campus }) => (
    <TouchableOpacity
      style={modalStyles.listRow}
      onPress={() => selectCampus(campus)}
      activeOpacity={0.7}
    >
      <Text style={modalStyles.campusLabel}>{campus.title}</Text>
    </TouchableOpacity>
  ), [selectCampus]);

  // Render empty state
  const EmptyState = useCallback(() => (
    <View style={modalStyles.noResultsWrapper}>
      <Text style={modalStyles.noResultsMessage}>No campuses found</Text>
    </View>
  ), []);

  // Calculate item layout for FlatList optimization
  const getItemLayout = useCallback((data, index) => ({
    length: LIST_CONFIG.itemHeight,
    offset: LIST_CONFIG.itemHeight * index,
    index,
  }), []);

  // Extract unique key for list items
  const getItemKey = useCallback((item) => {
    return `campus-${item.value}`;
  }, []);

  return (
    <View style={modalStyles.mainWrapper}>
      {/* Header Section */}
      <View style={modalStyles.headerSection}>
        <TouchableOpacity 
          onPress={closeModal}
          style={modalStyles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={modalStyles.headerTitle}>Select Your Campus</Text>
      </View>

      {/* Search Section */}
      <View style={modalStyles.searchWrapper}>
        <Ionicons 
          name="search" 
          size={20} 
          color="#999" 
          style={modalStyles.searchIcon} 
        />
        <TextInput
          style={modalStyles.searchField}
          placeholder="Search for your campus..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity 
            onPress={clearSearch}
            style={modalStyles.clearButton}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Campus List */}
      <FlatList
        data={displayedCampuses}
        renderItem={({ item }) => <CampusListItem campus={item} />}
        keyExtractor={getItemKey}
        initialNumToRender={LIST_CONFIG.initialRender}
        maxToRenderPerBatch={LIST_CONFIG.batchSize}
        windowSize={LIST_CONFIG.windowSize}
        getItemLayout={getItemLayout}
        ListEmptyComponent={EmptyState}
        removeClippedSubviews={true}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

// Modal Styles
const modalStyles = StyleSheet.create({
  mainWrapper: {
    height: '100%',
    backgroundColor: '#fff',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '15%',
    flex: 1,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    height: 44,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchField: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: '#333',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  listRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  campusLabel: {
    fontSize: 16,
    color: '#333',
  },
  noResultsWrapper: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsMessage: {
    fontSize: 16,
    color: '#999',
  },
});

export default LocaleSelection;
