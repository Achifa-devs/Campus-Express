import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { debounce } from "lodash";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import js_ago from "js-ago";

import { set_boost_modal } from "../../../redux/modal/boost_modal";

const ACCENT = "#FFA500";

function formatPrice(price) {
  if (price == null || isNaN(price)) return "";
  return "₦" + new Intl.NumberFormat("en-US").format(price);
}

export default function ProductCard({
  item,
  state = "private",
  onDelete,
  onStatusChange,
  onPromote,
}) {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [exploreShop, setExploreShop] = useState(false);
  const isPromoted = Boolean(item?.promotion);

  useEffect(() => {
    setExploreShop(route?.name === "explore-shop");
  }, [route?.name]);

  const shareItem = useCallback(async (product) => {
    try {
      const url = `https://www.campussphere.net/store/product/${product.product_id}`;
      await Share.share({
        message: `Check out this product for ₦${product.price} Campus Sphere: ${url}`,
        url,
        title: `${product.title} Plan`,
      });
    } catch (e) {
      console.error("Share error:", e?.message);
    }
  }, []);

  const goToProduct = useCallback(
    debounce((product) => navigation.navigate("product", { data: product }), 300, {
      leading: true,
      trailing: false,
    }),
    [navigation]
  );

  const handlePromote = useCallback(
    (data) => {
      if (exploreShop) {
        navigation.navigate("product", { data: item });
        return;
      }
      if (!isPromoted) dispatch(set_boost_modal({ data, visible: 1 }));
      else navigation.navigate("metrics", { data });
    },
    [exploreShop, isPromoted, item, navigation, dispatch]
  );

  const onCardPress = () => {
    if (exploreShop) navigation.navigate("product", { data: item });
    else handlePromote(item);
  };

  const isPrivate = state !== "public";

  return (
    <Pressable style={s.card} onPress={onCardPress}>
      <Pressable onPress={onCardPress}>
        <Image source={{ uri: item?.thumbnail_id }} style={s.thumb} />
      </Pressable>

      <View style={s.body}>
        <View style={s.top}>
          <Text style={s.title} numberOfLines={2}>{item?.title}</Text>
          <Text style={s.price}>{formatPrice(item?.price)}</Text>
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

        <View style={s.foot}>
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
              <Pressable
                onPress={() => goToProduct(item)}
                style={[s.btn, s.btnView]}
              >
                <Icon name="visibility" size={16} color="#FFF" />
                <Text style={[s.btnText, s.btnViewText]}>View</Text>
              </Pressable>
              <Pressable onPress={() => shareItem(item)} style={s.btn}>
                <Icon name="share" size={16} color="#666" />
              </Pressable>
              <Pressable onPress={() => onDelete?.(item)} style={[s.btn, s.btnDelete]}>
                <Icon name="delete" size={16} color="#FF3B30" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  thumb: {
    width: 100,
    height: 145,
    backgroundColor: "#F0F0F0",
  },
  body: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  top: { marginBottom: 8 },
  title: { fontSize: 14, fontWeight: "600", color: "#1A1A1A", marginBottom: 4 },
  price: { fontSize: 16, fontWeight: "700", color: ACCENT },
  meta: { flexDirection: "row", gap: 16, marginBottom: 12 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, color: "#666" },
  foot: {},
  dateStatus: { flex: 1, marginBottom: 4 },
  date: { fontSize: 11, color: "#999", marginBottom: 4 },
  status: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  statusText: { color: "#FFF", fontSize: 10, fontWeight: "600", textTransform: "capitalize" },
  actions: { flexDirection: "row", gap: 8, alignItems: "center" },
  btn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 36,
    height: 36,
  },
  btnView: { backgroundColor: ACCENT, flexDirection: "row", gap: 4, paddingHorizontal: 8, minWidth: 70 },
  btnDelete: { backgroundColor: "#FFF6F6" },
  btnText: { fontSize: 12, fontWeight: "600" },
  btnViewText: { color: "#FFF" },
});
