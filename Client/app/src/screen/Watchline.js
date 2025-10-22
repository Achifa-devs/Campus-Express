// screens/Watchline.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Watchline = ({ route, navigation }) => {
  const { flowType, userType="seller", itemType="product", itemData={} } = route.params;
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const flowConfig = require('../json/deal_chats.json');
  const currentFlow = flowConfig[`${userType}_flow`][itemType];

  useEffect(() => {
    startConversation();
  }, []);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const startConversation = () => {
    const firstQuestion = currentFlow.questions[0];
    setCurrentQuestion(firstQuestion);
    addMessage(firstQuestion.question, 'bot');
  };

  const addMessage = (text, sender, isQuestion = false) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender,
      isQuestion,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionSelect = (option) => {
    if (!currentQuestion) return;

    const responseText = currentQuestion.responses?.[option] || option;
    addMessage(responseText, 'user');

    const answerData = {
      questionId: currentQuestion.id,
      answer: option,
      response: responseText
    };

    const updatedAnswers = { ...userAnswers, [currentQuestion.id]: answerData };
    setUserAnswers(updatedAnswers);

    handleNextQuestion(option, updatedAnswers);
  };

  const handleTextInputSubmit = () => {
    if (!inputText.trim() || !currentQuestion) return;

    const responseText = currentQuestion.response_template 
      ? currentQuestion.response_template.replace('{value}', inputText)
      : inputText;

    addMessage(responseText, 'user');

    const answerData = {
      questionId: currentQuestion.id,
      answer: inputText,
      response: responseText
    };

    const updatedAnswers = { ...userAnswers, [currentQuestion.id]: answerData };
    setUserAnswers(updatedAnswers);

    setInputText('');
    handleNextQuestion(inputText, updatedAnswers);
  };

  const handleDateTimeSelect = (event, selectedDate) => {
    setShowDateTimePicker(false);
    
    if (selectedDate && currentQuestion) {
      const formattedDate = selectedDate.toLocaleString();
      const responseText = currentQuestion.response_template 
        ? currentQuestion.response_template.replace('{value}', formattedDate)
        : formattedDate;

      addMessage(responseText, 'user');

      const answerData = {
        questionId: currentQuestion.id,
        answer: selectedDate,
        response: responseText
      };

      const updatedAnswers = { ...userAnswers, [currentQuestion.id]: answerData };
      setUserAnswers(updatedAnswers);

      handleNextQuestion(selectedDate, updatedAnswers);
    }
  };

  const handleNextQuestion = (answer, answers) => {
    let nextStep = currentQuestion.next_step;

    if (typeof nextStep === 'object') {
      nextStep = nextStep[answer];
    }

    if (nextStep === 'end_conversation') {
      addMessage("Thank you for your responses! The conversation has ended.", 'bot');
      setCurrentQuestion(null);
      return;
    }

    if (nextStep) {
      const nextQuestion = currentFlow.questions.find(q => q.id === nextStep);
      if (nextQuestion) {
        // Replace template variables in question
        const processedQuestion = processTemplateVariables(nextQuestion.question, answers);
        const questionWithData = { ...nextQuestion, question: processedQuestion };
        
        setCurrentQuestion(questionWithData);
        addMessage(processedQuestion, 'bot', true);
      }
    }
  };

  const processTemplateVariables = (text, answers) => {
    return text.replace(/{(\w+)}/g, (match, variable) => {
      // Handle special variables
      if (variable === 'price' && itemData?.price) return itemData.price;
      if (variable === 'item_name' && itemData?.name) return itemData.name;
      if (variable === 'accommodation_title' && itemData?.title) return itemData.title;
      
      // Handle answer variables
      const answer = answers[variable];
      if (answer) {
        if (answer.answer instanceof Date) {
          return answer.answer.toLocaleString();
        }
        return answer.answer.toString();
      }
      
      return match;
    });
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.botMessageText
        ]}>
          {item.text}
        </Text>
      </View>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  const renderInputArea = () => {
    if (!currentQuestion) {
      return (
        <View style={styles.conversationEnded}>
          <Text style={styles.conversationEndedText}>
            Conversation ended
          </Text>
        </View>
      );
    }

    switch (currentQuestion.type) {
      case 'options':
        return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      case 'text':
      case 'integer':
      case 'duration':
        return (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Type your ${currentQuestion.type} here...`}
              placeholderTextColor="#999"
              onSubmitEditing={handleTextInputSubmit}
              keyboardType={currentQuestion.type === 'integer' ? 'numeric' : 'default'}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={handleTextInputSubmit}
              disabled={!inputText.trim()}
            >
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        );

      case 'datetime':
        return (
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDateTimePicker(true)}
          >
            <Icon name="calendar-today" size={20} color="#007AFF" />
            <Text style={styles.dateTimeButtonText}>Select Date & Time</Text>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentFlow.title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
      />

      {/* Input Area */}
      <View style={styles.inputArea}>
        {renderInputArea()}
      </View>

      {/* DateTime Picker Modal */}
      {showDateTimePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDateTimePicker}
          onRequestClose={() => setShowDateTimePicker(false)}
        >
          <View style={styles.dateTimePickerContainer}>
            <View style={styles.dateTimePickerContent}>
              <DateTimePicker
                value={new Date()}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateTimeSelect}
              />
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={() => setShowDateTimePicker(false)}
              >
                <Text style={styles.dateTimePickerButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerSpacer: {
    width: 32,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
    flexDirection: 'column',
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: '#007AFF',
  },
  botBubble: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 8,
  },
  inputArea: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  dateTimeButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  conversationEnded: {
    padding: 16,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    alignItems: 'center',
  },
  conversationEndedText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '500',
  },
  dateTimePickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dateTimePickerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  dateTimePickerButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  dateTimePickerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Watchline;