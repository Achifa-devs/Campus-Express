import React, { useMemo } from "react";
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const POSITION_MAP = {
  bottom: {
    justifyContent: "flex-end",
    marginTop: SCREEN_HEIGHT * 0.4,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    justifyContent: "flex-start",
  },
};

const DEFAULT_POSITION = "bottom";

export default function SellModal({
  visible,
  onClose,
  children,
  animationType = "slide",
  transparent = true,
  position = DEFAULT_POSITION,
}) {
  const containerStyle = useMemo(
    () => [s.wrapper, POSITION_MAP[position] ?? POSITION_MAP[DEFAULT_POSITION]],
    [position]
  );

  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={s.backdrop}>
        <Pressable
          style={s.backdropHit}
          onPress={onClose}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
        />
        <View style={containerStyle}>
          <View style={s.panel}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropHit: {
    flex: 1,
    width: "100%",
  },
  wrapper: {
    flex: 1,
  },
  panel: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
