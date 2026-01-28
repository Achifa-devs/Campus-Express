
// import LogoSvg from '../../assets/logo.svg'
import Icon from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { 
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View 
} from 'react-native';

export default function Head(){

  const {
      user
  } = useSelector(s => s.user);


  return(
    <>
      <View style={styles.headerContainer}>
      
        {/* Logo */}
        <View style={styles.logoContainer}>
            {/* <LogoSvg height={50} width={50} /> */}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
            {/* Location Selector */}
            

            {/* Subscribe Button */}
            {/* {user && (
            
            <TouchableOpacity
                style={[styles.button, styles.subscribedButton]}
                onPress={e=> handleSub()}
                activeOpacity={0.8}
                >
                <View style={styles.buttonContent}>
                <Icon 
                    name={"people-outline"} 
                    size={16} 
                    color={"#fff"} 
                    style={styles.icon}
                />
                <Text style={[styles.buttonText, styles.subscribedText]}>
                    {user.connects} {user.connects > 1 ? 'vendor connects' : 'vendor connect'}
                </Text>
                </View>
            </TouchableOpacity>
            )} */}

            {
                !user && (
                    <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={() => dispatch(setUserAuthTo(true))}
                    activeOpacity={0.9}
                    >
                    <Text style={styles.loginText}>Login</Text>
                    <Icon name="log-in-outline" size={16} color="#FFF" />
                    </TouchableOpacity>
                )
            }
        </View>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
    headerContainer: { 
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    ...Platform.select({
      ios: {
        paddingTop: 10,
      },
    }),
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 40,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE5D9',
    minWidth: 120,
    maxWidth: 160,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  locationText: {
    color: '#FFA500',
    fontWeight: '600',
    fontSize: 13,
    marginHorizontal: 6,
    flexShrink: 1,
  },
  notificationButton: {
    padding: 8,
  },
  notificationContainer: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#FFF6F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#FFA500',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  subscribedButton: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  subscribedText: {
    color: '#FFF',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFA500',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  loginText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
})