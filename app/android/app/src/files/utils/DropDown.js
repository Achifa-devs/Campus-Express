import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';

export default function DropdownExample({ dropdownData, defaultValue, fieldName, name, placeholder, updateData, dropdownPosition }) {
  const [value, setValue] = useState('');


  useEffect(() => {
    setValue({title: defaultValue});
  }, [defaultValue]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        inputSearchStyle={styles.searchInput}
        data={dropdownData}
        search
        dropdownPosition={dropdownPosition || 'bottom'}
        maxHeight={300}
        labelField={fieldName || "title"}
        valueField={fieldName || "title"}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item);
          let key = fieldName || "title";
          updateData(name,item[key]);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 0,
    width: '100%',
    marginVertical: 20
  },
  dropdown: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    width: '100%'
  },
  placeholder: {
    color: '#999',
    fontSize: 16,
  },
  selectedText: {
    color: '#333',
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
  },
});
