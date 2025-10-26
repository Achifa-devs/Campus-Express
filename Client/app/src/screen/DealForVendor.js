import { useRoute, useNavigation } from '@react-navigation/native'
import js_ago from 'js-ago'
import React, { useEffect, useState } from 'react'
import { 
  Dimensions, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  Animated
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { set_deal } from '../../redux/info/deal'
import Tools from '../utils/generalHandler'

export default function DealForVendor() {
  const navigation = useNavigation()
  const { deal } = useRoute()?.params
  const [activeTab, setActiveTab] = useState('details')
  const [orderStatus, setOrderStatus] = useState(deal.orderStatus || 'pending') // pending, shipping, delivered
  const dispatch = useDispatch()
  const {
    user
  } = useSelector(s => s.user)
  
  useEffect(() => {
    if(!deal) return;
    // console.log(user?.user_id, deal?.partner?.user_id, deal?.partner?.vendor_id)
    console.log(deal)
    dispatch(set_deal(
      {
        room: Tools.generateConversationId(user?.user_id, deal?.partner?.user_id),
        partner: deal.partner
      }
    ))
  }, [deal])
  const fadeAnim = new Animated.Value(0)

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  // Vendor Actions
  const handleStartShipping = () => {
    Alert.alert(
      "Start Shipping",
      "Mark this order as shipped?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Start Shipping", 
          onPress: () => {
            setOrderStatus('shipping')
            Alert.alert("Success", "Order marked as shipped!")
          }
        }
      ]
    )
  }

  const handleConfirmDelivery = () => {
    Alert.alert(
      "Confirm Delivery",
      "Has this order been delivered to the customer?",
      [
        {
          text: "Not Yet",
          style: "cancel"
        },
        { 
          text: "Confirm Delivery", 
          onPress: () => {
            setOrderStatus('delivered')
            Alert.alert("Success", "Delivery confirmed! Order completed.")
          }
        }
      ]
    )
  }

  const handleUploadEvidence = () => {
    Alert.alert(
      "Update Tracking",
      "Enter tracking information",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Update", 
          onPress: () => {
            Alert.alert("Success", "Tracking information updated!")
          }
        }
      ]
    )
  }

  const handleContactCustomer = () => {
    Alert.alert(
      "Contact Customer",
      `Contact ${deal.partnerName || 'customer'} about this order?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Contact", 
          onPress: () => {
            // Implement contact logic
          }
        }
      ]
    )
  }

  const InfoCard = ({ icon, title, value }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )

  const VendorActionButton = ({ title, icon, onPress, variant = 'primary', disabled = false }) => (
    <TouchableOpacity 
      style={[
        styles.vendorActionButton,
        styles[`${variant}VendorActionButton`],
        disabled && styles.disabledVendorActionButton
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.vendorActionIcon}>{icon}</Text>
      <Text style={[
        styles.vendorActionText,
        styles[`${variant}VendorActionText`],
        disabled && styles.disabledVendorActionText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.ScrollView 
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Card - Remains the same */}
        <View style={styles.productCard}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: deal.product.thumbnail_id || 'https://via.placeholder.com/300' }}
              style={styles.productImage}
            />
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {deal?.order?.stage?.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>
              {deal.product.title || 'Product Title'}
            </Text>
            <Text style={styles.productPrice}>
              ₦{new Intl.NumberFormat('en-US').format(deal?.order?.price || 0)}
            </Text>
            
            <View style={styles.partnerSection}>
              {
                !deal?.partner?.photo?
                <View style={styles.partnerAvatar}>
                  <Text style={styles.partnerInitials}>
                    {
                      (deal?.partner?.fname[0]+'.'+deal?.partner?.lname[0] || 'SS').split(' ').map(n => n[0]).join('')
                    }
                  </Text>
                </View>
                :
                <Image 
                  source={{uri: deal.partner.photo}}
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: 50,
                    marginHorizontal: 9
                }} />
              }
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>
                  {deal?.partner?.fname+' '+deal?.partner?.lname || 'Customer Name'}
                </Text>
                <Text style={styles.partnerRating}>{
                  deal.partner.lastseen === 'now' ? '🟢 Online' : `🔴 Active ${js_ago(new Date(deal.partner.lastseen))}`  
                }</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation - Updated with Manage Orders */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'details' && styles.activeTab]}
            onPress={() => setActiveTab('details')}
          >
            <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
              Details
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'manage' && styles.activeTab]}
            onPress={() => setActiveTab('manage')}
          >
            <Text style={[styles.tabText, activeTab === 'manage' && styles.activeTabText]}>
              Logistics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tracking' && styles.activeTab]}
            onPress={() => setActiveTab('tracking')}
          >
            <Text style={[styles.tabText, activeTab === 'tracking' && styles.activeTabText]}>
              Timeline
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Deal Information</Text>
            
            <View style={styles.infoGrid}>
              <InfoCard 
                icon="📅" 
                title="Start Date" 
                value={deal.order.startDate || '15 Feb 2024'} 
              />
              <InfoCard 
                icon="🏁" 
                title="End Date" 
                value={deal.endDate || 'Present'} 
              />
              <InfoCard 
                icon="⏱️" 
                title="Duration" 
                value="5 days & Counting" 
              />
              <InfoCard 
                icon="📦" 
                title="Type" 
                value={`${deal?.product?.purpose[0].toUpperCase()}${deal?.product?.purpose.slice(1)}` || 'Accommodation'}

              />
            </View>

            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {deal?.product?.description || 'This is a detailed description of the product or accommodation. It includes all the features and benefits that the user should know about.'}
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'tracking' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Deal Timeline</Text>
            
            {/* Deal Timeline */}
            <View style={styles.timelineCard}>
              {/* <Text style={styles.timelineTitle}>Deal Timeline</Text> */}
              
              <View style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineEvent}>Deal Placed</Text>
                  <Text style={styles.timelineTime}>Today, 10:30 AM</Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineEvent}>Payment Confirmed</Text>
                  <Text style={styles.timelineTime}>Today, 10:35 AM</Text>
                </View>
              </View>

              {orderStatus !== 'pending' && (
                <View style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineEvent}>Order Shipped</Text>
                    <Text style={styles.timelineTime}>
                      {orderStatus === 'shipping' ? 'Today, 11:00 AM' : 'Yesterday, 2:30 PM'}
                    </Text>
                  </View>
                </View>
              )}

              {orderStatus === 'delivered' && (
                <View style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineEvent}>Order Delivered</Text>
                    <Text style={styles.timelineTime}>Today, 3:15 PM</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {activeTab === 'manage' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Deal Management</Text>
            
            {/* Current Status Card */}
            <View style={styles.statusCard}>
              <Text style={styles.statusCardTitle}>Current Status</Text>
              <View style={[
                styles.statusIndicator,
                orderStatus === 'pending' && styles.statusPending,
                orderStatus === 'shipping' && styles.statusShipping,
                orderStatus === 'delivered' && styles.statusDelivered
              ]}>
                <Text style={styles.statusIndicatorText}>
                  {orderStatus === 'pending' && '🔄 Processing'}
                  {orderStatus === 'shipping' && '🚚 Shipping'}
                  {orderStatus === 'delivered' && '✅ Delivered'}
                </Text>
              </View>
            </View>

            {/* Action Buttons Grid */}
            <View style={styles.vendorActionsGrid}>
              <VendorActionButton
                title="Start Shipping"
                icon="🚚"
                onPress={handleStartShipping}
                variant="primary"
                disabled={orderStatus !== 'pending'}
              />
              
              <VendorActionButton
                title="Upload Evidence"
                icon="🗂️"
                onPress={handleUploadEvidence}
                variant="secondary"
                disabled={orderStatus === 'pending'}
              />
              
              <VendorActionButton
                title="Confirm Delivery"
                icon="✅"
                onPress={handleConfirmDelivery}
                variant="success"
                disabled={orderStatus !== 'shipping'}
              />
              
              <VendorActionButton
                title="Claim Payment"
                icon="🧾"
                onPress={handleContactCustomer}
                variant="secondary"
              />
            </View>        

            {/* Customer Information */}
            <View style={styles.customerCard}>
              <Text style={styles.customerCardTitle}>Customer Details</Text>
              
              <View style={styles.customerInfoRow}>
                <Text style={styles.customerInfoLabel}>Name:</Text>
                <Text style={styles.customerInfoValue}>{`${deal.partner.fname} ${deal.partner.lname}` || 'Customer Name'}</Text>
              </View>
              
              <View style={styles.customerInfoRow}>
                <Text style={styles.customerInfoLabel}>Delivery Address:</Text>
                <Text style={styles.customerInfoValue}>
                  123 Customer Street, Apartment 4B{'\n'}
                  Lagos, Nigeria
                </Text>
              </View>
              
              <View style={styles.customerInfoRow}>
                <Text style={styles.customerInfoLabel}>Special Instructions:</Text>
                <Text style={styles.customerInfoValue}>
                  Leave at front door if not home
                </Text>
              </View>
            </View>
          </View>
        )}
      </Animated.ScrollView>
      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        {/* <TouchableOpacity 
          style={[styles.bottomButton, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel Deal</Text>
        </TouchableOpacity> */}
        
        <TouchableOpacity
          style={[styles.bottomButton, styles.confirmButton]}
          // onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Cancel Deal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#64748b',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  chatButton: {
    padding: 8,
  },
  chatButtonText: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 80
  },
  productCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f59e0b',
  },
  productInfo: {
    padding: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 28,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#dc2626',
    marginBottom: 16,
  },
  partnerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  partnerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  partnerInitials: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  partnerRating: {
    fontSize: 14,
    color: '#64748b',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  // Info Steps
    infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748b',
  },
  // Tracking Steps Styles (same as before)
  trackingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  trackingStep: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  stepCircleCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  stepCircleActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  stepCheck: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepLine: {
    width: 2,
    height: 40,
    backgroundColor: '#e2e8f0',
    marginTop: 4,
  },
  stepLineCompleted: {
    backgroundColor: '#10b981',
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 4,
  },
  stepTitleActive: {
    color: '#3b82f6',
  },
  stepTitleCompleted: {
    color: '#10b981',
  },
  stepDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  // Vendor Management Styles
  statusCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statusCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  statusIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusShipping: {
    backgroundColor: '#dbeafe',
  },
  statusDelivered: {
    backgroundColor: '#d1fae5',
  },
  statusIndicatorText: {
    fontSize: 14,
    fontWeight: '700',
  },
  vendorActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vendorActionButton: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 2,
  },
  primaryVendorActionButton: {
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  secondaryVendorActionButton: {
    borderColor: '#64748b',
    backgroundColor: '#fff',
  },
  successVendorActionButton: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  disabledVendorActionButton: {
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    opacity: 0.6,
  },
  vendorActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  vendorActionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryVendorActionText: {
    color: '#fff',
  },
  secondaryVendorActionText: {
    color: '#64748b',
  },
  successVendorActionText: {
    color: '#fff',
  },
  disabledVendorActionText: {
    color: '#94a3b8',
  },
  timelineCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
    marginRight: 12,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  timelineTime: {
    fontSize: 12,
    color: '#64748b',
  },
  customerCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  customerCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  customerInfoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  customerInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    width: 120,
  },
  customerInfoValue: {
    fontSize: 14,
    color: '#1e293b',
    flex: 1,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
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
})