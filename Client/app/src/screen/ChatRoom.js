// ChatRoomScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getSocket } from '../services/socket';
import axios from 'axios';
import js_ago from 'js-ago';

const ChatRoom = ({ route }) => {
  const { room } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const flatListRef = useRef(null);
  const { user } = useSelector(s => s?.user);
  const [socket, setSocket] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messageIdCounter = useRef(0);
  const socketRef = useRef(null);
  const { is_active } = useSelector(s => s?.is_active);

  // Generate unique message ID
  const generateMessageId = () => {
    messageIdCounter.current += 1;
    return `${Date.now()}_${messageIdCounter.current}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Socket connection and cleanup
  useEffect(() => {
    if (!user) return;

    const s = getSocket();
    setSocket(s);
    socketRef.current = s;

    return () => {
      if (socketRef.current) {
        socketRef.current.off('message');
        socketRef.current.off('is_typing');
        socketRef.current.off('not_typing');
        socketRef.current.off('message_seen');
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  // Room joining and message fetching
  useEffect(() => {
    if (!socket || !room?.partner) return;

    // Join room and get messages
    socket.emit('join_room', { otherUserId: room.partner.user_id });
    get_chats(socket, room.partner);

    // Socket event listeners
    const handleTyping = ({ user_id }) => {
      if (user.user_id !== user_id) {
        setIsTyping(true);
      }
    };

    const handleNotTyping = ({ user_id }) => {
      if (user.user_id !== user_id) {
        setIsTyping(false);
      }
    };

    const handleNewMessage = (msg) => {
      if (msg.sender_id === room.partner.user_id) {
        const newMsg = {
          id: generateMessageId(),
          type: 'received',
          text: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          room_id: msg.conversation_id
        };
        
        setMessages(prev => {
          // Check for duplicates before adding
          const exists = prev.find(m => 
            m.id === newMsg.id || 
            (m.text === newMsg.text && Math.abs(new Date(m.timestamp) - new Date(msg.created_at)) < 1000)
          );
          return exists ? prev : [...prev, newMsg];
        });

        // Mark as seen
        socket.emit('message_seen', { conversation_id: msg.conversation_id });
      }
    };

    const handleMessageSeen = ({ result }) => {
      if (result && user.user_id === result.sender_id) {
        setMessages(prev => {
          if (prev.length === 0) return prev;

          const lastIndex = prev.length - 1;
          const lastMessage = prev[lastIndex];

          if (lastMessage.seen === '✓✓') return prev;

          const updatedMessage = { ...lastMessage, seen: '✓✓' };

          return [
            ...prev.slice(0, lastIndex),
            updatedMessage,
          ];
        });
      }
    };

    // Attach event listeners
    socket.on('is_typing', handleTyping);
    socket.on('not_typing', handleNotTyping);
    socket.on('message', handleNewMessage);
    socket.on('message_seen', handleMessageSeen);

    // Cleanup function
    return () => {
      socket.off('is_typing', handleTyping);
      socket.off('not_typing', handleNotTyping);
      socket.off('message', handleNewMessage);
      socket.off('message_seen', handleMessageSeen);
    };
  }, [socket, room?.partner, user]);

  const [isOnline, setIsOnline] = useState({b: false, date: room.partner.lastseen})
  useEffect(() => {

    if (is_active.online) {
      if(is_active.user_id !== user.user_id)return;
      setIsOnline({b: is_active.online, date: is_active.date})
    }else{
      if(!is_active.date)return;
      setIsOnline({b: is_active.online, date: is_active.date})
    }
    
  }, [is_active])

  // Mark messages as seen when they become visible
  useEffect(() => {
    if (!socket || !room?.partner) return;

    const unseenMessages = messages.filter(msg => 
      msg.type === 'received' && msg.seen !== '✓✓'
    );

    if (unseenMessages.length > 0) {
      unseenMessages.forEach(msg => {
        if (msg.room_id) {
          socket.emit('message_seen', { conversation_id: msg.room_id });
        }
      });
    }
  }, [messages, socket, room?.partner]);

  // Scroll handling
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const distanceFromBottom = contentSize.height - (layoutMeasurement.height + contentOffset.y);
    setIsAtBottom(distanceFromBottom < 50);
  };

  // Auto-scroll to bottom when new messages arrive and user is at bottom
  useEffect(() => {
    if (isAtBottom && messages.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isAtBottom]);

  // Phone number validation
  const containsPhoneNumber = (text) => {
    const phoneRegex = /\b\d{10,11}\b/;
    return phoneRegex.test(text);
  };

  // Send message function
  const handleNewMessage = () => {
    if (containsPhoneNumber(newMessage)) {
      Alert.alert("Security Alert", "Your message contains a phone number which is not allowed.");
      return;
    }

    if (newMessage.trim() === '') return;

    const newMsg = {
      id: generateMessageId(),
      type: 'sent',
      seen: 'sending...',
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Send via socket
    socket.emit('send_message', { 
      receiver_id: room.partner.user_id, 
      content: newMsg.text, 
      media_url: null, 
      message_type: 'text', 
      created_at: new Date() 
    }, (response) => {
      if (response && response.success) {
        // Update message status
        setMessages(prev => {
          const lastIndex = prev.length - 1;
          if (lastIndex < 0) return prev;

          const lastMessage = prev[lastIndex];
          if (lastMessage.seen === '✓') return prev;

          // Find the exact message by ID to avoid updating wrong message
          const messageIndex = prev.findIndex(m => m.id === newMsg.id);
          if (messageIndex === -1) return prev;

          const updatedMessage = {
            ...prev[messageIndex],
            seen: '✓',
          };

          return [
            ...prev.slice(0, messageIndex),
            updatedMessage,
            ...prev.slice(messageIndex + 1),
          ];
        });
      } else {
        // Handle send failure
        Alert.alert("Send Failed", "Message failed to send. Please try again.");
        console.error("Failed to send message:", response?.error);
        
        // Remove the optimistic message if send failed
        setMessages(prev => prev.filter(m => m.id !== newMsg.id));
      }
    });
  };

  // Fetch chat messages
  const get_chats = (socket, partner) => {
    if (!socket || !partner) return;

    socket.emit('get_room_messages', { receiver_id: partner.user_id }, (response) => {
      if (response && response.success) {
        console.log("Chat room received:", response.messages);

        const formattedMessages = response.messages.map((msg, index) => {
          const isReceived = msg.sender_id === partner.user_id;
          
          return {
            id: `${msg.conversation_id}_${msg.created_at}_${index}_${msg.sender_id}`,
            type: isReceived ? 'received' : 'sent',
            text: msg.content,
            product_id: msg.media_url,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            room_id: msg.conversation_id,
            seen: !isReceived ? (msg.status?.status === 'seen' ? '✓✓' : msg.status?.status === 'sent' ? '✓' : '') : undefined
          };
        });

        setMessages(formattedMessages);
      } else {
        console.error("Failed to fetch chat room:", response?.error);
        Alert.alert("Error", "Failed to load messages");
      }
    });
  };

  // Message item component
  const MessageItem = React.memo(({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === 'sent'
          ? styles.myMessageContainer
          : styles.otherMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.type === 'sent'
            ? styles.myMessageBubble
            : styles.otherMessageBubble,
        ]}
      >
        {item.product_id && <Card product_id={item.product_id} />}

        <Text
          style={[
            styles.messageText,
            item.type === 'sent'
              ? styles.myMessageText
              : styles.otherMessageText,
          ]}
        >
          {item.text}
        </Text>

        <View style={styles.messageTimeContainer}>
          <Text
            style={[
              styles.messageTime,
              item.type === 'sent'
                ? styles.myMessageTime
                : styles.otherMessageTime,
            ]}
          >
            {item.timestamp}
          </Text>

          {item.type === 'sent' && item.seen && (
            <Text style={styles.messageStatus}>
              {item.seen}
            </Text>
          )}
        </View>
      </View>
    </View>
  ));

  const renderMessage = useCallback(({ item }) => (
    <MessageItem item={item} />
  ), []);

  // Typing indicator
  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <View style={styles.typingContainer}>
        <View style={styles.typingBubble}>
          <View style={styles.typingDots}>
            <View style={[styles.typingDot, { backgroundColor: COMPLEMENTARY_COLOR }]} />
            <View style={[styles.typingDot, { backgroundColor: COMPLEMENTARY_COLOR }]} />
            <View style={[styles.typingDot, { backgroundColor: COMPLEMENTARY_COLOR }]} />
          </View>
        </View>
      </View>
    );
  };

  const renderOptionsModal = () => (
    <Modal
      visible={showOptionsModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowOptionsModal(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowOptionsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Chat Options</Text>
              
              <TouchableOpacity style={styles.modalOption}>
                <Text style={styles.modalOptionText}>View Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Mute Notifications</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Search Messages</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Clear Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Export Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Block User</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalOption}>
                <Text style={styles.modalOptionText}>Report</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowOptionsModal(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  if (!room?.partner) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Chat room not available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity 
          style={styles.headerUserInfo}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {room.partner.photo ? '👤' : '👤'}
            </Text>
          </View>
          <View style={styles.headerUserDetails}>
            <Text style={styles.headerUserName}>
              {room.partner.fname}.{room.partner.lname?.[0] || ''}
            </Text>
            <Text style={styles.headerUserStatus}>
              {
                isTyping ? 'is typing...' :  
                  isOnline.b ? 
                  'Online' : 
                  js_ago(new Date(isOnline.date)).trim().split(' ')[0] === 'NaN' ?
                  'Offline' :
                  `Active ${js_ago(new Date(isOnline.date))}`
              }
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerRightSection}>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationText}>
              ▼ {room.partner.campus}, {room.partner.state}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 35}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderTypingIndicator}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onContentSizeChange={() => {
                if (isAtBottom && messages.length > 0) {
                  setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                  }, 100);
                }
              }}
              onLayout={() => {
                if (messages.length > 0) {
                  setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: false });
                  }, 100);
                }
              }}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
                maxLength={500}
                onFocus={() => {
                  socket?.emit('is_typing', {
                    partner_id: room.partner.user_id, 
                    isTyping: true
                  });
                }} 
                onBlur={() => {
                  socket?.emit('not_typing', {
                    partner_id: room.partner.user_id, 
                    isTyping: false
                  });
                }}
                placeholderTextColor="#999"
              />
              
              <TouchableOpacity 
                style={[
                  styles.sendButton, 
                  !newMessage.trim() && styles.sendButtonDisabled
                ]}
                onPress={handleNewMessage}
                disabled={!newMessage.trim()}
              >
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {renderOptionsModal()}
    </SafeAreaView>
  );
};

// Card component with fixes
const Card = ({ product_id }) => {
  const [item, setItem] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    let mounted = true;

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get('https://cs-node.vercel.app/product', {
          params: { product_id }
        });
        
        if (mounted && data.data && data.data[0]) {
          setItem(data.data[0]);
        }
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    if (product_id) {
      fetchProduct();
    }

    return () => {
      mounted = false;
    };
  }, [product_id]);

  if (!item) return null;

  const formatNumber = (num) => {
    if (!num) return '0';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getPriceText = () => {
    switch (item.purpose) {
      case 'product':
        return `₦${formatNumber(item.price)}`;
      case 'accomodation':
        return `₦${formatNumber(item.price)} to pay ₦${formatNumber(item.others?.lodge_data?.upfront_pay || 0)}`;
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.adCard}
      onPress={() => navigation.navigate('product', { data: item })}
    >
      <Image
        style={styles.adImage}
        source={{ uri: item.thumbnail_id }}
        resizeMode="cover"
        onError={(error) => console.log('Image load error:', error)}
      />
      <View style={styles.adContent}>
        <Text style={styles.adTitle} numberOfLines={2}>
          {item.title || 'No Title'}
        </Text>
        <Text style={styles.adPrice}>
          {getPriceText()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const PRIMARY_COLOR = '#FF4500';
const COMPLEMENTARY_COLOR = '#00BFFF';
const LIGHT_ORANGE = '#FFE4D6';
const LIGHT_BLUE = '#E6F4FF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },

  // Custom Header Styles
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: '#E67E22',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    height: 70
  },
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 12,
  },
  headerAvatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerUserDetails: {
    flex: 1,
  },
  headerUserName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerUserStatus: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  headerRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  optionsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  optionsIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Message Styles
  messageContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 4,
  },
  myMessageBubble: {
    backgroundColor: PRIMARY_COLOR,
    borderTopRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: '#000000',
  },
  messageTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 6,
  },
  messageTime: {
    fontSize: 11,
    marginRight: 4,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  otherMessageTime: {
    color: '#666',
  },
  messageStatus: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  // Input Styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  attachmentIcon: {
    fontSize: 22,
  },
  textInput: {
    flex: 1,
    backgroundColor: LIGHT_ORANGE,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR + '40',
  },
  sendButton: {
    padding: 0,
    marginLeft: 8,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 24,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendIcon: {
    fontSize: 18,
    marginTop: -4,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Typing Indicator
  typingContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  typingBubble: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    opacity: 0.6,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adCard: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  adImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
  },
  adContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  adTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 8,
  },
  adStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});

export default ChatRoom;