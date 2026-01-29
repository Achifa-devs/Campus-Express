import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

import BottomModal from "../reuseables/BtmModal";
import DropdownComp from "../reuseables/Dropdown";
import { set_user } from "../../redux/user";

const ACCENT = "#FFA500";
const API = {
  profile: "https://cs-node.vercel.app/profile-update",
  upload: "https://cs-node.vercel.app/upload",
  delete: "https://cs-node.vercel.app/delete",
  photo: "https://cs-node.vercel.app/update-photo",
};

const IMAGE_PICKER_OPTIONS = {
  mediaType: "photo",
  quality: 0.8,
  maxWidth: 500,
  maxHeight: 500,
};

const GENDER_OPTIONS = [{ title: "Male" }, { title: "Female" }];

function useLocationData() {
  const address = require("../json/address.json");
  const { data: stateList, school_choices } = require("../json/location.json");
  const campusByState = useMemo(
    () => (stateList ? Object.values(school_choices || {}).reverse() : []),
    [stateList, school_choices]
  );
  return { stateList: stateList || [], campusByState };
}

function AvatarBlock({ uri, onPress }) {
  return (
    <Pressable style={s.avatarWrap} onPress={onPress}>
      {uri ? (
        <Image source={{ uri }} style={s.avatar} />
      ) : (
        <MaterialIcons name="account-circle" color={ACCENT} size={60} />
      )}
    </Pressable>
  );
}

