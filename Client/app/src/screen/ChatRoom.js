// ChatRoomScreen.js
import React, { useState, useEffect, useRef } from 'react';
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
import Memory from '../utils/memoryHandler';
import js_ago from 'js-ago';
import { useSelector } from 'react-redux';
import { getSocket } from '../services/socket';
import axios from 'axios';

const ChatRoom = ({ route }) => {
  const { 
    room,
  } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const flatListRef = useRef(null);
  const { user } = useSelector(s => s?.user);
  const [socket, setSocket] = useState(undefined)
  useEffect(() => {
    // Scroll to bottom whenever messages change
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  useEffect(() => {
    if (user) {
      let s = getSocket()
      setSocket(s)
    }
  }, [user])

  function containsPhoneNumber(text) {
    // Match any sequence of 10 or 11 digits, not part of a longer number
    const phoneRegex = /\b\d{10,11}\b/;
    return phoneRegex.test(text);
  } 

  useEffect(() => {
    if (socket && room.partner) {
      messages.map(msg => {
        if (msg.type === 'received' && msg.seen !== '  ✓✓') {
          socket.emit('message_seen', { conversation_id: msg.room_id });
        }
      })
    }
  }, [room, socket, messages]);
  useEffect(() => {
    if(user){

      if(!socket)return
      // get_chats(socket, room.partner);

      if (room.partner) {
        socket.emit('join_room', { otherUserId: room.partner.user_id });
        get_chats(socket, room.partner)
      };

      socket.on('is_typing', ({user_id}) => {
        // alert(JSON.stringify(user_id))
        if (user.user_id !== user_id) {
          setIsTyping(true)
        }
      })
      socket.on('not_typing', ({user_id}) => {
        if (user.user_id !== user_id) {
          setIsTyping(false)
        }
      })

      

      socket.on("message", (msg) => {
        if (msg.sender_id === room.partner.user_id) {
          const newMsg = {
            id: messages.length + 1,
            type: 'received',
            // seen: ' sending...',
            text: msg.content,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prevArr => [...prevArr, newMsg]);
          // setNewMessage('');
         

          socket.emit('message_seen', { conversation_id: msg.conversation_id });
          }
      });

      socket.on('message_seen', ({ result }) => {
        if (user.user_id === result?.sender_id) {
          setMessages(prevArr => {
            const updatedArr = [...prevArr];
            updatedArr[updatedArr.length - 1].seen = '  ✓✓';
            return updatedArr;
          });
        }
      })
    }

    return () => socket.off("message");
  }, [room, socket]);


     function handleNewMessage() {
        const isValidText = containsPhoneNumber(newMessage)
        if (!isValidText) {
          if (newMessage.trim() !== '') {
            const newMsg = {
              id: messages.length + 1,
              type: 'sent',
              seen: ' sending...',
              text: newMessage,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prevArr => [...prevArr, newMsg]);
            setNewMessage('');
            // receiver_id, content, media_url, message_type, created_at
            socket.emit('send_message', { receiver_id: room.partner.user_id, content: newMsg.text, media_url: null, message_type: 'text', created_at: new Date() }, (response) => {
              if (response.success) {
                // console.log("Message sent successfully:", response.message);
                setMessages(prevArr => {
                  const updatedArr = [...prevArr];
                  updatedArr[updatedArr.length - 1].seen = ' ✓';
                  return updatedArr;
                });
              } else {
                console.error("Failed to send message:", response.error);
              }
            });
           
          }
        }else{
            // open_notice(true, "All business-related communications must take place within this chat, in accordance with platform policy.");
            Alert.alert("Your message contains a phone number which is not allowed.")
        }
    }

  // useEffect(() => {
    
  //   if(from === 'product'){
  //     Chat.sendMessage({ 
  //       receiver_id: data?.user_id, 
  //       content: "I need more enquiries on your offer now!", 
  //       message_type: "enquire", 
  //       media_url:  data.product_id
  //     })
  //   }


  //   Chat.onMessage((data) => {
  //     console.log('socket message', data)
  //   })
  // }, [room, session_id]);

  // Primary color and complementary color
  
  
  
  const PRIMARY_COLOR = '#FF4500';
  const COMPLEMENTARY_COLOR = '#00BFFF';
  const LIGHT_ORANGE = '#FFE4D6';
  const LIGHT_BLUE = '#E6F4FF';

  // useEffect(() => {
  //   setMessages(room[1].messages);
  //   Chat.joinConversation(room[0])
  // }, [room, navigation]);

  // useEffect(() => {
  //   if(messages.length>0){
  //     Chat.markAsRead(room[0], user?.user_id, (data) => {
  //       console.log('conversation read')
  //     })

  //     Chat.socket.on("message_status_update", ({ conversation_id, user_id, status }) => {
  //       console.log("📩 Status update:", { conversation_id, user_id, status });

  //       // TODO: update Redux or state so UI reflects 'seen'
  //     });

  //   }


  // }, [messages])

  // const sendMessage = () => {


  //   const receiver_id = room[0].split('_').filter(item => item !== user?.user_id)[0]

  //   Chat.sendMessage(
  //     {
  //       receiver_id,
  //       content: newMessage.trim(),
  //       message_type: "text",
  //       media_url: "",
  //       created_at: new Date()
  //     },
  //     ({message}) => {
  //       console.log("✅ Sent message:", message);

  //       setMessages((prevMessages) => {
  //         // Keep only valid ones (with real IDs)
  //         const authentic = prevMessages.filter(
  //           (item) => item?.mssg_id && item?.id
  //         );

  //         return [...authentic, message]; // append new one
  //       });
  //     }
  //   );


  //   if (newMessage.trim()) {
  //     const newMsg = {
  //       id: '',
  //       mssg_id: '',
  //       conversation_id: room[0],
  //       sender_id: user?.user_id,
  //       receiver_id: receiver_id,
  //       content: newMessage.trim(),
  //       message_type: 'text',
  //       media_url: '',
  //       created_at: new Date(),
  //       status: {
  //         "id": receiver_id,
  //         "status": "sending"
  //       }
  //     };
      
  //     setMessages(prev => [...prev, newMsg]);
  //     setNewMessage('');
      
  //     // Simulate typing indicator
  //     // setIsTyping(true);
      
  //   }
  // };

  function get_chats (socket, partner) {

    socket.emit('get_room_messages', { receiver_id: partner.user_id }, (response) => {
      if (response.success) {
        console.log("Chat room received:", response.messages);

        const msg = response.messages.map((msg) => {

          const new_mssg = {};
          if (msg.sender_id === partner.user_id) {
            new_mssg.type = 'received';
            new_mssg.text = msg.content;
            new_mssg.product_id = msg.media_url;
            const date = new Date(msg.created_at);
            new_mssg.timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            new_mssg.room_id = msg.conversation_id;
          } else {
            new_mssg.type = 'sent';
            new_mssg.text = msg.content;
            new_mssg.product_id = msg.media_url;
            new_mssg.seen = msg.status.status === 'seen' ? '  ✓✓' : msg.status.status === 'sent' ? ' ✓' : '';
            const date = new Date(msg.created_at);
            new_mssg.timestamp = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            new_mssg.room_id = msg.conversation_id;

          }

          return new_mssg;
        })

        console.log("Refined messages:", msg);
        setMessages(msg);
      } else {
        console.error("Failed to fetch chat room:", response.error);

      }
    });

  }
  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.type === 'sent' ? styles.myMessageContainer : styles.otherMessageContainer
    ]}>
      {/* CARD */}
      
      <View style={[
        styles.messageBubble,
        item.type === 'sent' ? styles.myMessageBubble : styles.otherMessageBubble
      ]}>
        {
          item.product_id && <Card product_id={item.product_id} />
        }
        <Text style={[
          styles.messageText,
          item.type === 'sent' ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.text}
        </Text>
        <View style={styles.messageTimeContainer}>
          <Text style={[
            styles.messageTime,
            item.type === 'sent' ? styles.myMessageTime : styles.otherMessageTime
          ]}>
            {((item.timestamp))}
          </Text>
          {item.type === 'sent' && (
            <Text style={styles.messageStatus}>
              {item.seen}{'🕒'}
            </Text>
          )}
          
        </View>
      </View>
    </View>
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity style={styles.headerUserInfo}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>👤</Text>
          </View>
          <View style={styles.headerUserDetails}>
            <Text style={styles.headerUserName}>{room.partner.fname}.{room.partner.lname[0]}</Text>
            {
              isTyping && <Text style={styles.headerUserStatus}>is typing...</Text>
            }
            {
              !isTyping && <Text style={styles.headerUserStatus}>Active 2hrs ago</Text>
            }
          </View>
        </TouchableOpacity>

        <View style={styles.headerRightSection}>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationText}>▼ {room.partner.campus}, {room.partner.state}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionsButton}
            onPress={() => setShowOptionsModal(true)}
          >
            <Text style={styles.optionsIcon}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            {/* Messages List */}
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={item => item.id}

              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
              ListFooterComponent={renderTypingIndicator}
            />

            {/* Input Container */}
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.attachmentButton}>
                <Text style={[styles.attachmentIcon, { color: PRIMARY_COLOR }]}>📎</Text>
              </TouchableOpacity>
              
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
                maxLength={500}
                onFocus={e => {
                  socket.emit('is_typing', {partner_id:  room.partner.user_id, isTyping: true})
                }} 
                onBlur={e => {
                  socket.emit('not_typing', {partner_id:  room.partner.user_id, isTyping: false})
                }}
                placeholderTextColor="#999"
              />
              
              <TouchableOpacity 
                style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
                onPress={e => handleNewMessage()}
                disabled={!newMessage.trim()}
              >
                <Text style={styles.sendIcon}>
                  {newMessage.trim() ? '➤' : '🎤'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Options Modal */}
      {renderOptionsModal()}
    </SafeAreaView>
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
    padding: 12,
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



