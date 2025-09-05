// components/SubscriptionModal.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { getData } from './AsyncStore.js';
import { set_sub_modal } from '../../redux/sub.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const { height } = Dimensions.get('window');

// Define tier hierarchy
const TIER_ORDER = ["Free", "Basic", "Standard", "Premium"];

const SubscriptionModal = ({ visible, onClose, onSelectPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState('Basic');
  const [PACKAGES, setPACKAGES] = useState({});
  const [currentTier, setCurrentTier] = useState(null); // ✅ Store user’s current subscription tier
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // ✅ Assuming you store user info in Redux
  const { subscribed } = useSelector((s) => s.subscribed);
  const { tier } = useSelector((s) => s.tier);

  useEffect(() => {
    async function getPackages() {
      const res = await getData('PACKAGES');
      const PACKAGES = JSON.parse(res);
      setPACKAGES(PACKAGES);
    }
    getPackages();
  }, []);

  useEffect(() => {
    setCurrentTier(tier); // ✅ save current tier
  }, [tier, subscribed]);

  const PackageCard = ({ packageName, packageData, isSelected, isPopular, isCurrent, isDisabled }) => {
    const hasDiscount = packageData.discount_price !== packageData.price;

    return (
      <TouchableOpacity
        style={[
          styles.packageCard,
          isSelected && !isDisabled && styles.selectedPackageCard,
          isDisabled && { opacity: 0.5 }
        ]}
        onPress={() => !isDisabled && setSelectedPackage(packageName)}
        disabled={isCurrent || isDisabled} // prevent selecting current or lower tier
      >
        <View style={styles.packageHeader}>
          <Text style={styles.packageName}>{packageName}</Text>

          {/* Popular & Current badges */}
          {isPopular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>POPULAR</Text>
            </View>
          )}
          {isCurrent && (
            <View style={styles.currentBadge}>
              <Text style={styles.currentText}>CURRENT</Text>
            </View>
          )}

          {isSelected && !isCurrent && !isDisabled && (
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
              {Math.round(
                (1 -
                  parseFloat(packageData.discount_price.replace('₦', '').replace(',', '')) /
                  parseFloat(packageData.price.replace('₦', '').replace(',', ''))) *
                  100
              )}% OFF
            </Text>
          </View>
        )}

        <View style={styles.featuresContainer}>
          {packageData.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon
                name="checkmark-circle"
                size={16}
                color="#FF4500"
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();

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
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Choose Your Plan</Text>
              <Text style={styles.subtitle}>
                Select the plan that works best for you
              </Text>
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
            {Object.entries(PACKAGES).map(([packageName, packageData]) => {
              const currentIndex = TIER_ORDER.indexOf(currentTier);
              const packageIndex = TIER_ORDER.indexOf(packageName);

              const isDisabled = packageIndex <= currentIndex && packageName !== currentTier;

              return (
                <PackageCard
                  key={packageName}
                  packageName={packageName}
                  packageData={packageData}
                  isSelected={selectedPackage === packageName}
                  isPopular={packageName === 'Basic'} // ✅ Basic = Popular
                  isCurrent={packageName === currentTier.plan} // ✅ Match current tier dynamically
                  isDisabled={isDisabled} // ✅ disable lower plans
                />
              );
            })}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => {
                dispatch(set_sub_modal(0));
                navigation.navigate('user-payment', {
                  selectedPackage: PACKAGES[selectedPackage],
                });
              }}
              disabled={selectedPackage === currentTier} // ✅ prevent upgrading to same tier
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
    color: '#666',
    fontSize: 14,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  packageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  selectedBadge: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 2,
  },
  popularBadge: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  popularText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  currentBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  currentText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
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
