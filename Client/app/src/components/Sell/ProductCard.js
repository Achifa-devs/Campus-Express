// components/ProductCard.js
import js_ago from 'js-ago';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { set_boost_modal } from '../../../redux/modal/boost_modal';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, state='private', onDelete, onStatusChange, onPromote }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [exploreshop, setExploreShop] = useState(false);
  const isPromoted = eval(item.promotion)

  useEffect(() => {
    console.log(route.name)
    if (route.name === "explore-shop") {
      setExploreShop(true);
    } else {
      setExploreShop(false);
    }
  }, [route.name]);
  
  const onShare = async (item) => {
    try {
      // Build URL with price as the reference
      const url = `https://www.campussphere.net/store/product/${item.product_id}`;

      const result = await Share.share({
        message: `Check out this product for ₦${item.price} Campus Sphere: ${url}`,
        url: url, // For iOS, adds link preview
        title: `${item.title} Plan`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  

  const dispatch = useDispatch()
  
  const handleViewPress = useCallback(
    debounce((item) => {
      navigation.navigate('product', { data: item });
    }, 300, { leading: true, trailing: false }),
    [navigation]
  );

  const handlePromotePress = (data) => {
    if (!exploreshop) {
      if(!isPromoted){
        dispatch(set_boost_modal({data: data, visible: 1}))
      }else{
        navigation.navigate('metrics', {
          data: data
        })
      }
    }else{
      navigation.navigate('product', { data: item });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={e => {
      if(exploreshop){
        navigation.navigate('product', {data: item})
      }else{
        handlePromotePress(item)
      }
    }}>
      {/* Thumbnail - Clickable for navigation */}
      <TouchableOpacity onPress={e => {
        if(exploreshop){
          navigation.navigate('product', {data: item})
        }else{
          handlePromotePress(item)
        }
      }}>
        <Image source={{ uri: item.thumbnail_id }} style={styles.thumbnail} />
        
        {/* Boost Badge - Overlay on thumbnail */}
        {/* {!exploreshop ?
          isPromoted ? (
            <View style={styles.boostBadge}>
              <Icon name="rocket" size={12} color="#FFF" />
              <Text style={styles.boostBadgeText}>Promoted</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.promoteButton} 
              onPress={e => dispatch(set_boost_modal({data: item, visible: 1}))}
              activeOpacity={0.7}
            >
              <Icon name="rocket-outline" size={12} color="#FFF" />
              <Text style={styles.promoteButtonText}>Promote now</Text>
            </TouchableOpacity>
          ): ''} */}
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
            
            <TouchableOpacity onPress={e => onShare(item)} style={styles.actionButton}>
              <Icon name="share-social" size={16} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={e=>onDelete(item)} style={[styles.actionButton, styles.deleteButton]}>
              <Icon name="trash" size={16} color="#FF3B30" />
            </TouchableOpacity>
          </View>}
        </View>
      </View>
    </TouchableOpacity>
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
    position: 'relative',
  },
  thumbnail: {
    width: 100,
    height: 145,
    backgroundColor: '#F0F0F0',
  },
  // Boost/Promote elements
  boostBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
  },
  boostBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  promoteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 30,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
  },
  promoteButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
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