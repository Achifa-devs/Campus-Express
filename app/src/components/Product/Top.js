import js_ago from 'js-ago';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LocationSvg from '../../../assets/location-svgrepo-com (1).svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Top({ data }) {
  return (
    <View style={styles.container}>
      {/* Location and Date Row */}
      <View style={styles.locationRow}>
        <View style={styles.locationIcon}>
          <LocationSvg height={16} width={16} fill="#FF4500" />
        </View>
        <Text style={styles.locationText} numberOfLines={1}>
          {data.campus}, {data.uni_state}
        </Text>
        <View style={styles.dotSeparator} />
        <Text style={styles.dateText}>
          {js_ago(new Date(data.date))}
        </Text>
      </View>

      {/* Product Title */}
      <Text style={styles.titleText} numberOfLines={2}>
        {data?.title}
      </Text>

      {/* Price Row */}
      <View style={styles.priceRow}>
        <Text style={styles.priceSymbol}>&#8358;</Text>
        <Text style={styles.priceText}>
          {new Intl.NumberFormat('en-US').format(data?.price)}
        </Text>
        {data.negotiable && (
          <View style={styles.negotiableBadge}>
            <Text style={styles.negotiableText}>Negotiable</Text>
          </View>
        )}
      </View>

      {/* Condition and Category (if available) */}
      {(data.condition || data.category) && (
        <View style={styles.metaRow}>
          {data.condition && (
            <View style={styles.metaItem}>
              <Ionicons name="build" size={16} color="#FF4500" />
              <Text style={styles.metaText}>{data.condition}</Text>
            </View>
          )}
          {data.category && (
            <View style={styles.metaItem}>
              <Ionicons name="grid" size={16} color="#FF4500" />
              <Text style={styles.metaText}>{data.category}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    maxWidth: '50%',
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#999',
    marginHorizontal: 8,
  },
  dateText: {
    fontSize: 13,
    color: '#777',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
    lineHeight: 26,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceSymbol: {
    fontSize: 18,
    color: '#FF4500',
    fontWeight: 'bold',
    marginRight: 2,
  },
  priceText: {
    fontSize: 22,
    color: '#FF4500',
    fontWeight: 'bold',
    marginRight: 12,
  },
  negotiableBadge: {
    backgroundColor: '#FFF0E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  negotiableText: {
    fontSize: 12,
    color: '#FF4500',
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
});