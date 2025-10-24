import { useRoute, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
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
import { useSelector } from 'react-redux'
// import { LinearGradient } from 'expo-linear-gradient'

export default function DealForBuyer() {
  const navigation = useNavigation()
  const { deal } = useRoute()?.params
  const { user } = useSelector(s=> s.user)
  const [activeTab, setActiveTab] = useState('details')
  
  const fadeAnim = new Animated.Value(0)

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  const handleConfirm = () => {
    Alert.alert(
      "Confirm Deal",
      "Are you sure you want to confirm this deal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Confirm", 
          onPress: () => {
            Alert.alert("Success", "Deal confirmed successfully!")
            navigation.goBack()
          }
        }
      ]
    )
  }

  const handleCancel = () => {
    Alert.alert(
      "Cancel Deal",
      "Are you sure you want to cancel this deal?",
      [
        {
          text: "No",
          style: "cancel"
        },
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
  }

  const handleChat = () => {
    Alert.alert("Start Chat", `Chat with ${deal.partnerName || 'the seller'}`)
  }

  const TrackingStep = ({ step, title, description, isActive, isCompleted }) => (
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
  )

  const InfoCard = ({ icon, title, value }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  )

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
              source={{ uri: deal.thumbnail_id || 'https://via.placeholder.com/300' }}
              style={styles.productImage}
            />
            {/* <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.imageGradient}
            /> */}
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {deal.status?.toUpperCase() || 'PENDING'}
              </Text>
            </View>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>
              {deal.title || 'Product Title'}
            </Text>
            <Text style={styles.productPrice}>
              ₦{new Intl.NumberFormat('en-US').format(deal.price || 0)}
            </Text>
            
            {/* Partner Info */}
            <View style={styles.partnerSection}>
              <View style={styles.partnerAvatar}>
                <Text style={styles.partnerInitials}>
                  {(deal.partnerName || 'SS').split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>
                  {deal.partnerName || 'Seller Name'}
                </Text>
                <Text style={styles.partnerRating}>⭐ 4.8 (120 reviews)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
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
            style={[styles.tab, activeTab === 'tracking' && styles.activeTab]}
            onPress={() => setActiveTab('tracking')}
          >
            <Text style={[styles.tabText, activeTab === 'tracking' && styles.activeTabText]}>
              {
                deal.vendor_id === user.user_id  ? 'Manage Order' : 'Tracking'
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'actions' && styles.activeTab]}
            onPress={() => setActiveTab('actions')}
          >
            <Text style={[styles.tabText, activeTab === 'actions' && styles.activeTabText]}>
              Actions
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
                value={deal.startDate || '15 Feb 2024'} 
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
                value={`${deal?.purpose[0].toUpperCase()}${deal?.purpose.slice(1)}` || 'Accommodation'}

              />
            </View>

            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {deal.description || 'This is a detailed description of the product or accommodation. It includes all the features and benefits that the user should know about.'}
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'tracking' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Deal Progress</Text>
            
            <View style={styles.trackingContainer}>
              <TrackingStep 
                step={1}
                title="Deal Requested"
                description="Your deal has been submitted"
                isCompleted={true}
                isActive={false}
              />
              <TrackingStep 
                step={2}
                title="Payment Processing"
                description="Payment is being verified"
                isCompleted={true}
                isActive={false}
              />
              <TrackingStep 
                step={3}
                title="Confirmation"
                description="Waiting for your confirmation"
                isCompleted={false}
                isActive={true}
              />
              <TrackingStep 
                step={4}
                title="Completed"
                description="Deal will be marked complete"
                isCompleted={false}
                isActive={false}
              />
            </View>
          </View>
        )}

        {activeTab === 'actions' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📄</Text>
                <Text style={styles.actionText}>View Contract</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📞</Text>
                <Text style={styles.actionText}>Call Partner</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>📍</Text>
                <Text style={styles.actionText}>Get Directions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>🔔</Text>
                <Text style={styles.actionText}>Set Reminder</Text>
              </TouchableOpacity>
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
          onPress={handleConfirm}
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
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
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
  actionButton: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
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
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
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