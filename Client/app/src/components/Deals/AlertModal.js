import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AlertModal = ({ visible, onClose, onConfirm, onDispute }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.overlay}>
          <ScrollView style={styles.alertContainer}>
            
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Ionicons name="warning" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>Payment Request Notice</Text>
              <Text style={styles.subtitle}>
                Important information about customer satisfaction
              </Text>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
              <View style={styles.messageSection}>
                <Text style={styles.messageTitle}>Before Requesting Payment:</Text>
                
                <View style={styles.bulletPoint}>
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                  <Text style={styles.bulletText}>
                    Customer must confirm satisfaction with delivery
                  </Text>
                </View>
                
                <View style={styles.bulletPoint}>
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                  <Text style={styles.bulletText}>
                    Customer must verify item/service meets expectations
                  </Text>
                </View>
                
                <View style={styles.bulletPoint}>
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                  <Text style={styles.bulletText}>
                    Customer must acknowledge satisfactory service
                  </Text>
                </View>
              </View>

              <View style={styles.noticeSection}>
                <View style={styles.noticeHeader}>
                  <Ionicons name="information-circle" size={20} color="#FFFFFF" />
                  <Text style={styles.noticeTitle}>Important Notice</Text>
                </View>
                <Text style={styles.noticeText}>
                  If the customer is unsatisfied with any aspect of the delivery, 
                  item quality, or service received, they have the right to create 
                  a dispute through our resolution system.
                </Text>
              </View>

              <View style={styles.tipsSection}>
                <Text style={styles.tipsTitle}>Best Practices:</Text>
                <View style={styles.tipItem}>
                  <Ionicons name="star" size={14} color="#FFFFFF" />
                  <Text style={styles.tipText}>Ensure clear communication with customer</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="star" size={14} color="#FFFFFF" />
                  <Text style={styles.tipText}>Provide quality items/services as described</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="star" size={14} color="#FFFFFF" />
                  <Text style={styles.tipText}>Follow up for customer feedback</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity 
                style={[styles.button, styles.disputeButton]}
                onPress={onDispute}
              >
                <Ionicons name="alert-circle-outline" size={18} color="#FFFFFF" />
                <Text style={styles.disputeButtonText}>Learn More</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.confirmButton]}
                onPress={onConfirm}
              >
                <Ionicons name="checkmark-done" size={18} color="#1F2937" />
                <Text style={styles.confirmButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Note */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                This ensures fair transactions and maintains platform trust
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    backgroundColor: '#FF4500',
    borderRadius: 4,
    width: screenWidth * 0.9,
    height: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FF6B35',
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  messageSection: {
    marginBottom: 20,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 4,
  },
  bulletText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
  noticeSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  noticeText: {
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 18,
    fontWeight: '400',
  },
  tipsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '400',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation: 3,
  },
  disputeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  confirmButton: {
    backgroundColor: '#FFFFFF',
  },
  disputeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  confirmButtonText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  footer: {
    padding: 20,
    paddingTop: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '400',
  },
});

export default AlertModal;