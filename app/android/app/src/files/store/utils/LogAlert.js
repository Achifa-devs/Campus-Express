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
    <View style={{
      flex: 1, // makes container take 100% height & width
      justifyContent: "center", // centers vertically
      alignItems: "center", // centers horizontally
      backgroundColor: "#f5f5f5", // optional
    }}>
      <TouchableOpacity
        style={[styles.button]}
        onPress={e=> dispatch(setUserAuthTo(true))}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Icon name="log-in" size={30} color="#FF4500" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Sign In Required</Text>
            <Text style={styles.descriptionText}>{text}</Text>
          </View>
            <Text style={styles.buttonText}>Click Me</Text>

          {/* <Icon name="chevron-forward" size={20} color="#FFF" /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 4,
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    // flex: 1,
    textAlign: 'center'
  },
  buttonText: {
    color: '#FF4500',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center'

  },
  descriptionText: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default LoginButton;