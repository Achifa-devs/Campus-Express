import { FlatList, Text, TouchableOpacity, View, PermissionsAndroid, Image, Share, Linking } from "react-native";
import Contacts from 'react-native-contacts';
import { useCallback, useEffect, useState } from "react";

const Invite = () => {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'OK',
    }).then((res) => {
      if (res === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll()
          .then(setContactList)
          .catch(console.log);
      } else {
        console.warn('Contacts permission denied');
      }
    }).catch(console.error);
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  const handleInvite = (phoneNumber, url) => {
    const message = `Download the Campus Sphere app now ${url}.`;

    let smsURL = "";

    if (Platform.OS === "ios") {
      smsURL = `sms:${phoneNumber}&body=${encodeURIComponent(message)}`;
    } else {
      smsURL = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    }

    Linking.openURL(smsURL).catch(err =>
      console.error("Failed to open SMS app:", err)
    );
  };

  const renderItem = useCallback(({ item }) => {
    const fullName = item.displayName || `${item.givenName || ''} ${item.familyName || ''}`.trim();
    const phoneNumber = item.phoneNumbers[0]?.number || 'No number';

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#d4d4d4',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 15
        }}>
          <Text style={{ fontWeight: 'bold', color: '#000' }}>{getInitials(fullName)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#111' }}>{fullName}</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>{phoneNumber}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF4500',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 5,
          }}
          onPress={() => {
            // Add your invite logic here
            console.log(`Invited ${fullName}`);
            handleInvite(phoneNumber, '');
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Invite</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <FlatList
      data={contactList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index}`}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
};

export default Invite;
