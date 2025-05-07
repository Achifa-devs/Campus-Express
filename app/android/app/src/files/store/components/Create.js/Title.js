import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Title({ updateTitle }) {
  const screenWidth = Dimensions.get('window').width;
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const maxWords = 30;

  const handleTitleChange = (text) => {
    setTitle(text);
    updateTitle(text); // Pass the title up to parent component
    
    // Word count validation
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (words.length < 3) {
      setError('Title should be at least 3 words');
    } else if (words.length > maxWords) {
      setError(`Maximum ${maxWords} words allowed`);
    } else {
      setError('');
    }
  };

  const wordCount = title.trim() === '' ? 0 : title.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Product Title</Text>
        <Text style={styles.wordCounter}>
          {wordCount}/{maxWords}
        </Text>
      </View>

      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <TextInput
          placeholder="Enter a descriptive title (e.g., 'Brand New iPhone 13 Pro Max 256GB')"
          placeholderTextColor="#999"
          style={styles.input}
          multiline={true}
          numberOfLines={3}
          maxLength={100}
          textAlignVertical="top"
          value={title}
          onChangeText={handleTitleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          blurOnSubmit={true}
        />
      </View>

      <View style={styles.footer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.hintText}>
            Include brand, model, key features (3-{maxWords} words)
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  wordCounter: {
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
  },
  inputContainerFocused: {
    borderColor: '#FF4500',
    backgroundColor: '#fff',
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    minHeight: 100,
    maxHeight: 150,
    padding: 12,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff3333',
    fontSize: 13,
    marginTop: 4,
  },
  hintText: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
});