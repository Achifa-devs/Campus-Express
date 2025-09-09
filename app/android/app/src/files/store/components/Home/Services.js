import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import categoriesData from '../../../../../../../services.json'
import js_ago from 'js-ago';
const { width } = Dimensions.get('window');

const ServicesScreen = ({data}) => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('All');

 
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


  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item.name && styles.activeCategory
      ]}
      onPress={() => setActiveCategory(item.name)}
    >
      <Icon
        name={item.icon}
        size={24}
        color={activeCategory === item.name ? '#FF4500' : '#666'}
      />
      <Text
        style={[
          styles.categoryText,
          activeCategory === item.name && styles.activeCategoryText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceItem = ({ item }) => (

    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate('user-service-room', { data: item })}
    >
      <Image 
        source={{ uri: getCategoryImage(item.category) || item.image }} 
        style={styles.serviceImage} 
      />
      {item.promotion && (
        <View style={styles.boostBadge}>
          <Icon name="rocket" size={12} color="#FFF" />
          <Text style={styles.boostBadgeText}>Sponsored</Text>
        </View>
      )} 
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName} numberOfLines={1}>{item.title}</Text>
        <View style={styles.serviceMeta}>
          {/* <View style={styles.ratingContainer}></View> */}
          <Text style={styles.serviceCategory}>{item.category} - <Text style={{fontWeight: 'bold'}}>{item?.others?.gender}</Text></Text>
          <Text style={styles.serviceStats}>{item?.views} {parseInt(item?.views)>1?'views':'view'} • {js_ago(new Date(item?.date))}</Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );


  const renderFeaturedService = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
    >
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredBadge}>FEATURED</Text>
        <Text style={styles.featuredName}>{item.name}</Text>
        <View style={styles.featuredMeta}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.featuredRating}>{item.rating}</Text>
            <Text style={styles.featuredReviews}>({item.reviews})</Text>
          </View>
          <Text style={styles.featuredPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     

      

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}

        {/* Featured Services */}
        {/* <Text style={styles.sectionTitle}>Featured Services</Text>
        <FlatList
          data={featuredServices}
          renderItem={renderFeaturedService}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        /> */}

        {/* Nearby Services */}
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Services Near You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View> */}

        <FlatList
          data={data}
          renderItem={renderServiceItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.servicesList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="search-outline" size={48} color="#DFE3E8" />
              <Text style={styles.emptyTitle}>No Service found</Text>
              <Text style={styles.emptySubtitle}>
                Try refreshing and also adjust your filter or location
              </Text>
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
   boostBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  boostBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#212B36',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#637381',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceStats: {
    fontSize: 12,
    paddingVertical: 6,
    color: '#606060',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 16,
    color: '#000',
  },
  categoriesList: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#f8f8f8',
    minWidth: 80,
  },
  activeCategory: {
    backgroundColor: '#FFF0E8',
  },
  categoryText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#FF4500',
    fontWeight: '600',
  },
  featuredList: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  featuredCard: {
    width: width * 0.75,
    height: 200,
    borderRadius: 6,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  featuredBadge: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredRating: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  featuredReviews: {
    color: '#ccc',
    fontSize: 12,
    marginLeft: 4,
  },
  featuredPrice: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAllText: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '500',
  },
  servicesList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
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
});

export default ServicesScreen;