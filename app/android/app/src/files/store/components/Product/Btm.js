import js_ago from 'js-ago';
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import VerifiedSvg from '../../../media/assets/verified-check-svgrepo-com.svg' 
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReviewSvg from '../../../media/assets/review-svgrepo-com.svg'
import LinearGradient from 'react-native-linear-gradient';

export default function Btm({ updateUser, user_id, navigation, updateReview, updateShop }) {
    let [data, setData] = useState('')
    let [reviews, setReviews] = useState(null)
    let [shop, setShop] = useState('')
    let [user, set_user] = useState('')
    let [activeFilter, setActiveFilter] = useState('all')
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    function fetchReviews() {
        fetch(`https://cs-server-olive.vercel.app/reviews?shop_id=${shop?.shop_id}`, {
            headers: {
            "Content-Type": "Application/json" 
            }
        })
        .then(async (result) => {
            let response = await result.json();
            console.log("response: ", response)
            setReviews(response?.data);
        })
        .catch((err) => {
            Alert.alert('Network error, please try again.');
            console.log(err);
        });
    }
   
    
    useEffect(() => {
        if (user_id) {
            fetch(`https://cs-server-olive.vercel.app/owner?user_id=${user_id}`, {
                headers: {
                "Content-Type": "Application/json" 
                }
            })
            .then(async (result) => {
                let response = await result.json();
                console.log(response)
                const res = response.data[0];
                setData(res);
                set_user(res)
                updateUser(res)
                
            })
            .catch((err) => {
                Alert.alert('Network error, please try again.');
                console.log(err);
            });

            
            fetch(`https://cs-server-olive.vercel.app/details?user_id=${user_id}`, {
                headers: {
                "Content-Type": "Application/json" 
                }
            })
            .then(async (result) => {
                let response = await result.json();
                console.log(response)
                setShop(response.data[0]);
                
            })
            .catch((err) => {
                Alert.alert('Network error, please try again.');
                console.log(err);
            });
        }
    }, [user_id]);

    useEffect(() => {
        if (shop) {
            fetchReviews()
        }
    }, [shop])

    useEffect(() => {
      updateReview(reviews?[...reviews]: null)
    }, [reviews])
    useEffect(() => {
      updateShop(shop?shop: null)
    }, [shop])
    
    // Filter reviews based on active filter
    const filteredReviews = activeFilter === 'all' 
        ? reviews 
        : reviews.filter(item => item?.review?.split(' ')[0].toLowerCase() === activeFilter);
    
    // Count reviews by type
    const poorCount = reviews?.filter(item => item?.review?.split(' ')[0].toLowerCase() === 'poor')?.length;
    const goodCount = reviews?.filter(item => item?.review?.split(' ')[0].toLowerCase() === 'good')?.length;
    const bestCount = reviews?.filter(item => item?.review?.split(' ')[0].toLowerCase() === 'best')?.length;
    const allCount = reviews?.length;

    return (
        <ScrollView style={styles.container}>
            {/* Profile Section */}
            <LinearGradient
                colors={['#FF4500', '#FF7F50']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.profileHeader}
            >
              <View style={styles.profile}>
                  <View style={styles.profileInfo}>
                      <View style={styles.avatarContainer}>
                          {shop ? (
                              <Image 
                                  style={styles.avatar}
                                  source={{uri: shop?.logo_url}} 
                              />
                          ) : (
                              <View style={styles.avatarPlaceholder}>
                                  <Ionicons name={'storefront'} color={'#FFF'} size={24} />
                              </View>
                          )}
                      </View>

                      <View style={styles.profileText}>
                          <Text style={styles.name}>{data?.fname}...</Text>
                          <View style={styles.statusContainer}>
                              {shop?.isverified && (
                                  <View style={styles.verifiedBadge}>
                                      <VerifiedSvg height={16} width={16} />
                                      <Text style={styles.verifiedText}>Verified</Text>
                                  </View>
                              )}
                              <View style={styles.onlineStatus}>
                                  <Ionicons name="ellipse" size={8} color="#00FF00" />
                                  <Text style={styles.onlineText}>Online {js_ago(new Date(data?.lastseen))}</Text>
                              </View>
                          </View>
                      </View>
                  </View>

                  <TouchableOpacity 
                      onPress={e => navigation.navigate('user-explore-shop', {user_id, reviews, shop, user})} 
                      style={styles.exploreButton}
                  >
                      <Text style={styles.exploreButtonText}>Explore Shop</Text>
                      <Ionicons name="arrow-forward" size={16} color="#FFF" />
                  </TouchableOpacity>
              </View>
            </LinearGradient>
            
            {/* Reviews Header */}
            <View style={styles.reviewsHeader}>
                <View style={styles.reviewsTitleContainer}>
                    <Ionicons name="star" size={20} color="#FFD700" />
                    <Text style={styles.reviewsTitle}>Reviews ({reviews?.length})</Text>
                </View>
                
                {reviews?.length > 0 && (
                    <View style={styles.ratingSummary}>
                        <Text style={styles.ratingText}>
                            Average Rating: {(
                                reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                            ).toFixed(1)}/5
                        </Text>
                    </View>
                )}
            </View>

            {/* Filter Buttons */}
            {reviews?.length > 2 && (
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.filterContainer}
                    contentContainerStyle={styles.filterContent}
                >
                    <TouchableOpacity 
                        style={[
                            styles.filterButton, 
                            styles.allFilter,
                            activeFilter === 'all' && styles.activeAllFilter
                        ]}
                        onPress={() => setActiveFilter('all')}
                    >
                        <Ionicons 
                            name="grid" 
                            size={14} 
                            color={activeFilter === 'all' ? '#FFF' : '#6c5ce7'} 
                        />
                        <Text style={[
                            styles.filterText,
                            activeFilter === 'all' && styles.activeFilterText
                        ]}>
                            All ({allCount})
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            styles.filterButton, 
                            styles.poorFilter,
                            activeFilter === 'poor' && styles.activePoorFilter
                        ]}
                        onPress={() => setActiveFilter('poor')}
                    >
                        <Ionicons 
                            name="sad-outline" 
                            size={14} 
                            color={activeFilter === 'poor' ? '#FFF' : '#e84393'} 
                        />
                        <Text style={[
                            styles.filterText,
                            activeFilter === 'poor' && styles.activeFilterText
                        ]}>
                            Poor ({poorCount})
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            styles.filterButton, 
                            styles.goodFilter,
                            activeFilter === 'good' && styles.activeGoodFilter
                        ]}
                        onPress={() => setActiveFilter('good')}
                    >
                        <Ionicons 
                            name="thumbs-up-outline" 
                            size={14} 
                            color={activeFilter === 'good' ? '#FFF' : '#00b894'} 
                        />
                        <Text style={[
                            styles.filterText,
                            activeFilter === 'good' && styles.activeFilterText
                        ]}>
                            Good ({goodCount})
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            styles.filterButton, 
                            styles.bestFilter,
                            activeFilter === 'best' && styles.activeBestFilter
                        ]}
                        onPress={() => setActiveFilter('best')}
                    >
                        <Ionicons 
                            name="heart-outline" 
                            size={14} 
                            color={activeFilter === 'best' ? '#FFF' : '#fdcb6e'} 
                        />
                        <Text style={[
                            styles.filterText,
                            activeFilter === 'best' && styles.activeFilterText
                        ]}>
                            Best ({bestCount})
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            )}

            {/* Active Filter Indicator */}
            {reviews?.length > 2 && (
                <View style={styles.activeFilterIndicator}>
                    <Text style={styles.activeFilterText}>
                        {activeFilter === 'all' && `Showing all ${filteredReviews.length} reviews`}
                        {activeFilter === 'poor' && `Showing ${filteredReviews.length} poor reviews`}
                        {activeFilter === 'good' && `Showing ${filteredReviews.length} good reviews`}
                        {activeFilter === 'best' && `Showing ${filteredReviews.length} best reviews`}
                    </Text>
                </View>
            )}

            {/* Reviews List */}
            <View style={styles.reviewsContainer}>
                {filteredReviews?.length === 0 ? (
                    <View style={styles.emptyReviews}>
                        <ReviewSvg width={90} height={90} />
                        <Text style={styles.emptyReviewsText}>No reviews {activeFilter !== 'all' ? `with ${activeFilter} rating` : 'from this vendor yet'}.</Text>
                    </View>
                ) : (
                    <FlatList 
                        data={filteredReviews}
                        scrollEnabled={false}
                        keyExtractor={(review, index) => review.id?.toString() || index.toString()}
                        renderItem={({ item: review }) => (
                            <View style={styles.reviewCard}>
                                <View style={styles.reviewHeader}>
                                    <View style={styles.reviewRating}>
                                        <StarRating
                                            rating={review.rating}
                                            onChange={() => {}}
                                            starSize={16}
                                            color="#FF4500"
                                            starStyle={styles.starStyle}
                                        />
                                        <Text style={styles.reviewType}>
                                            {review?.review?.split(' ')[0]}
                                        </Text>
                                    </View>
                                    <Text style={styles.reviewDate}>
                                        {js_ago(new Date(review?.date))}
                                    </Text>
                                </View>
                                
                                <Text style={styles.reviewComment}>
                                    {review?.comment}
                                </Text>
                                
                                <View style={styles.reviewFooter}>
                                    <Ionicons name="person-circle-outline" size={16} color="#6c757d" />
                                    <Text style={styles.reviewerText}>Customer</Text>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    profileHeader: {
        padding: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        borderRadius: 25,
        height: 50,
        width: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatar: {
        borderRadius: 25,
        height: '100%',
        width: '100%',
    },
    avatarPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileText: {
        marginLeft: 12,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: 'column',
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    verifiedText: {
        fontSize: 10,
        color: '#FFF',
        marginLeft: 4,
    },
    onlineStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineText: {
        fontSize: 10,
        color: '#FFF',
        marginLeft: 4,
    },
    exploreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    exploreButtonText: {
        fontSize: 12,
        color: '#FFF',
        marginRight: 4,
        fontWeight: '600',
    },
    reviewsHeader: {
        padding: 16,
        backgroundColor: '#FFF',
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
    },
    reviewsTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2D3436',
        marginLeft: 8,
    },
    ratingSummary: {
        marginTop: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#6C757D',
    },
    filterContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
    },
    filterContent: {
        paddingHorizontal: 16,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
    },
    allFilter: {
        borderColor: '#6c5ce7',
        backgroundColor: '#FFF',
    },
    poorFilter: {
        borderColor: '#e84393',
        backgroundColor: '#FFF',
    },
    goodFilter: {
        borderColor: '#00b894',
        backgroundColor: '#FFF',
    },
    bestFilter: {
        borderColor: '#fdcb6e',
        backgroundColor: '#FFF',
    },
    activeAllFilter: {
        backgroundColor: '#6c5ce7',
        borderColor: '#6c5ce7',
    },
    activePoorFilter: {
        backgroundColor: '#e84393',
        borderColor: '#e84393',
    },
    activeGoodFilter: {
        backgroundColor: '#00b894',
        borderColor: '#00b894',
    },
    activeBestFilter: {
        backgroundColor: '#fdcb6e',
        borderColor: '#fdcb6e',
    },
    filterText: {
        fontWeight: '600',
        fontSize: 12,
        marginLeft: 4,
    },
    activeFilterText: {
        color: '#FFF',
    },
    activeFilterIndicator: {
        backgroundColor: '#000',
        padding: 12,
    },
    reviewsContainer: {
        flex: 1,
        padding: 4,
    },
    emptyReviews: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    emptyReviewsText: {
        textAlign: 'center',
        marginTop: 16,
        fontWeight: '500',
        fontSize: 16,
        color: '#6C757D',
    },
    reviewCard: {
        padding: 16,
        borderRadius: 4,
        marginBottom: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    reviewRating: {
        flexDirection: 'column',
    },
    starStyle: {
        marginRight: 2,
    },
    reviewType: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FF4500',
        marginTop: 4,
        textTransform: 'capitalize',
    },
    reviewDate: {
        fontSize: 12,
        color: '#6C757D',
    },
    reviewComment: {
        fontSize: 14,
        color: '#2D3436',
        lineHeight: 20,
        marginBottom: 12,
    },
    reviewFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewerText: {
        fontSize: 12,
        color: '#6C757D',
        marginLeft: 6,
    },
});