import React from 'react';
import { 
  Modal, 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Dimensions 
} from 'react-native';

const SellModal = ({ 
  visible, 
  onClose, 
  children,
  animationType = 'slide',
  transparent = true,
  position = 'bottom' // 'bottom', 'center', or 'top'
}) => {
  const screenHeight = Dimensions.get('window').height;
  
  const getPositionStyle = () => {
    switch(position) {
      case 'bottom':
        return {
          justifyContent: 'flex-end',
          marginTop: screenHeight * 0.4
        };
      case 'center':
        return {
          justifyContent: 'center',
          alignItems: 'center'
        };
      case 'top':
        return {
          justifyContent: 'flex-start'
        };
      default:
        return {
          justifyContent: 'flex-end'
        };
    }
  };

  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay]}>
        <TouchableOpacity 
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <View style={[styles.modalContainer, getPositionStyle()]}>
          <View style={styles.modalContent}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%'
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});

export default SellModal;