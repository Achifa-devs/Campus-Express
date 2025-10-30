import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Tools from '../utils/generalHandler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Receipt = ({ navigation, route }) => {

    const {
        deal
    } = useRoute()?.params;
    const {
    user
    } = useSelector(s => s.user)

  const receiptData = {
    receiptId: 'RCP-789456123',
    date: '2024-01-20T14:30:00',
    status: 'pending', // pending, paid, cancelled
    customer: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+234 801 234 5678',
    },
    vendor: {
      name: 'Tech Gadgets Store',
      email: 'sales@techgadgets.com',
      phone: '+234 802 345 6789',
    },
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        unitPrice: 12999,
        total: 12999,
      },
      {
        id: 2,
        name: 'Phone Case - Premium',
        quantity: 1,
        unitPrice: 2500,
        total: 2500,
      },
    ],
    shipping: {
      method: 'Express Delivery',
      fee: 1500,
      address: '123 Customer Street, Lagos Island, Lagos',
    },
    fees: {
      platformFee: 500,
      transactionFee: 250,
      tax: 1875, // 12.5% VAT
    },
    payment: {
      method: 'Bank Transfer',
      reference: 'TXN789456123',
      dueDate: '2024-01-25',
    },
  };

  const handleClaimPayment = () => {
    Alert.alert(
      'Claim Payment',
      'Are you sure you want to claim this payment? The amount will be transferred to your registered bank account.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Claim Payment', 
          onPress: () => {
            Alert.alert(
              'Success', 
              'Payment claim request submitted successfully! Funds will be transferred within 24-48 hours.',
              [{ text: 'OK' }]
            );
          }
        },
      ]
    );
  };

  const handlePrintReceipt = () => {
    Alert.alert(
      'Print Receipt',
      'This receipt is optimized for printing. You can take a screenshot or use your device\'s print functionality.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: () => console.log('Print receipt functionality') 
        },
      ]
    );
  };

  const handleShareReceipt = () => {
    Alert.alert(
      'Share Receipt',
      'Share this receipt via email or other apps.',
      [{ text: 'OK' }]
    );
  };

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Receipt Container */}
        <View style={styles.receiptContainer}>
          {/* Receipt Header */}
          <View style={styles.receiptHeader}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>CAMPUS SPHERE</Text>
              <Text style={styles.companyTagline}>Official Payment Receipt</Text>
              <Text numberOfLines={1} style={styles.receiptId}>Receipt: RCP-{deal?.transaction.reference}</Text>
              <Text style={styles.receiptDate}>
                {formatDate(deal?.transaction.created_at)}
              </Text>
              {/* <View style={[styles.statusBadge, { backgroundColor: getStatusColor(receiptData.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(receiptData.status) }]}>
                  {getStatusText(receiptData.status)}
                </Text>
              </View> */}
            </View>

            {/* <View style={styles.receiptMeta}>
            </View> */}
          </View>

          {/* Parties Information */}
          <View style={[styles.partiesSection, {
            flexDirection: deal.order.vendor_id === user.user_id ? 'row' : 'row-reverse'
          }]}>
            <View style={styles.partyCard}>
              <Text style={styles.partyTitle}>VENDOR</Text>
              <Text style={styles.partyName}>{user.fname}.{user.lname[0]}</Text>
              <Text style={styles.partyContact}>{user.email}</Text>
              <Text style={styles.partyContact}>{user.phone}</Text>
            </View>
            <View style={styles.partyCard}>
              <Text style={styles.partyTitle}>CUSTOMER</Text>
              <Text style={styles.partyName}>{deal.partner.fname}.{deal.partner.lname[0]}</Text>
              <Text style={styles.partyContact}>{deal.partner.email}</Text>
              <Text style={styles.partyContact}>{deal.partner.phone}</Text>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.itemsSection}>
            <Text style={styles.sectionTitle}>ITEMS PURCHASED</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 3 }]}>Description</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>Qty</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>Unit Price</Text>
              <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>Total</Text>
            </View>
            
            {/* {receiptData.items.map((item, index) => (
              <View key={item.id} style={[
                styles.tableRow,
                index % 2 === 0 && styles.tableRowAlternate
              ]}>
                <Text style={[styles.tableCell, { flex: 3 }]}>{item.name}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{formatCurrency(item.unitPrice)}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{formatCurrency(item.total)}</Text>
              </View>
            ))} */}

            <View style={[
                styles.tableRow,
                // index % 2 === 0 && styles.tableRowAlternate
              ]}>
                <Text style={[styles.tableCell, { flex: 3 }]}>{deal.product.title}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{deal.order.stock}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{formatCurrency(deal.product.price)}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{formatCurrency(deal.order.price)}</Text>
            </View>
          </View>

          {/* Shipping Information */}
          <View style={styles.shippingSection}>
            <Text style={styles.sectionTitle}>SHIPPING DETAILS</Text>
            <View style={styles.shippingInfo}>
              <View style={styles.shippingRow}>
                <Text style={styles.shippingLabel}>Method:</Text>
                <Text style={styles.shippingValue}>{deal.order.pick_up_channels[0].channel}</Text>
              </View>
              <View style={styles.shippingRow}>
                <Text style={styles.shippingLabel}>Delivery Address:</Text>
                <Text style={styles.shippingValue}>{deal.order.pick_up_channels[0].locale}</Text>
              </View>
            </View>
          </View>

          {/* Payment Summary */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>PAYMENT SUMMARY</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items Subtotal:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(parseInt(deal.product.price) * parseInt(deal.order.stock))}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Fee:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(deal.order.shipping_fee)}</Text>
            </View>
            
           {
                deal.order.vendor_id === user.user_id &&
                <>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Platform Fee:</Text>
                        <Text style={styles.summaryValue}>{formatCurrency((2/100) * parseInt(deal.product.price))}</Text>
                        </View>
                    
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Transaction Fee:</Text>
                        <Text style={styles.summaryValue}>{formatCurrency(50.00)}</Text>
                    </View>
                </>
            }
            
            {/* <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (12.5% VAT):</Text>
              <Text style={styles.summaryValue}>{0.50}K</Text>
            </View> */}
            
            <View style={[styles.summaryRow, styles.grandTotalRow]}>
              <Text style={styles.grandTotalLabel}>TOTAL AMOUNT PAID:</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(parseInt(deal.order.price) + parseInt(deal.order.shipping_fee))}</Text>
            </View>

            {/* Vendor Amount */}
            {
                deal.order.vendor_id === user.user_id &&
                <View style={[styles.summaryRow, styles.vendorAmountRow]}>
                    <Text style={styles.vendorAmountLabel}>Amount to Vendor:</Text>
                    <Text style={styles.vendorAmountValue}>{formatCurrency(parseInt(deal.order.price) + parseInt(deal.order.shipping_fee)-((parseInt((2/100) * parseInt(deal.product.price)) + 50)))}</Text>
                </View>
            }
          </View>

          {/* Payment Information */}
          {
            deal.order.vendor_id !== user.user_id &&
            <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>PAYMENT INFORMATION</Text>
            <View style={styles.paymentInfo}>
                <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Payment Method:</Text>
                <Text style={styles.paymentValue}>{Tools.capitalize(deal.transaction.payment_method)}</Text>
                </View>
                <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Reference No:</Text>
                <Text style={styles.paymentValue}>{deal.transaction.reference}</Text>
                </View>
                <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Payment Due:</Text>
                <Text style={styles.paymentValue}>
                    {new Date(deal.transaction.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    })}
                </Text>
                </View>
            </View>
            </View>
          }

          {/* Terms and Conditions */}
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>TERMS & CONDITIONS</Text>
            <Text style={styles.termsText}>
              • This is an official receipt from Campus Sphere{'\n'}
              • All payments are subject to verification{'\n'}
              • Refunds processed within 6 - 12 Hrs{'\n'}
              • For inquiries, contact +234-8032639894{'\n'}
              • Receipt ID: {deal.transaction.reference}
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Thank you for your choosing Campus Sphere!</Text>
            <Text style={styles.footerSubtext}>Campus Sphere - Trusted Campus Marketplace</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.shareButton]}
          onPress={handleShareReceipt}
        >
          <Ionicons name="share-social-outline" size={20} color="#FF4500" />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.claimButton]}
          onPress={handleClaimPayment}
        //   disabled={receiptData.status !== 'pending'}
        >
          <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />
          <Text style={styles.claimButtonText}>
            {!deal.order.completed.vendor ? 'Claim Payment' : 'Payment Claimed'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  printButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 8,
    paddingBottom: 100,
  },
  receiptContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
    borderRadius: 4,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 1.5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  companyTagline: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  receiptMeta: {
    alignItems: 'flex-end',
  },
  receiptId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 4,
    // width: '40%'
  },
  receiptDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  partiesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  partyCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  partyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  partyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  partyContact: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  itemsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableRowAlternate: {
    backgroundColor: '#F8FAFC',
  },
  tableCell: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'left',
  },
  headerCell: {
    fontWeight: '700',
    color: '#1F2937',
  },
  shippingSection: {
    marginBottom: 20,
  },
  shippingInfo: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shippingRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  shippingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    width: 100,
  },
  shippingValue: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  summarySection: {
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  grandTotalRow: {
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10B981',
  },
  vendorAmountRow: {
    backgroundColor: '#F0FDF4',
    marginTop: 12,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  vendorAmountLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  vendorAmountValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#065F46',
  },
  paymentSection: {
    marginBottom: 20,
  },
  paymentInfo: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  paymentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    width: 120,
  },
  paymentValue: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  termsSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff4e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  termsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  termsText: {
    fontSize: 10,
    color: '#FF4500',
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  shareButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  claimButton: {
    backgroundColor: '#10B981',
  },
  shareButtonText: {
    color: '#FF4500',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default Receipt;