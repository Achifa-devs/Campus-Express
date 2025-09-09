// screens/MyAdsScreen.js
import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProductCard from '../../components/Inventory/ProductCard';
import LodgeCard from '../../components/Inventory/LodgeCard';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import categoriesData from '../../../../../../../services.json'
import js_ago from 'js-ago';
import { useDispatch, useSelector } from 'react-redux';
import { set_boost_modal } from '../../../../../../../redux/boost_modal';

const Listing = () => {

  const dispatch = useDispatch()
  const route = useRoute();
  const { data } = route?.params;
  const { option } = useSelector(s => s?.option);
  
  const handleShare = (item) => {
    console.log('Share:', item);
  };

  const handleDelete = (item) => {
    console.log('Delete:', item);
  };

  const handleStatusChange = (item) => {
    console.log('Change status:', item);
  };

  const renderServiceItem = ({ item }) => {
    const isPromoted = eval(item.promotion);
    
    const handlePromotePress = (data) => {
      if(!isPromoted){
        console.log("data: ", data)
        dispatch(set_boost_modal({data: data, visible: 1}))
      }
    };
    

    return (
      <TouchableOpacity
        style={styles.serviceCard}
        // user-service-room
      >
        <TouchableOpacity style={styles.imageContainer} onPress={e => handlePromotePress(item)}>
          <Image 
            source={{ uri: getCategoryImage(item.category) || item.image }} 
            style={styles.serviceImage} 
          />
          
          {/* Boost Badge/Promote Button - Overlay on image */}
          {isPromoted ? (
            <View style={styles.boostBadge}>
              <Icon name="rocket" size={12} color="#FFF" />
              <Text style={styles.boostBadgeText}>Promoted</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.promoteButton} 
              onPress={e => handlePromotePress(item)}
              activeOpacity={0.7}
            >
              <Icon name="rocket-outline" size={12} color="#FFF" />
              <Text style={styles.promoteButtonText}>Promote now</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName} numberOfLines={1}>{item.title}</Text>
          <View style={styles.serviceMeta}>
            <Text style={styles.serviceCategory}>{item.category} - <Text style={{fontWeight: 'bold'}}>{item?.others?.gender}</Text></Text>
            <Text style={styles.serviceStats}>{item?.views} {parseInt(item?.views)>1?'views':'view'} • {js_ago(new Date(item?.date))}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    if (item.purpose === 'product') {
      return (
        <ProductCard
          item={item}
          onShare={() => handleShare(item)}
          onDelete={() => handleDelete(item)}
          onStatusChange={() => handleStatusChange(item)}
        />
      );
    } else if (item.purpose === 'accomodation') {
      return (
        <LodgeCard
          item={item}
          onShare={() => handleShare(item)}
          onDelete={() => handleDelete(item)}
          onStatusChange={() => handleStatusChange(item)}
        />
      );
    } else{
      return renderServiceItem({ item });
    }
  };

  return (

    <>
      {  
        data.length > 0
        ?
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
          
          <FlatList
            data={
              option === 'Products'
              ?data.filter(item => item.purpose === 'product')
              :option === 'Lodges'
              ?data.filter(item => item.purpose === 'accomodation')
              :data.filter(item => item.purpose === 'service')
            }
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
          />

        </View>
        :
        <View style={styles.emptyState}>
          <Icon name="images" size={50} color="#CCC" />
          <Text style={styles.emptyStateText}>No ads published yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Start by publishing your first ad to get noticed!
          </Text>
        </View>
      }
    </>


  );
};

  const getCategoryImage = (categoryName) => {
    for (let cat of categoriesData.items.category) {
      const keys = Object.keys(cat).filter(k => k !== "img");
      for (let key of keys) {
        if (key === categoryName) {
          return cat.img;
        }
      }
    }
    return null; // fallback
  };
 
const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    height: 25,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
    zIndex: 10,
  },
  promoteButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  serviceInfo: {
    padding: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  serviceMeta: {
    // Your existing styles
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  serviceStats: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    backgroundColor: '#FFF', 
    height: '100%',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceCard: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceImage: {
    width: 100,
    height: '100%',
  },
  serviceInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  serviceMeta: {
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#000',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  serviceCategory: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
})
export default Listing;