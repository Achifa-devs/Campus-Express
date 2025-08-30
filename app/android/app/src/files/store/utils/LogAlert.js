// components/LoginButton.js
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setUserAuthTo } from '../../../../../../redux/reducer/auth';

const { width } = Dimensions.get('window');

const LoginButton = ({ text = "Sign in to continue" }) => {
  const dispatch = useDispatch()
 
  return (
    <TouchableOpacity 
      style={[styles.button]}
      onPress={e=> dispatch(setUserAuthTo(true))}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        <Icon name="log-in" size={20} color="#FFF" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Sign In Required</Text>
          <Text style={styles.descriptionText}>{text}</Text>
        </View>
        <Icon name="chevron-forward" size={20} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF4500',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: width - 32,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default LoginButton;