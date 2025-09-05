import { useEffect, useState } from "react";
import StoreTab from "./StoreTab";
import WelcomeScreen from "../screens/WelcomeScreen";
import { getData, storeData } from "../../utils/AsyncStore.js";
import AuthStackScreen from "./Auth.js";
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Linking, 
  Platform,
  ScrollView,
  SafeAreaView,
  PermissionsAndroid,
  Alert,
  StatusBar
} from 'react-native';

import {openSettings} from "react-native-permissions"

import { useSelector } from "react-redux";
// import RNFS from 'react-native-fs';
function StackNavigator () { 
    const version = ('1.0.2');

    
    const {
        auth
    }=useSelector(s=> s.auth);
    const [
        activeJsx, setActiveJsx
    ] = useState(<WelcomeScreen />);

    
    useEffect(() => {
      (async function getUser() {
        if (auth) {
          let response = await getData('user');
          const user = (JSON.parse(response));
          console.log(user)
          if (user.user_id) {  
            setActiveJsx(<StoreTab />)
          } else {
            setActiveJsx(<StoreTab />)
          }
        }else {
          setActiveJsx(<StoreTab />)
        }
      })()
    }, [auth])

    

    return (
        <>
         
        {activeJsx}
        </>
    );
}; 
  
  export default StackNavigator; 


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flexGrow: 1,
    padding: 25,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF4500',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  versionBadge: {
    backgroundColor: '#FF4500',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 25,
    fontWeight: '600',
  },
  content: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bullet: {
    color: '#FF4500',
    marginRight: 10,
    fontSize: 20,
    lineHeight: 24,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  platformCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  platformCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  platformIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  platformText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  platformSize: {
    fontSize: 14,
    color: '#777',
  },
  downloadButton: {
    backgroundColor: '#FF4500',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#FF4500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  downloadButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  websiteLink: {
    color: '#FF4500',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  copyright: {
    fontSize: 12,
    color: '#AAA',
  },
});

// export default DownloadAppScreen;