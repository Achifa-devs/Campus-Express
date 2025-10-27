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
  Animated,
  ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { set_deal } from '../../redux/info/deal'
import Tools from '../utils/generalHandler'
import { getSocket } from '../services/socket'
import { set_deals } from '../../redux/info/deals'
import ProofOfDeliveryUpload from '../components/Deals/Evidence'
import BottomModal from '../reusables/BtmModal'
// SMA-Lp3t-ZC3c-v4aKL
export default function DealForVendor() {
  const navigation = useNavigation();
  const { 
    deal
  } = useRoute()?.params
  const [activeTab, setActiveTab] = useState('details')
  const [loading, setLoading] = useState(false)
  const [socket, setSocket] = useState(null)
  const [orderStatus, setOrderStatus] = useState(deal.orderStatus || 'shipping') // pending, shipping, delivered
  const dispatch = useDispatch()
  const { 
    is_connected 
  } = useSelector(s => s?.is_connected);
  const { 
    deals 
  } = useSelector(s => s?.deals);
  const {
    user
  } = useSelector(s => s.user)

  useEffect(() => {
    if (!deal || !user) return;
    setOrderStatus(Tools.lower_case(deal.order.stage));
    dispatch(set_deal({
      room: Tools.generateConversationId(user?.user_id, deal?.partner?.user_id),
      partner: deal.partner
    }));
  }, [deal, user]);

  useEffect(() => {
    if(!user)return;
    const socket = getSocket();
    setSocket(socket)   
  }, [is_connected, user])
  
  const handleOrderAction = (title, message, event, newStatus) => {
    if(!socket){
      Alert.alert('Failed to update!')
      return; 
    }; 
    Alert.alert( 
      title,
      message,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm",
          onPress: () => {
            setLoading(true);
            socket.emit(
              'deal_update',
              {
                room_id: Tools.generateConversationId(user.user_id, deal.partner.user_id),
                order: deal.order,
                userId: user.user_id,
                date: new Date(),
                new_stage: event.split('_')[1],
                nxt_stage: newStatus
              },
              callback => { 
                const { success, data } = callback;   
                if (success) {
                  dispatch(set_deals(  
                    deals.map(item =>
                      item.order.order_id === data.order_id
                        ? { ...item, order: data }
                        : item
                    )
                  ));
                  setOrderStatus(newStatus);
                  setLoading(false)  
                } else {
                  setLoading(false)              
                  Alert.alert("Error", "Unable to update this deal. Please try again.");
                }
              }     
            );
          },
        },
      ]
    );
  };

  // Usage  
  const handleStartShipping = () =>
    handleOrderAction("Start Shipping", "Mark this order as 'Shipped'?", "deal_shipping", "delivered");

  const handleConfirmDelivery = () =>
    handleOrderAction("Confirm Delivery", "Has the customer received the order?", "deal_delivered", "evidence");

  const handleUploadEvidence = () =>
    handleOrderAction("Upload Evidence", "Provide tracking or delivery details.", "deal_evidence", "payment");

  const handleClaimPayment = () =>
    handleOrderAction("Claim Payment", "Would you like to claim payment for this order?", "deal_payment", "completed");


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

  const GetCompletedStatus = (status) => {
    let stats = []
    for(x in status){
      if(status[x].completed){
        // stats.push(x)
        stats.push(
        <View style={[
          styles.statusIndicator,
          styles.progress,
        ]}>
          <Text style={styles.statusIndicatorText}>
            {Tools.capitalize(x)}
          </Text>
        </View>)
      }
    }
    return stats;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BottomModal visible={true} onClose={toggleModal}>
        {/* Modal Component */}
         <ProofOfDeliveryUpload />
      </BottomModal>
      <StatusBar barStyle="dark-content" />
      {loading &&
        <View style={{
          height: '100%', 
          width: '100%',
          position: 'absolute',
          top: 1,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF8F6',
          opacity: .5
        }}>
          <ActivityIndicator size={'large'} color={'#FF4500'}></ActivityIndicator>
        </View>
      }
      
      <Animated.ScrollView 
        style={[styles.scrollView]}
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
                {
                  Tools.capitalize(deal.order.stage)
                }
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

              {orderStatus !== 'shipping' && (
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
              <Text style={styles.statusCardTitle}>Completed Stages</Text>
              {
                GetCompletedStatus(deal.order.status)
              }
            </View>

            {/* Action Buttons Grid */}
            <View style={styles.vendorActionsGrid}>
              <VendorActionButton
                title="Start Shipping"
                icon="🚚"
                onPress={handleStartShipping}
                variant="primary"
                disabled={orderStatus !== 'shipping'}
              />
              
              <VendorActionButton
                title="Upload Evidence"
                icon="🗂️"
                onPress={handleUploadEvidence}
                variant="trust"
                disabled={orderStatus !== 'evidence'}
              />
              
              <VendorActionButton
                title="Confirm Delivery"
                icon="✅"
                onPress={handleConfirmDelivery}
                variant="secondary"
                disabled={orderStatus !== 'delivered'}
              />
              
              <VendorActionButton
                title="Claim Payment"
                icon="🧾"
                onPress={handleClaimPayment}
                variant="success"
                disabled={orderStatus !== 'payment'}
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
    flexWrap: 'wrap',
    flexDirection: 'row',
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
    width: '100%',
    color: '#1e293b',
    marginBottom: 21,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    // borderBo
  },
  statusIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 6,
    alignSelf: 'flex-start',
  },
  progress: {
    backgroundColor: 'lightgreen',
    color: '#FFF'
  },
  statusIndicatorText: {
    fontSize: 14,
    color: '#FFF',
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
    color: '#fff',
    // borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  secondaryVendorActionButton: {
    color: '#fff',
    // borderColor: '#64748b',
    backgroundColor: '#26A69A',
  },
  trustVendorActionButton: {
    color: '#fff',
    // borderColor: '#10b981',
    backgroundColor: '#00BFA6',
  },
  successVendorActionButton: {
    color: '#fff',
    // borderColor: '#10b981',
    backgroundColor: '#2ECC71',
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
    color: '#fff',
  },
  trustVendorActionText: {
    color: '#fff',
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