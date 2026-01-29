import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import StarRating from "react-native-star-rating-widget";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";

const ACCENT = "#FFA500";
const STARS = [5, 4, 3, 2, 1];
const BAR_COLORS = { 5: "#22C55E", 4: "#22C55E", 3: "#F59E0B", 2: "#EF4444", 1: "#EF4444" };
const EXPAND_THRESHOLD = 150;

function formatReviewDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function useRatingStats(list) {
  const total = list?.length ?? 0;
  const average =
    total > 0
      ? (list.reduce((sum, item) => sum + parseInt(item?.rating ?? 0, 10), 0) / total).toFixed(1)
      : "0";
  const dist = useMemo(() => {
    const out = {};
    STARS.forEach((r) => {
      out[r] = (list ?? []).filter((item) => parseInt(item?.rating, 10) === r).length;
    });
    return out;
  }, [list]);
  return { average: parseFloat(average), total, dist };
}

function EmptyState() {
  return (
    <View style={s.empty}>
      <MaterialIcons name="chat-bubble-outline" size={80} color="#CBD5E1" />
      <Text style={s.emptyTitle}>No Reviews Yet</Text>
      <Text style={s.emptyDesc}>
        Customer reviews will appear here once you start receiving feedback on your products.
      </Text>
    </View>
  );
}

function RatingBar({ rating, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  const color = BAR_COLORS[rating] ?? "#94A3B8";

  return (
    <View style={s.barRow}>
      <Text style={s.barNum}>{rating}</Text>
      <MaterialIcons name="star" size={16} color={ACCENT} />
      <View style={s.barBg}>
        <View style={[s.barFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <Text style={s.barCount}>{count}</Text>
    </View>
  );
}

function ReviewItem({ item, index, expanded, onToggle }) {
  const hasLongComment = (item?.comment?.length ?? 0) > EXPAND_THRESHOLD;
  const isExpanded = expanded === index;

  return (
    <View style={s.card}>
      <View style={s.cardHead}>
        <StarRating
          rating={parseInt(item?.rating, 10) || 0}
          starSize={20}
          color={ACCENT}
          starStyle={{ marginRight: 1 }}
          onChange={() => {}}
        />
        <Text style={s.cardDate}>{formatReviewDate(item?.date)}</Text>
      </View>
      <Text style={s.cardTitle} numberOfLines={2}>{item?.review}</Text>
      {item?.comment ? (
        <>
          <Text
            style={s.cardComment}
            numberOfLines={isExpanded ? undefined : 3}
          >
            {item.comment}
          </Text>
          {hasLongComment && (
            <Pressable onPress={() => onToggle(index)} style={s.readMore}>
              <Text style={s.readMoreText}>{isExpanded ? "Read less" : "Read more"}</Text>
              <MaterialIcons name={isExpanded ? "expand-less" : "expand-more"} size={16} color={ACCENT} />
            </Pressable>
          )}
        </>
      ) : null}
      <View style={s.cardFoot}>
        <MaterialIcons name="account-circle" size={20} color="#64748B" />
        <Text style={s.cardFootText}>Customer Review</Text>
      </View>
    </View>
  );
}

export default function ReviewsScreen() {
  const route = useRoute();
  const data = route?.params?.data ?? [];
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { average, total, dist } = useRatingStats(data);

  const toggleExpand = useCallback((index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  if (data.length === 0) {
    return (
      <View style={s.root}>
        <EmptyState />
      </View>
    );
  }

  return (
    <View style={s.root}>
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={s.head}>
          <View style={s.overview}>
            <Text style={s.avgNum}>{average}</Text>
            <StarRating
              rating={average}
              starSize={24}
              color={ACCENT}
              starStyle={{ marginRight: 2 }}
              onChange={() => {}}
            />
            <Text style={s.totalText}>{total} reviews</Text>
          </View>
          <View style={s.bars}>
            {STARS.map((r) => (
              <RatingBar key={r} rating={r} count={dist[r] ?? 0} total={total} />
            ))}
          </View>
        </View>

        <View style={s.list}>
          {data.map((item, index) => (
            <ReviewItem
              key={index}
              item={item}
              index={index}
              expanded={expandedIndex}
              onToggle={toggleExpand}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#FFF",
  },
  emptyTitle: { fontSize: 20, fontWeight: "600", color: "#374151", marginTop: 24, marginBottom: 8 },
  emptyDesc: { fontSize: 16, color: "#6B7280", textAlign: "center", lineHeight: 24 },
  head: {
    backgroundColor: "#FFF",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  overview: { alignItems: "center", marginBottom: 24 },
  avgNum: { fontSize: 48, fontWeight: "700", color: "#1F2937", marginBottom: 8 },
  totalText: { fontSize: 16, color: "#64748B", marginTop: 8 },
  bars: { gap: 12 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  barNum: { fontSize: 14, fontWeight: "600", color: "#374151", width: 16 },
  barBg: { flex: 1, height: 8, backgroundColor: "#E5E7EB", borderRadius: 4, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 4 },
  barCount: { fontSize: 14, color: "#64748B", minWidth: 24, textAlign: "right" },
  list: { padding: 8, gap: 16 },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  cardDate: { fontSize: 14, color: "#6B7280" },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1F2937", marginBottom: 12, lineHeight: 24 },
  cardComment: { fontSize: 16, color: "#4B5563", lineHeight: 24, marginBottom: 8 },
  readMore: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  readMoreText: { fontSize: 14, color: ACCENT, fontWeight: "500", marginRight: 4 },
  cardFoot: { borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingTop: 16, flexDirection: "row", alignItems: "center", gap: 8 },
  cardFootText: { fontSize: 14, color: "#64748B" },
});
