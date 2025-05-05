import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';

export default function DropdownExample({ dropdownData, name, placeholder, updateData }) {
  const [value, setValue] = useState('');

  const { location } = useSelector(s => s.location);

  useEffect(() => {
    if (location?.address?.state) {
      setValue(location.address.state);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        inputSearchStyle={styles.searchInput}
        data={dropdownData}
        search
        maxHeight={300}
        labelField="title"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
          updateData(name,item.value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 0,
    width: '100%'
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
