import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width; // Full width

// Sample data with tags added
const videoData = [
  {
    id: '1',
    title: 'How to Build a React Native App',
    channel: 'Code Master',
    views: '125K views',
    timeAgo: '2 days ago',
    thumbnail: 'https://i.ytimg.com/vi/0-S5a0eXPoc/hqdefault.jpg',
    duration: '12:45',
    tag: 'Searching for roommate'
  },
  {
    id: '2',
    title: 'Learn JavaScript in 30 Minutes',
    channel: 'Web Dev Simplified',
    views: '1.2M views',
    timeAgo: '3 weeks ago',
    thumbnail: 'https://i.ytimg.com/vi/DHvZLI7Db8E/hqdefault.jpg',
    duration: '28:15',
    tag: 'Single Room occupant'
  },
  {
    id: '3',
    title: 'React Native Animation Tutorial',
    channel: 'React Native School',
    views: '450K views',
    timeAgo: '1 month ago',
    thumbnail: 'https://i.ytimg.com/vi/rihkQjWj5dE/hqdefault.jpg',
    duration: '15:30',
    tag: 'Hostel roommate'
  },
  {
    id: '4',
    title: 'Building a YouTube Clone with React Native',
    channel: 'Dev Tutorials',
    views: '89K views',
    timeAgo: '5 days ago',
    thumbnail: 'https://i.ytimg.com/vi/VPLPjVWJQhA/hqdefault.jpg',
    duration: '22:10',
    tag: 'Lodge rommate'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox - When to Use What',
    channel: 'Web Design Masters',
    views: '2.1M views',
    timeAgo: '2 months ago',
    thumbnail: 'https://i.ytimg.com/vi/9zBsdzdE4sM/hqdefault.jpg',
    duration: '18:45',
    tag: 'Temporal stay'
  },
  {
    id: '6',
    title: 'Node.js Crash Course for Beginners',
    channel: 'The Net Ninja',
    views: '3.4M views',
    timeAgo: '1 year ago',
    thumbnail: 'https://i.ytimg.com/vi/TlB_eWDSMt4/hqdefault.jpg',
    duration: '45:22',
    tag: 'Single occupant'
  },
];

const Lodges = () => {

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.videoCard}
      onPress={() => console.log('Video pressed:', item.id)}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        
        {/* Tag added here */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
        
        <Text style={styles.channelName}>{item.channel}</Text>
        <Text style={styles.videoStats}>{item.views} • {item.timeAgo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videoData}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 8,
  },
  videoCard: {
    width: '100%',
    marginBottom: 16,
  },
  thumbnailContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  thumbnail: {
    width: '100%',
    height: CARD_WIDTH * 0.5, // 4:3 aspect ratio
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    paddingHorizontal: 4,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#0f0f0f',
  },
  // New styles for the tag
  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF6F2',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FF4500',
  },
  channelName: {
    fontSize: 12,
    color: '#606060',
    marginBottom: 2,
  },
  videoStats: {
    fontSize: 12,
    color: '#606060',
  },
});

export default Lodges;