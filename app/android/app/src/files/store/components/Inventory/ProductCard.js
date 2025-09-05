// components/ProductCard.js
import js_ago from 'js-ago';
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, onShare, state='private', onDelete, onStatusChange }) => {
  const navigation = useNavigation();
  
  // const handleNavigation = useCallback(
  //   debounce((item) => {
  //     navigation.navigate('user-product', { data: item });
  //   }, 300, { leading: true, trailing: false }),
  //   [navigation]
  // );

  const handleViewPress = useCallback(
    debounce((item) => {
      navigation.navigate('user-product', { data: item });
    }, 300, { leading: true, trailing: false }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      {/* Thumbnail - Clickable for navigation */}
      <TouchableOpacity>
        <Image source={{ uri: item.thumbnail_id }} style={styles.thumbnail} />
      </TouchableOpacity>
      
      {/* Content */}
      <View style={styles.content}>
        {/* Title and Price */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>{'₦' + new Intl.NumberFormat('en-us').format(item?.price)}</Text>
        </View>

        {/* Analytics */}
        <View style={styles.analytics}>
          <View style={styles.analyticItem}>
            <Icon name="eye" size={14} color="#666" />
            <Text style={styles.analyticText}>{item.views} views</Text>
          </View>
          <View style={styles.analyticItem}>
            <Icon name="star" size={14} color="#666" />
            <Text style={styles.analyticText}>{item.reviews || 0} reviews</Text>
          </View>
        </View>

        {/* Date and Status */}
        <View style={styles.footer}>
          <View style={styles.dateStatus}>
            <Text style={styles.date}>{js_ago(new Date(item.date))}</Text>
            <View style={[styles.statusBadge, { backgroundColor: item.state?.state === 'active' ? '#4CAF50' : '#666' }]}>
              <Text style={styles.statusText}>{item.state?.state || 'inactive'}</Text>
            </View>
          </View>
          
          {/* Action Buttons - Now with View button */}
          {state === 'public'? '' :<View style={styles.actions}>
            <TouchableOpacity 
              onPress={() => handleViewPress(item)} 
              style={[styles.actionButton, styles.viewButton]}
            >
              <Icon name="eye" size={16} color="#FFF" />
              <Text style={[styles.actionText, styles.viewText]}>View</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onShare} style={styles.actionButton}>
              <Icon name="share-social" size={16} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onDelete} style={[styles.actionButton, styles.deleteButton]}>
              <Icon name="trash" size={16} color="#FF3B30" />
            </TouchableOpacity>
          </View>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 145,
    backgroundColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
  },
  analytics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  analyticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  analyticText: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateStatus: {
    flex: 1,
  },
  date: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 36,
    height: 36,
  },
  viewButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 8,
    minWidth: 70,
  },
  deleteButton: {
    backgroundColor: '#FFF6F6',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewText: {
    color: '#FFF',
  },
});

export default ProductCard;