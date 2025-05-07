import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Size({ updateType, category, type_list, error, onFocus }) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(null);

  const handleChange = (item) => {
    setValue(item.title);
    updateType(item.title);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type</Text>
      
      <Dropdown
        style={[
          styles.dropdown,
          isFocused && styles.dropdownFocused,
          error && styles.dropdownError
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={type_list}
        search={false}
        maxHeight={300}
        labelField="title"
        valueField="title"
        placeholder={`Select ${category} type`}
        value={value}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        renderLeftIcon={() => (
          <Ionicons 
            name="options-outline" 
            size={20} 
            color={isFocused ? '#FF4500' : '#666'} 
            style={styles.icon}
          />
        )}
        renderItem={(item) => (
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.title}</Text>
            {value === item.title && (
              <Ionicons name="checkmark" size={20} color="#FF4500" />
            )}
          </View>
        )}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.hintText}>
          Select the appropriate size for this product
        </Text>
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
  dropdown: {
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
  },
  dropdownFocused: {
    borderColor: '#FF4500',
    backgroundColor: '#fff',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownError: {
    borderColor: '#ff3333',
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 10,
  },
  item: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 15,
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