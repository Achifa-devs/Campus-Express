import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { set_sub_modal } from '../../../../../../redux/sub';
import { useDispatch, useSelector } from 'react-redux';

const { 
  width, 
  height 
} = Dimensions.get('window');
import { usePaystack } from 'react-native-paystack-webview';

const VendorConnectionsModal = ({ visible, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(s => s?.user);

  const { popup } = usePaystack();
  const connectionPricing = {
    bundle_packs: [
      {
        "name": "Instant Connect",
        "discount_price": "₦100.00",
        "price": "₦100.00",
        "amount": 100,
        "connections": 1,
        "description": "Perfect for one time enquiry",
        "id": "single"
      },
      {
        "name": "Starter Connect",
        "discount_price": "₦450.00",
        "price": "₦500.00",
        "amount": 450,
        "connections": 5,
        "description": "Perfect for new vendors testing the waters",
        "id": "starter"
      },
      {
        "name": "Growth Connect",
        "discount_price": "₦1,200.00",
        "price": "₦1,500.00",
        "amount": 1200,
        "connections": 15,
        "description": "For growing vendors looking to expand visibility",
        "id": "growth"
      },
      {
        "name": "Pro Connect",
        "discount_price": "₦2,100.00",
        "price": "₦3,000.00",
        "amount": 2100,
        "connections": 30,
        "description": "Designed for serious vendors aiming for consistent sales",
        "id": "pro"
      },
      {
        "name": "Elite Connect",
        "discount_price": "₦3,600.00",
        "price": "₦5,000.00",
        "amount": 3600,
        "connections": 60,
        "description": "For established vendors maximizing reach and engagement",
        "id": "elite"
      },
      {
        "name": "Enterprise Connect",
        "discount_price": "₦6,000.00",
        "price": "₦12,000.00",
        "amount": 6000,
        "connections": 120,
        "description": "Tailored for top vendors with high demand",
        "id": "enterprise"
      }
    ]
  };

  const handlePurchase = () => {
    if (!selectedPackage) {
      Alert.alert('Select a package', 'Please select a connection package to continue');
      return;
    }


    // dispatch(set_sub_modal(0));
    
    // // Find the selected package
    const pack = connectionPricing.bundle_packs.find(p => p.id === selectedPackage);
    const packageData = {
      type: selectedPackage === 'single' ? 'single' : 'bundle',
      ...pack
    };
    payNow(packageData)
    
    // navigation.navigate('user-payment', { 
    //   selectedPackage: packageData, 
    //   connectionPricing 
    // });
    // onClose();
  };

  const payNow = (selectedPackage) => {
      
    const start_date = new Date();
    const end_date = new Date();
    end_date.setMonth(end_date.getMonth() + 1);

    const reference = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    // setLoading(true);
    popup.newTransaction({
      email: user?.email,
      amount: parseFloat(selectedPackage?.discount_price.replace('₦', '').replace(',', '')),
      reference: reference,
      metadata: {
        user_id: user.user_id,
        type: 'connect',
        no_of_connects: selectedPackage.connections
      },
      
      onSuccess: (res) => {
        // setLoading(false);
        Alert.alert(
          'Payment Successful!',
          `Your ${selectedPackage?.tier} subscription has been activated.`,
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
        let newTier = { ...tier };
        newTier.start_date = start_date.toISOString();
        newTier.end_date = end_date.toISOString();
        newTier.plan = selectedPackage?.tier;
        dispatch(set_tier(newTier));
        navigation.goBack();
      },
      onCancel: () => {
        // setLoading(false);
        Alert.alert('Payment Cancelled', 'Your payment was cancelled.');
      },
      onError: (err) => {
        // setLoading(false);
        Alert.alert('Payment Error', 'There was an error processing your payment.');
        console.log('Payment Error:', err);
      }
    });
  };
  const calculateDiscount = (connections, price) => {
    const singlePrice = connections * 100;
    const discount = singlePrice - price;
    const discountPercent = Math.round((discount / singlePrice) * 100);
    return discountPercent;
  };

  // Get the single connection package (first item)
  const singleConnectionPack = connectionPricing.bundle_packs[0];
  
  // Get the bundle packages (all items except the first)
  const bundlePacks = connectionPricing.bundle_packs.slice(1);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
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

          <View style={styles.pricingSection}>
            <Text style={styles.sectionTitle}>Single Connection</Text>
            <TouchableOpacity
              style={[
                styles.packageCard,
                selectedPackage === singleConnectionPack.id && styles.selectedPackage,
              ]}
              onPress={() => setSelectedPackage(singleConnectionPack.id)}
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

          <View style={styles.pricingSection}>
            <Text style={styles.sectionTitle}>Bundle Packs</Text>
            <Text style={styles.sectionSubtitle}>Save more with our bundle offers</Text>
            
            {bundlePacks.map((pack) => {
              const discountPercent = calculateDiscount(pack.connections, pack.amount);
              return (
                <TouchableOpacity
                  key={pack.id}
                  style={[
                    styles.packageCard,
                    styles.bundleCard,
                    selectedPackage === pack.id && styles.selectedPackage,
                  ]}
                  onPress={() => setSelectedPackage(pack.id)}
                >
                  {discountPercent > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>Save {discountPercent}%</Text>
                    </View>
                  )}
                  <View style={styles.packageHeader}>
                    <View>
                      <Text style={styles.packageName}>{pack.name}</Text>
                      <Text style={styles.connectionsCount}>{pack.connections} Connections</Text>
                    </View>
                    <View style={styles.priceTag}>
                      <Text style={styles.priceText}>₦{pack.amount}</Text>
                    </View>
                  </View>
                  <Text style={styles.packageDescription}>
                    Only ₦{Math.round(pack.amount / pack.connections)} per connection • {pack.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

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
                ? `₦${connectionPricing.bundle_packs.find(p => p.id === selectedPackage).amount}`
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
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
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