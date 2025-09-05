import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const services = [
  { id: '1', label: 'Laundry', icon: 'shirt-outline', route: 'laundry-services' },
  { id: '2', label: 'Food Delivery', icon: 'fast-food-outline', route: 'food-services' },
  { id: '3', label: 'Plumbing', icon: 'water-outline', route: 'plumbing-services' },
  { id: '4', label: 'Electrician', icon: 'flash-outline', route: 'electrician-services' },
  { id: '5', label: 'Home Cleaning', icon: 'broom-outline', route: 'cleaning-services' },
  { id: '6', label: 'Tutoring', icon: 'book-outline', route: 'tutoring-services' },
];

export default function ServicesScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.route)}
      style={styles.card}
      activeOpacity={0.85}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={26} color="#4CAF50" />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      

      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    elevation: 2,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  subText: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    width: '48%',
    borderRadius: 4,
    padding: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  iconContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 50,
    padding: 12,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
