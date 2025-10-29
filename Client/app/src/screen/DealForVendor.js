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
  let { 
    deal
  } = useRoute()?.params
  const [activeTab, setActiveTab] = useState('details')
  const [loading, setLoading] = useState(false)
  const [cancelled, setCancelled] = useState(true)
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
    let new_deal = deals.filter(item => item.order.order_id === deal.order.order_id)[0];
    setCancelled(new_deal.order.status.cancelled.completed);
  }, [deals, deal])

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

  const handleClaimPayment = () =>
    handleOrderAction("Claim Payment", "Would you like to claim payment for this order?", "deal_payment", "completed");


  const InfoCard = ({ icon, title, value }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )

  const VendorActionCard = ({ title, icon, description, onPress, variant = 'primary', disabled = false, completed = false }) => (
    <TouchableOpacity 
      style={[
        styles.vendorActionCard,
        styles[`${variant}VendorActionCard`],
        disabled && styles.disabledVendorActionCard,
        completed && styles.completedVendorActionCard
      ]}
      onPress={onPress}
      disabled={disabled || completed}
    >
      <View style={styles.vendorActionCardHeader}>
        <View style={styles.vendorActionIconContainer}>
          <Text style={styles.vendorActionIcon}>{icon}</Text>
          {completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>✓</Text>
            </View>
          )}
        </View>
        <View style={styles.vendorActionTextContainer}>
          <Text style={[
            styles.vendorActionCardTitle,
            styles[`${variant}VendorActionCardTitle`],
            (disabled || completed) && styles.disabledVendorActionCardTitle
          ]}>
            {title}
          </Text>
          {completed && (
            <Text style={styles.completedText}>Completed</Text>
          )}
        </View>
      </View>
      
      <Text style={[
        styles.vendorActionDescription,
        (disabled || completed) && styles.disabledVendorActionDescription
      ]}>
        {description}
      </Text>
      
      <View style={styles.vendorActionCardFooter}>
        {!completed && !disabled && (
          <Text style={styles.actionPromptText}>Tap to proceed →</Text>
        )}
        {!completed && disabled && (
          <Text style={styles.disabledActionText}>Complete previous steps first</Text>
        )}
        {completed && (
          <Text style={styles.completedActionText}>Step completed ✓</Text>
        )}
      </View>
    </TouchableOpacity>
  )



  const GetTimeline = (status = {}) => {
    const labelMap = {
      confirmed: 'Purchased',
      shipping: 'Shipped',
      delivered: 'Delivered',
      evidence: 'Trust Created',
    };

    // Define the desired order
    const order = ['Purchased', 'Shipped', 'Delivered', 'Trust Created'];

    const stats = Object.entries(status)
      .filter(([_, value]) => value?.completed)
      .map(([key, value]) => ({
        label: labelMap[key.toLowerCase()] || key,
        date: value.completedAt || null,
      }))
      // Sort according to the desired order
      .sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label));

    return stats;
  };



  return (
    <SafeAreaView style={styles.container}>
      
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

        <View style={{
          display: !cancelled ? 'flex' : 'none',
        }}>
          {/* Tab Content */}
          {activeTab === 'details' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Deal Information</Text>
          
              <View style={styles.infoGrid}> 
                <InfoCard
                  icon="📅"
                  title="Start Date"
                  value={(Tools.formatDealDate((deal.order.date).toLocaleString())) || 'Loading'}
                />
                <InfoCard
                  icon="🏁"
                  title="End Date"
                  value={(deal.order.end_date) || 'Present'}
                />
                <InfoCard
                  icon="⏱️"
                  title="Duration"
                  value={Tools.getTimeAgo(deal.order.date)}
                />
                <InfoCard
                  icon="📦"
                  title="Type"
                  value={`${Tools.capitalize(deal?.product?.purpose)}` || 'Loading...'}
                />
              </View>
              {
                deal?.product?.description &&
                <View style={styles.descriptionCard}>
                  <Text style={styles.descriptionTitle}>Description</Text>
                  <Text style={styles.descriptionText}>
                    {deal?.product?.description || 'This is a detailed description of the product or accommodation. It includes all the features and benefits that the user should know about.'}
                  </Text>
                </View>
              }
            </View>
          )}
          {activeTab === 'tracking' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Deal Timeline</Text>
          
              {/* Deal Timeline */}
              <View style={styles.timelineCard}>
                {/* <Text style={styles.timelineTitle}>Deal Timeline</Text> */}
          
                {GetTimeline(deal.order.status).map(item =>
                  <View style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineEvent}>Order {item.label}</Text>
                      <Text style={styles.timelineTime}>
                        {js_ago(new Date(item.date))}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
          {activeTab === 'manage' && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Deal Management</Text>

              {/* Action Buttons Grid - Updated to full width columns */}
              <View style={styles.vendorActionsGrid}>
                <VendorActionCard
                  title="Start Shipping"
                  icon="🚚"
                  description="Mark the order as dispatched provide tracking information to the buyer"
                  onPress={() => navigation.navigate('deal_shipping', {
                    deal,
                    onReturn: (updatedDeal) => {
                      deal = (updatedDeal);
                    },
                  })}
                  variant="primary"
                  disabled={orderStatus !== 'shipping'}
                  completed={deal.order.status.shipping?.completed}
                />

                <VendorActionCard
                  title="Confirm Delivery"
                  icon="✅"
                  description="Upload proof of delivery evidence and confirm the order has been received"
                  onPress={() => navigation.navigate('deal_proof', {
                    deal,
                    onReturn: (updatedDeal) => {
                      deal = (updatedDeal);
                    },
                  })}
                  variant="secondary"
                  disabled={orderStatus !== 'delivered'}
                  completed={deal.order.status.delivered?.completed}
                />

                <VendorActionCard
                  title="Claim Payment"
                  icon="🧾"
                  description="Request payment release after successful delivery confirmation"
                  onPress={handleClaimPayment}
                  variant="success"
                  disabled={orderStatus !== 'payment'}
                  completed={deal.order.status.payment?.completed}
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
                  <Text style={styles.customerInfoLabel}>Delivery Method:</Text>
                  <Text style={styles.customerInfoValue}>
                    {deal.order.pick_up_channels[0].channel}
                  </Text>
                </View>
                <View style={styles.customerInfoRow}>
                  <Text style={styles.customerInfoLabel}>Delivery Address:</Text>
                  <Text style={styles.customerInfoValue}>
                    {deal.order.pick_up_channels[0].locale}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View> 
      </Animated.ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        { !cancelled &&
          <>
            <TouchableOpacity 
              style={[styles.bottomButton, styles.cancelButton]}
              onPress={e => {
                socket.emit('deal_update', {
                  order: deal.order, 
                  new_stage: 'cancelled', 
                  userId: user.user_id, 
                  room_id: Tools.generateConversationId(user.user_id, deal.partner.user_id), 
                  nxt_stage: '', 
                  date: new Date() 
                }, callback => {
                  const {
                    data, success
                  } = callback;
                  if (success) {
                    dispatch(set_deals(
                      deals.map(item =>
                        item.order.order_id === data.order_id
                        ? { ...item, order: data }
                        : item
                      )
                    )) 
                  }else{
                    Alert.alert("Internal server error.", "Please try again!")
                  }
                })
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel Deal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.bottomButton, styles.confirmButton]}
              // onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Raise Dispute</Text>
            </TouchableOpacity>
          </>
        }
 
        {
          cancelled &&
          <TouchableOpacity
            style={[styles.bottomButton, styles.confirmButton]}
            // onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>This Deal Was Cancelled {/**deal.order.status.cancelled.initiator === user.user_id ? 'By You' : 'By The Customer'*/}</Text>
          </TouchableOpacity>
        }
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
    backgroundColor: '#FF4500',
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
    borderRadius: 4,
    margin: 6,
    alignSelf: 'flex-start',
  },
  progress: {
    backgroundColor: '#FF4500',
    color: '#FFF'
  },
  statusIndicatorText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  vendorActionsGrid: {
    marginBottom: 16,
  },

  // New Vendor Action Card Styles
  vendorActionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  primaryVendorActionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  secondaryVendorActionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#26A69A',
  },
  successVendorActionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
  },
  disabledVendorActionCard: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    opacity: 0.7,
  },
  completedVendorActionCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#dcfce7',
  },
  vendorActionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vendorActionIconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  vendorActionIcon: {
    fontSize: 24,
  },
  completedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#10b981',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  completedBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  vendorActionTextContainer: {
    flex: 1,
  },
  vendorActionCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  primaryVendorActionCardTitle: {
    color: '#3b82f6',
  },
  secondaryVendorActionCardTitle: {
    color: '#26A69A',
  },
  successVendorActionCardTitle: {
    color: '#2ECC71',
  },
  disabledVendorActionCardTitle: {
    color: '#94a3b8',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  vendorActionDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748b',
    marginBottom: 12,
  },
  disabledVendorActionDescription: {
    color: '#94a3b8',
  },
  vendorActionCardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  actionPromptText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    textAlign: 'right',
  },
  disabledActionText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  completedActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    textAlign: 'right',
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
    backgroundColor: '#FF4500',
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