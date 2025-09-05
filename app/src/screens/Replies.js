// TopicDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const dummyReplies = [
  {
    id: '1',
    author: 'Tola F.',
    content: 'I use Campus Sphere’s vendor tools and it works well for me!',
    date: 'May 1, 2025',
  },
  {
    id: '2',
    author: 'Adaeze N.',
    content: 'Try listing early in the semester. More demand then.',
    date: 'May 2, 2025',
  },
];

const TopicDetailScreen = ({ route }) => {
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState(dummyReplies);

  const topic = route?.params?.topic || {
    title: 'Best way to sell used textbooks?',
    content: 'What’s the most effective way you’ve sold your old textbooks?',
    author: 'Oluwatobi A.',
    date: 'May 2, 2025',
  };

  const handleReply = () => {
    if (!reply.trim()) return;

    const newReply = {
      id: Date.now().toString(),
      author: 'You',
      content: reply,
      date: 'Now',
    };

    setReplies([newReply, ...replies]);
    setReply('');
  };

  const renderReply = ({ item }) => (
    <View style={styles.replyCard}>
      <Text style={styles.replyAuthor}>{item.author}</Text>
      <Text style={styles.replyContent}>{item.content}</Text>
      <Text style={styles.replyDate}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.topicCard}>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <Text style={styles.topicContent}>{topic.content}</Text>
        <Text style={styles.topicMeta}>By {topic.author} on {topic.date}</Text>
      </ScrollView>

      <View style={styles.replyInputContainer}>
        <TextInput
          placeholder="Write a reply..."
          value={reply}
          onChangeText={setReply}
          style={styles.replyInput}
          multiline
        />
        <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
          <Text style={styles.replyButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={replies}
        keyExtractor={(item) => item.id}
        renderItem={renderReply}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default TopicDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 16,
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  topicContent: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
  },
  topicMeta: {
    fontSize: 12,
    color: '#888',
  },
  replyInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  replyInput: {
    flex: 1,
    fontSize: 14,
    maxHeight: 100,
  },
  replyButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  replyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  replyCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  replyAuthor: {
    fontWeight: '600',
    color: '#FF4500',
    marginBottom: 4,
  },
  replyContent: {
    color: '#333',
    fontSize: 14,
    marginBottom: 6,
  },
  replyDate: {
    fontSize: 11,
    color: '#888',
    textAlign: 'right',
  },
});
