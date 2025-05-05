import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { globalStyles } from '../utils/styles';

const PrivacyPolicyScreen = () => (
  <ScrollView style={globalStyles.container} contentContainerStyle={globalStyles.scrollContent}>
    <Text style={globalStyles.paragraph}>
      Your privacy is important to us. We collect minimal data to improve your experience...
    </Text>
    <Text style={globalStyles.paragraph}>
      1. We do not share personal data without your consent.
    </Text>
    <Text style={globalStyles.paragraph}>
      2. We use secure methods to store and process data.
    </Text>
    {/* Add more sections as needed */}
  </ScrollView>
);

export default PrivacyPolicyScreen;
