import React from 'react';
import { ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
// import { ChevronLeft } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const Legal = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* <ChevronLeft stroke="#333" width={24} height={24} /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.lastUpdated}>Last updated: June 15, 2023</Text>
        
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.sectionText}>
          By accessing or using the RealEstatePro app, you agree to be bound by these Terms of Use and our Privacy Policy. 
          If you do not agree with any part of these terms, you must not use our services.
        </Text>

        <Text style={styles.sectionTitle}>2. Account Registration</Text>
        <Text style={styles.sectionText}>
          You must provide accurate and complete information when creating an account. You are responsible for maintaining 
          the confidentiality of your account credentials and for all activities that occur under your account.
        </Text>

        <Text style={styles.sectionTitle}>3. Prohibited Conduct</Text>
        <Text style={styles.sectionText}>
          You agree not to:
          {'\n\n'}• Post false, misleading, or fraudulent listings
          {'\n'}• Violate any laws or regulations
          {'\n'}• Harass other users
          {'\n'}• Use the service for any illegal purpose
          {'\n'}• Circumvent any security measures
        </Text>

        <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
        <Text style={styles.sectionText}>
          All content, features, and functionality on RealEstatePro are owned by us and are protected by international 
          copyright, trademark, and other intellectual property laws.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.sectionText}>
          RealEstatePro shall not be liable for any indirect, incidental, special, or consequential damages resulting from 
          your use of or inability to use the service.
        </Text>

        <Text style={styles.sectionTitle}>6. Governing Law</Text>
        <Text style={styles.sectionText}>
          These Terms shall be governed by the laws of the State of California without regard to its conflict of law provisions.
        </Text>

        <Text style={styles.contactText}>
          For any questions about these Terms, please contact us at {' '}
          <Text 
            style={styles.linkText}
            onPress={() => Linking.openURL('mailto:legal@realestatepro.com')}
          >
            legal@realestatepro.com
          </Text>
        </Text>
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
  contactText: {
    fontSize: 14,
    color: '#666',
    marginTop: 24,
    textAlign: 'center',
  },
  linkText: {
    color: '#FF4500',
    textDecorationLine: 'underline',
  },
});

export default Legal;