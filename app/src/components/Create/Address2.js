import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import pluralize from 'pluralize';

export default function Address2({ updateAddress2, category, error }) {
  const [address2, setAddress2] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const screenWidth = Dimensions.get('window').width;
 
  const handleStockChange = (text) => {
    
    updateAddress2(text);
    setAddress2(text)
  };

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <Text style={styles.label}>Address 2 (e.g: Yahoo junction)</Text>

      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        <TextInput
        //   keyboardType="numeric"
          placeholder="Enter Address 2 (e.g: Yahoo junction)"
          placeholderTextColor="#999"
          style={styles.input}
          value={address2}
          onChangeText={handleStockChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        //   maxLength={4}
        />
      </View>

        
      <View style={styles.footer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.hintText}>
            Enter the accurate street/junction/bus-stop address of the {pluralize.singular(category)}
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
    borderColor: '#32CD32',
    backgroundColor: '#fff',
    shadowColor: '#32CD32',
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