import React from 'react';
import { ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { ChevronLeft, Shield, Mail } from 'lucide-react-native'; // Uncomment if using icons
// import styles from './yourStyleFile'; // Replace with actual path

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (

    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} /> 
      </View> */}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            We are committed to protecting your personal information and being transparent about what we collect.
          </Text>
        </View>

        <Text style={styles.lastUpdated}>Last updated: June 15, 2023</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <View style={styles.sectionText}>
          <Text>We collect information you provide when you create an account, list products and properties, or use our services, including:</Text>
          <Text>{'\n\n'}• Contact information (name, email, phone)</Text>
          <Text>{'\n'}• Property/Product details</Text>
          <Text>{'\n'}• Payment information</Text>
          <Text>{'\n'}• Device and usage data</Text>
        </View>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <View style={styles.sectionText}>
          <Text>Your information is used to:</Text>
          <Text>{'\n\n'}• Provide and improve our services</Text>
          <Text>{'\n'}• Facilitate Campus Sphere transactions</Text>
          <Text>{'\n'}• Communicate with you</Text>
          <Text>{'\n'}• Prevent fraud and ensure security</Text>
          <Text>{'\n'}• Comply with legal obligations</Text>
        </View>

        <Text style={styles.sectionTitle}>3. Information Sharing</Text>
        <View style={styles.sectionText}>
          <Text>We may share your information with:</Text>
          <Text>{'\n\n'}• Other users as necessary for transactions</Text>
          <Text>{'\n'}• Service providers who assist our operations</Text>
          <Text>{'\n'}• Legal authorities when required by law</Text>
          <Text>{'\n\n'}We do not sell your personal information to third parties.</Text>
        </View>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <View style={styles.sectionText}>
          <Text>
            We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <View style={styles.sectionText}>
          <Text>You have the right to:</Text>
          <Text>{'\n\n'}• Access and update your information</Text>
          <Text>{'\n'}• Request deletion of your data</Text>
          <Text>{'\n'}• Opt-out of marketing communications</Text>
          <Text>{'\n'}• Withdraw consent where applicable</Text>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactText}> 
            Contact our Privacy Officer at{' '}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL('campus-sphere@campussphere.net')}
            >
              campus-sphere@campussphere.net
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  introContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF4500',
    marginVertical: 12,
  },
  introText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4500',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    padding: 16,
    backgroundColor: '#FFF5F0',
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  linkText: {
    color: '#FF4500',
    textDecorationLine: 'underline',
  },
});

export default PrivacyPolicyScreen;