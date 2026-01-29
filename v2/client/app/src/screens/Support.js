import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Logo from "../assets/logo.png";


const CHANNELS = [
  { id: "facebook", label: "Facebook", icon: "logo-facebook", color: "#1877F2", url: "" },
  { id: "instagram", label: "Instagram", icon: "logo-instagram", color: "#C13584", url: "" },
  { id: "twitter", label: "Twitter", icon: "logo-twitter", color: "#1DA1F2", url: "" },
  { id: "whatsapp", label: "Whatsapp", icon: "logo-whatsapp", color: "#25D366", url: "" },
];

function openLink(url) {
  Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
}

function HeroBlock() {
  return (
    <View style={s.hero}>
      <Image source={Logo} style={s.heroImage} resizeMode="contain" />
      <Text style={s.heroTitle}>How can we help you ?</Text>
      <Text style={s.heroBody}>
        At Dorm Deals, we're committed to providing the best possible experience.
        If you have any questions, concerns or issues, we're here to assist you!.
      </Text>
    </View>
  );
}

function SocialTile({ label, icon, color, url }) {
  return (
    <Pressable
      style={({ pressed }) => [s.tile, pressed && s.tilePressed]}
      onPress={() => openLink(url)}
    >
      <Icon name={icon} size={40} color={color} />
      <Text style={s.tileLabel}>{label}</Text>
    </Pressable>
  );
}

export default function Support() {
  return (
    <ScrollView
      style={s.root}
      contentContainerStyle={s.scrollInner}
      showsVerticalScrollIndicator={false}
    >
      <HeroBlock />
      <View style={s.grid}>
        {CHANNELS.map((ch) => (
          <SocialTile
            key={ch.id}
            label={ch.label}
            icon={ch.icon}
            color={ch.color}
            url={ch.url}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollInner: {
    padding: 10,
    paddingBottom: 24,
  },
  hero: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    height: 160,
    width: "60%",
  },
  heroTitle: {
    textAlign: "center",
    width: "100%",
    color: "#000",
    fontWeight: "600",
    marginTop: 12,
  },
  heroBody: {
    textAlign: "center",
    width: "100%",
    color: "#000",
    fontWeight: "300",
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tile: {
    width: "48%",
    height: 180,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderColor: "#FFA500",
    borderWidth: 1
  },
  tilePressed: {
    opacity: 0.8,
  },
  tileLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
