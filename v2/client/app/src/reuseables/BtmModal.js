import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const ANIMATION_DURATION = 300;
const BACKDROP_OPACITY = 0.5;

/**
 * Bottom Sheet Modal Component
 * Displays content in a modal that slides up from the bottom
 * 
 * @param {boolean} visible - Controls modal visibility
 * @param {Function} onClose - Callback when modal should close
 * @param {React.ReactNode} children - Content to display in modal
 */
const BottomModal = ({ visible, onClose, children }) => {
  // Animation value for vertical translation
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Animation configuration
  const animationConfig = useMemo(() => ({
    duration: ANIMATION_DURATION,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  }), []);

  // Animate modal appearance
  const showModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        ...animationConfig,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        ...animationConfig,
      }),
    ]).start();
  }, [translateY, opacity, animationConfig]);

  // Animate modal dismissal
  const hideModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        ...animationConfig,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        ...animationConfig,
      }),
    ]).start();
  }, [translateY, opacity, animationConfig]);

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      hideModal();
    }
  }, [visible, showModal, hideModal]);

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Animated backdrop style
  const backdropStyle = useMemo(() => ({
    opacity: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, BACKDROP_OPACITY],
    }),
  }), [opacity]);

  // Animated content container style
  const contentContainerStyle = useMemo(() => ({
    transform: [{ translateY }],
  }), [translateY]);

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={componentStyles.container}>
        {/* Backdrop overlay */}
        <Animated.View 
          style={[componentStyles.backdrop, backdropStyle]}
        >
          <TouchableOpacity
            style={componentStyles.backdropTouchable}
            activeOpacity={1}
            onPress={handleBackdropPress}
          />
        </Animated.View>

        {/* Modal content */}
        <Animated.View 
          style={[componentStyles.contentWrapper, contentContainerStyle]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

// Component Styles
const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  backdropTouchable: {
    flex: 1,
  },
  contentWrapper: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
});

export default BottomModal;
