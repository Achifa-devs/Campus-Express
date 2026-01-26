import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Description({ updateDescription }) {
  const screenWidth = Dimensions.get('window').width;
  const [description, setDescription] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 500;
  const minLength = 30;

  const handleDescriptionChange = (text) => {
    setDescription(text);
    if (updateDescription) {
      updateDescription(text);
    }
  };

  const remainingChars = maxLength - description.length;
  const showError = description.length > 0 && description.length < minLength;

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <View style={styles.header}>
        <Text style={styles.label}>Description (optional)</Text>
        <Text style={styles.charCounter}>
          {remainingChars}/{maxLength}
        </Text>
      </View>

      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        showError && styles.inputContainerError
      ]}>
        <TextInput
          placeholder="Describe your product in detail (features, condition, specifications)"
          placeholderTextColor="#999"
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          maxLength={maxLength}
          textAlignVertical="top"
          value={description}
          onChangeText={handleDescriptionChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      <View style={styles.footer}>
        {showError ? (
          <Text style={styles.errorText}>
            Description should be at least {minLength} characters
          </Text>
        ) : (
          <Text style={styles.hintText}>
            Include key details, features, and condition
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
    marginBottom: 4,
  },
  header: {
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
  charCounter: {
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
    borderColor: '#32CD32',
    backgroundColor: '#fff',
    shadowColor: '#32CD32',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainerError: {
    borderColor: '#ff3333',
  },
  input: {
    minHeight: 150,
    maxHeight: 200,
    padding: 12,
    fontSize: 15,
    color: '#333',
    textAlignVertical: 'top',
  },
  footer: {
    minHeight: 20,
  },
  errorText: {
    color: '#ff3333',
    fontSize: 13,
  },
  hintText: {
    color: '#666',
    fontSize: 13,
  },
});