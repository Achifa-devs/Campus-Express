import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { set_connect_purchase_modal } from '../../../../../../redux/connect_purchase';

const { width, height } = Dimensions.get('window');

const VendorConnectModal = ({ visible, onClose, userConnections, onPurchase }) => {
    const { user } = useSelector(s => s?.user);
    const dispatch = useDispatch()
    
  const handlePurchase = () => {
    dispatch(set_connect_purchase_modal(1))
    onClose();
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
          <Text style={styles.modalTitle}>Vendor Connections</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Current Connections */}
          <View style={styles.connectionsSection}>
            <View style={styles.connectionsHeader}>
              <Icon name="people" size={24} color="#FF6B35" />
              <Text style={styles.connectionsTitle}>Your Available Connections</Text>
            </View>
            <View style={styles.connectionsCount}>
              <Text style={styles.connectionsNumber}>{user?.connects || 0}</Text>
              <Text style={styles.connectionsLabel}>connections remaining</Text>
            </View>
          </View>

          {/* How it Works */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>What Are Vendor Connections?</Text>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Icon name="key" size={20} color="#FF6B35" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>
                  Vendor connections are tokens that allow you to contact sellers directly.
                </Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Icon name="chatbubble-ellipses" size={20} color="#FF6B35" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>
                  Each time you contact a vendor, one connection token is used.
                </Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Icon name="lock-open" size={20} color="#FF6B35" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>
                  Get direct access to vendor contact information including phone numbers and WhatsApp.
                </Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Icon name="shield-checkmark" size={20} color="#FF6B35" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>
                  Secure communication - your number stays private until you choose to share it.
                </Text>
              </View>
            </View>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>When do I use a vendor connection?</Text>
              <Text style={styles.faqAnswer}>
                You use a connection token each time you want to view a vendor's contact information or send them a message.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Do connections expire?</Text>
              <Text style={styles.faqAnswer}>
                No, your purchased connections never expire. Use them whenever you need to contact vendors.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>What if I don't use all my connections?</Text>
              <Text style={styles.faqAnswer}>
                Your unused connections remain in your account indefinitely for future use.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Can I get a refund?</Text>
              <Text style={styles.faqAnswer}>
                Connection purchases are non-refundable as they provide immediate access to vendor information.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Buttons */}
        <View style={styles.fixedButtonsContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.purchaseButton}
            onPress={handlePurchase}
          >
            <Icon name="cart" size={20} color="#FFF" style={styles.buttonIcon} />
            <Text style={styles.purchaseButtonText}>Purchase Connection</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
    paddingBottom: 80, // Extra padding to account for fixed buttons
  },
  // Connections Section
  connectionsSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  connectionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  connectionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginLeft: 8,
  },
  connectionsCount: {
    alignItems: 'center',
  },
  connectionsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  connectionsLabel: {
    fontSize: 16,
    color: '#636e72',
    marginTop: 4,
  },
  // Info Section
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF6F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#2d3436',
    lineHeight: 20,
  },
  // Pricing Section
  pricingSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pricingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pricingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF6F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pricingContent: {
    flex: 1,
  },
  pricingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  pricingAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  pricingDescription: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
    marginTop: 8,
  },
  // FAQ Section
  faqSection: {
    backgroundColor: 'white',
    borderRadius: 4,
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
  // Fixed Buttons
  fixedButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  purchaseButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
  },
  buttonIcon: {
    marginRight: 8,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default VendorConnectModal;