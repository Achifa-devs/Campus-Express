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

const { width } = Dimensions.get('window');

const ServicesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Sample data - replace with your actual data
  const categories = [
    { id: '1', name: 'All', icon: 'apps' },
    { id: '2', name: 'Food', icon: 'restaurant' },
    { id: '3', name: 'Retail', icon: 'cart' },
    { id: '4', name: 'Home Services', icon: 'home' },
    { id: '5', name: 'Automotive', icon: 'car' },
    { id: '6', name: 'Health & Medical', icon: 'medical' },
    { id: '7', name: 'Beauty', icon: 'cut' },
    { id: '8', name: 'Education', icon: 'school' },
  ];

  const featuredServices = [
    {
      id: '1',
      name: 'Premium Car Detailing',
      category: 'Automotive',
      rating: 4.8,
      reviews: 124,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyJTIwZGV0YWlsaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      isFeatured: true
    },
    {
      id: '2',
      name: 'Gourmet Catering Service',
      category: 'Food',
      rating: 4.9,
      reviews: 208,
      price: '$$$',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0ZXJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      isFeatured: true
    },
  ];

  const services = [
    {
      id: '3',
      name: 'Home Cleaning Experts',
      category: 'Home Services',
      rating: 4.7,
      reviews: 89,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsZWFuaW5nJTIwc2VydmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '4',
      name: 'Hair Salon & Spa',
      category: 'Beauty',
      rating: 4.6,
      reviews: 156,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '5',
      name: 'Mobile Phone Repair',
      category: 'Retail',
      rating: 4.5,
      reviews: 72,
      price: '$',
      image: 'https://images.unsplash.com/photo-1605789538467-fb6e242c1002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob25lJTIwcmVwYWlyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '6',
      name: 'Yoga & Meditation Classes',
      category: 'Health & Medical',
      rating: 4.9,
      reviews: 132,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
  ];

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
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
    >
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.serviceMeta}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews})</Text>
          </View>
          <Text style={styles.serviceCategory}>{item.category}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
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
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.servicesList}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ServicesScreen;