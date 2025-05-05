import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { globalStyles } from '../utils/styles';

const TermsOfServiceScreen = () => (
  <ScrollView style={globalStyles.container} contentContainerStyle={globalStyles.scrollContent}>
    <Text style={globalStyles.paragraph}>
      Welcome to Campus Sphere. By using our platform, you agree to the following terms...
    </Text>
    <Text style={globalStyles.paragraph}>
      1. You must be a verified campus member to buy or sell on the platform.
    </Text>
    <Text style={globalStyles.paragraph}>
      2. Items listed must comply with our marketplace guidelines...
    </Text>
    {/* Add more sections as needed */}
  </ScrollView>
);

export default TermsOfServiceScreen;
