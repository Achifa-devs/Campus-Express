import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import UploadGuidelines from './Note';

const DeliveryRangeSelector = ({ shippingRange, updateShippingRangePrice, updateShippingRange, error }) => {

  const formatWithCommas = (value) => {
    if (!value) return '';
    return parseInt(value, 10).toLocaleString('en-NG');
  };

  const getRangeLabel = (range) => {
    const labels = {
      in_campus: 'Only In Campus Delivery',
      in_state: 'Within State',
      out_state: 'Out of State'
    };
    return labels[range] || range;
  };

  const getRangeDescription = (range) => {
    const descriptions = {
      in_campus: 'Delivery within your university/college campus only',
      in_state: 'Delivery to locations within your current state',
      out_state: 'Delivery to other states (nationwide)'
    };
    return descriptions[range] || '';
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {
        borderColor: 'red',
        borderWidth: error ? 2 : 0,
      }]}
    >
      <Text style={styles.title}>Delivery Options</Text>
      <Text style={styles.subtitle}>Select where you can deliver this item</Text>
      
      {Object.entries(shippingRange).map(([range, data]) => (
        <View key={range} style={styles.optionContainer}>
          <TouchableOpacity 
            style={styles.checkboxRow}
            onPress={() => updateShippingRange(range)}
            activeOpacity={0.7}
            disabled={range === 'in_campus'}
          >
            <View style={[
              styles.checkbox,
              data.selected && styles.checkboxSelected,
              range === 'in_campus' && styles.checkboxDisabled
            ]}>
              {data.selected && <View style={styles.checkboxInner} />}
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.optionLabel}>{getRangeLabel(range)}</Text>
              <Text style={styles.optionDescription}>{getRangeDescription(range)}</Text>
            </View>
            {range === 'in_campus' && (
              <Text style={styles.mandatoryTag}>(Required)</Text>
            )}
          </TouchableOpacity>
          
          {data.selected && (
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                style={styles.priceInput}
                keyboardType="numeric"
                value={formatWithCommas(data.price)}
                onChangeText={(value) => updateShippingRangePrice(range, value)}
                placeholder="0"
              />
              <Text style={styles.priceLabel}>delivery fee</Text>
            </View>
          )}
        </View>
      ))}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {/* <Text style={styles.note}>
        Note: On-campus delivery is required. You can add additional delivery options.
      </Text>  */}
      {/* <UploadGuidelines /> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    marginBottom: 10,
    padding: 10,
    
    backgroundColor: '#FFF',
    },
    errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  optionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelContainer: {
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  checkboxDisabled: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  mandatoryTag: {
    fontSize: 12,
    color: '#FF5722',
    marginLeft: 8,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
    color: '#333',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
});

export default DeliveryRangeSelector;