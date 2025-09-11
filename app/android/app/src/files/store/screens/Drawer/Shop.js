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
import { set_sub_modal } from '../../../../../../../redux/sub';
import { BlurView } from '@react-native-community/blur';
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
      axios.get(`https://cs-server-olive.vercel.app/vendor/shop-reviews?shop_id=${shop?.shop_id}`)
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
            axios.post(`https://cs-server-olive.vercel.app/vendor/update-shop`, {
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
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', {
            uri: image.uri,
            name: image.fileName || `photo_${Date.now()}.jpg`,
            type: image.type || 'image/jpeg',
        });

        const response = await axios.post('https://cs-server-olive.vercel.app/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });

        const result = response.data;
        console.log(result.data.url);

        if (result.success && result.data.url) {
            set_logo(result.data.url);
            setIsLoading(false);
        }
    } catch (err) {
        console.error('Upload failed:', err.message);
    } finally {
        setIsLoading(false);
    }
    };

    const deleteFromServer = async (url) => {
        try {
            setIsLoading(true);
            const response = await axios.post('https://cs-server-olive.vercel.app/delete', {
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
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        );
    }

    function handleSub(params) {
        if(!shop.tools){
            dispatch(set_sub_modal(1))
        }
    }

  return (
    <> 
        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Shop Settings</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle" size={20} color="#FF4500" />
                    <Text style={styles.infoText}>Update your shop information to improve visibility and customer trust</Text>
                </View>
            
                {/* Image Upload Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Shop Logo</Text>
                    <View style={styles.imageUploadContainer}>
                        <TouchableOpacity 
                            style={styles.imageUploadButton}
                            onPress={selectShopLogo}
                        >
                            {shop?.logo_url ? (
                                <Image 
                                    source={{ uri: shop.logo_url }} 
                                    style={styles.previewImage}
                                />
                            ) : (
                                <View style={styles.uploadPlaceholder}>
                                    <Ionicons name="camera" size={32} color="#6C757D" />
                                    <Text style={styles.uploadText}>Add Logo</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        
                        {shop?.logo_url && (
                            <TouchableOpacity 
                                style={styles.changeButton}
                                onPress={selectShopLogo}
                            >
                                <Ionicons name="sync" size={16} color="#FFF" />
                                <Text style={styles.changeButtonText}>Change</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {!isCategory ? (
                    <>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Shop Name</Text>
                            <TextInput 
                                style={styles.textInput} 
                                onChangeText={set_title}   
                                placeholder="Enter your shop name" 
                                placeholderTextColor="#999"
                                defaultValue={shop?.title}
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Shop Description</Text>
                            <TextInput
                                multiline
                                placeholder="Describe what makes your shop unique..."
                                placeholderTextColor="#999"
                                onChangeText={set_description}   
                                style={[styles.textInput, styles.multilineInput]}
                                textAlignVertical="top"
                                defaultValue={shop?.description}
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.sectionTitleModal}>Shop Categories</Text>
                        <Text style={styles.sectionSubtitle}>Select categories that best describe your products</Text>
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
                        
                        {list.length > 0 && (
                            <View style={styles.selectedCategories}>
                                <Text style={styles.sectionTitleModal}>Selected Categories</Text>
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
                        )}
                    </>
                )}
                
                <View style={styles.modalActions}>
                    <TouchableOpacity 
                        onPress={() => setModalVisible(false)} 
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={updateShop} 
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BottomModal>
        
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header Banner */}
                <LinearGradient
                    colors={['#FF4500', '#FF6347']}
                    style={styles.banner}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                >
                    <View style={styles.bannerContent}>
                        <View style={styles.bannerIcon}>
                            <Ionicons name="storefront" size={32} color="#FFF" />
                        </View>
                        <Text style={styles.bannerTitle}>{shop?.title || 'Your Shop'}</Text>
                        <Text style={styles.bannerSubtitle}>{user?.campus}</Text>
                    </View>
                </LinearGradient>

                {/* Shop Header */}
                <View style={styles.shopHeader}>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            {shop?.logo_url ? (
                                <Image 
                                    style={styles.avatar} 
                                    source={{uri: shop?.logo_url}} 
                                />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Ionicons name="storefront" size={28} color="#FF4500" />
                                </View>
                            )}
                        </View>
                        
                        <View style={styles.shopInfo}>
                            <Text style={styles.shopTitle}>{user?.fname} {user?.lname}</Text>
                            <View style={styles.verificationSection}>
                                <View style={[
                                    styles.verificationBadge,
                                    eval(shop?.is_verified) ? styles.verified : styles.notVerified
                                ]}>
                                    <Ionicons 
                                        name={eval(shop?.is_verified) ? "shield-checkmark" : "alert-circle"} 
                                        size={16} 
                                        color={eval(shop?.is_verified) ? "#10B981" : "#FF4500"} 
                                    />
                                    <Text style={styles.verificationText}>
                                        {eval(shop?.is_verified) ? 'Verified Shop' : 'Verification Pending'}
                                    </Text>
                                </View>
                            </View>
                        </View>   
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => toggleModal(false)}
                    >
                        <Ionicons name="create-outline" size={22} color="#FF4500" />
                    </TouchableOpacity>
                </View>
                
                {/* Stats Overview */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Ionicons name="eye-outline" size={20} color="#536878" />
                        <Text style={styles.statNumber}>{products.reduce((sum, item) => sum + parseInt(item.views || 0), 0)}</Text>
                        <Text style={styles.statLabel}>Views</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Ionicons name="mail-outline" size={20} color="#10B981" />
                        <Text style={styles.statNumber}>{review.length}</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Ionicons name="star-outline" size={20} color="#FF4500" />
                        <Text style={styles.statNumber}>
                            {review.length > 0 ? (review.reduce((sum, item) => sum + item.rating, 0) / review.length).toFixed(1) : '0.0'}
                        </Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>
                
                {/* Description */}
                {shop?.description && (
                    <View style={styles.descriptionCard}>
                        <Text style={styles.descriptionLabel}>About</Text>
                        <Text style={styles.descriptionText}>{shop?.description}</Text>
                    </View>
                )} 
                
                {/* Reviews Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Customer Reviews</Text>
                            <View style={styles.ratingSummary}>
                                <StarRating
                                    rating={review.length > 0 ? review.reduce((sum, item) => sum + item.rating, 0) / review.length : 0}
                                    starSize={18}
                                    color="#FF4500"
                                    starStyle={{marginRight: 2}}
                                    onChange={() => {}}
                                />
                                <Text style={styles.ratingText}>({review.length} reviews)</Text>
                            </View>
                        </View>
                    </View>
                    
                    {review.length > 0 ? (
                        <View style={styles.reviewsContainer}>
                            {review.slice(0, 2).map((item, index) => (
                                <View key={index} style={styles.reviewItem}>
                                    <View style={styles.reviewHeader}>
                                        <StarRating
                                            rating={item.rating}
                                            starSize={16}
                                            color="#FF4500"
                                            starStyle={{marginRight: 1}}
                                            onChange={() => {}}
                                        />
                                        <Text style={styles.reviewDate}>
                                            {new Date(item.date).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    {item.comment && (
                                        <Text style={styles.reviewComment} numberOfLines={3}>
                                            "{item.comment}"
                                        </Text>
                                    )}
                                    <Text style={styles.reviewer}>- {item.review}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <ReviewSvg width={60} height={60} />
                            <Text style={styles.emptyStateTitle}>No Reviews Yet</Text>
                            <Text style={styles.emptyStateText}>
                                Customer reviews will appear here once you start receiving feedback.
                            </Text>
                        </View>
                    )}
                    
                    {review.length > 0 && (
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('user-reviews', {data: review})} 
                            style={styles.viewAllButton}
                        >
                            <Text style={styles.viewAllText}>View All Reviews</Text>
                            <Ionicons name="arrow-forward" size={16} color="#FF4500" />
                        </TouchableOpacity>
                    )}
                </View>  
                
                {/* Analytics Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <View>
                           <TouchableOpacity style={styles.sectionHeader} onPress={() => {
                                if(shop.tools){
                                    navigation.navigate('user-analytics')
                                }else{
                                    handleSub()
                                }
                            }}>
                                <View style={styles.premiumSectionHeader}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={[styles.sectionTitle, {marginRight: 8}]}>Shop Analytics</Text>
                                        <View style={styles.premiumBadge}>
                                            <Ionicons name="medal" size={14} color="#FFD700" />
                                            <Text style={styles.premiumText}>PREMIUM</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
 
                            <View style={styles.visibilityInfo}>
                                <Ionicons name="lock-closed" size={14} color="#64748B" />
                                <Text style={styles.visibilityText}>Private to you</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.analyticsGrid}>
                        <View style={styles.analyticsCard}>
                            <View style={[styles.analyticsIcon, {backgroundColor: '#EFF6FF'}]}>
                                <Ionicons name="stats-chart" size={24} color="#3B82F6" />
                            </View>
                            <Text style={styles.analyticsNumber}>
                                {shop.promotion ? products.reduce((sum, item) => sum + parseInt(item.impression || 0), 0).toLocaleString() : '***'}
                            </Text>
                            <Text style={styles.analyticsLabel}>Post Impressions</Text>
                        </View>
                        
                        <View style={styles.analyticsCard}>
                            <View style={[styles.analyticsIcon, {backgroundColor: '#F0FDF4'}]}>
                                <Ionicons name="compass" size={24} color="#22C55E" />
                            </View>
                            <Text style={styles.analyticsNumber}>
                                {shop.promotion ? products.reduce((sum, item) => sum + parseInt(item.search_appearances || 0), 0).toLocaleString() : '***'}
                            </Text>
                            <Text style={styles.analyticsLabel}>Search Appearances</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        onPress={() => {
                            if(shop.tools){
                                navigation.navigate('user-analytics')
                            }else{
                                handleSub()
                            }
                        }} 
                        style={styles.analyticsButton}
                    >
                        <Text style={styles.analyticsButtonText}>{
                            shop.tools? 'View Detailed Analytics' : 'Subscribe To View Analytics'    
                        }</Text>
                        <Ionicons name="arrow-forward" size={16} color="#FF4500" />
                    </TouchableOpacity>
                </View> 
            </ScrollView>
        </View>
    </>
  )
}

const styles = StyleSheet.create({

    premiumSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 0,
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    premiumText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#D4AF37',
        marginLeft: 4,
        textTransform: 'uppercase',
        },
        premiumIndicator: {
        position: 'relative',
        padding: 4,
    },
    premiumTooltip: {
        position: 'absolute',
        top: -30,
        left: -40,
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        width: 100,
    },
    tooltipText: {
        color: '#FFF',
        fontSize: 10,
        textAlign: 'center',
    },
    premiumGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollView: {
        flex: 1,
    },
    banner: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerContent: {
        alignItems: 'center',
        padding: 20,
    },
    bannerIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    bannerTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    bannerSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        fontWeight: '500',
    },
    shopHeader: {
        backgroundColor: '#FFF',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    avatarSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginTop: -40,
        marginRight: 16,
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
    },
    shopTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
    },
    verificationSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verificationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    verified: {
        backgroundColor: '#ECFDF5',
    },
    notVerified: {
        backgroundColor: '#FEF2F2',
    },
    verificationText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    editButton: {
        padding: 10,
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
    },
    statsContainer: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginVertical: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 10,
    },
    descriptionCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    descriptionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#4B5563',
    },
    sectionCard: {
        backgroundColor: '#FFF',
        marginTop: 8,
        padding: 20,
        borderRadius: 0,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    ratingSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#64748B',
        marginLeft: 8,
    },
    visibilityInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    visibilityText: {
        fontSize: 12,
        color: '#64748B',
        marginLeft: 4,
    },
    reviewsContainer: {
        gap: 16,
    },
    reviewItem: {
        padding: 16,
        backgroundColor: '#F9FAFB',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewDate: {
        fontSize: 12,
        color: '#6B7280',
    },
    reviewComment: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
        marginBottom: 8,
        fontStyle: 'italic',
    },
    reviewer: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
    },
    emptyStateTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
    analyticsGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    analyticsCard: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 20,
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    analyticsIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    analyticsNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    analyticsLabel: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
        fontWeight: '500',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        marginTop: 8,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF4500',
        marginRight: 8,
    },
    analyticsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    analyticsButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF4500',
        marginRight: 8,
    },
    // Modal Styles
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
    },
    closeButton: {
        padding: 4,
    },
    infoCard: {
        backgroundColor: '#FFFBEB',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FEF3C7',
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    infoText: {
        fontSize: 14,
        color: '#92400E',
        lineHeight: 20,
        marginLeft: 12,
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#64748B',
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    imageUploadContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    imageUploadButton: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F9FAFB',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    previewImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    uploadPlaceholder: {
        alignItems: 'center',
    },
    uploadText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF4500',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    changeButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    textInput: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#1F2937',
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    sectionTitleModal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#6B7280',
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
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 8,
    },
    categoryPillSelected: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    categoryText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: '#3B82F6',
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
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#3B82F6',
        gap: 6,
    },
    selectedText: {
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: '500',
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    cancelButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#FF4500',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});