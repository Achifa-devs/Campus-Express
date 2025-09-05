import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const blogPosts = [
  {
    id: '1',
    title: '5 Tips for Selling on Campus Sphere',
    image: 'https://source.unsplash.com/800x600/?college,sell',
    date: 'April 10, 2025',
    excerpt: 'Boost your sales on campus by following these 5 quick and proven tips...',
  },
  {
    id: '2',
    title: 'Staying Safe as a Buyer & Seller',
    image: 'https://source.unsplash.com/800x600/?security,student',
    date: 'March 28, 2025',
    excerpt: 'Campus Sphere puts your safety first — here’s how you can protect yourself...',
  },
  {
    id: '3',
    title: 'New Features in the Campus Sphere App',
    image: 'https://source.unsplash.com/800x600/?app,update',
    date: 'March 15, 2025',
    excerpt: 'We’ve added powerful features just for you! Explore what’s new...',
  },
];

const BlogCard = ({ post }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: post.image }} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.date}>{post.date}</Text>
      <Text style={styles.excerpt}>{post.excerpt}</Text>
    </View>
  </TouchableOpacity>
);

const BlogScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={blogPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogCard post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#1e1e1e',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: width * 0.5,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  date: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 15,
    color: '#555',
  },
});

export default BlogScreen;
