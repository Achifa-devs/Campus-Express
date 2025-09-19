// ChatList.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  TextInput
} from 'react-native';
import chatList from '../json/chat/chat.json'
import js_ago from 'js-ago';
import { Chat } from '../api/chat';
import { useSelector } from 'react-redux';
const ChatList = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const { user } = useSelector(s => s?.user);

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      const id = user?.user_id;
      Chat.fetchChatList(id, (data) => {
        setChatRooms(Object.entries(data.data))
        setFilteredRooms(Object.entries(data.data));
      }) 
      
      // Sort by last message time (newest first)
      // const sortedRooms = [...chatList].sort((a, b) => {
      //   // Simple time comparison for demo
      //   return new Date(b.updated_at) - new Date(a.updated_at);
      // });
      
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRooms(chatRooms);
    } else {
      const filtered = chatRooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  }, [searchQuery, chatRooms]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchChatRooms();
  };

  const handleChatRoomPress = (room) => {
    navigation.navigate('chat-room', { room });
  };

  const formatTime = (timeString) => {
    // Simple time formatting for demo
    return timeString;
  };

  const renderChatRoomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatRoomItem}
      onPress={() => handleChatRoomPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: '' }}
          style={styles.avatar}
          resizeMode="cover"
        />
        {/* {item.isOnline && <View style={styles.onlineIndicator} />} */}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {/* {item.participants[1].name} */}
          </Text>
          <Text style={styles.chatTime}>
            {/* {js_ago(new Date(item.updated_at))} */}
          </Text>
        </View>

        <View style={styles.chatPreview}>
          {/* <Text 
            style={[
              styles.lastMessage,
              item.unreadCount > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.last_message.text}
          </Text> */}
          
          {/* {item.unread_count > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {item.unread_count > 99 ? '99+' : item.unread_count}
              </Text>
            </View>
          )} */}
        </View>

      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        {searchQuery ? 'No chats found' : 'No chats yet'}
      </Text>
      <Text style={styles.emptyStateSubtext}>
        {searchQuery ? 'Try a different search term' : 'Start a conversation to begin chatting'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus chats</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Chat Rooms List */}
      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF4500" />
            <Text style={styles.loadingText}>Loading chats...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRooms}
            renderItem={renderChatRoomItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#FF4500']}
                tintColor="#FF4500"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 4,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  chatRoomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 4,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#4CD964',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    color: '#000',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#FF4500',
    borderRadius: 4,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  groupInfo: {
    marginTop: 4,
  },
  memberCount: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ChatList;