import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Stock({ updateStock }) {
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const maxStock = 9999; // Maximum allowed stock quantity

  const handleStockChange = (text) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/[^0-9]/g, '');
    
    // Limit to maxStock digits
    const limitedText = cleanedText.slice(0, 4);
    
    setStock(limitedText);
    
    // Validate
    if (limitedText && parseInt(limitedText) <= 0) {
      setError('Stock must be at least 1');
    } else if (limitedText && parseInt(limitedText) > maxStock) {
      setError(`Maximum stock is ${maxStock}`);
    } else {
      setError('');
    }
    
    // Pass numeric value to parent
    if (updateStock) {
      updateStock(limitedText ? parseInt(limitedText) : '');
    }
  };

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <Text style={styles.label}>Available Stock</Text>

      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter quantity (e.g. 50)"
          placeholderTextColor="#999"
          style={styles.input}
          value={stock}
          onChangeText={handleStockChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={4}
        />
      </View>

      <View style={styles.footer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.hintText}>
            {stock ? `${stock} available` : 'Enter the quantity in stock'}
          </Text>
        )}
      </View>
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
  footer: {
    minHeight: 20,
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