function Card ({product_id}) {
  

  
  const [item, setItem] = useState('');
  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get('http://10.81.21.3:9090/product', {
          params: {
            product_id
          }
        })
        setItem(data.data[0])
      })();
    } catch (error) {
      console.log(error)
    }
  }, [item])
  const navigation = useNavigation()
  return (
    <>
      <TouchableOpacity 
      style={styles.adCard}
      onPress={() => navigation.navigate('product', {data: item})}
    >
      {item?.purpose !== 'accomodation' ? (
        <TouchableOpacity onPress={e=>handlePromotePress(item)}>
          <Image
            style={styles.adImage}
            source={{ uri: item?.thumbnail_id }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={e=>handlePromotePress(item)} style={{
          height: 100,          // ✅ explicit height (same as Image for consistency)
          width: 100,
          backgroundColor: '#000',
          // borderRadius: 5,
          overflow: 'hidden', 
        
        }}>
          <Video
            source={{ uri: item?.thumbnail_id }}
            style={styles.adImage}
            resizeMode="cover"
            muted={true}
            paused
          />
        </TouchableOpacity>
      )}

      <View style={styles.adContent}>
        <Text style={styles.adTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.adPrice}>
          {
            item?.purpose === 'product'
            ?
            '₦' + new Intl.NumberFormat('en-us').format(item?.price)
            :
            item?.purpose === 'accomodation'
            ?
            '₦' + Tools.formatNumber(item?.price) + ' to pay ₦' + Tools.formatNumber(item?.others?.lodge_data?.upfront_pay) 
            : 
            ''
          }
        </Text>
      </View>
    </TouchableOpacity>
    </>
  )
}


