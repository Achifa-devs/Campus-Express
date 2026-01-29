import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const TARGET = 10;
const REWARD = "₦1,000";
const BADGE_URGENT = "24H LEFT";

const RULES = [
  { id: "1", text: "Upload 10 offers (Physical products or Accommodation/Lodge) to cash out ₦1,000", important: true },
  { id: "2", text: "Complete within 24 hours of starting", important: true },
  { id: "3", text: "All offers must comply with Campus Sphere policies", important: false },
  { id: "4", text: "No duplicate or low-quality listings", important: false },
  { id: "5", text: "One account per user - multiple accounts will be banned", important: true },
  { id: "6", text: "Your cash will be credited to your bank after 24hrs of verification!", important: true },
];

function ProgressBlock({ current, total }) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  const left = total - current;

  return (
    <View style={s.progressBlock}>
      <View style={s.progressRow}>
        <Text style={s.progressLabel}>Upload Progress</Text>
        <Text style={s.progressCount}>{current}/{total}</Text>
      </View>
      <View style={s.barBg}>
        <View style={[s.barFill, { width: `${pct}%` }]} />
      </View>
      <View style={s.statsRow}>
        <View style={s.stat}>
          <Text style={s.statNum}>{current}</Text>
          <Text style={s.statLabel}>Uploaded</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statNum}>{left}</Text>
          <Text style={s.statLabel}>Remaining</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statNum}>{REWARD}</Text>
          <Text style={s.statLabel}>Reward</Text>
        </View>
      </View>
    </View>
  );
}

function RuleRow({ item }) {
  return (
    <View style={s.ruleRow}>
      <View style={[s.bullet, item.important && s.bulletImportant]}>
        <Text style={s.bulletChar}>•</Text>
      </View>
      <Text style={[s.ruleText, item.important && s.ruleTextImportant]}>{item.text}</Text>
    </View>
  );
}

export default function Promo({ length = 0 }) {
  const uploaded = parseInt(length, 10) || 0;
  const done = uploaded >= TARGET;
  const remaining = Math.max(0, TARGET - uploaded);

  const onCashOut = () => {
    if (done) return; // handle cash out
  };

  return (
    <View style={s.root}>
      <View style={s.head}>
        <Text style={s.headTitle}>Limited Time Promotion</Text>
        <View style={s.urgentBadge}>
          <Text style={s.urgentBadgeText}>{BADGE_URGENT}</Text>
        </View>
      </View>

      <ProgressBlock current={uploaded} total={TARGET} />

      <View style={s.rewardBox}>
        <Text style={s.rewardTitle}>Earn {REWARD} Cash Reward</Text>
        <Text style={s.rewardDesc}>
          Upload {TARGET} valid offers (Physical products or Accommodation) to unlock your cash reward
        </Text>
      </View>

      <View style={s.rulesBlock}>
        <Text style={s.rulesTitle}>Promo Conditions:</Text>
        {RULES.map((r) => (
          <RuleRow key={r.id} item={r} />
        ))}
      </View>

      <Pressable
        style={[s.cta, done ? s.ctaActive : s.ctaDisabled]}
        onPress={onCashOut}
        disabled={!done}
      >
        <Text style={s.ctaText}>
          {done ? `Cash Out ${REWARD}` : `Complete ${remaining} More Offers`}
        </Text>
        {done && (
          <View style={s.readyBadge}>
            <Text style={s.readyBadgeText}>READY</Text>
          </View>
        )}
      </Pressable>

      <Text style={s.footer}>Reward will be credited to your wallet within 24 hours after verification</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    padding: 20,
    width: "100%",
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1.5,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headTitle: { fontSize: 18, fontWeight: "700", color: "#1A1A1A" },
  urgentBadge: { backgroundColor: "#FF6B35", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  urgentBadgeText: { color: "#FFF", fontSize: 12, fontWeight: "600" },
  progressBlock: { marginBottom: 20 },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progressLabel: { fontSize: 14, fontWeight: "600", color: "#666" },
  progressCount: { fontSize: 14, fontWeight: "700", color: "#1A1A1A" },
  barBg: { height: 8, backgroundColor: "#F0F0F0", borderRadius: 4, marginBottom: 16, overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: "#10B981", borderRadius: 4 },
  statsRow: { flexDirection: "row", justifyContent: "space-around" },
  stat: { alignItems: "center" },
  statNum: { fontSize: 20, fontWeight: "700", color: "#1A1A1A", marginBottom: 4 },
  statLabel: { fontSize: 12, color: "#666", fontWeight: "500" },
  rewardBox: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  rewardTitle: { fontSize: 16, fontWeight: "700", color: "#1A1A1A", marginBottom: 4 },
  rewardDesc: { fontSize: 14, color: "#666", lineHeight: 20 },
  rulesBlock: { marginBottom: 20 },
  rulesTitle: { fontSize: 15, fontWeight: "600", color: "#1A1A1A", marginBottom: 12 },
  ruleRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  bullet: { marginRight: 8, marginTop: 2 },
  bulletImportant: { backgroundColor: "#FEF3F2", borderRadius: 8, paddingHorizontal: 4 },
  bulletChar: { fontSize: 16, color: "#666", fontWeight: "bold" },
  ruleText: { flex: 1, fontSize: 14, color: "#666", lineHeight: 20 },
  ruleTextImportant: { color: "#DC2626", fontWeight: "500" },
  cta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    position: "relative",
  },
  ctaActive: { backgroundColor: "#10B981" },
  ctaDisabled: { backgroundColor: "#E5E7EB" },
  ctaText: { fontSize: 16, fontWeight: "600", color: "#FFF" },
  readyBadge: { position: "absolute", right: 16, backgroundColor: "#FFF", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  readyBadgeText: { fontSize: 10, fontWeight: "700", color: "#10B981" },
  footer: { fontSize: 12, color: "#9CA3AF", textAlign: "center", fontStyle: "italic" },
});
