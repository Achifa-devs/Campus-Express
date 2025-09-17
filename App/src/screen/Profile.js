import {
  useCallback,
  useEffect,
  useState
} from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useRoute } from "@react-navigation/native";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get('window').height;
    const {user} = useSelector(s => s.user)

    

  const items = [
    {
      section: "Campus Sphere",

      links: user ? [
        { label: "History", icon: "time-outline", nav: "history" },
        { label: "Favourite", icon: "heart-outline", nav: "favourite" },
        { label: "Personal info", icon: "person-outline", nav: "user" },
        { label: "Invite Friends", icon: "people-outline", nav: "invite" },

      ]: [
        { label: "History", icon: "time-outline", nav: "history" },
        { label: "Invite Friends", icon: "people-outline", nav: "invite" },

      ],
    },
    {
      section: "Settings",
      links: user ? [
        { label: "Account", icon: "wallet-outline", nav: "account" },
        { label: "Subscription & Billing", icon: "card-outline", nav: "subscription" },

        // { label: "Preference", icon: "options-outline", nav: "user-preference" },
        // { label: "Notification", icon: "notifications-outline", nav: "user-notification" },
      ]: [

      ],
    },
    {
      section: "Community and Legal",
      links: [
        { label: "Terms Of Service", icon: "document-text-outline", nav: "terms" },
        { label: "Privacy Policy", icon: "lock-closed-outline", nav: "privacy" },
        { label: "Campus Community", icon: "school-outline", nav: "support" },
        // { label: "Blogs", icon: "book-outline", nav: "user-blog" },
        // { label: "Forum", icon: "chatbubbles-outline", nav: "user-forum" },
      ],
    },
  ];

  

  return (
    <ScrollView style={{ height: screenHeight - 50, backgroundColor: '#f9f9f9' }}>
      {items.map((section, index) => (
        <View key={index}>
          {
          section.section === 'Settings' && !user ? '' :
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.section}</Text>
            </View>
            <View>
              {section.links.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.itemRow}
                  onPress={() => item.nav && navigation.navigate(item.nav)}
                >
                  <View style={styles.iconTextContainer}>
                    <Ionicons name={item.icon} size={20} color="#333" style={styles.leftIcon} />
                    <Text style={styles.itemText}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                </TouchableOpacity>
              ))}
            </View>
          </>
          }
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V 1.0.0</Text>
      </View>
      <View style={styles.footer} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginBottom: 3,
    backgroundColor: '#fff',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'serif',
  },
  sectionHeader: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#f9f9f9',
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  footerText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'serif',
  }
});
