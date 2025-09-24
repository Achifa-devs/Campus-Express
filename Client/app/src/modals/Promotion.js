import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import { useDispatch, useSelector } from 'react-redux';
import categoriesData from '../json/services.json';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { set_boost_modal } from '../../redux/modal/boost_modal.js';
import Memory from '../utils/memoryHandler.js';

const { width } = Dimensions.get('window');

const Promotion = ({ visible, onClose, onSubscribe }) => {
  const { boost_modal } = useSelector(s => s.boost_modal);
  const [selectedPackage, setSelectedPackage] = useState({});
  const { user } = useSelector(s => s.user);
  const [adImageUri, setAdImageUri] = useState(null);

  const [promotionPackages, setPromotionPackages] = useState([])

  useEffect(() => {
    async function getMetrics() {
      try {
        const response = await axios.get('https://cs-node.vercel.app/promo', {
          params: { product_id: boost_modal?.data?.product_id }
        });
        const result = response.data;
        console.log("result: ", result);
        setSelectedPackage(result);
      } catch (error) {
        console.log("error: ", error);
      }
    }
    getMetrics();
  }, []);
    
  const getPromoPlan = async () => {  
    let data = await Memory.get('promo_plan');
    if (data) {
      let parsedData = (data);

      // Sort by `id` (ascending: 1 → 4)
      let sortedData = parsedData.sort((a, b) => a.id - b.id);

      setPromotionPackages(sortedData);
    }
  }; 
  
  
  useEffect(() => {
    getPromoPlan();
  }, [])

  useEffect(() => {
    if (boost_modal?.data) {
      const uri = getCategoryImage(boost_modal.data?.category) || boost_modal.data?.thumbnail_id;
      setAdImageUri(uri);
    }
  }, [boost_modal]);

  const getCategoryImage = (categoryName) => {
    if (!categoryName || !categoriesData?.items?.category) return null;
    
    for (let cat of categoriesData.items.category) {
      const keys = Object.keys(cat).filter(k => k !== "img");
      for (let key of keys) {
        if (key === categoryName) {
          return cat.img;
        }
      }
    }
    return null;
  };


  const handleSubscribe = (pkg) => {
    payNow(pkg);
  };

  const calculateDiscountPercentage = (price, discount_price) => {
    const priceNum = parseFloat(price.replace('₦', '').replace(',', ''));
    const discountNum = parseFloat(discount_price.replace('₦', '').replace(',', ''));
    const discountPercent = Math.round(((priceNum - discountNum) / priceNum) * 100);
    return discountPercent;
  };

  function getAdDuration(duration) {
    const startDate = new Date();
    let endDate = new Date(startDate); // clone start date

    switch (duration.toLowerCase()) {
      case "1 day":
        endDate.setDate(startDate.getDate() + 1);
        break;
      case "3 days":
        endDate.setDate(startDate.getDate() + 3);
        break;
      case "7 days":
      case "1 week":
        endDate.setDate(startDate.getDate() + 7);
        break;
      case "2 weeks":
        endDate.setDate(startDate.getDate() + 14);
        break;
      case "1 month":
        endDate.setMonth(startDate.getMonth() + 1);
        break;
      default:
        throw new Error(`Invalid duration: ${duration}`);
    }

    return {
      start_date: startDate,
      end_date: endDate
    };
  }

  const getPackageButtonLabel = (currentPkg, pkgId) => {
    if (!currentPkg) return 'Purchase Now'; // if no package yet

    if (currentPkg === 'Flash Promo') {
      if (pkgId === '3-Day Spotlight' || pkgId === 'Weekly Exposure' || pkgId === '2-Week Campaign' || pkgId === 'Monthly Campaign') {
        return 'Upgrade';
      }
      if (pkgId === 'Flash Promo') return 'Selected';
      return 'Disabled';
    }

    if (currentPkg === '3-Day Spotlight') {
      if (pkgId === 'Weekly Exposure' || pkgId === '2-Week Campaign' || pkgId === 'Monthly Campaign') return 'Upgrade';
      if (pkgId === '3-Day Spotlight') return 'Selected';
      return 'Disabled';
    }

    if (currentPkg === 'Weekly Exposure') {
      if (pkgId === '2-Week Campaign' || pkgId === 'Monthly Campaign') return 'Upgrade';
      if (pkgId === 'Weekly Exposure') return 'Selected';
      return 'Disabled';
    }

    if (currentPkg === '2-Week Campaign') {
      if (pkgId === 'Monthly Campaign') return 'Upgrade';
      if (pkgId === '2-Week Campaign') return 'Selected';
      return 'Disabled';
    }

    if (currentPkg === 'Monthly Campaign') {
      if (pkgId === 'Monthly Campaign') return 'Selected';
      return 'Disabled';
    }

    return 'Purchase Now';
  };

  const dispatch = useDispatch()

  const navigation = useNavigation()
  const { popup } = usePaystack();

  const payNow = (selectedPackage) => {
    const {end_date, start_date} = getAdDuration(selectedPackage.duration)
    const reference = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    popup.newTransaction({
      email: user?.email,
      amount: parseFloat(selectedPackage?.discount_price.replace('₦', '').replace(',', '')),
      reference: reference,
      metadata: {
        user_id: user.user_id,
        type: 'promotion',
        plan: selectedPackage.title,
        start_date,
        end_date,
        product_id: boost_modal.data.product_id,
        duration: selectedPackage.duration
      },
      
      onSuccess: (res) => {
        Alert.alert(
          'Payment Successful!',
          `Your subscription was successful.`,
          [{ text: 'OK' }]
        );
        navigation.goBack()
        dispatch(set_boost_modal({data: null, visible: 0}));

      },
      onCancel: () => {
        Alert.alert('Payment Cancelled', 'Your payment was cancelled.');
      },
      onError: (err) => {
        Alert.alert('Payment Error', 'There was an error processing your payment.');
        console.log('Payment Error:', err);
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Promote Your Products</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Ad Preview Section */}
          <View style={styles.adPreviewSection}>
            <Text style={styles.sectionTitle}>Your Ad Preview</Text>
            <Text style={styles.sectionSubtitle}>See how your promotion will appear to customers</Text>
            
            {boost_modal?.data ? (
              <View style={styles.adCard}>
                {boost_modal.data?.purpose !== 'accomodation' ? (
                  <Image
                    style={styles.adImage}
                    source={{ uri: adImageUri }}
                    resizeMode="cover"
                    onError={() => setAdImageUri(null)}
                  />
                ) : (
                  <View style={styles.videoContainer}>
                    <Video
                      source={{ uri: boost_modal.data?.thumbnail_id }}
                      style={styles.adImage}
                      resizeMode="cover"
                      muted={true}
                      paused={true}
                    />
                  </View>
                )}

                <View style={styles.adContent}>
                  <Text style={styles.adTitle} numberOfLines={2}>
                    {boost_modal.data?.title || 'No title available'}
                  </Text>
                  <Text style={styles.adPrice}>
                    {boost_modal.data?.purpose === 'product' ?
                      '₦' + new Intl.NumberFormat('en-us').format(boost_modal.data?.price || 0)
                      : boost_modal.data?.purpose === 'accomodation' ?
                      '₦' + new Intl.NumberFormat('en-us').format(boost_modal.data?.price || 0) + 
                      ' to pay ₦' + new Intl.NumberFormat('en-us').format(
                        boost_modal.data?.others?.lodge_data?.upfront_pay || 0
                      )
                      : 'Price not available'}
                  </Text>
                  <View style={styles.adStats}>
                    <View style={styles.statItem}>
                      <Icon name="eye" size={14} color="#666" />
                      <Text style={styles.statText}>
                        {boost_modal.data?.views || 0} views
                      </Text>
                    </View>
                    <View style={[
                      styles.statusBadge, 
                      boost_modal.data?.state?.state !== 'active' && styles.inactiveBadge
                    ]}>
                      <Text style={styles.statusText}>
                        {boost_modal.data?.state?.state === 'active' ? 'Active' : 'Inactive'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.noDataContainer}>
                <Icon name="image-outline" size={40} color="#ccc" />
                <Text style={styles.noDataText}>No product data available for preview</Text>
              </View>
            )}
          </View>

          {/* Promotion Packages - Horizontal Layout */}
          <View style={styles.packagesSection}>
            <Text style={styles.sectionTitle}>Choose Your Promotion Package</Text>
            <Text style={styles.sectionSubtitle}>
              Select the duration that works best for your campaign goals
            </Text>

            <View style={styles.packageCardsContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.horizontalScrollContainer}
                snapToInterval={width * 0.8 + 16}
                decelerationRate="fast"
              >
                {promotionPackages.map((pkg, index) => {
                  const discountPercent = calculateDiscountPercentage(pkg.price, pkg.discount_price);
                  const isSelected = selectedPackage.plan === pkg.title; 
                  
                  return (
                    <TouchableOpacity
                      key={pkg.id} 
                      style={[
                        styles.packageCard,
                        isSelected && styles.selectedPackage,
                        index === 2 && styles.featuredPackage,
                      ]}
                    >
                      {index === 2 && (
                        <View style={styles.popularBadge}>
                          <Text style={styles.popularBadgeText}>RECOMMENDED</Text>
                        </View>
                      )}
                      
                      <View style={styles.packageHeader}>
                        <View>
                          <Text style={styles.packageTitle}>{pkg.title}</Text>
                          <Text style={styles.packageDuration}>{pkg.duration}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text style={styles.originalPrice}>{pkg.price}</Text>
                          <Text style={styles.discount_price}>{pkg.discount_price}</Text>
                          {discountPercent > 0 && (
                            <View style={styles.discountBadge}>
                              <Text style={styles.discountText}>Save {discountPercent}%</Text>
                            </View>
                          )}
                        </View>
                      </View>
                      
                      <Text style={styles.packageDescription}>{pkg.description}</Text>
                      
                      <View style={styles.featuresContainer}>
                        <Text style={styles.featuresTitle}>What's Included:</Text>
                        {pkg.features.map((feature, idx) => (
                          <View key={idx} style={styles.featureItem}>
                            <View style={styles.checkIcon}>
                              <Text style={styles.checkIconText}>✓</Text>
                            </View>
                            <Text style={styles.featureText}>{feature}</Text>
                          </View>
                        ))}
                      </View>
                      
                      <TouchableOpacity
                        style={[
                          styles.subscribeButton,
                          isSelected && styles.selectedButton
                        ]}
                        onPress={() => handleSubscribe(pkg)}
                        disabled={isSelected}
                      >
                        <Text style={[
                          styles.subscribeButtonText,
                          isSelected && styles.selectedButtonText
                        ]}>
                          {/* {isSelected ? 'Selected' : 'Purchase Now'} */}
                          {
                            getPackageButtonLabel(selectedPackage.plan, pkg.title)
                          }
                        </Text>
                      </TouchableOpacity>
                    </TouchableOpacity> 
                  );
                })}
              </ScrollView>
              
              {/* Scroll indicator for better UX */}
              <View style={styles.scrollIndicator}>
                {promotionPackages.map((_, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.scrollDot,
                      index === 2 && styles.scrollDotActive
                    ]} 
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Performance Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Expected Results</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3-5x</Text>
                <Text style={styles.statLabel}>More Views</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2-4x</Text>
                <Text style={styles.statLabel}>More Clicks</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>40-60%</Text>
                <Text style={styles.statLabel}>Higher Conversion</Text>
              </View>
            </View>
          </View>

          {/* Additional Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>How Promotion Works</Text>
            
            <View style={styles.processSteps}>
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Select a Package</Text>
                  <Text style={styles.stepDescription}>
                    Choose the promotion duration that fits your campaign goals
                  </Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Customize Your Ad</Text>
                  <Text style={styles.stepDescription}>
                    Add compelling images and text to attract customers
                  </Text>
                </View>
              </View>
              
              <View style={styles.processStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Launch & Track</Text>
                  <Text style={styles.stepDescription}>
                    Monitor performance and adjust your strategy as needed
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>How quickly will my promotion start?</Text>
              <Text style={styles.faqAnswer}>
                Your promotion will go live within 1 hour of purchase approval.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Can I cancel my promotion?</Text>
              <Text style={styles.faqAnswer}>
                Promotions can be cancelled within 1 hour of purchase for a full refund.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>How will I track my results?</Text>
              <Text style={styles.faqAnswer}>
                You'll receive detailed analytics showing views, clicks, and conversions.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 16,
  },
  // Stats Section
  statsSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Ad Preview Section
  adPreviewSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adCard: {
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  adImage: {
    width: 120,
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  videoContainer: {
    width: 120,
    height: '100%',
    backgroundColor: '#000',
  },
  adContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  adTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 8,
  },
  adStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inactiveBadge: {
    backgroundColor: '#666',
  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  noDataContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  noDataText: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  // Packages Section
  packagesSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageCardsContainer: {
    marginBottom: 10,
  },
  horizontalScrollContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  packageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: width * 0.8,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    position: 'relative',
  },
  featuredPackage: {
    borderColor: '#FF4500',
    transform: [{ scale: 1.02 }],
  },
  selectedPackage: {
    borderColor: '#00b894',
    backgroundColor: '#f8fff9',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: '#FF4500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 1,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  packageDuration: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 14,
    color: '#636e72',
    textDecorationLine: 'line-through',
  },
  discount_price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 2,
  },
  discountBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packageDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 12,
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  checkIconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#2d3436',
    lineHeight: 20,
  },
  subscribeButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FF4500',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  // Scroll indicator
  scrollIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  scrollDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  scrollDotActive: {
    backgroundColor: '#FF4500',
    width: 12,
  },
  // Info Section
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  processSteps: {
    marginTop: 12,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
  // FAQ Section
  faqSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
});

export default Promotion;