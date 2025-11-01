import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import useCyclicTimeWatch from '../hooks/Timer';

export default function ReleaseFunds() {
  const [confirmed, setConfirmed] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const {
    deal
  } = useRoute().params;
  const { remaining, expired } = useCyclicTimeWatch(deal.order.status.delivered.completedAt, 6);

  const handleReleaseFunds = async () => {
    setIsProcessing(true);
    // Your release logic here
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Summary Card */}
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View style={styles.iconContainer}>
              <Icon name="cube-outline" size={24} color="#FF4500" />
            </View>
            <View style={styles.orderHeaderText}>
              <Text style={styles.orderTitle}>Deal Summary</Text>
              <Text style={styles.orderId}>Order #2341</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.orderDetails}>
            <InfoRow icon="person-outline" label="Vendor" value="James' Auto Parts" />
            <InfoRow icon="bag-handle-outline" label="Product" value="Car Windshield Replacement" />
            <InfoRow 
              icon="card-outline" 
              label="Amount" 
              value="₦12,500" 
              highlight 
            />
          </View>
        </View>

        {/* Confirmation Section */}
        <View style={styles.confirmSection}>
          <Text style={styles.sectionTitle}>Confirmation Required</Text>
          
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setConfirmed(!confirmed)}
            activeOpacity={0.7}
          >
            <CheckBox 
              value={confirmed} 
              onValueChange={setConfirmed}
              tintColors={{ true: '#FF4500', false: '#999' }}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>
              I confirm I have received the item/service and am completely satisfied with the quality
            </Text>
          </TouchableOpacity>
        </View>

        {/* Warning Alert */}
        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <Icon name="alert-circle-outline" size={20} color="#d97706" />
            <Text style={styles.warningTitle}>Important Notice</Text>
          </View>
          <Text style={styles.warningText}>
            Once the funds are released, refunds will no longer be available. You have up to 6 hours to inspect the item. After this period, the payment will be automatically released to the vendor in accordance with our policy, unless a dispute is raised.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Primary Action */}
          <TouchableOpacity
            disabled={!confirmed || isProcessing}
            onPress={handleReleaseFunds}
            style={[
              styles.primaryButton,
              (!confirmed || isProcessing) && styles.buttonDisabled
            ]}
            activeOpacity={0.8}
          >
            {isProcessing ? (
              <ActivityIndicator color="white" size="small" style={styles.buttonIcon} />
            ) : (
              <Icon name="checkmark-circle-outline" size={20} color="white" style={styles.buttonIcon} />
            )}
            <Text style={styles.primaryButtonText}>
              {isProcessing ? 'Processing...' : 'Release Funds Now'}
            </Text>
          </TouchableOpacity>

          {/* Secondary Actions */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity
              style={[styles.secondaryButton, styles.dangerButton]}
              activeOpacity={0.7}
            >
              <Icon name="flag-outline" size={18} color="#dc2626" />
              <Text style={[styles.secondaryButtonText, styles.dangerButtonText]}>
                Raise Dispute
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Help Text */}
        <Text style={styles.helpText}>
          Need help? Contact our support team at +234-8032639894
        </Text>

      </ScrollView>
        <View style={styles.bottomBar}>
            <Text style={{
                color: expired ? '#ef4444' : '#22c55e',
                fontWeight: '700',
                fontSize: 14,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: expired ? '#fef2f2' : '#f0fdf4',
                borderRadius: 6,
                borderWidth: 1,
                borderColor: expired ? '#fecaca' : '#bbf7d0',
                overflow: 'hidden',
                minWidth: 70,
                textAlign: 'center'
            }}>
                {expired ? "EXPIRED" : remaining}
            </Text>
            <Text style={{
                color: expired ? '#dc2626' : '#15803d',
                fontWeight: '600',
                fontSize: 14,
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: 'transparent',
                borderRadius: 4,
                overflow: 'hidden',
                fontStyle: expired ? 'italic' : 'normal'
            }}>
                {expired ? "Funds released" : "Pending release"}
            </Text>
        </View>
    </View>
  );
}

// Reusable Info Row Component
function InfoRow({ icon, label, value, highlight }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}>
        <Icon name={icon} size={16} color="#64748b" style={styles.infoIcon} />
        <Text style={styles.infoLabelText}>{label}</Text>
      </View>
      <Text style={[styles.infoValue, highlight && styles.infoValueHighlight]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 80,
  },

  // Header
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
  },

  // Order Card
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#fff4e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  orderHeaderText: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  orderId: {
    fontSize: 14,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 4,
  },
  orderDetails: {
    gap: 12,
  },

    //  Bottom button
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: 10,
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#dc2626',
  },
  confirmButton: {
    backgroundColor: '#dc2626',
    shadowColor: '#dc2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  // Info Row
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoLabelText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },
  infoValueHighlight: {
    fontSize: 18,
    color: '#FF4500',
  },

  // Confirmation Section
  confirmSection: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },

  // Warning Card
  warningCard: {
    backgroundColor: '#fff4e0',
    borderRadius: 4,
    padding: 16,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4500',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#78350f',
    lineHeight: 20,
  },

  // Actions
  actionsContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 12,
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryActions: {
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  dangerButton: {
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
    marginLeft: 8,
  },
  dangerButtonText: {
    color: '#dc2626',
  },

  // Help Text
  helpText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
  },
});