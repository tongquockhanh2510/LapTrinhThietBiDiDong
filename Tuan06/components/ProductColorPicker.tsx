import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const COLORS = [
  { name: "Xanh nhạt", value: "#C5F3FF" },
  { name: "Đỏ", value: "#FF2222" },
  { name: "Đen", value: "#111111" },
  { name: "Xanh dương", value: "#2248A0" },
];

export default function ColorPickerScreen({ navigation }) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  return (
    <View style={styles.container}>
      {/* Header: Image + Title */}
      <View style={styles.header}>
        <Image
          source={require("../assets/image/mau1.png")}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.titleBox}>
          <Text style={styles.titleMain}>Điện Thoại Vsmart Joy 3</Text>
          <Text style={styles.titleSub}>Hàng chính hãng</Text>
        </View>
      </View>
      
      {/* Color picker */}
      <View style={styles.body}>
        <Text style={styles.label}>Chọn một màu bên dưới:</Text>
        <View style={styles.colorsContainer}>
          {COLORS.map((c, idx) => (
            <TouchableOpacity
              key={c.value}
              style={[
                styles.colorBox,
                {
                  backgroundColor: c.value,
                  borderWidth: selectedColor === c.value ? 3 : 1,
                  borderColor: selectedColor === c.value ? "#11c1ff" : "#444",
                },
              ]}
              onPress={() => setSelectedColor(c.value)}
            />
          ))}
        </View>
        {/* Example "Truong" badge for demo */}
        <View style={styles.truongBox}>
          <Text style={styles.truongText}>Truong</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.doneBtnText}>XONG</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... giữ nguyên styles như mẫu ở trên

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#F45A2D",
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 10,
    paddingBottom: 10,
    width: 220,
    overflow: "hidden",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    width: "100%",
    padding: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productImage: {
    width: 55,
    height: 70,
    borderRadius: 5,
    marginRight: 8,
  },
  titleBox: {
    backgroundColor: "#fff",
    borderColor: "#11ff1f",
    borderWidth: 1,
    paddingHorizontal: 2,
    marginTop: 6,
  },
  titleMain: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#3d3d3d",
  },
  titleSub: {
    fontSize: 11,
    color: "#333",
  },
  body: {
    width: "100%",
    backgroundColor: "#c7c7c7",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 8,
    position: "relative",
    minHeight: 180,
  },
  label: {
    fontSize: 13,
    color: "#222",
    marginBottom: 8,
  },
  colorsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  colorBox: {
    width: 50,
    height: 40,
    borderRadius: 6,
    marginVertical: 3,
  },
  truongBox: {
    position: "absolute",
    left: 2,
    top: 35,
    backgroundColor: "#a587ff",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  truongText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  doneBtn: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#3965b9",
    marginTop: 8,
    paddingVertical: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#19ff5b",
  },
  doneBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});