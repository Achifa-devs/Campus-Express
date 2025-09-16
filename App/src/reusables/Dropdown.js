import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function DropdownComp({ dropdownData, default_value, fieldName, input_name, placeholder, updateData, dropdownPosition }) {
  const [value, setValue] = useState('');


  useEffect(() => {
    console.log('default_value: ', default_value)
    setValue({title: default_value});
  }, [default_value]);

  useEffect(() => {
    console.log('dropdownData: ', dropdownData)
    setValue({title: dropdownData});
  }, [dropdownData]);

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
          console.log(input_name,item[key])
          updateData(item[key], input_name);
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
