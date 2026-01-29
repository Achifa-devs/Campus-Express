import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

import UploadBtn from "../components/Sell/CreateBtn";
import SellModal from "../reuseables/SellModal";
import LoginReminder from "../reuseables/LoginReminder";
// import Promo from "../components/Sell/Promo";
import { set_products } from "../../redux/products";
import { set_shop } from "../../redux/shop";

const categoriesData = require("../json/services.json");

const ACCENT = "#FFA500";
const API = {
  vendor: "https://cs-node.vercel.app",
  promo: "https://base-three-opal.vercel.app",
  shopCreate: "https://base-three-opal.vercel.app/shop/create",
};

const CREATE_OPTIONS = [
  { title: "Sell My Products", description: "List your goods and items for buyers.", purpose: "product" },
  { title: "Advertise Accommodation", description: "Promote your lodge or rental space.", purpose: "accomodation" },
];

const { width: W } = Dimensions.get("window");
const METRIC_CARD_WIDTH = (W - 48) / 2;

function formatNaira(num) {
  if (num == null || isNaN(num)) return "";
  return "₦" + new Intl.NumberFormat("en-US").format(num);
}

function formatAdPrice(item) {
  const purpose = item?.purpose;
  const price = item?.price;
  const upfront = item?.others?.lodge_data?.upfront_pay;
  if (purpose === "product") return formatNaira(price);
  if (purpose === "accomodation") return `${formatNaira(price)} to pay ${formatNaira(upfront)}`;
  return "";
}

function resolveCategoryImage(categoryName) {
  const list = categoriesData?.items?.category ?? [];
  for (const cat of list) {
    const keys = Object.keys(cat).filter((k) => k !== "img");
    if (keys.includes(categoryName)) return cat.img;
  }
  return null;
}

function validateShopForm(form) {
  if (!form.shopName?.trim() || form.shopName.trim().length < 3) {
    return "Shop name must be at least 3 characters long.";
  }
  if (!form.address1 || !form.address2 || !form.address3) {
    return "All address fields are required.";
  }
  return null;
}

function MetricCard({ icon, value, label }) {
  return (
    <View style={s.metricCard}>
      <View style={s.metricIconWrap}>
        <Icon name={icon} size={24} color={ACCENT} />
      </View>
      <Text style={s.metricValue}>{value}</Text>
      <Text style={s.metricLabel}>{label}</Text>
    </View>
  );
}

function AdMedia({ purpose, category, thumbnailId }) {
  const isAccom = purpose === "accomodation";
  const uri = isAccom ? thumbnailId : resolveCategoryImage(category) || thumbnailId;

  if (isAccom) {
    return (
      <View style={s.adMediaWrap}>
        <Video source={{ uri: thumbnailId }} style={s.adMedia} resizeMode="cover" muted paused />
      </View>
    );
  }
  return <Image style={s.adMedia} source={{ uri }} />;
}

