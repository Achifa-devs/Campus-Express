import React, {useEffect, useState} from 'react'
import { Alert, Image, StyleSheet, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native'
import { ScrollView, Text, TextInput } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons';
import ReviewSvg from '../../../media/assets/review-svgrepo-com.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BottomModal from '../../utils/BtmModal';
import { items } from '../../../../../../../items.json'
import StarRating from 'react-native-star-rating-widget';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { set_shop } from '../../../../../../../redux/shop';
import js_ago from 'js-ago';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Shopile() {
    let [review, set_review] = useState([])
    const {shop} = useSelector(s => s.shop);

    const { products } = useSelector(s => s.products);

    let { user } = useSelector(s => s.user)
    let [list, set_list] = useState([])
    let [logo, set_logo] = useState(shop?.logo_url)
    let [title, set_title] = useState(shop?.title)
    let [description, set_description] = useState(shop?.description)
    let navigation = useNavigation()
    const { width } = Dimensions.get('window');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      axios.get(`http://192.168.0.4:9090/vendor/shop-reviews?shop_id=${shop?.shop_id}`)
      .then((res) => {
        set_review(res?.data?.data)
      }).catch(err=>console.log(err))
    }, [])

    useEffect(() => {
      const newShop = {...shop};
      newShop.logo_url = logo;
      dispatch(set_shop(newShop))
    }, [logo])

    const dispatch = useDispatch()

    function updateShop() {
        let list = [
            title,
            description,
            user.user_id,
            logo
        ]

        if (list.filter(item => item !== '' && item !== undefined).length === list.length) {
            setIsLoading(true)
            axios.post(`http://192.168.0.4:9090/vendor/update-shop`, {
                title,
                description,
                user_id: user?.user_id,
                logo
            })
            .then((response) => {
                console.log('response: ', response?.data)
                dispatch(set_shop(response?.data?.data))
                setIsLoading(false)
                setModalVisible(false)
            }).catch(err=>console.log(err))
        } else {
            Alert.alert("Validation error", "Please ensure no field is empty.");
        }
    }


   
    const [modalVisible, setModalVisible] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
       
    const toggleModal = (data) => {
        setIsCategory(data)
        setModalVisible(!modalVisible);
    };


    const selectShopLogo = () => {
        const options = {
          mediaType: 'photo',
          quality: 0.8,
          maxWidth: 500,
          maxHeight: 500,
        };
    
        launchImageLibrary(options, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            const image = response.assets[0];
            await uploadToServer(image);
          }
        });
    };
    
    const uploadToServer = async (image) => {
    try {
        setIsLoading(true); // Correct loading state
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            name: image.fileName || `photo_${Date.now()}.jpg`,
            type: image.type || 'image/jpeg',
        });

        const response = await axios.post('http://192.168.0.4:9090/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });

        const result = response.data;
        console.log(result.data.url);

        if (result.success && result.data.url) {
            set_logo(result.data.url);
            setIsLoading(false); // Correct loading state

        }
    } catch (err) {
        console.error('Upload failed:', err.message);
    } finally {
        setIsLoading(false); // Correct loading state
    }
    };

    const deleteFromServer = async (url) => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://192.168.0.4:9090/delete', {
                url
            });

            if (response.data && response.data.data.result === "ok") {
                selectShopLogo()
            }
        } catch (err) {
            console.error('Upload failed:', err.message);

        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF4500" />
          </View>
        );
    }
  return (
    <> 
        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <ScrollView style={{padding: 8}} showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Shop Settings</Text>
                </View>
                
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle" size={24} color="#FF4500" />
                    <Text style={styles.infoText}>You are trying to update your shop name and description.</Text>
                    <Text style={styles.learnMoreText}>Learn more in our help articles.</Text>
                </View>
            
                {/* Image Upload Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Shop Logo</Text>
                    <View style={{
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <TouchableOpacity 
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: '#F8F9FA',
                                borderWidth: 2,
                                borderColor: '#E9ECEF',
                                borderStyle: 'dashed',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 12,
                            }}
                            onPress={() => {
                                selectShopLogo()
                                console.log('Open image picker');
                            }}
                        >
                            {shop?.logo_url ? (
                                <Image 
                                    source={{ uri: shop.logo_url }} 
                                    style={{
                                        width: 96,
                                        height: 96,
                                        borderRadius: 48,
                                    }}
                                />
                            ) : (
                                <Ionicons name="camera" size={32} color="#6C757D" />
                            )}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#FF4500',
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 8,
                            }}
                            onPress={async() => {
                                // Add your image upload logic here
                                console.log('Upload image');
                                const result = await deleteFromServer(shop?.logo_url)
                            }}
                        >
                            <Ionicons name="cloud-upload" size={18} color="#FFF" />
                            <Text style={{
                                color: '#FFF',
                                fontWeight: '600',
                                marginLeft: 8,
                                fontSize: 14,
                            }}>
                                {shop?.logo_url ? 'Change Logo' : 'Upload Logo'}
                            </Text>
                        </TouchableOpacity>
                      
                        
                        {/* <Text style={{
                            fontSize: 12,
                            color: '#6C757D',
                            textAlign: 'center',
                            marginTop: 8,
                        }}>
                            Recommended: 300×300 pixels, JPG or PNG
                        </Text> */}
                    </View>
                </View>

                {!isCategory ? (
                    <>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Shop name</Text>
                            <TextInput 
                                style={styles.textInput} 
                                onChangeText={e => set_title(e)}   
                                placeholder="Enter shop name" 
                                placeholderTextColor="#999"
                                defaultValue={shop?.title}
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Shop description</Text>
                            <TextInput
                                multiline
                                placeholder="Describe your shop..."
                                placeholderTextColor="#999"
                                onChangeText={e => set_description(e)}   
                                style={[styles.textInput, styles.multilineInput]}
                                textAlignVertical="top"
                                defaultValue={shop?.description}
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.sectionTitleModal}>Shop categories</Text>
                        <ScrollView style={styles.categoryScroll} showsVerticalScrollIndicator={false}>
                            <View style={styles.categoryContainer}>
                                {items.category.map((item, index) => {
                                    const categoryKey = Object.keys(item)[0];
                                    const isSelected = list.includes(categoryKey);
                                    return (
                                        <TouchableOpacity 
                                            key={index} 
                                            disabled={isSelected}
                                            style={[
                                                styles.categoryPill,
                                                isSelected && styles.categoryPillSelected
                                            ]}
                                            onPress={() => set_list(data => [...data, categoryKey])}
                                        >
                                            <Text style={[
                                                styles.categoryText,
                                                isSelected && styles.categoryTextSelected
                                            ]}>
                                                {categoryKey}
                                            </Text>
                                            {!isSelected && (
                                                <Ionicons name="add" size={16} color="#FF4500" />
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </ScrollView>
                        
                        <View style={styles.selectedCategories}>
                            <Text style={styles.sectionTitleModal}>Selected categories</Text>
                            <ScrollView style={styles.selectedScroll} showsVerticalScrollIndicator={false}>
                                <View style={styles.selectedContainer}>
                                    {list.map((item, index) => (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={styles.selectedPill}
                                            onPress={() => set_list(list.filter(filt => filt !== item))}
                                        >
                                            <Text style={styles.selectedText}>{item}</Text>
                                            <Ionicons name="close" size={16} color="#FF4500" />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </>
                )}
                
                <TouchableOpacity 
                    onPress={() => updateShop()} 
                    style={styles.setupButton}
                >
                    <Text style={styles.setupButtonText}>Set up</Text>
                </TouchableOpacity>
            </ScrollView>
        </BottomModal>
        
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header Banner */}
                <LinearGradient
                    colors={['#FF4500', '#FF7F50']}
                    style={styles.banner}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                >
                    <View style={styles.bannerContent}>
                        {/* <Text style={styles.bannerText}>Your Shop Profile</Text> */}
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
                            <Text style={styles.verificationText}>{eval(shop?.is_verified) ? 'Verified': 'Get Verified Now'}</Text>
                        </TouchableOpacity>
                    </View>   
                    
                    <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => toggleModal(false)}
                    >
                        <Ionicons name="create-outline" size={22} color="#2D3436" />
                    </TouchableOpacity>
                </View>
                
                {/* Description */}
                {shop?.description && (
                    <View style={styles.descriptionCard}>
                        <Text style={styles.descriptionText}>{shop?.description}</Text>
                    </View>
                )} 
                
                {/* Categories */}
                {/* <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity onPress={() => toggleModal(true)}>
                            <Ionicons name="create-outline" size={22} color="#2D3436" />
                        </TouchableOpacity>
                    </View>
                    
                    {shop?.category && JSON.parse(shop.category).length > 0 ? (
                        <View style={styles.categoriesContainer}>
                            {JSON.parse(shop.category).map((item, index) => (
                                <View key={index} style={styles.categoryTag}>
                                    <Text style={styles.categoryTagText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.emptyText}>No categories added yet</Text>
                    )}
                </View>  */}
                
                {/* Reviews */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            <View style={styles.visibilityInfo}>
                                <Ionicons name="eye" size={16} color="#666" />
                                <Text style={styles.visibilityText}>Visible to the public</Text>
                            </View>
                        </View>
                    </View>
                    
                    {review.length > 0 ? (
                        <View style={styles.reviewsContainer}>
                            {review.slice(0, 3).map((item, index) => (
                                <View key={index} style={styles.reviewItem}>
                                    <StarRating
                                        rating={item.rating}
                                        starSize={20}
                                        color="#FF4500"
                                        starStyle={{marginRight: 2}}
                                    />
                                    <View style={styles.reviewContent}>
                                        <Text style={styles.reviewTitle}>{item.review}</Text>
                                        <Text style={styles.reviewComment}>{item.comment}</Text>
                                        <Text style={styles.reviewDate}>
                                            {new Date(item.date).toLocaleDateString()}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <ReviewSvg width={80} height={80} />
                            <Text style={styles.emptyStateText}>
                                Your reviews from clients will be shown here.
                            </Text>
                        </View>
                    )}
                    
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('user-reviews', {data: review})} 
                        style={styles.viewAllButton}
                    >
                        <Text style={styles.viewAllText}>Show all reviews</Text>
                        <Ionicons name="arrow-forward" size={18} color="#2D3436" />
                    </TouchableOpacity>
                </View>  
                
                {/* Analytics */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Analytics</Text>
                            <View style={styles.visibilityInfo}>
                                <Ionicons name="lock-closed" size={16} color="#666" />
                                <Text style={styles.visibilityText}>Private to you only</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.analyticsContainer}>
                        {[
                            {title: `${shop?.views} shop views`, summary: 'Discover who viewed your shop', icon: 'people'},
                            {title: `${products.reduce((sum, item) => sum + parseInt(item.impression), 0)} post impression`, summary: 'Checkout who\'s engaging with your product', icon: 'stats-chart'},
                            {title: `${products.reduce((sum, item) => sum + parseInt(item.search_appearances), 0)} search appearances`, summary: 'See how often your product appear in searches', icon: 'compass'}
                        ].map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.analyticsItem}
                            >
                                <View style={styles.analyticsIcon}>
                                    <Ionicons name={item.icon} size={24} color="#FF4500" />
                                </View>
                                <View style={styles.analyticsContent}>
                                    <Text style={styles.analyticsTitle}>{item.title}</Text>
                                    <Text style={styles.analyticsSummary}>{item.summary}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('user-analytics')} 
                        style={styles.viewAllButton}
                    >
                        <Text style={styles.viewAllText}>Show all analytics</Text>
                        <Ionicons name="arrow-forward" size={18} color="#2D3436" />
                    </TouchableOpacity>
                </View> 
            </ScrollView>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
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