import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { set_option } from '../../../../../../../redux/option';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 3; // Account for padding

const navItems = [
  { name: 'cart-outline', activeName: 'cart', label: 'Products' },
  { name: 'bed-outline', activeName: 'bed', label: 'Lodges' },
  { name: 'construct-outline', activeName: 'construct', label: 'Services'},
  // { name: 'newspaper-outline', activeName: 'newspaper', label: 'News'},
  
];



const NavigationTabs = React.memo(() => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Products');

  const dispatch = useDispatch()
  

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => {
        const isActive = activeTab === item.label;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              dispatch(set_option(item?.label))
              setActiveTab(item?.label)
            }}
            style={[styles.tab, isActive && styles.activeTab]}
            activeOpacity={0.7}
          >
            <Icon 
              name={isActive ? item.activeName : item.name} 
              size={20} 
              color={isActive ? '#FF4500' : '#666'} 
              style={styles.icon}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  tab: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    position: 'relative',
  },
  activeTab: {
    // Additional active styles if needed
  },
  icon: {
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#FF4500',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '60%',
    backgroundColor: '#FF4500',
    borderRadius: 3,
  },
});

export default NavigationTabs;