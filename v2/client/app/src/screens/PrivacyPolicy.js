import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Pressable,
} from "react-native";

const UPDATED = "January 29, 2020";
const CONTACT = "dorm-deals@dormdeals.com";
const ACCENT = "#FFA500";

const INTRO = {
  title: "Your Privacy Matters",
  body: "We are committed to protecting your personal information and being transparent about what we collect.",
};

const SECTIONS = [
  {
    id: "collect",
    heading: "1. Information We Collect",
    lead: "We collect information you provide when you create an account, list products and properties, or use our services, including:",
    bullets: [
      "Contact information (name, email, phone)",
      "Property/Product details",
      "Payment information",
      "Device and usage data",
    ],
  },
  {
    id: "use",
    heading: "2. How We Use Your Information",
    lead: "Your information is used to:",
    bullets: [
      "Provide and improve our services",
      "Facilitate Dorm Deals transactions",
      "Communicate with you",
      "Prevent fraud and ensure security",
      "Comply with legal obligations",
    ],
  },
  {
    id: "sharing",
    heading: "3. Information Sharing",
    lead: "We may share your information with:",
    bullets: [
      "Other users as necessary for transactions",
      "Service providers who assist our operations",
      "Legal authorities when required by law",
    ],
    footer: "We do not sell your personal information to third parties.",
  },
  {
    id: "security",
    heading: "4. Data Security",
    body: "We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data.",
  },
  {
    id: "rights",
    heading: "5. Your Rights",
    lead: "You have the right to:",
    bullets: [
      "Access and update your information",
      "Request deletion of your data",
      "Opt-out of marketing communications",
      "Withdraw consent where applicable",
    ],
  },
];

function IntroBlock() {
  return (
    <View style={s.intro}>
      <Text style={s.introTitle}>{INTRO.title}</Text>
      <Text style={s.introBody}>{INTRO.body}</Text>
    </View>
  );
}

function SectionBlock({ heading, body, lead, bullets, footer }) {
  return (
    <View style={s.block}>
      <Text style={s.heading}>{heading}</Text>
      {body != null && <Text style={s.body}>{body}</Text>}
      {lead != null && (
        <>
          <Text style={s.body}>{lead}</Text>
          <View style={s.bulletWrap}>
            {bullets?.map((line, i) => (
              <Text key={i} style={s.bullet}>
                {"\n\n"}• {line}
              </Text>
            ))}
          </View>
          {footer != null && (
            <Text style={[s.body, s.footer]}>{"\n\n"}{footer}</Text>
          )}
        </>
      )}
    </View>
  );
}

function ContactBlock() {
  const openMail = () => Linking.openURL(CONTACT);
  return (
    <View style={s.contactBox}>
      <Text style={s.contactLabel}>
        Contact our Privacy Officer at{" "}
      </Text>
      <Pressable onPress={openMail} hitSlop={8}>
        <Text style={s.link}>{CONTACT}</Text>
      </Pressable>
    </View>
  );
}

export default function PrivacyPolicy() {
  return (
    <View style={s.root}>
      <ScrollView
        contentContainerStyle={s.scrollInner}
        showsVerticalScrollIndicator={false}
      >
        <IntroBlock />
        <Text style={s.meta}>Last updated: {UPDATED}</Text>
        {SECTIONS.map((sec) => (
          <SectionBlock
            key={sec.id}
            heading={sec.heading}
            body={sec.body}
            lead={sec.lead}
            bullets={sec.bullets}
            footer={sec.footer}
          />
        ))}
        <ContactBlock />
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
  intro: {
    alignItems: "center",
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: ACCENT,
    marginVertical: 12,
  },
  introBody: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  meta: {
    fontSize: 12,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  block: {
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
  footer: {
    marginTop: 4,
  },
  contactBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
    backgroundColor: "#FFF5F0",
    borderRadius: 8,
  },
  contactLabel: {
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: ACCENT,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
