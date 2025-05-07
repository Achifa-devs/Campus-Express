import { useNavigation } from '@react-navigation/native';
import js_ago from 'js-ago';
import React, { useState, useEffect } from 'react';  // Added useState and useEffect import
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotificationScreen() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://192.168.209.146:9090/notice`,  // Fixed URL typo
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const json = await res.json();
      const uniqueData = Array.from(
        new Map(json?.data?.map((item) => [item.product_id, item])).values()
      );
      setData(uniqueData);
    } catch (err) {
      Alert.alert('Network error, please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data once when component mounts

  const navigation = useNavigation();

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('user-notification-details', {data: item})}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text 
          style={styles.description}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
        <View style={styles.meta}>
          <Icon name="time-outline" size={14} color="#888" />
          <Text style={styles.time}>{item.date}</Text> 
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}  // Changed to use the fetched data
        keyExtractor={item => item.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={refreshing}
        onRefresh={fetchData}  // Added pull-to-refresh functionality
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    paddingTop: 5,
    paddingHorizontal: 9,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 5,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 90,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginVertical: 5,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
});
