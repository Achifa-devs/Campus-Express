import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Video from "react-native-video";

import Memory from "../utils/memory";
import services from "../json/services.json";

const ACCENT = "#FFA500";

function resolveCategoryImage(categoryName) {
  const list = services?.items?.category ?? [];
  for (const cat of list) {
    const keys = Object.keys(cat).filter((k) => k !== "img");
    if (keys.includes(categoryName)) return cat.img;
  }
  return null;
}

function formatNaira(num) {
  if (num == null || isNaN(num)) return "";
  return "₦" + new Intl.NumberFormat("en-US").format(num);
}

function getPriceLabel(record) {
  const purpose = record?.purpose;
  const price = record?.price;
  const upfront = record?.others?.lodge_data?.upfront_pay;

  if (purpose === "product") return formatNaira(price);
  if (purpose === "accomodation")
    return `${formatNaira(price)} to pay ${formatNaira(upfront)}`;
  return "";
}

function MediaBlock({ purpose, category, thumbnailId }) {
  const isAccom = purpose === "accomodation";
  const uri = isAccom ? thumbnailId : resolveCategoryImage(category) || thumbnailId;

  if (isAccom) {
    return (
      <View style={s.mediaWrap}>
        <Video
          source={{ uri: thumbnailId }}
          style={s.media}
          resizeMode="cover"
          muted
          paused
        />
      </View>
    );
  }

  return <Image style={s.media} source={{ uri }} />;
}

function HistoryCard({ item, onPress }) {
  const navigation = useNavigation();
  const record = item?.data ?? {};
  const handlePress = useCallback(() => {
    (onPress ?? (() => navigation.navigate("product", { data: record })))();
  }, [onPress, navigation, record]);

  return (
    <Pressable
      style={({ pressed }) => [s.card, pressed && s.cardPressed]}
      onPress={handlePress}
    >
      <MediaBlock
        purpose={record.purpose}
        category={record.category}
        thumbnailId={record.thumbnail_id}
      />
      <View style={s.details}>
        <Text style={s.title} numberOfLines={2}>
          {record.title}
        </Text>
        <Text style={s.meta} numberOfLines={1}>
          {record?.others?.cType}
        </Text>
        <Text style={s.price}>{getPriceLabel(record)}</Text>
      </View>
    </Pressable>
  );
}

function EmptyState({ onBrowse }) {
  const navigation = useNavigation();
  const goBrowse = useCallback(() => {
    (onBrowse ?? (() => navigation.navigate("Home")))();
  }, [onBrowse, navigation]);

  return (
    <View style={s.empty}>
      <Text style={s.emptyText}>No history yet</Text>
      <Pressable
        style={({ pressed }) => [s.browseBtn, pressed && s.browseBtnPressed]}
        onPress={goBrowse}
      >
        <Text style={s.browseBtnText}>Browse Products</Text>
      </Pressable>
    </View>
  );
}

export default function History() {
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const raw = await Memory.get("history");
      setItems(Array.isArray(raw) ? raw : []);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load history");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const renderItem = useCallback(({ item }) => (
    <HistoryCard item={item} onPress={() => navigation.navigate("product", { data: item?.data })} />
  ), [navigation]);

  const keyExtractor = useCallback((item, index) => {
    const id = item?.data?.id ?? item?.id;
    return id != null ? String(id) : `history-${index}`;
  }, []);

  return (
    <View style={s.root}>
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={items.length === 0 ? s.listEmpty : s.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={load} />
        }
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    padding: 6,
  },
  list: {
    paddingBottom: 16,
  },
  listEmpty: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardPressed: {
    opacity: 0.95,
  },
  mediaWrap: {
    height: 100,
    width: 100,
    backgroundColor: "#000",
    overflow: "hidden",
  },
  media: {
    width: 100,
    height: 100,
    backgroundColor: "#F0F0F0",
  },
  details: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: ACCENT,
    fontWeight: "600",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  browseBtnPressed: {
    opacity: 0.9,
  },
  browseBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
