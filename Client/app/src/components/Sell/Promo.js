import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

const { 
  width: screenWidth 
} = Dimensions.get('window');

export default function Promo({ length = 0 }) {
  const totalRequired = 10;
  const uploadedCount = parseInt(length) || 0;
  const remainingCount = totalRequired - uploadedCount;
  const progressPercentage = (uploadedCount / totalRequired) * 100;
  const isCompleted = uploadedCount >= totalRequired;

  const conditions = [
    {
      id: 1,
      text: "Upload 10 offers (Physical products or Accommodation/Lodge) to cash out ₦1,000",
      important: true
    },
    {
      id: 2,
      text: "Complete within 24 hours of starting",
      important: true
    },
    {
      id: 3,
      text: "All offers must comply with Campus Sphere policies",
      important: false
    },
    {
      id: 4,
      text: "No duplicate or low-quality listings",
      important: false
    },
    {
      id: 5,
      text: "One account per user - multiple accounts will be banned",
      important: true
    },
    {
      id: 5,
      text: "Your cash will be credited to your bank after 24hrs of verification!",
      important: true
    }
  ];

  const handleCashOut = () => {
    if (isCompleted) {
      // Handle cash out logic here
      console.log('Cashing out promo reward');
    } else {
      console.log('Complete the requirements first');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Limited Time Promotion</Text>
        <View style={styles.timeBadge}>
          <Text style={styles.timeBadgeText}>24H LEFT</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Upload Progress</Text>
          <Text style={styles.progressCount}>{uploadedCount}/{totalRequired}</Text>
        </View>
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{uploadedCount}</Text>
            <Text style={styles.statLabel}>Uploaded</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{remainingCount}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₦1,000</Text>
            <Text style={styles.statLabel}>Reward</Text>
          </View>
        </View>
      </View>

      {/* Reward Section */}
      <View style={styles.rewardSection}>
        <Text style={styles.rewardTitle}>Earn ₦1,000 Cash Reward</Text>
        <Text style={styles.rewardDescription}>
          Upload {totalRequired} valid offers (Physical products or Accommodation) 
          to unlock your cash reward
        </Text>
      </View>

      {/* Conditions Section */}
      <View style={styles.conditionsSection}>
        <Text style={styles.conditionsTitle}>Promo Conditions:</Text>
        {conditions.map((condition) => (
          <View key={condition.id} style={styles.conditionItem}>
            <View style={[
              styles.bulletPoint,
              condition.important && styles.bulletPointImportant
            ]}>
              <Text style={styles.bulletText}>•</Text>
            </View>
            <Text style={[
              styles.conditionText,
              condition.important && styles.conditionTextImportant
            ]}>
              {condition.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        style={[
          styles.cashOutButton,
          isCompleted ? styles.cashOutButtonActive : styles.cashOutButtonDisabled
        ]}
        onPress={handleCashOut}
        disabled={!isCompleted}
      >
        <Text style={styles.cashOutButtonText}>
          {isCompleted ? 'Cash Out ₦1,000' : `Complete ${remainingCount} More Offers`}
        </Text>
        {isCompleted && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>READY</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Footer Note */}
      <Text style={styles.footerNote}>
        Reward will be credited to your wallet within 24 hours after verification
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 20,
    width: '100%',
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1.5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  timeBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  progressCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  rewardSection: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  conditionsSection: {
    marginBottom: 20,
  },
  conditionsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    marginRight: 8,
    marginTop: 2,
  },
  bulletPointImportant: {
    backgroundColor: '#FEF3F2',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  bulletText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: 'bold',
  },
  conditionText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  conditionTextImportant: {
    color: '#DC2626',
    fontWeight: '500',
  },
  cashOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    position: 'relative',
  },
  cashOutButtonActive: {
    backgroundColor: '#10B981',
  },
  cashOutButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  cashOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
  },
  footerNote: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});