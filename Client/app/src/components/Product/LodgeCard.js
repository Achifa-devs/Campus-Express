// components/LodgeCard.js
import js_ago from 'js-ago';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { debounce } from 'lodash';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { set_boost_modal } from '../../../redux/modal/boost_modal';

const { width } = Dimensions.get('window');

const LodgeCard = ({ item, state='private', onDelete, onPromote }) => {
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

    const handleNavigation = useCallback(
        debounce((item) => {
          navigation.navigate('lodge-room', { data: item });
        }, 300, { leading: true, trailing: false }),
        [navigation]
    );

    const dispatch = useDispatch();

    const handlePromotePress = (data) => {
      if (!exploreshop) {
        navigation.navigate('metrics', {
          data: data
        })
      } else{
        navigation.navigate('lodge-room', { data: item });
      }
    };

    const onShare = async (item) => {
      try {
        // Build URL with price as the reference
        const url = `https://www.campussphere.net/store/product/${item.product_id}`;
  
        const result = await Share.share({
          message: `Check out this lodge for ₦${item.price} on Campus Sphere: ${url}`,
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

  return (
    <TouchableOpacity style={styles.container} onPress={e => {
      if(exploreshop){
        navigation.navigate('product', {data: item})
      }else{
        handlePromotePress(item)
      }
    }}>
      {/* Video Thumbnail - Takes 70% of card */}
      <TouchableOpacity onPress={e => {
        if(exploreshop){
          navigation.navigate('product', {data: item})
        }else{
          handlePromotePress(item)
        }
      }}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: item.thumbnail_id }}
            style={styles.video}
            paused={true}
            muted={true}
            resizeMode="cover"
          />
          
          {/* Overlay buttons on video */}
          <View style={styles.videoOverlay}>
            <TouchableOpacity style={styles.playButton}>
              <Icon name="play-circle" size={36} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Boost Badge/Promote Button - Overlay on video */}
          {/* stage 2 or 3 */}
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
        </View>
      </TouchableOpacity>

      {/* Content - Takes 30% of card */}
      <View style={styles.content}>
        {/* Title and Price */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>
            {
                '₦' + new Intl.NumberFormat('en-us').format(item?.price) + ' to pay ₦' + new Intl.NumberFormat('en-us').format(item?.others?.lodge_data?.upfront_pay) 
            }
          </Text>
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
        <View style={styles.dateStatus}>
          <Text style={styles.date}>{js_ago(new Date(item.date))}</Text>
          <View style={[styles.statusBadge, { backgroundColor: item.state?.state === 'active' ? '#4CAF50' : '#666' }]}>
            <Text style={styles.statusText}>{item.state?.state || 'inactive'}</Text>
          </View>
        </View>

        {/* Action Buttons - Now with View button */}
        {state === 'public'?'':<View style={styles.actions}>
          <TouchableOpacity 
             onPress={e => handleNavigation(item)}
            style={[styles.actionButton, styles.viewButton]}
          >
            <Icon name="eye" size={20} color="#FFF" />
            <Text style={[styles.actionText, styles.viewText]}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={e => onShare(item)} style={styles.actionButton}>
            <Icon name="share-social" size={20} color="#666" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={e=>onDelete(item, 'video')} style={[styles.actionButton, styles.deleteButton]}>
            <Icon name="trash" size={20} color="#FF3B30" />
            <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  container: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  videoContainer: {
    height: 200,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    padding: 8,
  },
  // Boost/Promote elements

  promoteButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 0,
    gap: 4,
    zIndex: 10,
  },
  promoteButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF4500',
  },
  analytics: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
  },
  analyticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  analyticText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  dateStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    minWidth: 80,
  },
  viewButton: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  deleteButton: {
    backgroundColor: '#FFF6F6',
    borderColor: '#FFE4E4',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  viewText: {
    color: '#FFF',
  },
  deleteText: {
    color: '#FF3B30',
  },
});

export default LodgeCard;