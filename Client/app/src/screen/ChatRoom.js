/// ChatRoomScreen.js
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
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getSocket, initSocket } from '../services/socket';
import axios from 'axios';
import js_ago from 'js-ago';
import Video from 'react-native-video';
import Tools from '../utils/generalHandler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatRoom = ({ route }) => {
  const { room } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const flatListRef = useRef(null);
  const { user } = useSelector(s => s?.user);
  const [socket, setSocket] = useState(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const messageIdCounter = useRef(0);
  const socketRef = useRef(null);
  const { is_active } = useSelector(s => s?.is_active);
  const { is_connected } = useSelector(s => s?.is_connected);


  useEffect(() => {
    if(!socket){
      if(is_connected){
        if(user){
          const initializeSocket = async () => {
            try {
              await initSocket(user?.user_id);
              let socket_client = getSocket();
              setSocket(socket_client)
            } catch (error) {
              console.error('Error initializing socket:', error);
            }
          }
          initializeSocket()
        }
      }else{
        Alert.alert('Chat cannot load because you have no internet connection!')
      }
    }
    
  }, [socket])
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
        // socketRef.current.disconnect();
      }
    };
  }, [user]);

  // Room joining and message fetching
  useEffect(() => {
    if (!socket || !room?.partner) return;

    // Join room and get messages
    socket?.emit('join_room', { otherUserId: room.partner.user_id });
    get_chats(room.partner);

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

    const handleIncomingMssg = ({newMessage}) => {
      const msg = newMessage;
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
          // Add to beginning for inverted list
          return exists ? prev : [newMsg, ...prev];
        });

        // Mark as seen
        socket?.emit('message_seen', { conversation_id: msg.conversation_id });
      }
    };

    const handleMessageSeen = ({ result }) => {
      if (result && user.user_id === result.sender_id) {
        setMessages(prev => {
          if (prev.length === 0) return prev;

          const firstIndex = 0; // For inverted list, first message is the latest
          const firstMessage = prev[firstIndex];

          if (firstMessage.seen === '✓✓') return prev;

          const updatedMessage = { ...firstMessage, seen: '✓✓' };

          return [
            updatedMessage,
            ...prev.slice(firstIndex + 1),
          ];
        });
      }
    };

    // Attach event listeners
    socket.on('is_typing', handleTyping);
    socket.on('not_typing', handleNotTyping);
    socket.on('message', handleIncomingMssg);
    socket.on('message_seen', handleMessageSeen);

    // Cleanup function
    return () => {
      socket.off('is_typing', handleTyping);
      socket.off('not_typing', handleNotTyping);
      socket.off('message', handleIncomingMssg);
      socket.off('message_seen', handleMessageSeen);
    };
  }, [socket, room, user]);

  const [isOnline, setIsOnline] = useState({b: false, date: room?.partner?.lastseen})
  useEffect(() => {

    // Alert.alert(JSON.stringify(is_active))
    if (is_active && is_active.user_id === room.partner.user_id) {
      if (is_active.online) {
        if(is_active.user_id !== user.user_id)return;
        setIsOnline({b: is_active.online, date: is_active.date})
      }else{
        if(!is_active.date)return;
        setIsOnline({b: is_active.online, date: is_active.date})
      }
    } 
    
  }, [is_active, socket, room, user])

  // Mark messages as seen when they become visible
  useEffect(() => {
    if (!socket || !room?.partner) return;

    const unseenMessages = messages.filter(msg => 
      msg.type === 'received' && msg.seen !== ' ✓✓'
    );

    if (unseenMessages.length > 0) {
      unseenMessages.forEach(msg => {
        if (msg.room_id) {
          socket?.emit('message_seen', { conversation_id: msg.room_id });
        }
      });
    }
  }, [messages, socket, room]);

  // Scroll handling for inverted list
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const distanceFromTop = contentOffset.y;
    setIsAtTop(distanceFromTop < 50);
  };

  useEffect(() => {
    if (isAtTop && messages.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isAtTop]);

  // Phone number validation
  const containsPhoneNumber = (text) => {
    const phoneRegex = /\b\d{10,11}\b/;
    return phoneRegex.test(text);
  };

  // const handleIncomingMssg = ({newMessage}) => {
  //   let msg = newMessage;
  //   if (msg.sender_id === room.partner.user_id) {
  //     const newMsg = {
  //       id: messages.length + 1,
  //       type: 'received',
  //       // seen: ' sending...',
  //       text: msg.content,
  //       timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     };
  //     setMessages(prevArr => [newMsg, ...prevArr]);
  //     socket?.emit('message_seen', { conversation_id: msg.conversation_id });
  //   }
  // }

  // Send message function for inverted list
  const handleNewMessage = () => {
    if (containsPhoneNumber(newMessage)) {
      Alert.alert("Security Alert", "Your message contains a phone number which is not allowed.");
      return;
    }

    if (newMessage.trim() === '') return;
    console.log(newMessage)

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

    // Optimistically add message to UI (at the beginning for inverted list)
    setMessages(prev => [newMsg, ...prev]);
    setNewMessage('');

    // Send via socket
    socket?.emit('send_message', { 
      receiver_id: room.partner.user_id, 
      content: newMsg.text, 
      media_url: null, 
      message_type: 'text', 
      created_at: new Date() 
    }, (response) => {
      if (response && response.success) {
        // Update message status
        setMessages(prev => {
          const firstIndex = 0; // For inverted list, first message is the latest
          if (firstIndex < 0) return prev;

          const firstMessage = prev[firstIndex];
          if (firstMessage.seen === ' ✓') return prev;

          // Find the exact message by ID to avoid updating wrong message
          const messageIndex = prev.findIndex(m => m.id === newMsg.id);
          if (messageIndex === -1) return prev;

          const updatedMessage = {
            ...prev[messageIndex],
            seen: ' ✓',
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

  // Fetch chat messages for inverted list
  const get_chats = (partner) => {
    if (!socket || !partner) return;

    socket?.emit('get_room_messages', { receiver_id: partner.user_id }, (response) => {
      // Alert.alert('getting socket: ', JSON.stringify(response))
      
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
            seen: !isReceived ? (msg.status?.status === 'seen' ? ' ✓✓' : msg.status?.status === 'sent' ? ' ✓' : '') : undefined
          };
        });

        // Reverse the messages for inverted FlatList (newest first at top)
        setMessages(formattedMessages.reverse());
        setChatLoading(false)
      } else {
        console.error("Failed to fetch chat room:", response?.error);
        Alert.alert("Error", "Failed to load messages");
        setChatLoading(false)
      }
    });
  };

  // Message item component (no changes needed for inverted list)
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

  // Typing indicator for inverted list (appears at the bottom, which is the top in inverted)
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
      <StatusBar barStyle="dark-content" backgroundColor={PRIMARY_COLOR} />
      
      {chatLoading> 0 &&
        <View style={{
          height: '100%', 
          width: '100%',
          position: 'absolute',
          top: 1,
          left: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF8F6',
          opacity: .5
        }}>
          <ActivityIndicator size={'large'} color={'#FF4500'}></ActivityIndicator>
        </View>
      }
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity 
          style={styles.headerUserInfo}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.avatarContainer}>
            {
            !room.partner || !room.partner.photo
            ?
            <View style={[styles.avatar, {display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff4e0'}]}>
              <Ionicons name={"person-circle-outline"} size={45} color={"#FF4500"} />
            </View>
            :
            <Image
              source={{ uri: room.partner.photo }}
              style={styles.avatar}
              resizeMode="cover"
            />
            }
            {/* {item.isOnline && <View style={styles.onlineIndicator} />} */}
          </View>
          <View style={styles.headerUserDetails}>
            <Text style={styles.headerUserName}>
              {room.partner.fname}.{room.partner.lname?.[0] || ''}
            </Text>
            <Text style={styles.headerUserStatus}>
             {
                isTyping
                  ? 'is typing...'
                  : room?.partner?.lastseen === 'now'
                    ? 'Active now'
                    : (() => {
                        const lastSeenDate = new Date(room?.partner?.lastseen);
                        const now = new Date();

                        if (!room?.partner?.lastseen || isNaN(lastSeenDate.getTime())) {
                          return 'Offline';
                        }

                        // Prevent js_ago() from crashing on future dates
                        if (lastSeenDate > now) {
                          return 'Active now';
                        }

                        return `Active ${js_ago(lastSeenDate)}`;
                      })()
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
      {<Card product_id={
        messages.length > 0
        &&
        messages.filter(item => item.product_id)[0].product_id
      } />}
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
              ListHeaderComponent={renderTypingIndicator} // Changed from ListFooterComponent
              onScroll={handleScroll}
              scrollEventThrottle={16}
              inverted={true} // Enable inverted mode
              onContentSizeChange={() => {
                if (isAtTop && messages.length > 0) {
                  setTimeout(() => {
                    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                  }, 100);
                }
              }}
              onLayout={() => {
                if (messages.length > 0) {
                  setTimeout(() => {
                    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
                  }, 100);
                }
              }}
              // Additional props for better inverted list performance
              removeClippedSubviews={true}
              initialNumToRender={20}
              maxToRenderPerBatch={10}
              windowSize={21}
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

// Card component with fixes (no changes needed)
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
        return `₦${Tools.formatNumber(item.price)}`;
      case 'accomodation':
        return `₦${Tools.formatNumber(item.price)} to pay ₦${Tools.formatNumber(item.others?.lodge_data?.upfront_pay || 0)}`;
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.adCard}
      onPress={() => navigation.navigate('product', { data: item })}
    >
      {
        item.purpose !== 'product' ?
        <Video
          style={styles.adImage}
          source={{ uri: item.thumbnail_id }}
          resizeMode="cover"
          paused
          onError={(error) => console.log('Image load error:', error)}
        />
        :
        <Image
          style={styles.adImage}
          source={{ uri: item.thumbnail_id }}
          resizeMode="cover"
          onError={(error) => console.log('Image load error:', error)}
        />
      }
      <View style={styles.adContent}>
        <Text style={styles.adTitle} numberOfLines={1}>
          {item.title || 'No Title'}
        </Text>
        <Text style={styles.adPrice}>
          {getPriceText()}
        </Text>
         <Text style={{position: 'absolute', left: 10, bottom: 5, fontSize: 10, color: '#FFA500'}}>
          {item.purpose !== 'product' ? 'Accomodation' : ''}
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
    avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  headerAvatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    height: 60,
    alignItems: 'center',
    paddingLeft: 8, 
    paddingRight: 8, 
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  adImage: {
    width: 45,
    height: 45,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
  },
  adContent: {
    flex: 1,
    padding: 12,
    paddingTop: 18,
    justifyContent: 'space-between',
    
  },
  adTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1A1A1A',
    // marginBottom: 4,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 12,
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