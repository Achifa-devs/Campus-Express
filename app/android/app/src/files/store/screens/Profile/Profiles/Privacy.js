import React from 'react';
import { ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
// import { ChevronLeft, Shield, Mail } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const Privacy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* <ChevronLeft stroke="#333" width={24} height={24} /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.introContainer}>
          {/* <Shield stroke="#2962FF" width={48} height={48} /> */}
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            We are committed to protecting your personal information and being transparent about what we collect.
          </Text>
        </View>

        <Text style={styles.lastUpdated}>Last updated: June 15, 2023</Text>
        
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.sectionText}>
          We collect information you provide when you create an account, list properties, or use our services, including:
          {'\n\n'}• Contact information (name, email, phone)
          {'\n'}• Property details
          {'\n'}• Payment information
          {'\n'}• Device and usage data
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.sectionText}>
          Your information is used to:
          {'\n\n'}• Provide and improve our services
          {'\n'}• Facilitate real estate transactions
          {'\n'}• Communicate with you
          {'\n'}• Prevent fraud and ensure security
          {'\n'}• Comply with legal obligations
        </Text>

        <Text style={styles.sectionTitle}>3. Information Sharing</Text>
        <Text style={styles.sectionText}>
          We may share your information with:
          {'\n\n'}• Other users as necessary for transactions
          {'\n'}• Service providers who assist our operations
          {'\n'}• Legal authorities when required by law
          {'\n\n'}We do not sell your personal information to third parties.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.sectionText}>
          We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.sectionText}>
          You have the right to:
          {'\n\n'}• Access and update your information
          {'\n'}• Request deletion of your data
          {'\n'}• Opt-out of marketing communications
          {'\n'}• Withdraw consent where applicable
        </Text>

        <View style={styles.contactContainer}>
          {/* <Mail stroke="#2962FF" width={20} height={20} /> */}
          <Text style={styles.contactText}>
            Contact our Privacy Officer at {' '}
            <Text 
              style={styles.linkText}
              onPress={() => Linking.openURL('mailto:privacy@realestatepro.com')}
            >
              privacy@realestatepro.com
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
    color: '#2962FF',
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
    color: '#2962FF',
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
    color: '#2962FF',
    textDecorationLine: 'underline',
  },
});

export default Privacy;