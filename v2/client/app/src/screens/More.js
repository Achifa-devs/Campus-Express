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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BG = "#efefef";
const CARD = "#fff";

const ROW_RADIUS = 12;

function MenuRow({ icon, label, onPress, isFirst, isLast, total }) {
  const rowStyle = [
    s.row,
    isFirst && (total === 1 ? s.rowSingle : s.rowFirst),
    isLast && total > 1 && s.rowLast,
  ];
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={rowStyle}>
      <View style={s.rowInner}>
        <MaterialIcons name={icon} size={20} color="#333" style={s.rowIcon} />
        <Text style={s.rowLabel}>{label}</Text>
      </View>
      <MaterialIcons name="arrow-forward" size={20} color="#000" />
    </TouchableOpacity>
  );
}

function MenuBlock({ title, entries, navigator }) {
  if (!entries?.length) return null;
  const total = entries.length;
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
            isFirst={i === 0}
            isLast={i === total - 1}
            total={total}
          />
        ))}
      </View>
    </View>
  );
}

function buildMenu(user) {
  const campusSphere = user
    ? [
        { label: "Profile", icon: "person", nav: "profile" },
        { label: "History", icon: "schedule", nav: "history" },
        // { label: "Favourite", icon: "favorite-border", nav: "favourite" },
        { label: "Invite Friends", icon: "people", nav: "invite" },
      ]
    : [
        { label: "History", icon: "schedule", nav: "history" },
        { label: "Invite Friends", icon: "people", nav: "invite" },
      ];

  const communityLegal = [
    { label: "Terms Of Use", icon: "description", nav: "terms_conditions" },
    { label: "Privacy Policy", icon: "lock", nav: "privacy" },
    { label: "Campus Community", icon: "school", nav: "support" },
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
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  block: {
    marginBottom: 8,
    padding: 15
  },
  blockTitleWrap: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  blockList: {
    backgroundColor: CARD,
    borderRadius: ROW_RADIUS,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 2,
    borderBottomColor: "#efefef",
  },
  rowFirst: {
    borderTopLeftRadius: ROW_RADIUS,
    borderTopRightRadius: ROW_RADIUS,
  },
  rowLast: {
    borderBottomLeftRadius: ROW_RADIUS,
    borderBottomRightRadius: ROW_RADIUS,
    borderBottomWidth: 0,
  },
  rowSingle: {
    borderRadius: ROW_RADIUS,
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
    backgroundColor: "#fff",
  },
  version: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
    fontFamily: "serif",
  },
});
