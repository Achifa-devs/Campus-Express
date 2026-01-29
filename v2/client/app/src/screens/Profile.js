import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ACCENT = "#FFA500";
const SUPPORT_PHONE = "2348032639894";

function formatGender(value) {
  const n = parseInt(value, 10);
  if (n === 1) return "Male";
  if (n === 2) return "Female";
  return value ? String(value) : "Not specified";
}

function formatDate(value) {
  if (!value) return "Not specified";
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return String(value);
  }
}

function openWhatsApp(user) {
  const name = [user?.fname, user?.lname].filter(Boolean).join(" ") || "User";
  const body = `Hi dear!\n\nI ${name} am contacting from Campus Sphere for assistance.\n\nPlease respond immediately.\n\nThanks!\n\nEmail - ${user?.email ?? ""}\nPhone - ${user?.phone ?? ""}`;
  const encoded = encodeURIComponent(body);
  const deep = `whatsapp://send?phone=${SUPPORT_PHONE}&text=${encoded}`;
  const fallback = `https://wa.me/${SUPPORT_PHONE}?text=${encoded}`;

  Linking.canOpenURL(deep)
    .then((supported) => {
      if (supported) Linking.openURL(deep);
      else Linking.openURL(fallback);
    })
    .catch(() => Alert.alert("Error", "Unable to open WhatsApp."));
}

function FieldRow({ label, value }) {
  return (
    <View style={s.row}>
      <Text style={s.rowLabel}>{label}</Text>
      <Text style={s.rowValue}>{value ?? "Not specified"}</Text>
    </View>
  );
}

function ProfileHeader({ user }) {
  const navigation = useNavigation();
  const displayName = [user?.fname ?? user?.firstName, user?.lname ?? user?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <View style={s.header}>
      {user?.photo ? (
        <Image
          source={{ uri: user.photo }}
          style={s.avatar}
          onError={() => {}}
        />
      ) : (
        <View style={s.avatarPlaceholder}>
          <Ionicons name="person-circle" color={ACCENT} size={60} />
        </View>
      )}
      <Text style={s.name}>{displayName}</Text>
      <Text style={s.email}>{user?.email}</Text>
      <Pressable
        style={({ pressed }) => [s.editBtn, pressed && s.editBtnPressed]}
        onPress={() => navigation.navigate("edit-profile")}
      >
        <Text style={s.editBtnText}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

function SectionBlock({ title, children }) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.card}>{children}</View>
    </View>
  );
}

function PersonalInfoSection({ user }) {
  const location = [user?.campus, user?.state].filter(Boolean).join(" ") || null;

  return (
    <SectionBlock title="Personal Information">
      <FieldRow label="First Name" value={user?.fname} />
      <View style={s.sep} />
      <FieldRow label="Last Name" value={user?.lname} />
      <View style={s.sep} />
      <FieldRow label="Email" value={user?.email} />
      <View style={s.sep} />
      <FieldRow label="Phone" value={user?.phone} />
      <View style={s.sep} />
      <FieldRow label="Location" value={location} />
      <View style={s.sep} />
      <FieldRow label="Gender" value={formatGender(user?.gender)} />
    </SectionBlock>
  );
}

function AccountInfoSection({ user }) {
  return (
    <SectionBlock title="Account Information">
      <FieldRow label="Member Since" value={formatDate(user?.date)} />
      <View style={s.sep} />
      <FieldRow label="User ID" value={user?.user_id != null ? String(user.user_id) : null} />
    </SectionBlock>
  );
}

function ActionBar({ user }) {
  const navigation = useNavigation();

  return (
    <View style={s.actions}>
      <Pressable
        style={({ pressed }) => [s.primaryBtn, pressed && s.btnPressed]}
        onPress={() => navigation.navigate("edit-profile")}
      >
        <Text style={s.primaryBtnText}>Edit Profile</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [s.secondaryBtn, pressed && s.btnPressed]}
        onPress={() => openWhatsApp(user)}
      >
        <Text style={s.secondaryBtnText}>Contact Support</Text>
      </Pressable>
    </View>
  );
}

export default function Profile() {
  const user = useSelector((s) => s.user?.user ?? null);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={s.loadingWrap}>
        <ActivityIndicator size="large" color={ACCENT} />
        <Text style={s.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={s.loadingWrap}>
        <Ionicons name="person-circle-outline" size={64} color="#999" />
        <Text style={s.loadingText}>No profile data</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={s.root}
      contentContainerStyle={s.scrollInner}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader user={user} />
      <View style={s.body}>
        <PersonalInfoSection user={user} />
        <AccountInfoSection user={user} />
        <ActionBar user={user} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollInner: {
    paddingBottom: 24,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: ACCENT,
  },
  avatarPlaceholder: {
    height: 60,
    width: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  editBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editBtnPressed: {
    opacity: 0.9,
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  body: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  rowValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
    paddingLeft: 16,
  },
  sep: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: -16,
  },
  actions: {
    marginTop: 8,
  },
  primaryBtn: {
    backgroundColor: ACCENT,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: ACCENT,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryBtnText: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: "600",
  },
  btnPressed: {
    opacity: 0.9,
  },
});
