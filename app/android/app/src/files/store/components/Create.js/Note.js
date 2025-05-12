import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadGuidelines = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        📌 Important Note for Uploading Products on Campus Sphere
      </Text>
      <Text style={styles.intro}>
        To ensure the best experience for both sellers and buyers, please follow these guidelines when uploading your products:
      </Text>

      <View style={styles.guidelineItem}>
        <Text style={styles.guidelineTitle}>Clear Product Title</Text>
        <Text style={styles.guidelineText}>
          Use a concise and descriptive title that accurately reflects the product. Avoid using all caps or emojis.
        </Text>
      </View>

      <View style={styles.guidelineItem}>
        <Text style={styles.guidelineTitle}>High-Quality Images</Text>
        <Text style={styles.guidelineText}>
          Upload clear, well-lit images showing multiple angles of the product. Blurry or misleading images may be removed.
        </Text>
      </View>

      <View style={styles.guidelineItem}>
        <Text style={styles.guidelineTitle}>Accurate Descriptions</Text>
        <Text style={styles.guidelineText}>
          Provide detailed product information including features, sizes, conditions (new or used), and any other relevant details.
        </Text>
      </View>

      <View style={styles.guidelineItem}>
        <Text style={styles.guidelineTitle}>Pricing and Delivery Options</Text>
        <Text style={styles.guidelineText}>
          Set a fair price and specify your delivery range (On Campus is required). Clearly indicate any delivery fees where applicable.
        </Text>
      </View>

      <View style={styles.guidelineItem}>
        <Text style={styles.guidelineTitle}>Category Selection</Text>
        <Text style={styles.guidelineText}>
          Select the most appropriate category to help buyers easily find your product.
        </Text>
      </View>

      <View style={styles.guidelineItem}>
        <Text style={styles.guidelineTitle}>No Prohibited Items</Text>
        <Text style={styles.guidelineText}>
          Avoid listing restricted items such as weapons, drugs, counterfeit goods, or any product that violates our community standards.
        </Text>
      </View>

      <View style={styles.guidelineItem}>
        <Text style={styles.guidelineTitle}>Stay Responsive</Text>
        <Text style={styles.guidelineText}>
          Be available to respond to buyer inquiries promptly to build trust and increase sales.
        </Text>
      </View>

      <Text style={styles.conclusion}>
        By following these guidelines, you help maintain a safe and trusted marketplace for the entire campus community.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  intro: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
    lineHeight: 22,
  },
  guidelineItem: {
    marginBottom: 16,
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  guidelineText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  conclusion: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
    color: '#555',
    lineHeight: 20,
  },
});

export default UploadGuidelines;