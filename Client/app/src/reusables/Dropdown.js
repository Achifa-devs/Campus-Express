import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function DropdownComp({
  dropdownData,
  default_value,
  fieldName,
  input_name,
  placeholder,
  updateData,
  dropdownPosition
}) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (default_value) {
      setValue(default_value); // ✅ just set the string value
    }
  }, [default_value]);

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
        value={value} // ✅ this should be the raw value, not an object
        onChange={item => {
          setValue(item[fieldName || "title"]); // ✅ set the value
          updateData(item[fieldName || "title"], input_name);
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
