import React, {useEffect, useState} from 'react'
import { Alert, Image, StyleSheet, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import { Text } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from '../components/Inventory/ProductCard';
import LodgeCard from '../components/Inventory/LodgeCard';
import axios from 'axios';

export default function Shop() {
    let navigation = useNavigation()
    const {
        shop, reviews: review, user, user_id
    } = useRoute()?.params
    const { width } = Dimensions.get('window');

    useEffect(() => {
        if (shop && shop.shop_id && user?.user_id) {
        setTimeout(async () => {
            try {
                const res = await axios.post('https://cs-server-olive.vercel.app/shop-view', {
                    user_id: user?.user_id,
                    shop_id: shop?.shop_id
                });
            
                const response = res.data;
                if (response?.success) {  
                    console.log('Done...');
                    
                }
            } catch (error) {
                console.error('Error in shop view request:', error);
            }
        }, 3000);
        }
    }, [shop, user]);
    const { products } = useSelector(s => s.products);
   
  return (
    <> 
        <View style={styles.container}>
            {/* Header Banner */}
            <LinearGradient
                colors={['#FF4500', '#FF7F50']}
                style={styles.banner}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            >
                <View style={styles.bannerContent}>
                    <Ionicons name="storefront" size={40} color="#FFF" />

                    <Text style={styles.bannerText}>{shop?.title}</Text>
                    <Text style={[styles.verificationText, {color: '#fff'}]}>{user?.campus}</Text>
                    
                </View>
            </LinearGradient>

            {/* Shop Header */}
            <View style={styles.shopHeader}>
                <View style={styles.avatarContainer}>
                    {shop?.logo_url ? (
                        <Image 
                            style={styles.avatar} 
                            source={{uri: shop?.logo_url}} 
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="storefront" size={32} color="#FF4500" />
                        </View>
                    )}
                </View>
                
                <View style={styles.shopInfo}>
                    <Text style={styles.shopTitle}>{user?.fname} {user?.lname}</Text>
                    <TouchableOpacity style={styles.verificationBadge}>
                        <Ionicons name={eval(shop.is_verified) ? "shield-checkmark" : "close-circle"} size={16} color="#FF4500" />
                        <Text style={styles.verificationText}>{eval(shop.is_verified) ? 'Verified': 'Not Verified'}</Text>
                    </TouchableOpacity>
                </View>  
                
            </View>
            
            {/* Description */}
            {shop?.description && (
                <View style={styles.descriptionCard}>
                    <Text style={styles.descriptionText}>{shop?.description}</Text>
                </View>
            )} 
            <ShopAds user_id={user_id}/>
            
        </View>
    </>
  )
}


function ShopAds({user_id}) {

    const [userAds, setUserAds] = useState([]);
  
    // Initial load
    useEffect(() => {
        if (user_id) {
            fetch(`https://cs-server-olive.vercel.app/vendor/products?user_id=${user_id}`, {
              headers: {
                "Content-Type": "Application/json"
              }
            })   
            .then(async(result) => {
              let response = await result.json()
              setUserAds(response?.data)
            })       
            .catch((err) => {
              Alert.alert('Network error, please try again.')
              console.log(err)
            })
        }
    }, [user_id]); 

    const handleShare = (item) => {
        console.log('Share:', item);
    };

    const handleDelete = (item) => {
        console.log('Delete:', item);
    };

    const handleStatusChange = (item) => {
        console.log('Change status:', item);
    };
    const renderItem = ({ item }) => {
        if (item.purpose === 'product') {
          return (
            <ProductCard
                state={'public'}
                item={item}
                onShare={() => handleShare(item)}
                onDelete={() => handleDelete(item)}
                onStatusChange={() => handleStatusChange(item)}
            />
          );
        } else if (item.purpose === 'accomodation') {
          return (
            <LodgeCard
                state={'public'}
                item={item}
                onShare={() => handleShare(item)}
                onDelete={() => handleDelete(item)}
                onStatusChange={() => handleStatusChange(item)}
            />
          );
        }
        return null;
      };
    
      return (
        <View style={{ flex: 1, padding: 5 }}>

            <View style={styles.bar} accessibilityRole="summary">
                <Text style={styles.text}>{`${userAds.length} Packages available`}</Text>
            </View>
                
            <FlatList
                data={userAds}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    bar: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        borderRadius: 4,
        backgroundColor: '#FFF',   // soft background; change as you like
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollView: {
        flex: 1,
    },
    banner: {
        height: 140,
        
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerContent: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
    },
    shopHeader: {
        backgroundColor: '#FFF',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: -40,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        backgroundColor: '#FFF8F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shopInfo: {
        flex: 1,
        marginLeft: 16,
    },
    shopTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2D3436',
        marginBottom: 8,
    },
    verificationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#FFE5DE',
    },
    verificationText: {
        color: '#FF4500',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    editButton: {
        padding: 8,
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
    },
    descriptionCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#2D3436',
    },
    sectionCard: {
        backgroundColor: '#FFF',
        marginTop: 8,
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2D3436',
    },
    visibilityInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    visibilityText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryTag: {
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    categoryTagText: {
        color: '#2D3436',
        fontSize: 14,
        fontWeight: '500',
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 20,
    },
    reviewsContainer: {
        gap: 16,
    },
    reviewItem: {
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },
    reviewContent: {
        marginTop: 8,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 4,
    },
    reviewComment: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 8,
    },
    reviewDate: {
        fontSize: 14,
        color: '#999',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 22,
    },
    analyticsContainer: {
        gap: 12,
    },
    analyticsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
    },
    analyticsIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF8F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    analyticsContent: {
        flex: 1,
    },
    analyticsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 4,
    },
    analyticsSummary: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F3F5',
        marginTop: 8,
    },
    viewAllText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginRight: 8,
    },
    // Modal Styles
    modalHeader: {
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2D3436',
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#FFF8F6',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFE5DE',
        marginBottom: 24,
    },
    infoText: {
        fontSize: 16,
        color: '#2D3436',
        lineHeight: 22,
        marginTop: 8,
        marginBottom: 12,
    },
    learnMoreText: {
        fontSize: 16,
        color: '#FF4500',
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#2D3436',
    },
    multilineInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    sectionTitleModal: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 16,
    },
    categoryScroll: {
        maxHeight: 200,
        marginBottom: 24,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        gap: 8,
    },
    categoryPillSelected: {
        backgroundColor: '#E7F5FF',
        borderColor: '#339AF0',
    },
    categoryText: {
        color: '#2D3436',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: '#339AF0',
    },
    selectedCategories: {
        marginBottom: 24,
    },
    selectedScroll: {
        maxHeight: 120,
    },
    selectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    selectedPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7F5FF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#339AF0',
        gap: 8,
    },
    selectedText: {
        color: '#339AF0',
        fontSize: 14,
        fontWeight: '500',
    },
    setupButton: {
        backgroundColor: '#FF4500',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginBottom: 20,
    },
    setupButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
});