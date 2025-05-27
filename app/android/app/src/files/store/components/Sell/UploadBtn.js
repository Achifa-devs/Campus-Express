import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

export default function UploadBtn({ navigation }) {
  const { colors } = useTheme();

  const handlePress = (type) => {
    navigation.navigate(type, { type, update: false });
  };

  return (
    <View style={styles.container}>
      {/* Product Upload Button */}
      <UploadOption 
        title="Upload Product"
        description="List physical goods for sale"
        icon={<UploadIcon />}
        color="#FF4500"
        onPress={() => handlePress('user-new-listing')}
      />

      
    </View>
  );
}

const UploadOption = ({ title, description, icon, color, onPress }) => (
  <TouchableOpacity 
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
    activeOpacity={0.7}
  > 
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </TouchableOpacity>
);

// Refined SVG Icon Component
function UploadIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 15V3M12 3L8 7M12 3L16 7"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 13H4V21H20V13H16"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  button: {
    height: 140,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});