import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  PermissionsAndroid,
  Share,
  Linking,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import Contacts from "react-native-contacts";

const INVITE_MESSAGE = "Download the Dorm Deals app now";
const ACCENT = "#FFA500";

function initials(name) {
  if (!name?.trim()) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function openSms(phoneNumber, body) {
  const encoded = encodeURIComponent(body);
  const url =
    Platform.OS === "ios"
      ? `sms:${phoneNumber}&body=${encoded}`
      : `sms:${phoneNumber}?body=${encoded}`;
  Linking.openURL(url).catch((err) =>
    console.error("Failed to open SMS app:", err)
  );
}

function requestContactsAccess() {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: "Contacts",
      message: "This app would like to view your contacts.",
      buttonPositive: "OK",
    }
  );
}

function ContactCard({ displayName, phoneNumber, onInvite }) {
  const name = displayName?.trim() || "No name";
  const number = phoneNumber || "No number";

  return (
    <View style={s.card}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>{initials(name)}</Text>
      </View>
      <View style={s.info}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.number}>{number}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [s.inviteBtn, pressed && s.inviteBtnPressed]}
        onPress={() => onInvite(number)}
      >
        <Text style={s.inviteBtnText}>Invite</Text>
      </Pressable>
    </View>
  );
}

export default function Invite() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    requestContactsAccess()
      .then((res) => {
        if (res === PermissionsAndroid.RESULTS.GRANTED) {
          return Contacts.getAll();
        }
        console.warn("Contacts permission denied");
        return [];
      })
      .then(setContacts)
      .catch((err) => {
        console.error("Contacts error:", err);
      });
  }, []);

  const handleInvite = useCallback((phoneNumber) => {
    openSms(phoneNumber, `${INVITE_MESSAGE}.`);
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      const displayName =
        item.displayName ||
        `${item.givenName || ""} ${item.familyName || ""}`.trim();
      const phoneNumber = item.phoneNumbers?.[0]?.number ?? "";

      return (
        <ContactCard
          displayName={displayName}
          phoneNumber={phoneNumber}
          onInvite={handleInvite}
        />
      );
    },
    [handleInvite]
  );

  const keyExtractor = useCallback((item, index) => `${item.recordID ?? index}`, []);

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={s.list}
    />
  );
}

const s = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d4d4d4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    fontWeight: "bold",
    color: "#000",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  number: {
    fontSize: 14,
    color: "#666",
  },
  inviteBtn: {
    backgroundColor: ACCENT,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  inviteBtnPressed: {
    opacity: 0.8,
  },
  inviteBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
