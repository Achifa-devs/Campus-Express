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
  TextInput,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import js_ago from 'js-ago';
import { useDispatch, useSelector } from 'react-redux';
import { set_unread } from '../../redux/info/unread_chats';
import { getSocket, initSocket } from '../services/socket';
import Memory from '../utils/memoryHandler';
import { set_chat } from '../../redux/info/chat';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
const ChatList = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(null);
  const { user } = useSelector(s => s?.user);
  const { chat } = useSelector(s => s?.chat);
  const { is_connected } = useSelector(s => s?.is_connected);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  
  
  // useEffect(() => {
  //   Memory.get('chat_list').then(res => dispatch(set_chat(res))).catch(err => Alert.alert("Error occured: ", err))
  // }, [])

  const initializeSocket = async () => {
    try {
      await initSocket(user?.user_id);
      let socket_client = getSocket();
      setSocket(socket_client)
    } catch (error) {
      console.error('Error initializing socket:', error);
    }
  }

  useEffect(() => {
    if (Array.isArray(chat)) {
      setChatRooms(chat)
      setFilteredRooms(chat);
      setLoading(false);
      setRefreshing(false)
    }
  }, [chat])

  useEffect(() => {
    // 1️⃣ Initialize socket on mount
    if (!socket) {
      initializeSocket();
    }
  }, []);


  // useEffect(() => {
  //   if (!chatRooms) return;

  //   // Accumulate unread messages from all rooms
  //   let totalUnread = 0;

  //   chatRooms.forEach((data) => {
  //     totalUnread += data.unread;
  //   });

  //   // ✅ Update Redux state once with the total unread count
  //   dispatch(set_unread(totalUnread));
  // }, [chatRooms, user.user_id, dispatch, chat]);

  
  function fetchChatList() {
    if(!socket) return;
    socket?.emit("get_all_messages", { user_id: user?.user_id }, cb => {
      const { messages, success } = cb;
      if (success) {
        
        let sortedMsgs = [...messages].sort(
          (a, b) => new Date(b.lastMessage.created_at) - new Date(a.lastMessage.created_at)
        );
        dispatch(set_chat(sortedMsgs)); 
        // Memory.store('chat_list', sortedMsgs);
  
      } 
    })
  }
  useEffect(() => {
    if(!chatRooms) return;
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

  const handleRefresh = async() => {
    setRefreshing(true);
    await initializeSocket();
    fetchChatList();

  };

  const handleChatRoomPress = (room) => {
    navigation.navigate('chat-room', { room });
  };


  const renderChatRoomItem = ({ item }) => {
    
    
    return(


      <TouchableOpacity
        style={styles.chatRoomItem}
        onPress={() => handleChatRoomPress(item)}
        activeOpacity={0.7} key={item.key}
      >
        <View style={styles.avatarContainer}>
         {
          !item.partner || !item.partner.photo
          ?
          <View style={[styles.avatar, {display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff4e0'}]}>
            <Ionicons name={"person-circle-outline"} size={40} color={"#FF4500"} />
          </View>
          :
          <Image
            source={{ uri: item.partner.photo }}
            style={styles.avatar}
            resizeMode="cover"
          />
         }
          {/* {item.isOnline && <View style={styles.onlineIndicator} />} */}
        </View>

        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>
              {item.partner.fname} {item.partner.lname}
            </Text>
            <Text style={styles.chatTime}>
              {
                js_ago(new Date(item.lastMessage.created_at))
              }
            </Text>
          </View>

          <View style={styles.chatPreview}>
            <Text 
              style={[
                styles.lastMessage,
                // item.unreadCount > 0 && styles.unreadMessage
              ]}
              numberOfLines={1}
            >
              {item.lastMessage.sender_id === user?.user_id ? 'You: ' : ''}{item.lastMessage?.content}
            </Text>
            
            {
              (() => {
                
                return (  
                  item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>
                        {item.unread > 99 ? "99+" : item.unread}  
                      </Text>
                    </View>
                  )
                );
              })()
            }

          </View>

        </View>
      </TouchableOpacity>
    );
  }
  const renderEmptyState = () => (
    <TouchableOpacity style={styles.emptyState} onPress={e => navigation.navigate('Home')}>
      <>
        <Text style={styles.emptyStateText}>
          {searchQuery ? 'No chats found' : 'No chats yet'}
        </Text>
      </>
      <Text style={styles.emptyStateSubtext}>
        {searchQuery ? 'Try a different search term' : 'Start a conversation to begin chatting'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus chats</Text>
      </View>

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View> */}

      {/* Chat Rooms List */}
      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF4500" />
            <Text style={styles.loadingText}>Loading chats...</Text>
          </View>
        ) : (
          <FlatList
            data={Array.isArray(filteredRooms)&&filteredRooms.filter(room => room.partner)} // Ensure partner exists
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
    // borderBottomWidth: 1,
    // borderBottomColor: '#f0f0f0',
    marginBottom: 2.5, 
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
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