import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Card({ item }) {
  const { user } = useSelector(state => state.user);

  const formatPrice = (price) => {
    return `₦${new Intl.NumberFormat('en-US').format(price)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTransactionType = () => {
    return item.order.vendor_id === user.user_id ? 'Selling' : 'Buying';
  };

  const getStatusColor = () => {
    const status = item?.order?.stage?.toLowerCase();
    if (status?.includes('completed')) return '#10B981';
    if (status?.includes('progress')) return '#3B82F6';
    if (status?.includes('shipping')) return '#F59E0B';
    return '#6B7280';
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header with status and date */}
        <View style={styles.header}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '15' }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {item?.order?.stage}
            </Text>
          </View>
          <Text style={styles.date}>
            {formatDate(item?.order?.date)}
          </Text>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Product image */}
          <View style={styles.imageContainer}>
            <Image 
              style={styles.mainImage}
              source={{ uri: item?.product?.thumbnail_id }}
            />
            <View style={styles.typeIndicator}>
              <Text style={styles.typeText}>
                {getTransactionType()}
              </Text>
            </View>
          </View>
          
          {/* Product details */}
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={2}>
              {item?.product?.title}
            </Text>
            <Text style={styles.price}>
              {formatPrice(item?.product?.price)}
            </Text>
            
            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: item?.progress ? `${item.progress}%` : '50%',
                      backgroundColor: getStatusColor()
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {item?.progress || 50}% Complete
              </Text>
            </View>

            {/* Timeline */}
            <View style={styles.timeline}>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineLabel}>Start</Text>
                <Text style={styles.timelineDate}>{formatDate(item?.order?.date)}</Text>
              </View>
              <View style={styles.timelineDivider} />
              <View style={styles.timelineItem}>
                <Text style={styles.timelineLabel}>Est. Delivery</Text>
                <Text style={styles.timelineDate}>
                  {item.iscompleted === 'shipping' ? 'In progress' : formatDate(item?.date)}
                </Text>
              </View>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    marginRight: 12,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  typeIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 8,
  },
  timelineItem: {
    flex: 1,
    alignItems: 'center',
  },
  timelineLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: '600',
  },
  timelineDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  primaryButton: {
    backgroundColor: '#FF4500',
    borderColor: '#FF4500',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});