import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

const BG = "#f9f9f9";
const CARD = "#fff";

function MenuRow({ icon, label, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={s.row}>
      <View style={s.rowInner}>
        <Ionicons name={icon} size={20} color="#333" style={s.rowIcon} />
        <Text style={s.rowLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#000" />
    </TouchableOpacity>
  );
}

function MenuBlock({ title, entries, navigator }) {
  if (!entries?.length) return null;
  return (
    <View style={s.block}>
      <View style={s.blockTitleWrap}>
        <Text style={s.blockTitle}>{title}</Text>
      </View>
      <View style={s.blockList}>
        {entries.map((entry, i) => (
          <MenuRow
            key={`${entry.nav}-${i}`}
            icon={entry.icon}
            label={entry.label}
            onPress={() => entry.nav && navigator?.navigate(entry.nav)}
          />
        ))}
      </View>
    </View>
  );
}

function buildMenu(user) {
  const campusSphere = user
    ? [
        { label: "Profile", icon: "person-outline", nav: "profile" },
        { label: "History", icon: "time-outline", nav: "history" },
        // { label: "Favourite", icon: "heart-outline", nav: "favourite" },
        { label: "Invite Friends", icon: "people-outline", nav: "invite" },
      ]
    : [
        { label: "History", icon: "time-outline", nav: "history" },
        { label: "Invite Friends", icon: "people-outline", nav: "invite" },
      ];

  const communityLegal = [
    { label: "Terms Of Use", icon: "document-text-outline", nav: "terms_conditions" },
    { label: "Privacy Policy", icon: "lock-closed-outline", nav: "privacy" },
    { label: "Campus Community", icon: "school-outline", nav: "support" },
  ];

  return [
    { title: "Dorm Deals", entries: campusSphere },
    { title: "Community and Legal", entries: communityLegal },
  ];
}

export default function More({ navigation }) {
  const { height: windowHeight } = useWindowDimensions();
  const user = useSelector((s) => s.user?.user);
  const menu = useMemo(() => buildMenu(user), [user]);

  const scrollContentHeight = windowHeight - 50;

  return (
    <ScrollView
      contentContainerStyle={[s.scrollContent, { minHeight: scrollContentHeight }]}
      style={s.scroll}
      showsVerticalScrollIndicator={false}
    >
      {menu.map((group, idx) => (
        <MenuBlock
          key={group.title}
          title={group.title}
          entries={group.entries}
          navigator={navigation}
        />
      ))}

      <View style={s.bottomSpacer}>
        <Text style={s.version}>V 1.0.0</Text>
      </View>
      <View style={s.bottomSpacer} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: {
    backgroundColor: BG,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  block: {
    marginBottom: 8,
  },
  blockTitleWrap: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: BG,
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  blockList: {
    backgroundColor: CARD,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 3,
    backgroundColor: CARD,
  },
  rowInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    marginRight: 10,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "serif",
  },
  bottomSpacer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG,
  },
  version: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "serif",
  },
});
