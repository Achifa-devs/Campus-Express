import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const PromotionSubscriptionsScreen = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAd, setSelectedAd] = useState(0); // For ad carousel

  // Sample ads data
  const sampleAds = [
    {
      id: 1,
      title: "Summer Collection",
      image: "https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Summer+Collection",
      description: "Promote your summer products with vibrant visuals"
    },
    {
      id: 2,
      title: "Flash Sale",
      image: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Flash+Sale",
      description: "Create urgency with limited-time offers"
    },
    {
      id: 3,
      title: "New Arrivals",
      image: "https://via.placeholder.com/300x200/50C878/FFFFFF?text=New+Arrivals",
      description: "Showcase your latest products to eager customers"
    }
  ];

  const promotionPackages = [
    {
      "id": 1,
      "title": "Flash Promo",
      "duration": "1 Day",
      "price": "₦1000.00",
      "discountPrice": "₦600.00",
      "description": "Perfect for quick promotions or urgent product launches. Gain instant visibility within 24 hours.",
      "features": [
        "Ad runs for 24 hours",
        "Boosted visibility in search results",
        "Highlighted placement on homepage",
        "Best for flash sales or urgent offers"
      ]
    },
    {
      "id": 2,
      "title": "Weekend Spotlight",
      "duration": "3 Days",
      "price": "₦2500.00",
      "discountPrice": "₦1500.00",
      "description": "Ideal for short bursts of attention. Capture weekend shoppers with a 3-day spotlight campaign.",
      "features": [
        "Ad runs for 3 days",
        "Priority listing across categories",
        "Increased homepage impressions",
        "Recommended for weekend deals"
      ]
    },
    {
      "id": 3,
      "title": "Weekly Exposure",
      "duration": "7 Days (1 Week)",
      "price": "₦5000.00",
      "discountPrice": "₦3500.00",
      "description": "A balanced plan designed to maximize visibility and sales over the course of one week.",
      "features": [
        "Ad runs for 7 days",
        "Prominent placement in search results",
        "Enhanced category exposure",
        "Ideal for standard campaigns"
      ]
    },
    {
      "id": 4,
      "title": "Extended Reach",
      "duration": "14 Days (2 Weeks)",
      "price": "₦9500.00",
      "discountPrice": "₦6600.00",
      "description": "Two weeks of consistent exposure to help strengthen your brand and boost product recognition.",
      "features": [
        "Ad runs for 14 days",
        "Sustained visibility on homepage",
        "Higher engagement rate",
        "Great for building product awareness"
      ]
    },
    {
      "id": 5,
      "title": "Monthly Campaign",
      "duration": "30 Days (1 Month)",
      "price": "₦18000.00",
      "discountPrice": "₦11400.00",
      "description": "The ultimate package for vendors who want to dominate visibility with a full month of promotion.",
      "features": [
        "Ad runs for 30 days",
        "Premium placement across all sections",
        "Maximum brand exposure",
        "Best value for long-term campaigns"
      ]
    }
  ];

  const handleSubscribe = (pkg) => {
    Alert.alert(
      'Confirm Promotion',
      `Are you sure you want to purchase the ${pkg.title} package for ${pkg.discountPrice}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Purchase', 
          onPress: () => completePurchase(pkg),
          style: 'default'
        },
      ]
    );
  };

  const completePurchase = (pkg) => {
    // In a real app, this would integrate with your payment processing
    Alert.alert('Success', `You have successfully purchased the ${pkg.title} package!`);
    setSelectedPackage(pkg.id);
  };

  const calculateDiscountPercentage = (price, discountPrice) => {
    const priceNum = parseFloat(price.replace('₦', '').replace(',', ''));
    const discountNum = parseFloat(discountPrice.replace('₦', '').replace(',', ''));
    const discountPercent = Math.round(((priceNum - discountNum) / priceNum) * 100);
    return discountPercent;
  };

  const nextAd = () => {
    setSelectedAd((prev) => (prev + 1) % sampleAds.length);
  };

  const prevAd = () => {
    setSelectedAd((prev) => (prev - 1 + sampleAds.length) % sampleAds.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Promote Your Products</Text>
          <Text style={styles.subtitle}>
            Boost visibility and increase sales with our targeted promotion packages
          </Text>
        </View>

        {/* Ad Preview Section */}
        <View style={styles.adPreviewSection}>
          <Text style={styles.sectionTitle}>Your Ad Preview</Text>
          <Text style={styles.sectionSubtitle}>See how your promotion will appear to customers</Text>
          
          <View style={styles.adCarousel}>
            <View style={styles.adContainer}>
              <Image 
                source={{ uri: sampleAds[selectedAd].image }} 
                style={styles.adImage}
                resizeMode="cover"
              />
              <View style={styles.adOverlay}>
                <Text style={styles.adTitle}>{sampleAds[selectedAd].title}</Text>
                <Text style={styles.adDescription}>{sampleAds[selectedAd].description}</Text>
              </View>
            </View>
            
            <View style={styles.carouselControls}>
              <TouchableOpacity onPress={prevAd} style={styles.carouselButton}>
                <Text style={styles.carouselButtonText}>‹</Text>
              </TouchableOpacity>
              <View style={styles.carouselDots}>
                {sampleAds.map((_, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.carouselDot,
                      index === selectedAd && styles.carouselDotActive
                    ]} 
                  />
                ))}
              </View>
              <TouchableOpacity onPress={nextAd} style={styles.carouselButton}>
                <Text style={styles.carouselButtonText}>›</Text>
              </TouchableOpacity>
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
            <View style={styles.statsItem}>
              <Text style={styles.statValue}>40-60%</Text>
              <Text style={styles.statLabel}>Higher Conversion</Text>
            </View>
          </View>
        </View>

        {/* Promotion Packages - Horizontal Scroll */}
        <View style={styles.packagesSection}>
          <Text style={styles.sectionTitle}>Choose Your Promotion Package</Text>
          <Text style={styles.sectionSubtitle}>
            Select the duration that works best for your campaign goals
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            {promotionPackages.map((pkg, index) => {
              const discountPercent = calculateDiscountPercentage(pkg.price, pkg.discountPrice);
              const isSelected = selectedPackage === pkg.id;
              
              return (
                <View 
                  key={pkg.id} 
                  style={[
                    styles.packageCard,
                    isSelected && styles.selectedPackage,
                    index === 2 && styles.featuredPackage,
                    { width: width * 0.85 } // Set width for horizontal scrolling
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
                      <Text style={styles.discountPrice}>{pkg.discountPrice}</Text>
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
                  >
                    <Text style={[
                      styles.subscribeButtonText,
                      isSelected && styles.selectedButtonText
                    ]}>
                      {isSelected ? 'Selected' : 'Purchase Now'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 20,
  },
  // Ad Preview Styles
  adPreviewSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adCarousel: {
    alignItems: 'center',
  },
  adContainer: {
    width: width - 72,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  adOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
  },
  adTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  adDescription: {
    color: 'white',
    fontSize: 14,
  },
  carouselControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0984e3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  carouselDots: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  carouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  carouselDotActive: {
    backgroundColor: '#0984e3',
    width: 16,
  },
  // Stats Section
  statsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0984e3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
  },
  // Packages Section - Horizontal Scroll
  packagesSection: {
    marginBottom: 20,
  },
  horizontalScrollContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  packagesContainer: {
    marginBottom: 10,
  },
  packageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  featuredPackage: {
    borderColor: '#0984e3',
    transform: [{ scale: 1.02 }],
  },
  selectedPackage: {
    borderColor: '#00b894',
    backgroundColor: '#f0fdfa',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    backgroundColor: '#0984e3',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  packageDuration: {
    fontSize: 16,
    color: '#636e72',
    marginTop: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 16,
    color: '#636e72',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 2,
  },
  discountBadge: {
    backgroundColor: '#00b894',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
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
    marginBottom: 16,
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00b894',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
    backgroundColor: '#0984e3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#00b894',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  // Process Steps
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  processSteps: {
    marginTop: 16,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0984e3',
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
    borderRadius: 12,
    padding: 20,
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

export default PromotionSubscriptionsScreen;