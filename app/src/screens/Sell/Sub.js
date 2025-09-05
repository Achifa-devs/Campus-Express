// components/Sell/Subscription.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Subscription = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription</Text>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="card" size={24} color="#FF4500" />
          <Text style={styles.cardTitle}>Current Plan: Free</Text>
        </View>
        <Text style={styles.cardText}>
          You're currently on the free plan with limited features.
        </Text>
        <TouchableOpacity style={styles.upgradeButton} onPress={onPress}>
          <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  upgradeButton: {
    backgroundColor: '#FF4500',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Subscription;