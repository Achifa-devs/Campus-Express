import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Pressable,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import js_ago from "js-ago";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { set_chat } from "../../redux/chat";
import { getSocket, initSocket } from "../services/socket";

const ACCENT = "#FFA500";

function RoomRow({ room, currentUserId, onPress }) {
  const partner = room?.partner ?? {};
  const last = room?.lastMessage ?? {};
  const displayName = [partner.fname, partner.lname].filter(Boolean).join(" ") || "Unknown";
  const timeStr = last?.created_at ? js_ago(new Date(last.created_at)) : "";
  const isFromMe = last?.sender_id === currentUserId;
  const preview = (isFromMe ? "You: " : "") + (last?.content ?? "");
  const unread = room?.unread ?? 0;

  return (
    <Pressable style={({ pressed }) => [s.row, pressed && s.rowPressed]} onPress={() => onPress(room)}>
      <View style={s.avatarWrap}>
        {partner?.photo ? (
          <Image source={{ uri: partner.photo }} style={s.avatar} resizeMode="cover" />
        ) : (
          <View style={s.avatarPlaceholder}>
            <MaterialIcons name="account-circle" size={40} color={ACCENT} />
          </View>
        )}
      </View>
      <View style={s.body}>
        <View style={s.top}>
          <Text style={s.name} numberOfLines={1}>{displayName}</Text>
          <Text style={s.time}>{timeStr}</Text>
        </View>
        <View style={s.previewRow}>
          <Text style={s.preview} numberOfLines={1}>{preview}</Text>
          {unread > 0 && (
            <View style={s.unreadBadge}>
              <Text style={s.unreadText}>{unread > 99 ? "99+" : unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

function EmptyBlock({ hasSearch, onPress }) {
  const navigation = useNavigation();
  const goHome = () => navigation.navigate("Home");

  return (
    <Pressable style={s.empty} onPress={onPress ?? goHome}>
      <Text style={s.emptyTitle}>{hasSearch ? "No chats found" : "No chats yet"}</Text>
      <Text style={s.emptySub}>
        {hasSearch ? "Try a different search term" : "Start a conversation to begin chatting"}
      </Text>
    </Pressable>
  );
}

export default function ChatList({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s?.user?.user);
  const chat = useSelector((s) => s?.chat);
  const is_connected = useSelector((s) => s?.is_connected);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [socket, setSocket] = useState(null);

  const initSocketClient = useCallback(async () => {
    try {
      await initSocket(user?.user_id);
      setSocket(getSocket());
    } catch (e) {
      console.error("Socket init error:", e);
    }
  }, [user?.user_id]);

  useEffect(() => {
    if (Array.isArray(chat)) {
      setRooms(chat);
      setLoading(false);
      setRefreshing(false);
    }
  }, [chat]);

  useEffect(() => {
    if (!socket) initSocketClient();
  }, []);

  const loadRooms = useCallback(() => {
    const sock = getSocket();
    if (!sock || !user?.user_id) return;
    sock.emit("get_all_messages", { user_id: user.user_id }, (cb) => {
      const { messages, success } = cb ?? {};
      if (success && Array.isArray(messages)) {
        const sorted = [...messages].sort(
          (a, b) => new Date((b?.lastMessage?.created_at) || 0) - new Date((a?.lastMessage?.created_at) || 0)
        );
        dispatch(set_chat(sorted));
      }
    });
  }, [user?.user_id, dispatch]);

  const filteredRooms = useMemo(() => {
    if (!Array.isArray(rooms)) return [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rooms.filter((r) => r?.partner);
    return rooms.filter(
      (r) =>
        r?.partner &&
        (([r.partner.fname, r.partner.lname].join(" ").toLowerCase().includes(q)) ||
          (r?.lastMessage?.content ?? "").toLowerCase().includes(q))
    );
  }, [rooms, searchQuery]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await initSocketClient();
    loadRooms();
  }, [initSocketClient, loadRooms]);

  const openRoom = useCallback(
    (room) => {
      navigation.navigate("chat-room", { room });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <RoomRow room={item} currentUserId={user?.user_id} onPress={openRoom} />
    ),
    [user?.user_id, openRoom]
  );

  const keyExtractor = useCallback((item) => item?.id ?? String(item?.key ?? Math.random()), []);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.head}>
        <Text style={s.headTitle}>Campus chats</Text>
      </View>

      <View style={s.listWrap}>
        {loading ? (
          <View style={s.loadingWrap}>
            <ActivityIndicator size="large" color={ACCENT} />
            <Text style={s.loadingText}>Loading chats...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRooms}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={s.listContent}
            ListEmptyComponent={<EmptyBlock hasSearch={searchQuery.length > 0} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[ACCENT]}
                tintColor={ACCENT}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  head: {
    padding: 16,
    marginBottom: 2.5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headTitle: { fontSize: 24, fontWeight: "bold", color: "#000", textAlign: "left" },
  listWrap: { flex: 1 },
  listContent: { padding: 4, flexGrow: 1 },
  loadingWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#666", fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 4,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  rowPressed: { opacity: 0.9 },
  avatarWrap: { position: "relative", marginRight: 16 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff4e0",
  },
  body: { flex: 1 },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: { fontSize: 18, fontWeight: "600", color: "#000", flex: 1, marginRight: 8 },
  time: { fontSize: 12, color: "#999" },
  previewRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  preview: { fontSize: 14, color: "#666", flex: 1, marginRight: 8 },
  unreadBadge: {
    backgroundColor: ACCENT,
    borderRadius: 4,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: { fontSize: 18, fontWeight: "600", color: "#333", textAlign: "center", marginBottom: 8 },
  emptySub: { fontSize: 14, color: "#666", textAlign: "center", lineHeight: 20 },
});
