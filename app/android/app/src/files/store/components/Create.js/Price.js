import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Price({ updatePrice, error }) {
  const [price, setPrice] = useState('');
  const [localError, setLocalError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const handlePriceChange = (text) => {
    // Remove all non-digit characters except decimal point
    const cleanedText = text.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const decimalCount = cleanedText.split('.').length - 1;
    const sanitizedText = decimalCount > 1 
      ? cleanedText.substring(0, cleanedText.lastIndexOf('.'))
      : cleanedText;

    updatePrice(sanitizedText)
    
    // Format as currency while typing
    let formattedValue = '';
    if (sanitizedText) {
      // Remove all commas for processing
      const numericValue = parseFloat(sanitizedText.replace(/,/g, ''));
      
      // Format with commas and optional decimals
      formattedValue = numericValue.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
      });
      
      // Validate
      
    }
    setPrice(formattedValue);
  };


  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <Text style={styles.label}>Price (₦)</Text>

      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter amount (e.g. 25,000)"
          placeholderTextColor="#999"
          style={styles.input}
          value={price ? `₦${price}` : ''}
          onChangeText={handlePriceChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={15}
        />
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.hintText}>Enter the price in Nigerian Naira</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
  },
  inputContainerFocused: {
    borderColor: '#FF4500',
    backgroundColor: '#fff',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainerError: {
    borderColor: '#ff3333',
  },
  input: {
    height: 55,
    padding: 12,
    fontSize: 16,
    color: '#333',
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