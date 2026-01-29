import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { set_option } from "../../redux/option";

const OPTIONS = [
  { text: "Products", svg: "cube" },
  { text: "Lodges", svg: "bed" },
  { text: "Services", svg: "construct" },
];

const ACCENT = "#FFA500";

export default function Options() {
  const dispatch = useDispatch();
  const selectedOption = useSelector((s) => s?.option?.option);

  return (
    <View style={styles.container}>
      {OPTIONS.map((option, index) => {
        const isSelected = selectedOption === option.text;
        return (
          <TouchableOpacity
            key={option.text}
            style={styles.btn}
            onPress={() => dispatch(set_option(option.text))}
            activeOpacity={0.7}
          >
            <Ionicons
              name={option.svg}
              color={isSelected ? ACCENT : "#999"}
              size={20}
            />
            <Text style={[styles.txt, isSelected && styles.txtSelected]}>
              {option.text}
            </Text>
            {isSelected && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: 65,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  btn: {
    width: "33%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingBottom: 4,
  },
  txt: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    marginTop: 4,
  },
  txtSelected: {
    color: "#000",
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    bottom: -3,
    left: "50%",
    marginLeft: -12,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: ACCENT,
  },
});