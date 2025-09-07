import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropdownExample from '../../../utils/DropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Category({ updateCategory, category_list, error, onFocus, purpose }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleCategoryChange = (value) => {
    updateCategory(value); 
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{purpose.charAt(0).toUpperCase() + purpose.slice(1)} Category</Text>
      
      <View style={[
        styles.dropdownWrapper,
        isFocused && styles.dropdownWrapperFocused,
        error && styles.dropdownWrapperError
      ]}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name="grid-outline" 
            size={20} 
            color={isFocused ? '#FF4500' : '#666'} 
          />
        </View>
        <View style={styles.dropdownContainer}>
          <DropdownExample 
            fieldName={'title'} 
            updateData={handleCategoryChange} 
            dropdownData={category_list} 
            name={'category'} 
            placeholder={'Select a category...'}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </View>
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.hintText}>Choose the most relevant category</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 0,
    width: '100%'
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
    overflow: 'hidden',
  },
  dropdownWrapperFocused: {
    borderColor: '#32CD32',
    backgroundColor: '#fff',
    shadowColor: '#32CD32',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownWrapperError: {
    borderColor: '#ff3333',
  },
  iconContainer: {
    paddingLeft: 16,
    paddingRight: 10,
  },
  dropdownContainer: {
    flex: 1,
    paddingRight: 16,
  },
  errorText: {
    color: '#ff3333',
    fontSize: 13,
    marginTop: 4,
  },
  hintText: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
});