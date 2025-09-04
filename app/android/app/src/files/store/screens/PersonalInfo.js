// UserProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import UserIcons from '../../media/icons/UserIcons';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
    const {user} = useSelector(s => s.user);
    const navigation = useNavigation()
  
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data - in real app, this would come from an API
  
  const InfoRow = ({ label, value, icon }) => ( 
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || 'Not specified'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      
    >
      <View style={styles.header}>
        
        {
            user?.photo
            ?
            <Image
                source={{ uri: user.photo }}
                style={styles.profileImage}
                onError={() => console.log('Error loading image')}
            />
            :
            <View style={{height: 60, width: 60}}>
                <UserIcons color='#FF4500' size={60} />
            </View>  
        }  
        <Text style={styles.userName}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        
        <TouchableOpacity style={styles.editButton} onPress={e => {
            navigation.navigate('user-edit-profile')
        }}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <InfoRow label="First Name" value={user.fname} />
            <View style={styles.separator} />
            
            <InfoRow label="Last Name" value={user.lname} />
            <View style={styles.separator} />
            
            <InfoRow label="Email" value={user.email} />
            <View style={styles.separator} />
            
            <InfoRow label="Phone" value={user.phone} />
            <View style={styles.separator} />
            
            <InfoRow label="Location" value={`${user.campus} ${user.state}`} />
            <View style={styles.separator} />
            
            <InfoRow label="Gender" value={user.gender} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoCard}>
            <InfoRow label="Member Since" value={new Date(user.date).toLocaleDateString()} />
            <View style={styles.separator} />
            
            <InfoRow label="User ID" value={`${user.user_id.toString()}`} />
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={e => {
                navigation.navigate('user-edit-profile')
            }}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]} onPress={e => {
                const whatsappURL = `whatsapp://send?phone=${8032639894}&text=${encodeURIComponent(
                `Hi dear!\n\nI ${user?.fname} ${user?.lname} am contacting from Campus Sphere for assistance.\n\nPlease respond immediately.\n\nThanks!\n\nEmail - ${user?.email}\nPhone - ${user?.phone}`
                )}`;

                const fallbackURL = `https://wa.me/${+2348032639894}?text=${encodeURIComponent(
                `Hi dear!\n\nI ${user?.fname} ${user?.lname} is contacting from Campus Sphere for assistance.\n\nPlease respond immediately.\n\nThanks!\n\nEmail - ${user?.email}\nPhone - 0${user?.phone}`
                )}`;

                Linking.canOpenURL(whatsappURL)
                .then((supported) => {
                    if (supported) {
                    Linking.openURL(whatsappURL);
                    } else {
                    Linking.openURL(fallbackURL);
                    }
                })
                .catch((err) => {
                    Alert.alert('Error', 'Unable to open WhatsApp.');
                });
            }}>

            <Text style={[styles.actionButtonText, styles.secondaryActionText]}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FF4500',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    paddingLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: -16,
  },
  actionsSection: {
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#FF4500',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryAction: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF4500',
  },
  secondaryActionText: {
    color: '#FF4500',
  },
});

export default UserProfileScreen;