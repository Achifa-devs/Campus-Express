import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import More from "../screens/More";
import History from "../screens/History";
import TermsOfUse from "../screens/TermsOfUse";
import Invite from "../screens/Invite";
import PrivacyPolicy from "../screens/PrivacyPolicy"
import Support from "../screens/Support"
import Profile from "../screens/Profile"
import EditProfile from "../screens/EditProfile"
import { set_mode } from "../../redux/mode";

const MoreStack = createNativeStackNavigator();

// Placeholder screens until dedicated screens exist (screens/More.js and screens/Profile.js are empty)

function ProfileScreen() {
  return <View style={styles.placeholder}><Text>Profile</Text></View>;
}
function EditProfileScreen() {
  return <View style={styles.placeholder}><Text>Edit Profile</Text></View>;
}
function InviteScreen() {
  return <View style={styles.placeholder}><Text>Invite</Text></View>;
}
function HistoryScreen() {
  return <View style={styles.placeholder}><Text>History</Text></View>;
}


function MoreHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user ?? null);

  return (
    <View style={styles.moreHeader}>
      <View style={styles.moreHeaderLeft}>
        {user?.photo ? (
          <Image
            source={{ uri: user?.photo }}
            style={styles.avatar}
            onError={() => console.log("Error loading image")}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-circle" size={80} color="#FFA500" />
          </View>
        )}
        <View>
          <Text style={styles.userName}>
            {user?.fname}
            {user && "."}
            {user?.lname?.[0]}
          </Text>
        </View>
      </View>

      {!user && (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => dispatch(set_mode("auth"))}
        >
          <Text style={styles.loginText}>Login</Text>
          <Ionicons name="enter-outline" size={18} color="#FFA500" />
        </TouchableOpacity>
      )}
    </View>
  );
}

function ProfileHeader({ navigation }) {
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>My Campus Identity</Text>
      </View>
    </View>
  );
}

function EditProfileHeader({ navigation }) {
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>Edit Your Campus Identity</Text>
      </View>
    </View>
  );
}

function InviteHeader({ navigation }) {
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>Invite your friends</Text>
      </View>
    </View>
  );
}

function HistoryHeader({ navigation }) {
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>History</Text>
      </View>
    </View>
  );
}

function PrivacyHeader({ navigation }) {
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>Privacy policy</Text>
      </View>
    </View>
  );
}

function SupportHeader({ navigation }) {
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>Dorm Deals Forum</Text>
      </View>
    </View>
  );
}

function TermsConditionsHeader({ navigation }) {
  return (
    <View style={styles.backHeader}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.headerTitleBox}>
        <Text style={styles.headerTitle}>Terms of service</Text>
      </View>
    </View>
  );
}

export default function MoreStackScreen() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        options={{ header: MoreHeader }}
        name="more"
        component={More}
      />
      <MoreStack.Screen
        options={{ header: ProfileHeader }}
        name="profile"
        component={Profile}
      />
      <MoreStack.Screen
        options={{ header: EditProfileHeader }}
        name="edit-profile"
        component={EditProfile}
      />
      <MoreStack.Screen
        options={{ header: InviteHeader }}
        name="invite"
        component={Invite}
      />
      <MoreStack.Screen
        options={{ header: HistoryHeader }}
        name="history"
        component={History}
      />
      <MoreStack.Screen
        options={{ header: TermsConditionsHeader }}
        name="terms_conditions"
        component={TermsOfUse}
      />
      <MoreStack.Screen
        options={{ header: PrivacyHeader }}
        name="privacy"
        component={PrivacyPolicy}
      />
      <MoreStack.Screen
        options={{ header: SupportHeader }}
        name="support"
        component={Support}
      />
    </MoreStack.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  moreHeader: {
    width: "100%",
    height: 150,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moreHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#FFA500",
  },
  avatarPlaceholder: {
    height: 80,
    width: 80,
  },
  userName: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginRight: 15,
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  loginText: {
    color: "#FFA500",
    paddingRight: 8,
  },
  backHeader: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#FFF",
    alignItems: "center",
    elevation: 2,
    paddingLeft: 15,
    paddingRight: 25,
  },
  backButton: {
    height: 55,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 45,
  },
  headerTitleBox: {
    backgroundColor: "#fff",
    height: "100%",
    width: "auto",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerTitle: {
    color: "#000",
    display: "flex",
    fontSize: 20,
    fontWeight: "500",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
