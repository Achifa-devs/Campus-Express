import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const threads = [
  {
    id: '1',
    title: 'Best way to sell used textbooks?',
    author: 'Oluwatobi A.',
    date: 'May 2, 2025',
    replies: 12,
    preview: 'Hey guys, what’s the best way you’ve sold your old textbooks on campus?...',
  },
  {
    id: '2',
    title: 'Delivery options for Campus Sphere buyers',
    author: 'Chioma M.',
    date: 'April 28, 2025',
    replies: 8,
    preview: 'I’ve had trouble delivering products on time. What do you all use?...',
  },
  {
    id: '3',
    title: 'Feature request: Chat with buyers',
    author: 'Emeka J.',
    date: 'April 25, 2025',
    replies: 4,
    preview: 'It’d be great if we could chat directly in the app. Anyone else agree?',
  },
];

const ForumCard = ({ thread, navigation }) => (
  <TouchableOpacity style={styles.card} onPress={e => navigation.navigate('topic-replies')}>
    <Text style={styles.title}>{thread.title}</Text>
    <Text style={styles.preview}>{thread.preview}</Text>
    <View style={styles.metaRow}>
      <Text style={styles.metaText}>By {thread.author}</Text>
      <Text style={styles.metaText}>{thread.date}</Text>
      <Text style={styles.replyCount}>{thread.replies} replies</Text>
    </View>  
  </TouchableOpacity>
);

const ForumScreen = ({ navigation }) => {
  const handleCreateThread = () => {
    navigation.navigate('thread'); // Uncomment if using navigation
    console.log('Navigate to create thread screen');
  };
  return (
    <SafeAreaView style={styles.container}>
      

      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ForumCard thread={item} navigation={navigation} />}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreateThread}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginVertical: 20,
    color: '#1a1a1a',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  preview: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
  replyCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF4500',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF4500',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    elevation: 6,
  },
});

export default ForumScreen;
