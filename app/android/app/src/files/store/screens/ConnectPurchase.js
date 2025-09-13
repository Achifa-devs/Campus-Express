import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
import { usePaystack } from 'react-native-paystack-webview';
import { set_user } from '../../../../../../redux/user';
import { set_connect_purchase_modal } from '../../../../../../redux/connect_purchase';
import { getData } from '../../utils/AsyncStore.js';

const VendorConnectionsModal = ({ visible, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(s => s?.user);

  const { popup } = usePaystack();
  const [bundle_packs, set_bundle_packs] = useState([]);

  const getConnectPlan = async () => {
    try {
      let data = await getData('connect_plan');
      console.log('connect_plan: ', data);

      if (data) {
        let parsedData = JSON.parse(data);

        if (Array.isArray(parsedData)) {
          // Sort by `code` if available
          let sortedData = parsedData.sort((a, b) => {
            if (a.code && b.code) return a.code - b.code;
            return 0;
          });
          set_bundle_packs(sortedData);
        } else {
          console.warn('connect_plan is not an array:', parsedData);
          set_bundle_packs([]);
        }
      } else {
        console.warn('connect_plan not found in storage');
        set_bundle_packs([]);
      }
    } catch (err) {
      console.error('Error loading connect_plan:', err);
      set_bundle_packs([]); // fallback to empty
    }
  };

  useEffect(() => {
    getConnectPlan();
  }, []);

  const handlePurchase = () => {
    if (!selectedPackage) {
      Alert.alert('Select a package', 'Please select a connection package to continue');
      return;
    }

    const pack = bundle_packs.find(p => p.code === selectedPackage);
    if (!pack) {
      Alert.alert('Error', 'The selected package could not be found.');
      return;
    }

    const packageData = {
      type: selectedPackage === 'single' ? 'single' : 'bundle',
      ...pack,
    };

    payNow(packageData);
  };

  const payNow = (selectedPackage) => {
    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(end_date.getMonth() + 1);

    const reference = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    popup.newTransaction({
      email: user?.email,
      amount: parseFloat(
        selectedPackage?.discount_price
          ?.replace('₦', '')
          ?.replace(',', '') || selectedPackage.amount
      ),
      reference: reference,
      metadata: {
        user_id: user?.user_id,
        type: 'connect',
        no_of_connects: selectedPackage.connections,
      },

      onSuccess: (res) => {
        Alert.alert('Payment Successful!', `Your purchase was successful.`, [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
        let newUser = { ...user };
        newUser.connects =
          parseInt(user.connects || 0) + parseInt(selectedPackage.connections || 0);
        dispatch(set_user(newUser));
        dispatch(set_connect_purchase_modal(0));
      },
      onCancel: () => {
        Alert.alert('Payment Cancelled', 'Your payment was cancelled.');
      },
      onError: (err) => {
        Alert.alert('Payment Error', 'There was an error processing your payment.');
        console.log('Payment Error:', err);
      },
    });
  };

  const calculateDiscount = (connections, price) => {
    if (!connections || !price) return 0;
    const singlePrice = connections * 100;
    const discount = singlePrice - price;
    const discountPercent = Math.round((discount / singlePrice) * 100);
    return discountPercent;
  };

  // Safely extract single + bundle
  const singleConnectionPack = bundle_packs.length > 0 ? bundle_packs[0] : null;
  const bundlePacks = bundle_packs.length > 1 ? bundle_packs.slice(1) : [];

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Vendor Connections</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalSubtitle}>
            Use connection credits to contact vendors. Purchase more when exhausted.
          </Text>

          {singleConnectionPack && (
            <View style={styles.pricingSection}>
              <Text style={styles.sectionTitle}>Single Connection</Text>
              <TouchableOpacity
                style={[
                  styles.packageCard,
                  selectedPackage === singleConnectionPack.code && styles.selectedPackage,
                ]}
                onPress={() => setSelectedPackage(singleConnectionPack.code)}
              >
                <View style={styles.packageHeader}>
                  <Text style={styles.connectionsCount}>1 Connection</Text>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>₦{singleConnectionPack.amount}</Text>
                  </View>
                </View>
                <Text style={styles.packageDescription}>
                  {singleConnectionPack.description}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {bundlePacks.length > 0 && (
            <View style={styles.pricingSection}>
              <Text style={styles.sectionTitle}>Bundle Packs</Text>
              <Text style={styles.sectionSubtitle}>Save more with our bundle offers</Text>

              {bundlePacks.map((pack) => {
                const discountPercent = calculateDiscount(pack.connections, pack.amount);
                return (
                  <TouchableOpacity
                    key={pack.code}
                    style={[
                      styles.packageCard,
                      styles.bundleCard,
                      selectedPackage === pack.code && styles.selectedPackage,
                    ]}
                    onPress={() => setSelectedPackage(pack.code)}
                  >
                    {discountPercent > 0 && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>Save {discountPercent}%</Text>
                      </View>
                    )}
                    <View style={styles.packageHeader}>
                      <View>
                        <Text style={styles.packageName}>{pack.name}</Text>
                        <Text style={styles.connectionsCount}>
                          {pack.connections} Connections
                        </Text>
                      </View>
                      <View style={styles.priceTag}>
                        <Text style={styles.priceText}>₦{pack.amount}</Text>
                      </View>
                    </View>
                    <Text style={styles.packageDescription}>
                      Only ₦{Math.round(pack.amount / pack.connections)} per connection •{' '}
                      {pack.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>How it works</Text>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>1</Text>
              </View>
              <Text style={styles.infoText}>Purchase connection credits</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>2</Text>
              </View>
              <Text style={styles.infoText}>Use one credit to contact a vendor</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>3</Text>
              </View>
              <Text style={styles.infoText}>Buy more when you run out</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>
              {selectedPackage
                ? `₦${bundle_packs.find(p => p.code === selectedPackage)?.amount || 0}`
                : 'Select a package'}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.purchaseButton, !selectedPackage && styles.purchaseButtonDisabled]}
            onPress={handlePurchase}
            disabled={!selectedPackage}
          >
            <Text style={styles.purchaseButtonText}>Purchase Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height * 1,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe6e9',
    backgroundColor: '#fff',
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
    backgroundColor: '#dfe6e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#2d3436',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
    marginBottom: 20,
  },
  pricingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 12,
  },
  packageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bundleCard: {
    position: 'relative',
  },
  selectedPackage: {
    borderColor: '#FF4500',
    backgroundColor: '#fff4e0',
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  packageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 4,
  },
  connectionsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3436',
  },
  priceTag: {
    backgroundColor: '#dfe6e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  packageDescription: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#FFA500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#2d3436',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#dfe6e9',
    backgroundColor: 'white',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    color: '#636e72',
    marginRight: 8,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  purchaseButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: '#b2bec3',
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VendorConnectionsModal;
