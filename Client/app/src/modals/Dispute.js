import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DisputeModal = ({ visible, disputeData, onConfirm, onReject }) => {
  if (!visible) return null;

  // Sample evidence data structure
  const evidence = disputeData?.evidence || [
    { type: 'image', uri: disputeData?.proof, name: 'proof_image.jpg' },
    // { type: 'file', uri: 'https://example.com/document.pdf', name: 'supporting_document.pdf' },
    { type: 'image', uri: 'https://example.com/photo2.jpg', name: 'additional_photo.jpg' },
  ];

  const handleOpenFile = async (uri) => {
    try {
      const canOpen = await Linking.canOpenURL(uri);
      if (canOpen) {
        await Linking.openURL(uri);
      }
    } catch (error) {
      console.log('Error opening file:', error);
    }
  };

  const renderEvidenceItem = (item, index) => {
    if (item.type === 'image') {
      return (
        <View key={index} style={styles.evidenceItem}>
          <Image 
            source={{ uri: item.uri }} 
            style={styles.evidenceImage} 
            resizeMode="cover"
          />
          <Text style={styles.evidenceName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity 
          key={index} 
          style={[styles.evidenceItem, styles.fileItem]}
          onPress={() => handleOpenFile(item.uri)}
        >
          <Ionicons name="document-text" size={24} color="#FF6A00" />
          <Text style={styles.evidenceName} numberOfLines={1}>
            {item.name}
          </Text>
          <Ionicons name="open-outline" size={16} color="#666" />
        </TouchableOpacity>
      );
    }
  };

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
            </View>

            {/* Evidence Section */}
            <View style={styles.evidenceSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="images" size={20} color="#333" />
                <Text style={styles.sectionLabel}>Supporting Evidence</Text>
                <Text style={styles.evidenceCount}>
                  ({evidence.length} {evidence.length === 1 ? 'item' : 'items'})
                </Text>
              </View>
              
              {evidence.length > 0 ? (
                <View style={styles.evidenceGrid}>
                  {evidence.map(renderEvidenceItem)}
                </View>
              ) : (
                <View style={styles.noEvidence}>
                  <Ionicons name="folder-open" size={32} color="#CCC" />
                  <Text style={styles.noEvidenceText}>No evidence provided</Text>
                </View>
              )}
            </View>

            {/* Important Note */}
            <View style={styles.noteBox}>
              <Ionicons name="information-circle" size={16} color="#6C757D" />
              <Text style={styles.noteText}>
                During review, funds are temporarily held. Please verify the claim based on your records and the evidence provided.
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

const h = Dimensions.get('window').height;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  container: {
    width: '100%',
    // maxWidth: 400,
    height: h * 0.9,
    backgroundColor: '#FFF',
    // borderRadius: 12,
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
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'justify',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  detailSection: {
    padding: 20,
    paddingBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    marginVertical: 12,
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
  evidenceSection: {
    padding: 20,
  },
  evidenceCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 'auto',
  },
  evidenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  evidenceItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  evidenceImage: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  evidenceName: {
    fontSize: 12,
    color: '#555',
    flex: 1,
    marginHorizontal: 8,
  },
  noEvidence: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    borderStyle: 'dashed',
  },
  noEvidenceText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
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