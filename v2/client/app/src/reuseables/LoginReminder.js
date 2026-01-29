import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";

import { set_mode } from "../../redux/mode";

const W = Dimensions.get("window").width;
const CARD_WIDTH = W - 32;
const ACCENT = "#FFA500";

export default function LoginReminder({ text = "Sign in to continue", style }) {
  const dispatch = useDispatch();

  const openAuth = () => dispatch(set_mode("auth"));

  return (
    <View style={[s.root, style]}>
      <Pressable
        style={({ pressed }) => [s.card, pressed && s.cardPressed]}
        onPress={openAuth}
      >
        <View style={s.inner}>
          <MaterialIcons name="login" size={50} color={ACCENT} style={s.icon} />
          <View style={s.copy}>
            <Text style={s.title}>Sign In Required</Text>
            <Text style={s.desc}>{text}</Text>
          </View>
          <Text style={s.cta}>Click Me</Text>
        </View>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: CARD_WIDTH,
    alignSelf: "center",
    // backgroundColor: "#fff",
    borderRadius: 4,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  cardPressed: {
    opacity: 0.9,
  },
  inner: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 12,
  },
  copy: {
    textAlign: "center",
    marginTop: 8,
  },
  title: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
    textAlign: "center",
  },
  desc: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: "400",
  },
  cta: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
});
