import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

const ACCENT = "#FFA500";

function CreateIconSvg() {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 15V3M12 3L8 7M12 3L16 7"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 13H4V21H20V13H16"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CtaCard({ title, description, icon, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [s.card, { backgroundColor: color }, pressed && s.cardPressed]}
      onPress={onPress}
    >
      <View style={s.iconWrap}>{icon}</View>
      <Text style={s.cardTitle}>{title}</Text>
      <Text style={s.cardDesc}>{description}</Text>
    </Pressable>
  );
}

export default function CreateBtn({ navigation, toggleModal, is_promo_active }) {
  const title = `Upload Offerings${is_promo_active ? " and Earn Now" : ""}`;
  const description =
    "Publish your accommodations, products, or services available for sale or rent.";

  return (
    <View style={s.wrap}>
      <CtaCard
        title={title}
        description={description}
        icon={<CreateIconSvg />}
        color={ACCENT}
        onPress={() => toggleModal?.()}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    padding: 0,
    gap: 16,
  },
  card: {
    height: 160,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  cardPressed: {
    opacity: 0.9,
  },
  iconWrap: {
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 20,
  },
});
