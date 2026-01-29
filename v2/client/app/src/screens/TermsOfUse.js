import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Pressable,
} from "react-native";

const UPDATED = "June 15, 2023";
const CONTACT = "dorm-deals@dormdeals.com";
const ACCENT = "#FFA500";

const SECTIONS = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    body: "By accessing or using the Dorm Deals app, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.",
  },
  {
    id: "account",
    heading: "2. Account Registration",
    body: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
  },
  {
    id: "prohibited",
    heading: "3. Prohibited Conduct",
    bullets: [
      "Post false, misleading, or fraudulent listings",
      "Violate any laws or regulations",
      "Harass other users",
      "Use the service for any illegal purpose",
      "Circumvent any security measures",
    ],
  },
  {
    id: "ip",
    heading: "4. Intellectual Property",
    body: "All content, features, and functionality on Dorm Deals are owned by us and are protected by international copyright, trademark, and other intellectual property laws.",
  },
  {
    id: "liability",
    heading: "5. Limitation of Liability",
    body: "Dorm Deals shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use the service.",
  },
  {
    id: "governing",
    heading: "6. Governing Law",
    body: "These Terms shall be governed by the laws of the Republic of Nigeria without regard to its conflict of law provisions.",
  },
];

function SectionBlock({ heading, body, bullets }) {
  return (
    <View style={s.section}>
      <Text style={s.heading}>{heading}</Text>
      {body != null && <Text style={s.body}>{body}</Text>}
      {bullets != null && (
        <View style={s.bulletWrap}>
          <Text style={s.body}>You agree not to:</Text>
          {bullets.map((line, i) => (
            <Text key={i} style={s.bullet}>
              {"\n\n"}• {line}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function ContactLine() {
  const openMail = () => Linking.openURL(CONTACT);
  return (
    <View style={s.contactWrap}>
      <Text style={s.contactLabel}>
        For any questions about these Terms, please contact us at{" "}
      </Text>
      <Pressable onPress={openMail} hitSlop={8}>
        <Text style={s.link}>{CONTACT}</Text>
      </Pressable>
    </View>
  );
}

export default function TermsOfUse() {
  return (
    <View style={s.root}>
      <ScrollView
        contentContainerStyle={s.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.meta}>Last updated: {UPDATED}</Text>
        {SECTIONS.map((sec) => (
          <SectionBlock
            key={sec.id}
            heading={sec.heading}
            body={sec.body}
            bullets={sec.bullets}
          />
        ))}
        <ContactLine />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollInner: {
    padding: 20,
    paddingBottom: 40,
  },
  meta: {
    fontSize: 12,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: ACCENT,
    marginTop: 16,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
  bulletWrap: {
    marginTop: 4,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
  contactWrap: {
    marginTop: 24,
    alignItems: "center",
  },
  contactLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: ACCENT,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
