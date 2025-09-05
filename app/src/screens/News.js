import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const newsData = [
  {
    id: '1',
    title: 'Campus WiFi Upgraded Across Hostels',
    timestamp: '2 hours ago',
    description: 'The university has completed its new WiFi upgrade. Students can now enjoy faster internet access.',
    thumbnail: 'https://via.placeholder.com/400x200.png?text=Campus+WiFi',
  },
  {
    id: '2',
    title: 'Students Protest Over Power Outages',
    timestamp: '1 day ago',
    description: 'Dozens of students gathered at the school gate demanding consistent electricity supply.',
    thumbnail: 'https://via.placeholder.com/400x200.png?text=Protest',
  },
  {
    id: '3',
    title: 'New Cafeteria Opens Near Science Faculty',
    timestamp: '3 days ago',
    description: 'A modern food court has opened, offering affordable meals and improved seating for students.',
    thumbnail: 'https://via.placeholder.com/400x200.png?text=Cafeteria',
  },
];

export default function CampusNewsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Icon name="calendar-outline" size={16} color="#888" />
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      

      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  subText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginLeft: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
});
