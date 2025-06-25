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
  Alert
} from 'react-native';

import {openSettings} from "react-native-permissions"

import { useSelector } from "react-redux";
import RNFS from 'react-native-fs';
function StackNavigator () { 
    const version = ('1.0.2');

    const checkAppVersion = async () => {
        try {
        
        
            // Fetch latest version from your API
            const response = await fetch('https://cs-server-olive.vercel.app/version-check', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    current_version: version,
                    platform: Platform.OS, // 'ios' or 'android'
                }),
            });
            
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Version check failed:', error);
            // If any error occurs, still navigate to home as fallback
            return null
        }
    };
    const {
        auth
    }=useSelector(s=> s.auth);
    const [
        activeJsx, setActiveJsx
    ] = useState(<WelcomeScreen />);

    
    useEffect(() => {
        try {
            checkAppVersion().then((data) => {
                if (data.success) {
                    if (data.is_latest) {
                        // Version matches, navigate to home after delay
                        getUser();
                    } else {
                        setActiveJsx(<DownloadAppScreen url={data?.url} is_published={data?.is_published} summary={data?.summary} />)
                        // Show update modal
                        // setLatestVersion(data.latest_version);
                        // setDownloadUrl(data.download_url);
                        // setShowUpdateModal(true);
                    }
                } else {
                    // If API fails, still navigate to home as fallback
                    // setActiveJsx(<DownloadAppScreen />)
                    getUser();
    
                }
            })
            async function getUser() {
                if (auth) {
                    let response = await getData('user');
                    const user = (JSON.parse(response));
                    console.log(user)
                    if (user.user_id) {  
                        setActiveJsx(<StoreTab />)
                    } else {
                        setActiveJsx(<AuthStackScreen />)
                    }
                }else {
                    setActiveJsx(<AuthStackScreen />)
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }, [auth])

    return (
        <>
         
        {activeJsx}
        </>
    );
}; 
  
  export default StackNavigator; 


const DownloadAppScreen = ({ route, url, summary, is_published }) => {
    // Get dynamic data from navigation params or use defaults
    
    const installAPK = (filePath) => {
        const fileUrl = `content://${filePath}`;
        Linking.openURL(fileUrl)
        .catch(err => {
        console.error('Error opening APK:', err);
        Alert.alert('Error', 'Could not open the downloaded APK file.');
        });
    };
      
 
    const downloadAndInstallAPK = async () => {
      try {
        if (!is_published) {
          const apkUrl = url;
          const fileName = 'campus sphere.apk';
          const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
            title: 'External Storage',
            message: 'This app would like to modify your storage.',
            buttonPositive: 'OK',
          }).then(async (res) => {
            // console.log("res:", res)
            if (res !== PermissionsAndroid.RESULTS.GRANTED) {
              const download = RNFS.downloadFile({
                fromUrl: apkUrl,
                toFile: destPath,
              });
        
              const result = await download.promise;
              console.log('Download result:', result);
        
              if (result.statusCode === 200) {
                installAPK(destPath);
              } else {
                Alert.alert('Download Failed', 'Unable to download update.');
              }
              console.error(error);
              Alert.alert('Error', 'Failed to download APK.');
            } else {
              console.warn('Storage permission is required to download the update.');
              Alert.alert('Permission Denied', 'Storage permission is required to download the update.');
  
              // openSettings()
            }
          }).catch(console.error);
        
          
        } else {
          Linking.openURL(url)
          .catch(err => {
            console.error('Error opening APK:', err);
            Alert.alert('Error', 'Could not open playstore.');
          });
        }
      
      } catch (error) {
        console.log(error)
      }
    };

  const { 
    latestVersion = '1.0.2',
    features = eval(summary),
    downloadUrls = {
      ios: 'https://apps.apple.com/app/campus-sphere/id123456789',
      android: 'https://play.google.com/store/apps/details?id=com.campus.sphere'
    }
  } = route?.params || {};

//   const handleDownload = () => {
//     const url = Platform.OS === 'ios' ? downloadUrls.ios : downloadUrls.android;
//     Linking.openURL(url).catch(() => {
//       // Fallback to website if app store fails
//       Linking.openURL('https://campussphere.com/download');
//     });
//   };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            source={{uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png'}}
            style={styles.logo}
          />
          <Text style={styles.title}>Campus Sphere</Text>
          <Text style={styles.subtitle}>Connect. Discover. Belong.</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.versionBadge}>Version {latestVersion}</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.sectionTitle}>What's New:</Text>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* <View style={styles.platformCards}>
            <View style={styles.platformCard}>
              <Image 
                source={{uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png'}} 
                style={styles.platformIcon}
              />
              <Text style={styles.platformText}>iOS</Text>
              <Text style={styles.platformSize}>45.6 MB</Text>
            </View>
            
            <View style={styles.platformCard}>
              <Image 
                source={{uri: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1746402998/Untitled_design-removebg-preview_peqlme.png'}} 
                style={styles.platformIcon}
              />
              <Text style={styles.platformText}>Android</Text>
              <Text style={styles.platformSize}>32.4 MB</Text>
            </View>
          </View> */}
        </View>

        {/* <TouchableOpacity 
          style={styles.downloadButton} 
          onPress={downloadAndInstallAPK}
          activeOpacity={0.8}
        >
          <Text style={styles.downloadButtonText}>
            Download for {Platform.OS === 'ios' ? 'App Store' : 'Google Play'}
          </Text>
        </TouchableOpacity> */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Available at:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <Text style={styles.websiteLink}>campussphere.net</Text>
          </TouchableOpacity>
          <Text style={styles.copyright}>© {new Date().getFullYear()} U-COMMERCE LIMITED</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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