import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DisputeModal = ({ visible, disputeData, onConfirm, onReject }) => {
  if (!visible) return null;

  return (
    <Modal 
      transparent 
      visible={visible} 
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons 
              name="alert-circle" 
              size={44} 
              color="#FF6A00" 
            />
            <Text style={styles.title}>Dispute Review Required</Text>
          </View>

          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Description */}
            <Text style={styles.description}>
              A dispute has been raised regarding this transaction. The other party reported dissatisfaction with the service or item received.
            </Text>

            {/* Dispute Details */}
            <View style={styles.detailSection}>
              <Text style={styles.sectionLabel}>Dispute Details</Text>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Reason for Dispute:</Text>
                <Text style={styles.detailText}>
                  {disputeData?.reason || 'No reason provided.'} 
                </Text>
              </View>

              {/* Proof Image */}
              {disputeData?.proof && (
                <View style={styles.proofSection}>
                  <Text style={styles.proofLabel}>Supporting Evidence:</Text>
                  <Image 
                    source={{ uri: disputeData.proof }} 
                    style={styles.proofImage} 
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>

            {/* Important Note */}
            <View style={styles.noteBox}>
              <Ionicons name="information-circle" size={16} color="#6C757D" />
              <Text style={styles.noteText}>
                During review, funds are temporarily held. Please verify the claim based on your records.
              </Text>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.button, styles.invalidButton]} 
              onPress={onReject}
            >
              <Ionicons name="close-circle" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Invalid Claim</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.validButton]} 
              onPress={onConfirm}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
              <Text style={styles.buttonText}>Valid Claim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
    container: {
    width: '100%',
    maxWidth: 400,
    height: '85%', // slightly more breathing room
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
    backgroundColor: '#FFF8F5',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A1A1A',
    marginTop: 8,
  },
  content: {
    flex: 1,
    flexGrow: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  detailSection: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6A00',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  proofSection: {
    marginTop: 16,
  },
  proofLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  proofImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F4FD',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1890FF',
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#555',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  invalidButton: {
    backgroundColor: '#DC3545',
  },
  validButton: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default DisputeModal;