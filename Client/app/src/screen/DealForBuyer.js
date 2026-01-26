import { useRoute, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
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
import js_ago from 'js-ago'
import { getSocket } from '../services/socket'

export default function DealForBuyer() {
  const navigation = useNavigation()
  const { params } = useRoute();
  const [activeTab, setActiveTab] = useState('details')
  const [deal, setDeal] = useState(params?.deal || null);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  
  const { user } = useSelector(s => s.user)
  const { deals } = useSelector(s => s.deals)

  const fadeAnim = React.useRef(new Animated.Value(0)).current

  // Memoized derived values
  const partnerInitials = useMemo(() => {
    return (deal?.partner?.fname?.[0] + '.' + deal?.partner?.lname?.[0]) || 'SS'
  }, [deal?.partner?.fname, deal?.partner?.lname])

  const isDeliveredConfirmedByVendor = useMemo(() => {
    return deal?.order?.status?.delivered?.completed && !deal?.order?.status?.delivered?.buyer
  }, [deal?.order?.status?.delivered])

  const isDeliveredConfirmedByBoth = useMemo(() => {
    return deal?.order?.status?.delivered?.completed && deal?.order?.status?.delivered?.buyer
  }, [deal?.order?.status?.delivered])

  // Effects
  useEffect(() => {
    if (params?.deal) {
      setDeal(params.deal)
    }
  }, [params?.deal])

  useEffect(() => {
    if (deal?.order?.order_id && Array.isArray(deals)) {
      const updatedDeal = deals.find(d => d.order.order_id === deal.order.order_id)
      if (updatedDeal) setDeal(updatedDeal)
    }
  }, [deals, deal?.order?.order_id])

  useEffect(() => {
    const socketInstance = getSocket()
    setSocket(socketInstance)
  }, [])

  useEffect(() => {
    if (!deal || !user) return
    
    dispatch(set_deal({
      room: Tools.generateConversationId(user.user_id, deal.partner?.user_id),
      partner: deal.partner
    }))
  }, [deal, user, dispatch])

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  // Event handlers
  const handleConfirm = useCallback(() => {
    Alert.alert(
      "Confirm Deal",
      "Are you sure you want to confirm this deal?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: () => {
            Alert.alert("Success", "Deal confirmed successfully!")
            navigation.goBack()
          }
        }
      ]
    )
  }, [navigation])

  const handleCancel = useCallback(() => {
    Alert.alert(
      "Cancel Deal",
      "Are you sure you want to cancel this deal?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          style: "destructive",
          onPress: () => {
            Alert.alert("Cancelled", "Deal has been cancelled.")
            navigation.goBack()
          }
        }
      ]
    )
  }, [navigation])

  const handleConfirmDelivery = useCallback(() => {
    if (!isDeliveredConfirmedByVendor) {  
      Alert.alert(
        "Pending Delivery",
        "The vendor has not confirmed delivery yet. Kindly wait while the delivery is completed."  
      )
    } else {
      navigation.navigate('deal_satisfaction', { deal })
    }
  }, [isDeliveredConfirmedByVendor, navigation, deal])

  const handleReleaseFunds = useCallback(() => {
    if (!isDeliveredConfirmedByBoth) {
      Alert.alert(
        "Delivery Confirmation Required",
        "Please confirm that you have received the item before releasing funds to the vendor."
      )
    } else {
      navigation.navigate('release_funds', { deal })
    }
  }, [isDeliveredConfirmedByBoth, navigation, deal])

  // Component functions
  const TrackingStep = useCallback(({ step, title, description, isActive, isCompleted }) => (
    <View style={styles.trackingStep}>
      <View style={styles.stepIndicator}>
        <View style={[
          styles.stepCircle,
          isCompleted && styles.stepCircleCompleted,
          isActive && styles.stepCircleActive
        ]}>
          {isCompleted && <Text style={styles.stepCheck}>✓</Text>}
        </View>
        {step < 4 && <View style={[
          styles.stepLine,
          isCompleted && styles.stepLineCompleted
        ]} />}
      </View>
      <View style={styles.stepContent}>
        <Text style={[
          styles.stepTitle,
          isActive && styles.stepTitleActive,
          isCompleted && styles.stepTitleCompleted
        ]}>
          {title}
        </Text>
        <Text style={styles.stepDescription}>
          {description}
        </Text>
      </View>
    </View>
  ), [])

  const InfoCard = useCallback(({ icon, title, value }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  ), [])

  const ActionCard = useCallback(({ title, icon, description, onPress, disabled = false, completed = false }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={[
        styles.vendorActionCard,
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
  ), [])

  // Early return if no deal
  if (!deal) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.ScrollView 
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Card */}
        <View style={styles.productCard}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: deal.product.thumbnail_id || 'https://via.placeholder.com/300' }}
              style={styles.productImage}
            />
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {deal.order.stage?.toUpperCase() || 'PENDING'}
              </Text>
            </View>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>
              {deal.product.title || 'Product Title'}
            </Text>
            <Text style={styles.productPrice}>
              ₦{new Intl.NumberFormat('en-US').format(deal.product.price || 0)}
            </Text>
            
            {/* Partner Info */}
            <View style={styles.partnerSection}>
              {deal?.partner?.photo ? (
                <Image 
                  source={{ uri: deal.partner.photo }}
                  style={styles.partnerPhoto}
                />
              ) : (
                <View style={styles.partnerAvatar}>
                  <Text style={styles.partnerInitials}>
                    {partnerInitials}
                  </Text>
                </View>
              )}
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>
                  {`${deal?.partner?.fname || ''} ${deal?.partner?.lname || ''}`.trim() || 'Customer Name'}
                </Text>
                <Text style={styles.partnerRating}>
                  {deal.partner.lastseen === 'now' ? '🟢 Online' : `🔴 Active ${js_ago(new Date(deal.partner.lastseen))}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['details', 'tracking', 'actions'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Deal Information</Text>
            
            <View style={styles.infoGrid}>
              <InfoCard
                icon="📅"
                title="Start Date"
                value={Tools.formatDealDate(deal.order.date?.toLocaleString()) || 'Loading'}
              />
              <InfoCard
                icon="🏁"
                title="End Date"
                value={deal.order.end_date || 'Present'}
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
 
            {deal?.product?.description && (
              <View style={styles.descriptionCard}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                  {deal.product.description}
                </Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'tracking' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Deal Progress</Text>
            
            <View style={styles.trackingContainer}>
              <TrackingStep 
                step={1}
                title="Deal placed"
                description="Your deal has been submitted"
                isCompleted={true}
                isActive={false}
              />
              <TrackingStep 
                step={2}
                title="Payment processed"
                description="Payment is processed successfully"
                isCompleted={true}
                isActive={false}
              />
              <TrackingStep 
                step={3}
                title="Delivery dispatched"
                description="Your deal has been dispatched and awaiting customers delivery"
                isCompleted={deal.order.status.dispatched.completed}
                isActive={!deal.order.status.dispatched.completed}
              />
              <TrackingStep  
                step={4}
                title="Delivery confirmed"
                description="Deal will be marked complete"
                isCompleted={deal.order.status.delivered.completed && deal.order.status.delivered.buyer}
                isActive={!deal.order.status.delivered.completed && !deal.order.status.delivered.buyer}
              />

              <TrackingStep
                step={5}
                title="Deal completed"
                description="Your deal has been successfully completed"
                isCompleted={deal.order.status.completed.completed && deal.order.status.completed.buyer}
                isActive={deal.order.status.completed.completed && deal.order.status.completed.buyer}
              />
            </View>
          </View>
        )}

        {activeTab === 'actions' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <View style={[styles.actionsGrid, { flexDirection: 'column', flexWrap: 'nowrap' }]}>
              <ActionCard
                title="Confirm Delivery"
                icon="📦"
                description="Confirm that you have received the delivered items"
                onPress={handleConfirmDelivery}
                disabled={!isDeliveredConfirmedByVendor}
                completed={deal?.order?.status?.delivered?.buyer}
              />
              
              <ActionCard
                title="Release Funds"
                icon="🔓"
                description="Release payment to the vendor after confirming delivery"
                onPress={handleReleaseFunds}
                disabled={!isDeliveredConfirmedByBoth}
                completed={deal?.order?.status?.released}
              />
            </View>
          </View>
        )}
      </Animated.ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[styles.bottomButton, styles.cancelButton]}
          onPress={e => {
            if (!deal.order.status.delivered.vendor && deal.order.status.delivered.buyer) {
              Alert.alert(
                "Cancellation Fee Notice",
                "Cancelling this transaction will incur a service charge of ₦70 in addition to the deduction of the shipping fee paid. These charges apply because both you and the vendor have confirmed that the item has been delivered. In accordance with our policy, the applicable fees will be deducted from your refund amount to cover administrative and logistics costs.",
                [
                  {
                    text: "Learn More",
                    onPress: () => {
                      ''
                    }
                  },
                  {
                    text: "Continue",
                    style: "default",
                    onPress: () => {
                      ''
                    }
                    
                  },
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  
                ]
              )
            }else{
              Alert.alert(
                "Cancellation Fee Notice",
                "Cancelling this transaction will attract a processing fee of ₦70. This fee covers administrative and transfer costs associated with reversing the transaction. Please confirm that you wish to proceed with the cancellation before continuing.",
                [
                  {
                    text: "Learn More",
                    onPress: () => {
                      ''
                    }
                  },
                  {
                    text: "Continue",
                    style: "default",
                    onPress: () => {
                      ''
                    }
                    
                  },
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  
                ]
              )
            }
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel Deal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.bottomButton, styles.confirmButton]}
          onPress={e => {
            if (deal.order.status.delivered.vendor && deal.order.status.delivered.buyer) {
              Alert.alert(
                "Are you sure you want to initiate a dispute with this vendor? ",
                "This action indicates that you’re dissatisfied with the transaction and wish to request a formal review. Starting a dispute will pause any ongoing deal progress until the matter is reviewed and resolved by our support team.",
                [
                  {
                    text: "Learn More",
                    onPress: () => {
                      ''
                    }
                  },
                  {
                    text: "Continue",
                    style: "default",
                    onPress: () => {
                      navigation.navigate('buyer_dispute', {
                        deal
                      })
                    }
                    
                  },
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  
                ]
              )
            }else{
              Alert.alert(
                "Dispute Not Allowed Yet",
                "You cannot raise a dispute before the vendor has delivered the item. Please ensure that delivery has been completed and verified before initiating a dispute request.",
                [
                  {
                    text: "Learn More",
                    onPress: () => {
                      ''
                    }
                  },
                  {
                    text: "Continue",
                    style: "default",
                    onPress: () => {
                      navigation.navigate('buyer_dispute', {
                        deal
                      })
                    }
                    
                  },
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  
                ]
              )
            }
          }}
        >
          <Text style={styles.confirmButtonText}>Raise Dispute</Text>
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
  scrollView: {
    flex: 1,
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
  partnerPhoto: {
    height: 44,
    width: 44,
    borderRadius: 50,
    marginHorizontal: 9
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
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
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
  trackingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  // Vendor Action Card Styles
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
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  disabledVendorActionCard: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderLeftColor: '#94a3b8',
    opacity: 0.7,
  },
  completedVendorActionCard: {
    backgroundColor: '#f0fdf4',
    borderColor: '#dcfce7',
    borderLeftColor: '#10b981',
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
    color: '#26A69A',
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