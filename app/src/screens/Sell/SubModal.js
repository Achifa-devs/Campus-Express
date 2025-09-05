// components/Sell/SubscriptionModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SubscriptionModal = ({ visible, onClose, onSelect }) => {
  const tiers = [
    {
      name: 'Basic',
      price: '₦0',
      duration: 'Forever',
      features: [
        'Up to 3 products',
        // 'Basic analytics',
        'Limited customization'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: '₦700',
      duration: 'per month',
      features: [
        'Up to 9 products',
        'Basic analytics',
        'Limited customization'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '₦2,250',
      duration: 'per month',
      features: [
        'Up to 100 products',
        'Advanced analytics',
        // 'Priority support',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₦5,000',
      duration: 'per month',
      features: [
        'Unlimited products',
        'Advanced analytics',
        '24/7 support',
        // 'API access',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Choose Your Plan</Text>
          
          <ScrollView style={styles.tiersContainer}>
            {tiers.map((tier, index) => (
              <View 
                key={index} 
                style={[
                  styles.tierCard,
                  tier.popular && styles.popularTierCard
                ]}
              >
                {tier.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>POPULAR</Text>
                  </View>
                )}
                
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierPrice}>{tier.price}</Text>
                <Text style={styles.tierDuration}>{tier.duration}</Text>
                
                <View style={styles.featuresList}>
                  {tier.features.map((feature, i) => (
                    <View key={i} style={styles.featureItem}>
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.selectButton,
                    tier.popular && styles.popularSelectButton
                  ]}
                  onPress={() => onSelect(tier)}
                >
                  <Text style={[
                    styles.selectButtonText,
                    tier.popular && styles.popularSelectButtonText
                  ]}>
                    Select Plan
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FF4500',
  },
  tiersContainer: {
    marginTop: 10,
  },
  tierCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    position: 'relative',
  },
  popularTierCard: {
    borderColor: '#FF4500',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: '#FF4500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tierName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  tierPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF4500',
  },
  tierDuration: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  featuresList: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
  },
  selectButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  popularSelectButton: {
    backgroundColor: '#FF4500',
  },
  selectButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  popularSelectButtonText: {
    color: 'white',
  },
});

export default SubscriptionModal;