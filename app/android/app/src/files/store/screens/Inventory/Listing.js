// screens/MyAdsScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert, Share, ActivityIndicator } from 'react-native';
import ProductCard from '../../components/Inventory/ProductCard';
import LodgeCard from '../../components/Inventory/LodgeCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import categoriesData from '../../../../../../../services.json'
import js_ago from 'js-ago';
import { useDispatch, useSelector } from 'react-redux';
import { set_boost_modal } from '../../../../../../../redux/boost_modal';
import axios from 'axios';

const Listing = () => {

  const dispatch = useDispatch()
  const route = useRoute();
  const { data } = route?.params;
  const { option } = useSelector(s => s?.option);
  const [exploreshop, setExploreShop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userAds, setUserAds] = useState([])
  useEffect(() => {
    setUserAds(data)
  }, [data])

  useEffect(() => {
    console.log(route.name)
    if (route.name === "user-explore-shop") {
      setExploreShop(true);
    } else {
      setExploreShop(false);
    }
  }, [route.name]);

  const onDelete = async (item, type='image') => {
    setIsLoading(true)
    try {
      const response = await axios.get('https://cs-node.vercel.app/vendor/delete-product', {params: {product_id: item.product_id, type: type}});
  
      const result = await response.data;
      if(result.success){
        setIsLoading(false);
        Alert.alert("Success", "Item was deleted successfully!");
        let newData = data.filter(data => data.product_id !== item.product_id);
        setUserAds(newData);
      }else{
        Alert.alert(
          "Error", "Internal server error"
        )
        Alert.alert(
          "Internal server error",
          "Try again to see if it works out successfully.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("User canceled"),
            },
            {
              text: "Try again",
              onPress: () => {
                onDelete()
              },
            },
          ],
          { cancelable: false }
        );
      }

    } catch (error) {
      console.log("error: ", error)
      setIsLoading(false)
    }
  }
  
  
  const onShare = async (item) => {
    try {
      // Build URL with price as the reference
      const url = `https://www.campussphere.net/store/product/${item.product_id}`;

      const result = await Share.share({
        message: `Check out this service for ₦${item.price} on Campus Sphere!: ${url}`,
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

  const renderServiceItem = ({ item, navigation }) => {
    const isPromoted = eval(item.promotion);
    
    const handlePromotePress = (data) => {
      if (!exploreshop) {
        navigation.navigate('user-metrics', {
          data: data
        })
      } else {
        navigation.navigate('user-product', { data: data });
      }
    };
    

    return (
      <TouchableOpacity
        style={styles.serviceCard}
        onPress={e => handlePromotePress(item)}
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
              onPress={e => dispatch(set_boost_modal({data: item, visible: 1}))}
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

          <TouchableOpacity onPress={e => onShare(item)} style={styles.actionButton}>
            <Icon name="share-social" size={16} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={e=>onDelete(item)} style={[styles.actionButton, styles.deleteButton, {right: 45}]}>
            <Icon name="trash" size={16} color="#FF3B30" />
          </TouchableOpacity>
      </View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation()

  const renderItem = ({ item }) => {
    if (item.purpose === 'product') {
      return (
        <ProductCard
          item={item}
          onDelete={onDelete}
        />
      );
    } else if (item.purpose === 'accomodation') {
      return (
        <LodgeCard
          item={item}
          onDelete={onDelete}
        />
      );
    } else{
      return renderServiceItem({ item, navigation });
    }
  };

  if(isLoading){
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
      }}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    );
  }

  return (

    <>
      {  
        data.length > 0
        ?
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
          
          <FlatList
            data={
              option === 'Products'
              ?userAds.filter(item => item.purpose === 'product')
              :option === 'Lodges'
              ?userAds.filter(item => item.purpose === 'accomodation')
              :userAds.filter(item => item.purpose === 'service')
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
    position: 'absolute',
    bottom: 2, 
    right: 2
  },
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