function FormRow({ label, children, style }) {
  return (
    <View style={[s.field, style]}>
      <Text style={s.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

function TextField({ value, onChangeText, placeholder, ...rest }) {
  return (
    <TextInput
      style={s.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      {...rest}
    />
  );
}

function PhotoModal({ visible, onClose, user, photo, onPhotoChange, onSave }) {
  const [loading, setLoading] = useState(false);

  const pickImage = useCallback(() => {
    launchImageLibrary(IMAGE_PICKER_OPTIONS, async (res) => {
      if (res.didCancel || res.errorCode) return;
      const asset = res.assets?.[0];
      if (!asset) return;
      setLoading(true);
      try {
        const form = new FormData();
        form.append("file", {
          uri: asset.uri,
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          type: asset.type || "image/jpeg",
        });
        const { data } = await axios.post(API.upload, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data?.success && data?.data?.url) onPhotoChange(data.data.url);
      } catch (e) {
        Alert.alert("Error", "Upload failed.");
      } finally {
        setLoading(false);
      }
    });
  }, [onPhotoChange]);

  const handleSave = useCallback(async () => {
    const ok = await onSave();
    if (ok) onClose();
  }, [onSave, onClose]);

  return (
    <BottomModal visible={visible} onClose={onClose}>
      <ScrollView style={s.modalScroll} showsVerticalScrollIndicator={false}>
        <View style={s.modalHeader}>
          <Text style={s.modalTitle}>Profile Settings</Text>
        </View>
        <View style={s.modalInfo}>
          <MaterialIcons name="info" size={24} color={ACCENT} />
          <Text style={s.modalInfoText}>
            You are trying to update your cover photo.
          </Text>
          <Text style={s.modalInfoLink}>Learn more in our help articles.</Text>
        </View>
        <View style={s.modalPhotoSection}>
          <Text style={s.modalPhotoLabel}>My Photo</Text>
          <View style={s.modalPhotoRow}>
            <Pressable style={s.photoCircle} onPress={pickImage}>
              {photo ? (
                <Image source={{ uri: photo }} style={s.photoPreview} />
              ) : (
                <MaterialIcons name="photo-camera" size={32} color="#6C757D" />
              )}
            </Pressable>
            <Pressable
              style={({ pressed }) => [s.uploadBtn, pressed && s.btnPressed]}
              onPress={user?.photo ? pickImage : pickImage}
            >
              <MaterialIcons name="cloud-upload" size={18} color="#FFF" />
              <Text style={s.uploadBtnText}>
                {user?.photo ? "Change Photo" : "Upload Photo"}
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [s.setupBtn, pressed && s.btnPressed]}
          onPress={handleSave}
        >
          <Text style={s.setupBtnText}>Set up</Text>
        </Pressable>
      </ScrollView>
    </BottomModal>
  );
}

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((s) => s.user?.user ?? null);
  const { stateList, campusByState } = useLocationData();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [campus, setCampus] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFname(user.fname ?? "");
    setLname(user.lname ?? "");
    setEmail(user.email ?? "");
    setPhone(user.phone ?? "");
    setState(user.state ?? "");
    setCampus(user.campus ?? "");
    setGender(user.gender != null ? String(user.gender) : "");
    setPhoto(user.photo ?? "");
  }, [user]);

  const campusOptions = useMemo(() => {
    if (!state || !stateList?.length) return [];
    const i = stateList.findIndex(
      (item) => (item.title || item.name || "").toLowerCase() === state.toLowerCase()
    );
    return i >= 0 && campusByState[i] ? campusByState[i] : [];
  }, [state, stateList, campusByState]);

  const updateField = useCallback((value, name) => {
    if (name === "gender") setGender(value);
    else if (name === "state") setState(value);
    else if (name === "campus") setCampus(value);
  }, []);

  const saveProfile = useCallback(async () => {
    const required = [fname, lname, gender, campus, state];
    const valid = required.every((v) => v != null && String(v).trim() !== "");
    if (!valid) {
      Alert.alert("Field missing", "Please ensure no field is empty!");
      return;
    }
    setSaving(true);
    try {
      const { data } = await axios.post(API.profile, {
        fname,
        lname,
        email,
        phone,
        campus,
        state,
        gender,
        user_id: user?.user_id,
      });
      if (data?.success) navigation.goBack();
      else Alert.alert("Error", "Internal server error please try again.");
    } catch (e) {
      Alert.alert("Error", "Internal server error please try again.");
    } finally {
      setSaving(false);
    }
  }, [fname, lname, email, phone, campus, state, gender, user?.user_id, navigation]);

  const savePhoto = useCallback(async () => {
    setSaving(true);
    try {
      const { data } = await axios.post(API.photo, {
        user_id: user?.user_id,
        photo,
      });
      if (data?.success && data?.data) {
        dispatch(set_user(data.data));
        return true;
      }
      Alert.alert("Error", "Internal server error please try again.");
      return false;
    } catch (e) {
      Alert.alert("Error", "Internal server error please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }, [user?.user_id, photo, dispatch]);

  useEffect(() => {
    if (!user) return;
    dispatch(set_user({ ...user, photo: photo || user.photo }));
  }, [photo]);

  const genderDisplay = useMemo(() => {
    const n = parseInt(gender, 10);
    return n === 1 ? "Male" : n === 2 ? "Female" : gender || "";
  }, [gender]);

  if (!user) {
    return (
      <View style={s.loadingWrap}>
        <ActivityIndicator size="large" color={ACCENT} />
      </View>
    );
  }

  return (
    <>
      <PhotoModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        photo={photo}
        onPhotoChange={setPhoto}
        onSave={savePhoto}
      />
      <View style={s.root}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollInner}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.avatarSection}>
            <AvatarBlock
              uri={photo || user?.photo}
              onPress={() => setModalOpen(true)}
            />
          </View>

          <Text style={s.sectionTitle}>Personal Details</Text>
          <View style={s.twoCol}>
            <FormRow label="Firstname" style={s.half}>
              <TextField
                value={fname}
                onChangeText={setFname}
                placeholder="FirstName"
              />
            </FormRow>
            <FormRow label="Lastname" style={s.half}>
              <TextField
                value={lname}
                onChangeText={setLname}
                placeholder="LastName"
              />
            </FormRow>
          </View>

          <FormRow label="Gender">
            <DropdownComp
              updateData={updateField}
              default_value={genderDisplay}
              dropdownData={GENDER_OPTIONS}
              input_name="gender"
              placeholder="Select your gender"
            />
          </FormRow>

          <FormRow label="Phone number">
            <TextField
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone"
              keyboardType="phone-pad"
            />
          </FormRow>

          <FormRow label="Email">
            <TextField
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </FormRow>

          <Text style={s.sectionTitle}>Address</Text>

          <FormRow label="State">
            <DropdownComp
              updateData={updateField}
              default_value={state}
              dropdownData={stateList}
              dropdownPosition="top"
              input_name="state"
              placeholder="Select your state"
            />
          </FormRow>

          <FormRow label="Campus">
            <DropdownComp
              updateData={updateField}
              default_value={campus}
              dropdownData={campusOptions}
              dropdownPosition="top"
              input_name="campus"
              placeholder="Select your campus"
            />
          </FormRow>
        </ScrollView>

        <View style={s.footer}>
          <Pressable
            style={({ pressed }) => [s.saveBtn, pressed && s.btnPressed]}
            onPress={saveProfile}
            disabled={saving}
          >
            <Text style={s.saveBtnText}>
              {saving ? "Saving…" : "Save"}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    paddingBottom: 24,
  },
  avatarSection: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWrap: {
    height: 60,
    width: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: ACCENT,
  },
  sectionTitle: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 25,
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "800",
    marginLeft: 5,
  },
  twoCol: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  half: {
    width: "48%",
  },
  field: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  fieldLabel: {
    color: "#000",
    marginLeft: 4,
    marginBottom: 6,
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "800",
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    borderColor: "#000",
    borderWidth: 0.7,
    borderRadius: 7,
    fontSize: 16,
  },
  footer: {
    height: 80,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtn: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ACCENT,
    borderRadius: 8,
  },
  btnPressed: {
    opacity: 0.9,
  },
  saveBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalScroll: {
    padding: 8,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D3436",
    textAlign: "center",
  },
  modalInfo: {
    backgroundColor: "#FFF8F6",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE5DE",
    marginBottom: 24,
  },
  modalInfoText: {
    fontSize: 16,
    color: "#2D3436",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 12,
  },
  modalInfoLink: {
    fontSize: 16,
    color: ACCENT,
    fontWeight: "600",
  },
  modalPhotoSection: {
    marginBottom: 24,
  },
  modalPhotoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 8,
  },
  modalPhotoRow: {
    alignItems: "center",
    marginBottom: 20,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#E9ECEF",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  photoPreview: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ACCENT,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  uploadBtnText: {
    color: "#FFF",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
  },
  setupBtn: {
    backgroundColor: ACCENT,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  setupBtnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
