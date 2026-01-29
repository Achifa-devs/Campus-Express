import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import { debounce } from "lodash";
import { useNavigation, useRoute } from "@react-navigation/native";
import js_ago from "js-ago";

const ACCENT = "#FFA500";

function formatLodgePrice(item) {
  const price = item?.price;
  const upfront = item?.others?.lodge_data?.upfront_pay;
  if (price == null) return "";
  const p = "₦" + new Intl.NumberFormat("en-US").format(price);
  const u = upfront != null ? "₦" + new Intl.NumberFormat("en-US").format(upfront) : "";
  return u ? `${p} to pay ${u}` : p;
}

export default function LodgeCard({
  item,
  state = "private",
  onDelete,
  onPromote,
}) {
  const navigation = useNavigation();
  const route = useRoute();
  const [exploreShop, setExploreShop] = useState(false);

  useEffect(() => {
    setExploreShop(route?.name === "explore-shop");
  }, [route?.name]);

  const shareItem = useCallback(async (product) => {
    try {
      const url = `https://www.campussphere.net/store/product/${product.product_id}`;
      await Share.share({
        message: `Check out this lodge for ₦${product.price} on Campus Sphere: ${url}`,
        url,
        title: `${product.title} Plan`,
      });
    } catch (e) {
      console.error("Share error:", e?.message);
    }
  }, []);

  const goToLodge = useCallback(
    debounce((data) => navigation.navigate("lodge-room", { data }), 300, {
      leading: true,
      trailing: false,
    }),
    [navigation]
  );

  const handlePromote = useCallback(
    (data) => {
      if (exploreShop) navigation.navigate("lodge-room", { data: item });
      else navigation.navigate("metrics", { data });
    },
    [exploreShop, item, navigation]
  );

  const onCardPress = () => {
    if (exploreShop) navigation.navigate("product", { data: item });
    else handlePromote(item);
  };

  const isPrivate = state !== "public";

  return (
    <Pressable style={s.card} onPress={onCardPress}>
      <Pressable onPress={onCardPress}>
        <View style={s.videoWrap}>
          <Video
            source={{ uri: item?.thumbnail_id }}
            style={s.video}
            paused
            muted
            resizeMode="cover"
          />
          <View style={s.playOverlay}>
            <Pressable style={s.playBtn}>
              <Icon name="play-circle" size={36} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </Pressable>

      <View style={s.body}>
        <View style={s.top}>
          <Text style={s.title} numberOfLines={2}>{item?.title}</Text>
          <Text style={s.price}>{formatLodgePrice(item)}</Text>
        </View>

        <View style={s.meta}>
          <View style={s.metaItem}>
            <Icon name="visibility" size={14} color="#666" />
            <Text style={s.metaText}>{item?.views ?? 0} views</Text>
          </View>
          <View style={s.metaItem}>
            <Icon name="star" size={14} color="#666" />
            <Text style={s.metaText}>{item?.reviews ?? 0} reviews</Text>
          </View>
        </View>

        <View style={s.dateStatus}>
          <Text style={s.date}>{item?.date ? js_ago(new Date(item.date)) : ""}</Text>
          <View
            style={[
              s.status,
              { backgroundColor: item?.state?.state === "active" ? "#4CAF50" : "#666" },
            ]}
          >
            <Text style={s.statusText}>{item?.state?.state || "inactive"}</Text>
          </View>
        </View>

        {isPrivate && (
          <View style={s.actions}>
            <Pressable onPress={() => goToLodge(item)} style={[s.btn, s.btnView]}>
              <Icon name="visibility" size={20} color="#FFF" />
              <Text style={[s.btnText, s.btnViewText]}>View</Text>
            </Pressable>
            <Pressable onPress={() => shareItem(item)} style={s.btn}>
              <Icon name="share" size={20} color="#666" />
              <Text style={s.btnText}>Share</Text>
            </Pressable>
            <Pressable onPress={() => onDelete?.(item, "video")} style={[s.btn, s.btnDelete]}>
              <Icon name="delete" size={20} color="#FF3B30" />
              <Text style={[s.btnText, s.btnDeleteText]}>Delete</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    overflow: "hidden",
  },
  videoWrap: {
    height: 200,
    backgroundColor: "#000",
    position: "relative",
  },
  video: { width: "100%", height: "100%" },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  playBtn: { padding: 8 },
  body: { padding: 16 },
  top: { marginBottom: 12 },
  title: { fontSize: 16, fontWeight: "700", color: "#1A1A1A", marginBottom: 6 },
  price: { fontSize: 18, fontWeight: "800", color: ACCENT },
  meta: { flexDirection: "row", gap: 20, marginBottom: 12 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 13, color: "#666", fontWeight: "500" },
  dateStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  date: { fontSize: 12, color: "#999" },
  status: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: "#FFF", fontSize: 11, fontWeight: "700", textTransform: "capitalize" },
  actions: { flexDirection: "row", gap: 8 },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    minWidth: 80,
  },
  btnView: { backgroundColor: ACCENT, borderColor: ACCENT },
  btnDelete: { backgroundColor: "#FFF6F6", borderColor: "#FFE4E4" },
  btnText: { fontSize: 13, fontWeight: "600", color: "#666" },
  btnViewText: { color: "#FFF" },
  btnDeleteText: { color: "#FF3B30" },
});