function AdCard({ item, onPress }) {
  const navigation = useNavigation();
  const goMetrics = () => navigation.navigate("metrics", { data: item });

  return (
    <TouchableOpacity style={s.adCard} onPress={goMetrics} activeOpacity={0.8}>
      <TouchableOpacity onPress={goMetrics} activeOpacity={1}>
        <AdMedia purpose={item?.purpose} category={item?.category} thumbnailId={item?.thumbnail_id} />
      </TouchableOpacity>
      <View style={s.adBody}>
        <Text style={s.adTitle} numberOfLines={2}>{item?.title}</Text>
        <Text style={s.adPrice}>{formatAdPrice(item)}</Text>
        <View style={s.adStats}>
          <View style={s.statRow}>
            <Icon name="visibility" size={14} color="#666" />
            <Text style={s.statText}>{item?.views ?? 0} views</Text>
          </View>
          <View style={[s.statusBadge, item?.status === "sold" && s.soldBadge]}>
            <Text style={s.statusText}>{item?.state?.state === "active" ? "Active" : "Inactive"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const INITIAL_SHOP_FORM = {
  logo: "",
  shopName: "",
  description: "",
  address1: "",
  address2: "",
  address3: "",
  user_id: "",
};

export default function SellScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s?.user?.user);
  const shop = useSelector((s) => s?.shop);

  const [userAds, setUserAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [formError, setFormError] = useState("");
  const [shopExists, setShopExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shopLogo, setShopLogo] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [shopForm, setShopForm] = useState(INITIAL_SHOP_FORM);
  const [promoActive, setPromoActive] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const loadProducts = useCallback(() => {
    if (!user?.user_id) return;
    setRefreshing(true);
    fetch(`${API.vendor}/vendor/products?user_id=${user.user_id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((res) => {
        setUserAds(res?.data ?? []);
        dispatch(set_products(res?.data ?? []));
      })
      .catch(() => Alert.alert("Network error", "Please try again."))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, [user?.user_id, dispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useFocusEffect(useCallback(() => { loadProducts(); }, [loadProducts]));

  useEffect(() => {
    fetch(`${API.promo}/vendor/promo`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.success && res?.data) setPromoActive(res.data.is_active === "true");
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!shop?.shop_id) return;
    fetch(`${API.vendor}/vendor/shop-reviews?shop_id=${shop.shop_id}`)
      .then((r) => r.json())
      .then((res) => setReviews(res?.data ?? []))
      .catch(() => {});
  }, [shop?.shop_id]);

  useEffect(() => {
    if (!user?.user_id) return;
    setShopForm((prev) => ({ ...prev, user_id: user.user_id }));
    fetch(`${API.vendor}/vendor/shop?user_id=${user.user_id}`)
      .then((r) => r.json())
      .then((res) => {
        setIsLoading(false);
        setShopExists(res?.success && res?.data?.length > 0);
      })
      .catch(() => setIsLoading(false));
  }, [user?.user_id]);

  const updateForm = useCallback((field, value) => {
    setShopForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const pickLogo = useCallback(() => {
    launchImageLibrary({ mediaType: "photo", quality: 0.8, maxWidth: 500, maxHeight: 500 }, async (res) => {
      if (res.didCancel || res.errorCode || !res.assets?.[0]) return;
      setUploadingLogo(true);
      try {
        const form = new FormData();
        form.append("file", {
          uri: res.assets[0].uri,
          name: res.assets[0].fileName || `photo_${Date.now()}.jpg`,
          type: res.assets[0].type || "image/jpeg",
        });
        const { data } = await axios.post(`${API.vendor}/upload`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data?.success && data?.data?.url) {
          updateForm("logo", data.data.url);
          setShopLogo(data.data.url);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setUploadingLogo(false);
      }
    });
  }, [updateForm]);

  const submitShop = useCallback(() => {
    const err = validateShopForm(shopForm);
    if (err) {
      Vibration.vibrate(200);
      setFormError(err);
      return;
    }
    setFormError("");
    setIsLoading(true);
    fetch(API.shopCreate, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shopForm),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res?.success) {
          dispatch(set_shop(res.data));
          setShopExists(true);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [shopForm, dispatch]);

  const changeLogo = useCallback(async () => {
    if (!shopLogo) return;
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API.vendor}/delete`, { url: shopLogo });
      if (data?.data?.result === "ok") {
        setShopLogo(null);
        updateForm("logo", "");
        pickLogo();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [shopLogo, updateForm, pickLogo]);

  const onRefresh = useCallback(() => {
    navigation.navigate("Sell", { refresh: Date.now() });
  }, [navigation]);

  const openCreate = useCallback((option) => {
    setCreateModalOpen(false);
    navigation.navigate("create", { update: false, purpose: option.purpose });
  }, [navigation]);

  const totalViews = userAds.reduce((sum, i) => sum + parseInt(i?.views ?? 0, 10), 0);
  const totalImpressions = userAds.reduce((sum, i) => sum + parseInt(i?.impression ?? 0, 10), 0);

  if (!loading) {
    return (
      <View style={s.loadingWrap}>
        <ActivityIndicator size="large" color={ACCENT} />
        <Text style={s.loadingText}>Loading your shop...</Text>
      </View>
    );
  }

  if (!user) {
    return <LoginReminder text="Sign in to access your personalized dashboard" style={{ backgroundColor: "#efefef" }} />;
  }

  if (isLoading && !shopExists) {
    return (
      <View style={s.loadingWrap}>
        <ActivityIndicator size="large" color={ACCENT} />
      </View>
    );
  }

  if (!shopExists) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={s.root}>
        {formError ? <Text style={s.formError}>{formError}</Text> : null}
        {uploadingLogo ? (
          <View style={s.uploadOverlay}>
            <ActivityIndicator size="small" color={ACCENT} />
          </View>
        ) : null}
        <ScrollView contentContainerStyle={s.formScroll}>
          <Text style={s.formTitle}>Register Your Shop</Text>
          <View style={s.logoSection}>
            <TouchableOpacity style={s.logoBtn} onPress={pickLogo} disabled={uploadingLogo}>
              {shopLogo ? (
                <Image source={{ uri: shopLogo }} style={s.logoImg} />
              ) : (
                <View style={s.logoPlaceholder}>
                  <Icon name="photo-camera" size={32} color={ACCENT} />
                  <Text style={s.logoPlaceholderText}>Add Shop Logo</Text>
                </View>
              )}
            </TouchableOpacity>
            {shopLogo ? (
              <TouchableOpacity style={s.changeLogoBtn} onPress={changeLogo}>
                <Text style={s.changeLogoTxt}>Change Logo</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {["shopName", "description", "address1", "address2", "address3"].map((field, i) => (
            <View key={field} style={s.inputWrap}>
              <Text style={s.inputLabel}>
                {field === "shopName" ? "Shop Name" : field === "description" ? "Description (optional)" : field === "address1" ? "Address 1 (Town)" : field === "address2" ? "Address 2 (Junction / Str name)" : "Address 3 (Lodge or Building name)"}
              </Text>
              <TextInput
                style={[s.input, field === "description" && s.inputMultiline]}
                placeholder={field === "shopName" ? "Enter shop name" : field === "description" ? "Describe your shop" : `Address ${field.slice(-1)}`}
                value={shopForm[field]}
                onChangeText={(t) => updateForm(field, t)}
                multiline={field === "description"}
                numberOfLines={field === "description" ? 3 : 1}
              />
            </View>
          ))}
          <TouchableOpacity style={s.submitBtn} onPress={submitShop} disabled={uploadingLogo}>
            {uploadingLogo ? <ActivityIndicator color="#FFF" /> : <Text style={s.submitBtnText}>Register Shop</Text>}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (shop?.account_data == null || shop?.account_data === "null") {
    navigation.navigate("payment_setup");
  }

  return (
    <View style={s.root}>
      <SellModal visible={createModalOpen} onClose={() => setCreateModalOpen(!createModalOpen)} position="bottom">
        <View style={s.modalInner}>
          {CREATE_OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={opt.purpose}
              style={s.modalOpt}
              onPress={() => openCreate(opt)}
            >
              <View style={s.modalOptText}>
                <Text style={s.modalOptTitle}>{opt.title}</Text>
                <Text style={s.modalOptDesc}>{opt.description}</Text>
              </View>
              <Icon name="arrow-forward" size={25} />
            </TouchableOpacity>
          ))}
        </View>
      </SellModal>

      <ScrollView
        contentContainerStyle={s.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[ACCENT]} tintColor={ACCENT} />}
      >
        <UploadBtn navigation={navigation} toggleModal={() => setCreateModalOpen(true)} is_promo_active={promoActive} />

        {!promoActive && (
          <View style={s.metricsSection}>
            <Text style={s.sectionTitle}>Performance Overview</Text>
            <TouchableOpacity style={s.metricsGrid} activeOpacity={0.8} onPress={() => navigation.navigate("shop")}>
              <MetricCard icon="visibility" value={totalViews} label="Total Views" />
              <MetricCard icon="show-chart" value={totalImpressions} label="Total Impression" />
              <MetricCard icon="star-half" value={reviews.length} label="Total Reviews" />
              <MetricCard icon="inventory-2" value={userAds.length} label="Total Ads" />
            </TouchableOpacity>
          </View>
        )}

        {promoActive && (
          <View style={s.promoWrap}>
            <Promo />
          </View>
        )}

        <View style={s.adsSection}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Your Ads ({userAds?.length ?? 0})</Text>
            <TouchableOpacity onPress={() => navigation.navigate("inventory", { data: userAds })}>
              <Text style={s.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {userAds?.length > 0 ? (
            <FlatList
              data={userAds.slice(0, 4)}
              renderItem={({ item }) => <AdCard item={item} />}
              keyExtractor={(item) => String(item?.id ?? item?.title)}
              scrollEnabled={false}
              contentContainerStyle={s.adsList}
            />
          ) : (
            <View style={s.empty}>
              <Icon name="photo-library" size={50} color="#CCC" />
              <Text style={s.emptyTitle}>No ads published yet</Text>
              <Text style={s.emptySub}>Start by publishing your first ad to get noticed!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8F9FA" },
  loadingWrap: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8F9FA" },
  loadingText: { marginTop: 16, fontSize: 16, color: "#666" },
  formError: { color: "red", textAlign: "center", marginBottom: 10 },
  uploadOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center", zIndex: 100 },
  formScroll: { padding: 20, paddingBottom: 40 },
  formTitle: { fontSize: 22, fontWeight: "bold", color: ACCENT, marginBottom: 20, textAlign: "center" },
  logoSection: { alignItems: "center", marginBottom: 25 },
  logoBtn: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#f9f9f9", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: ACCENT, overflow: "hidden" },
  logoImg: { width: "100%", height: "100%", resizeMode: "cover" },
  logoPlaceholder: { alignItems: "center", justifyContent: "center" },
  logoPlaceholderText: { color: ACCENT, marginTop: 8, fontSize: 12 },
  changeLogoBtn: { marginTop: 10 },
  changeLogoTxt: { color: ACCENT, textDecorationLine: "underline" },
  inputWrap: { marginBottom: 20 },
  inputLabel: { fontSize: 14, color: "#333", marginBottom: 8, fontWeight: "500" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 15, fontSize: 16, backgroundColor: "#fff" },
  inputMultiline: { height: 100, textAlignVertical: "top" },
  submitBtn: { backgroundColor: ACCENT, padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  submitBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  modalInner: { width: "100%", padding: 5 },
  modalOpt: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: "#eee", backgroundColor: "#fff" },
  modalOptText: { flex: 1 },
  modalOptTitle: { fontSize: 16, fontWeight: "500", color: "#333" },
  modalOptDesc: { fontSize: 13, color: "#555", marginTop: 3 },
  metricsSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#1A1A1A", marginBottom: 16 },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6, justifyContent: "space-between" },
  metricCard: { width: METRIC_CARD_WIDTH, backgroundColor: "#FFF", padding: 16, borderRadius: 4, alignItems: "center", marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 1 },
  metricIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#FFF6F2", justifyContent: "center", alignItems: "center", marginBottom: 5 },
  metricValue: { fontSize: 24, fontWeight: "700", color: "#1A1A1A", marginBottom: 4 },
  metricLabel: { fontSize: 12, color: "#666", textAlign: "center" },
  promoWrap: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  adsSection: { marginBottom: 0 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  seeAll: { color: ACCENT, fontSize: 14, fontWeight: "500" },
  adsList: { gap: 6 },
  adCard: { backgroundColor: "#FFF", borderRadius: 4, overflow: "hidden", flexDirection: "row", marginBottom: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 1 },
  adMediaWrap: { height: 100, width: 100, backgroundColor: "#000", overflow: "hidden" },
  adMedia: { width: 100, height: 100, backgroundColor: "#F0F0F0" },
  adBody: { flex: 1, padding: 12, justifyContent: "space-between" },
  adTitle: { fontSize: 14, fontWeight: "600", color: "#1A1A1A", marginBottom: 4 },
  adPrice: { fontSize: 16, fontWeight: "700", color: ACCENT, marginBottom: 8 },
  adStats: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  statText: { fontSize: 12, color: "#666" },
  statusBadge: { backgroundColor: "#4CAF50", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  soldBadge: { backgroundColor: "#666" },
  statusText: { color: "#FFF", fontSize: 10, fontWeight: "600" },
  empty: { backgroundColor: "#FFF", padding: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  emptyTitle: { fontSize: 16, fontWeight: "600", color: "#666", marginTop: 16, marginBottom: 8 },
  emptySub: { fontSize: 14, color: "#999", textAlign: "center" },
});
