import { useEffect, useState } from "react";
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
} from 'react-native';

export const DownloadAppScreen = ({ url, summary=[] }) => {
    // Get dynamic data from navigation params or use defaults
    
    const downloadAndInstallAPK = async () => {
      try {
        Linking.openURL(url)
          .catch(err => {
            console.error('Error opening APK:', err);
            Alert.alert('Error', 'Could not open playstore.');
        });
      
      } catch (error) {
        console.log(error)
      }
    };

  
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
            
            <View style={styles.featureCard}>
                <Text style={styles.sectionTitle}>What's New:</Text>
                {summary.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                </View>
                ))}
            </View>

            </View>

            <TouchableOpacity 
            style={styles.downloadButton} 
            onPress={downloadAndInstallAPK}
            activeOpacity={0.8}
            >
            <Text style={styles.downloadButtonText}>
                Download from {Platform.OS === 'ios' ? 'App Store' : 'Google Play'}
            </Text>
            </TouchableOpacity>

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
