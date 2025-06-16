import {
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
import { useDispatch } from "react-redux";
import { setUserModeTo } from "../../../../../../redux/reducer/mode";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileCnt = ({ navigation }) => {
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get('window').height;

  const items = [
    {
      section: "Campus Sphere",
      links: [
        { label: "History", icon: "time-outline", nav: "user-history" },
        { label: "Favourite", icon: "heart-outline", nav: "user-favourite" },
        { label: "Personal info", icon: "person-outline", nav: "user-data" },
        { label: "Invite Friends", icon: "people-outline", nav: "user-invite" },

      ],
    },
    {
      section: "Settings",
      links: [
        { label: "Account", icon: "wallet-outline", nav: "user-account" },
        // { label: "Subscription & Billing", icon: "card-outline", nav: "use-sub" },

        // { label: "Preference", icon: "options-outline", nav: "user-preference" },
        // { label: "Notification", icon: "notifications-outline", nav: "user-notification" },
      ],
    },
    {
      section: "Community and Legal",
      links: [
        { label: "Terms Of Service", icon: "document-text-outline", nav: "user-terms" },
        { label: "Privacy Policy", icon: "lock-closed-outline", nav: "user-privacy" },
        { label: "Campus Community", icon: "school-outline", nav: "user-support" },
        // { label: "Blogs", icon: "book-outline", nav: "user-blog" },
        // { label: "Forum", icon: "chatbubbles-outline", nav: "user-forum" },
      ],
    },
  ];

  return (
    <ScrollView style={{ height: screenHeight - 50, backgroundColor: '#f9f9f9' }}>
      {items.map((section, index) => (
        <View key={index}>
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
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>V 1.0.0</Text>
      </View>
      <View style={styles.footer} />
    </ScrollView>
  );
};

export default ProfileCnt;

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
