import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ACCENT = "#FFA500";
const API_REVIEW = "https://cs-node.vercel.app/review";
const MIN_COMMENT_LEN = 10;
const MAX_COMMENT_LEN = 500;

const EXPERIENCE_OPTIONS = [
  { id: "poor", label: "Poor", icon: "sentiment-dissatisfied", color: "#e84118" },
  { id: "average", label: "Average", icon: "remove", color: "#fbc531" },
  { id: "good", label: "Good", icon: "thumb-up", color: "#4cd137" },
  { id: "best", label: "Best", icon: "favorite", color: "#00a8ff" },
];

function formatPrice(price) {
  if (price == null || isNaN(price)) return "";
  return "₦" + new Intl.NumberFormat("en-US").format(price);
}

function ProductRow({ product }) {
  return (
    <View style={s.productRow}>
      <Image source={{ uri: product?.thumbnail_id }} style={s.productImg} />
      <View style={s.productMeta}>
        <Text style={s.productName}>{product?.title}</Text>
        <Text style={s.productPrice}>{formatPrice(product?.price)}</Text>
      </View>
    </View>
  );
}

function ExperienceChip({ option, selected, onSelect }) {
  const isSelected = selected === option.id;
  return (
    <Pressable
      style={[
        s.chip,
        isSelected && { backgroundColor: option.color },
        isSelected && s.chipSelected,
      ]}
      onPress={() => onSelect(option.id)}
    >
      <MaterialIcons
        name={option.icon}
        size={20}
        color={isSelected ? "#fff" : option.color}
      />
      <Text style={[s.chipText, isSelected && s.chipTextSelected]}>
        {option.label}
      </Text>
    </Pressable>
  );
}

export default function ReviewSubmissionScreen({ navigation }) {
  const route = useRoute();
  const { product, seller, shop } = route?.params ?? {};
  const user = useSelector((s) => s?.user?.user);

  const [rating, setRating] = useState(0);
  const [reviewType, setReviewType] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(() => {
    if (rating === 0) {
      Alert.alert("Rating Required", "Please provide a rating by selecting stars");
      return;
    }
    if (!reviewType) {
      Alert.alert("Review Type Required", "Please select a review type");
      return;
    }
    const trimmed = comment.trim();
    if (trimmed.length < MIN_COMMENT_LEN) {
      Alert.alert("Comment Too Short", `Please provide a more detailed comment (at least ${MIN_COMMENT_LEN} characters)`);
      return;
    }

    setSubmitting(true);
    fetch(API_REVIEW, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shop_id: shop?.shop_id,
        product_id: product?.product_id,
        buyer_id: user?.user_id,
        review: reviewType,
        date: new Date(),
        comment: trimmed,
        rating,
      }),
    })
      .then((r) => r.json())
      .then(() => {
        setSubmitting(false);
        Alert.alert("Review Submitted", "Thank you for your feedback!", [
          { text: "OK", onPress: () => navigation.navigate("product", { data: product, reviewed: true }) },
        ]);
      })
      .catch((err) => {
        setSubmitting(false);
        Alert.alert("Network error", "Please try again.");
      });
  }, [rating, reviewType, comment, shop, product, user, navigation]);

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {submitting && (
        <View style={s.loadingOverlay}>
          <ActivityIndicator size="large" color={ACCENT} />
        </View>
      )}

      <View style={s.body}>
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
        >
          <ProductRow product={product} />

          <View style={s.block}>
            <Text style={s.blockTitle}>Overall Rating</Text>
            <View style={s.starsWrap}>
              <StarRating
                rating={rating}
                onChange={setRating}
                starSize={40}
                color={ACCENT}
                starStyle={s.starGap}
              />
              <Text style={s.ratingHint}>
                {rating === 0 ? "Tap stars to rate" : `${Number(rating).toFixed(1)} / 5.0`}
              </Text>
            </View>
          </View>

          <View style={s.block}>
            <Text style={s.blockTitle}>How was your experience?</Text>
            <View style={s.chipsRow}>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <ExperienceChip
                  key={opt.id}
                  option={opt}
                  selected={reviewType}
                  onSelect={setReviewType}
                />
              ))}
            </View>
          </View>

          <View style={s.block}>
            <Text style={s.blockTitle}>Share your experience</Text>
            <TextInput
              style={s.textArea}
              multiline
              numberOfLines={6}
              placeholder="What did you like or dislike? How was the product quality, delivery experience, etc.?"
              placeholderTextColor="#999"
              value={comment}
              onChangeText={setComment}
              maxLength={MAX_COMMENT_LEN}
              textAlignVertical="top"
            />
            <Text style={s.charHint}>{comment.length}/{MAX_COMMENT_LEN} characters</Text>
          </View>
        </ScrollView>

        <View style={s.footer}>
          <Pressable
            style={[s.submitBtn, submitting && s.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text style={s.submitBtnText}>
              {submitting ? "Submitting..." : "Submit Review"}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8f9fa" },
  body: { flex: 1 },
  scroll: { padding: 8, paddingBottom: 90 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 251, 246, 0.9)",
    zIndex: 100,
  },
  productRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImg: { width: 70, height: 70, borderRadius: 8, marginRight: 16 },
  productMeta: { flex: 1, justifyContent: "center" },
  productName: { fontSize: 16, fontWeight: "600", marginBottom: 4, color: "#333" },
  productPrice: { fontSize: 16, fontWeight: "700", color: ACCENT },
  block: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blockTitle: { fontSize: 18, fontWeight: "600", marginBottom: 16, color: "#333" },
  starsWrap: { alignItems: "center" },
  starGap: { marginHorizontal: 2 },
  ratingHint: { marginTop: 12, fontSize: 16, color: "#666" },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 12,
    minWidth: "48%",
    justifyContent: "center",
  },
  chipSelected: { borderColor: "transparent" },
  chipText: { marginLeft: 8, fontSize: 14, fontWeight: "500" },
  chipTextSelected: { color: "#fff", fontWeight: "600" },
  textArea: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  charHint: { fontSize: 12, color: "#999", textAlign: "right" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  submitBtn: {
    backgroundColor: ACCENT,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitBtnDisabled: { opacity: 0.7 },
  submitBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
