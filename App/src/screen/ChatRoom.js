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
import { io } from 'socket.io-client';
import Memory from '../utils/memoryHandler';
import { Chat } from '../api/chat';
import js_ago from 'js-ago';
import { useSelector } from 'react-redux';

const ChatRoom = ({ route }) => {
  const { 
    from,
    data, 
    room,
    session_id
  } = route.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const flatListRef = useRef(null);
  const { user } = useSelector(s => s?.user);

  useEffect(() => {
    
    if(from === 'product'){
      Chat.sendMessage({ 
        receiver_id: data?.user_id, 
        content: "I need more enquiries on your offer now!", 
        message_type: "enquire", 
        media_url:  data.product_id
      })
    }


    Chat.onMessage((data) => {
      console.log('socket message', data)
    })
  }, [room, session_id]);

  // Primary color and complementary color
  
  
  
  const PRIMARY_COLOR = '#FF4500';
  const COMPLEMENTARY_COLOR = '#00BFFF';
  const LIGHT_ORANGE = '#FFE4D6';
  const LIGHT_BLUE = '#E6F4FF';

  useEffect(() => {
    setMessages(room[1].messages);
    Chat.joinConversation(room[0])
  }, [room, navigation]);

  useEffect(() => {
    if(messages.length>0){
      Chat.markAsRead(room[0], user?.user_id, (data) => {
        console.log('conversation read')
      })

      Chat.socket.on("message_status_update", ({ conversation_id, user_id, status }) => {
        console.log("📩 Status update:", { conversation_id, user_id, status });

        // TODO: update Redux or state so UI reflects 'seen'
      });

    }


  }, [messages])

  const sendMessage = () => {


    const receiver_id = room[0].split('_').filter(item => item !== user?.user_id)[0]

    Chat.sendMessage(
      {
        receiver_id,
        content: newMessage.trim(),
        message_type: "text",
        media_url: "",
        created_at: new Date()
      },
      ({message}) => {
        console.log("✅ Sent message:", message);

        setMessages((prevMessages) => {
          // Keep only valid ones (with real IDs)
          const authentic = prevMessages.filter(
            (item) => item?.mssg_id && item?.id
          );

          return [...authentic, message]; // append new one
        });
      }
    );


    if (newMessage.trim()) {
      const newMsg = {
        id: '',
        mssg_id: '',
        conversation_id: room[0],
        sender_id: user?.user_id,
        receiver_id: receiver_id,
        content: newMessage.trim(),
        message_type: 'text',
        media_url: '',
        created_at: new Date(),
        status: {
          "id": receiver_id,
          "status": "sending"
        }
      };
      
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      
      // Simulate typing indicator
      // setIsTyping(true);
      
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender_id === user?.user_id ? styles.myMessageContainer : styles.otherMessageContainer
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender_id === user?.user_id ? styles.myMessageBubble : styles.otherMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender_id === user?.user_id ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.content}
        </Text>
        <View style={styles.messageTimeContainer}>
          <Text style={[
            styles.messageTime,
            item.sender_id === user?.user_id ? styles.myMessageTime : styles.otherMessageTime
          ]}>
            {js_ago(new Date(item.created_at))}
          </Text>
          {item.sender_id === user?.user_id && (
            <Text style={styles.messageStatus}>
              {item.status.status}{'🕒'}
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
            <Text style={styles.headerUserName}>Akpulu Fabian.C</Text>
            <Text style={styles.headerUserStatus}>Active 2hrs ago</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerRightSection}>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationText}>▼ Unizik, Awka</Text>
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
                placeholderTextColor="#999"
              />
              
              <TouchableOpacity 
                style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
                onPress={sendMessage}
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
});

export default ChatRoom;