import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Switch } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

export default function NotificationSettings() {
  const { user } = useSelector(s => s.user);

  const [notificationSettings, setNotificationSettings] = useState({
    transfers_balances: { email: false, sms: false },
    currencies_features: { email: false, sms: false },
    interviews_surveys: { email: false, sms: false },
    campaigns: { email: false, sms: false },
    allNotifications: false
  });

  useEffect(() => {
    if (user?.notification) {
      const settings = { ...notificationSettings };
      for (const key in user.notification) {
        if (user.notification[key]?.[0]) {
          settings[key] = {
            email: user.notification[key][0].email,
            sms: user.notification[key][0].sms
          };
        }
      }
      const allEnabled = Object.values(settings)
        .filter(setting => typeof setting === 'object')
        .every(({ email, sms }) => email && sms);

      setNotificationSettings({
        ...settings,
        allNotifications: allEnabled
      });
    }
  }, [user]);

  const updateNotification = async (category, channel, value) => {
    try {
      await axios.post('http://192.168.67.146:9090/system.notice-update', {
        id: user?.id,
        data: {
          target: channel,
          src: category,
          value: value
        }
      });

      setNotificationSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [channel]: value
        }
      }));
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

  const toggleAllNotifications = (value) => {
    const updates = {};
    Object.keys(notificationSettings).forEach(key => {
      if (key !== 'allNotifications') {
        updates[key] = { email: value, sms: value };
        updateNotification(key, 'email', value);
        updateNotification(key, 'sms', value);
      }
    });

    setNotificationSettings({
      ...updates,
      allNotifications: value
    });
  };

  const NotificationSection = ({ 
    title, 
    description, 
    emailValue, 
    smsValue, 
    onEmailChange, 
    onSmsChange 
  }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>

      <NotificationToggle
        icon={<Feather name="mail" size={20} color="#FF4500" />}
        label="Email"
        value={emailValue}
        onValueChange={onEmailChange}
      />

      <NotificationToggle
        icon={<Feather name="phone" size={20} color="#FF4500" />}
        label="Push Notifications"
        value={smsValue}
        onValueChange={onSmsChange}
      />
    </View>
  );

  const NotificationToggle = ({ icon, label, value, onValueChange }) => (
    <TouchableOpacity style={styles.toggleContainer} activeOpacity={0.7}>
      <View style={styles.toggleIcon}>{icon}</View>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        trackColor={{ false: "#E0E0E0", true: "#FF4500" }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E0E0E0"
        onValueChange={onValueChange}
        value={value}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.globalToggleContainer}>
          <View style={styles.globalToggleIcon}>
            <Feather name="bell" size={24} color="#FF4500" />
          </View>
          <Text style={styles.globalToggleLabel}>Allow Notifications</Text>
          <Switch
            trackColor={{ false: "#E0E0E0", true: "#FF4500" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E0E0E0"
            onValueChange={toggleAllNotifications}
            value={notificationSettings.allNotifications}
          />
        </View>

        <NotificationSection
          title="Your Transfers and Balances"
          description="Notification about where your money is"
          emailValue={notificationSettings.transfers_balances.email}
          smsValue={notificationSettings.transfers_balances.sms}
          onEmailChange={(value) => updateNotification('transfers_balances', 'email', value)}
          onSmsChange={(value) => updateNotification('transfers_balances', 'sms', value)}
        />

        <NotificationSection
          title="Currencies and Features"
          description="News about our latest and greatest work"
          emailValue={notificationSettings.currencies_features.email}
          smsValue={notificationSettings.currencies_features.sms}
          onEmailChange={(value) => updateNotification('currencies_features', 'email', value)}
          onSmsChange={(value) => updateNotification('currencies_features', 'sms', value)}
        />

        <NotificationSection
          title="Interviews, Reviews and Surveys"
          description="Invites to test new products and share your thoughts"
          emailValue={notificationSettings.interviews_surveys.email}
          smsValue={notificationSettings.interviews_surveys.sms}
          onEmailChange={(value) => updateNotification('interviews_surveys', 'email', value)}
          onSmsChange={(value) => updateNotification('interviews_surveys', 'sms', value)}
        />

        <NotificationSection
          title="Our Campaigns"
          description="Updates about causes we care about"
          emailValue={notificationSettings.campaigns.email}
          smsValue={notificationSettings.campaigns.sms}
          onEmailChange={(value) => updateNotification('campaigns', 'email', value)}
          onSmsChange={(value) => updateNotification('campaigns', 'sms', value)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  globalToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  globalToggleIcon: {
    backgroundColor: '#FFF0E6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  globalToggleLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  toggleIcon: {
    backgroundColor: '#FFF0E6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  toggleLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
});
