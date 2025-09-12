import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { set_sub_modal } from '../../../../../../../redux/sub';

export default function UploadBtn({ navigation, toggleModal }) {
  const { colors } = useTheme();
  const { tier } = useSelector(s=>s.tier)
  const dispatch = useDispatch()

  // const handlePress = (type) => {
  //   navigation.navigate(type, { type, update: false });
  // };

  return (
    <View style={styles.container}>
      {/* Product Upload Button */}
      <UploadOption 
        title="Upload Offerings"
        description="Publish your accommodations, products, or services available for sale or rent."
        icon={<UploadIcon />}
        color="#FF4500"
        onPress={() => {toggleModal()}}
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
    padding: 0,
    gap: 16,
  },
  button: {
    height: 160,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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