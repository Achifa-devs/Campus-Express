// components/SubscriptionModal.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const PACKAGES = {
  "Free": {
    "price": "₦0",
    "discount_price": "₦0",
    "features": [
      "3 vendor connections (Monthly)",
      "Publish unlimited ads",
      "Unlimited filters",
      "Access to all tools",
      "Regular product visibility"
    ],
    "tier": "Free",
    "hint": "Try it out, just 1 ad.",
    "themeColor": "#CC3700"
  },
  "Basic": {
    "price": "₦1,500",
    "discount_price": "₦749.99",
    "features": [
      
      "12 vendor connections (Monthly)",
      "Publish unlimited ads",
      "Unlimited filters",
      "Access to all tools",
      "Essential performance metrics",
      "Enhanced product visibility"
    ],
    "tier": "Basic",
    "hint": "For casual vendors.",
    "themeColor": "#CC3700"
  },
  "Standard": {
    "price": "₦3,000",
    "discount_price": "₦1,649.99",
    "features": [
      
      "22 vendor connections (Monthly)",
      "Publish unlimited ads",
      "Unlimited filters",
      "Access to all tools",
      "Advanced performance metrics",
      "Priority customer support",
      "Standard product visibility"
    ],
    "tier": "Standard",
    "hint": "For more serious student vendors.",
    "themeColor": "#CC3700"
  },
  "Premium": {
    "price": "₦6,000",
    "discount_price": "₦3,249.99",
    "features": [
      "Unlimited vendor connections",
      "Publish unlimited ads",
      "Unlimited filters",
      "Access to all tools",
      "Comprehensive performance metrics",
      "24/7 dedicated customer support",
      "Maximum product visibility"
    ],
    "tier": "Premium",
    "hint": "For campus hustlers who want maximum sales & exposure.",
    "themeColor": "#CC3700"
  }
};

const SubscriptionModal = ({ visible, onClose, onSelectPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState('Basic');

  const PackageCard = ({ packageName, packageData, isSelected }) => {
    const hasDiscount = packageData.discount_price !== packageData.price;

    return (
      <TouchableOpacity
        style={[
          styles.packageCard,
          isSelected && styles.selectedPackageCard
        ]}
        onPress={() => setSelectedPackage(packageName)}
      >
        <View style={styles.packageHeader}>
          <Text style={styles.packageName}>{packageName}</Text>
          {isSelected && (
            <View style={styles.selectedBadge}>
              <Icon name="checkmark-circle" size={20} color="#FF4500" />
            </View>
          )}
        </View>

        <View style={styles.priceContainer}>
          {hasDiscount && (
            <Text style={styles.originalPrice}>{packageData.price}</Text>
          )}
          <Text style={styles.discountPrice}>{packageData.discount_price}</Text>
          <Text style={styles.billingText}>/month</Text>
        </View>

        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round((1 - parseFloat(packageData.discount_price.replace('₦', '').replace(',', '')) / 
                parseFloat(packageData.price.replace('₦', '').replace(',', ''))) * 100)}% OFF
            </Text>
          </View>
        )}

        <View style={styles.featuresContainer}>
          {packageData.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name="checkmark-circle" size={16} color="#FF4500" style={styles.featureIcon} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation()
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            
            {/* Subtitle */}
            <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>Choose Your Plan</Text>
                <Text style={styles.subtitle}>Select the plan that works best for you</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          

          {/* Packages List */}
          <ScrollView 
            style={styles.packagesContainer}
            showsVerticalScrollIndicator={false}
          >
            {Object.entries(PACKAGES).map(([packageName, packageData]) => (
              <PackageCard
                key={packageName}
                packageName={packageName}
                packageData={packageData}
                isSelected={selectedPackage === packageName}
              />
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.subscribeButton}
              onPress={() => navigation.navigate('user-subscription', {selectedPackage: PACKAGES[selectedPackage]})}
            >
              <Text style={styles.subscribeButtonText}>
                Subscribe to {selectedPackage} Tier
              </Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              Your subscription will automatically renew. Cancel anytime.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    // zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.85,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderBottomColor: '#F0F0F0',
  },
  titleContainer: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    // textAlign: 'center',
    color: '#666',
    fontSize: 14,
    // marginVertical: 16,
    // paddingHorizontal: 20,
  },
  packagesContainer: {
    maxHeight: height * 0.6,
    paddingHorizontal: 16,
  },
  packageCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedPackageCard: {
    borderColor: '#FF4500',
    backgroundColor: '#FFF6F2',
    shadowColor: '#FF4500',
    shadowOpacity: 0.2,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  selectedBadge: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginRight: 4,
  },
  billingText: {
    fontSize: 12,
    color: '#666',
  },
  discountBadge: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuresContainer: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  subscribeButton: {
    backgroundColor: '#FF4500',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscribeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});

export default SubscriptionModal;