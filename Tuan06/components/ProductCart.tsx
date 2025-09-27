import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";

export default function ProductCardScreen({ navigation }) {
  return (
    <View style={styles.card}>
      <Image
        source={require('../assets/image/mau1.png')}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.productTitle}>
        <Text style={styles.highlight}>Điện thoại Vsmart Joy 3</Text> - Hàng chính hãng
      </Text>
      <View style={styles.ratingRow}>
        <Text style={styles.stars}>★★★★★</Text>
        <Text style={styles.reviewCount}>Xem 826 đánh giá</Text>
      </View>
      <Text style={styles.price}>1.790.000 đ</Text>
      <Text style={styles.oldPrice}>1.990.000 đ</Text>
      <Text style={styles.cashback}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
      <Pressable style={styles.selectBox} onPress={() => navigation.navigate('ColorPicker')}>
        <Text style={styles.selectText}>4 MÀU - CHỌN MÀU</Text>
      </Pressable>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... giữ nguyên styles như bạn đang dùng

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
    minHeight: height,
  },
  card: {
    width: width,
    minHeight: height,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 0,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: width * 0.6,
    height: height * 0.32,
    borderRadius: 16,
    marginBottom: 18,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  highlight: {
    backgroundColor: "#ffe34c",
    color: "#e53a1e",
    fontWeight: "bold",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  stars: {
    color: "#ffd600",
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  reviewCount: {
    backgroundColor: "#ffe34c",
    color: "#333",
    fontSize: 16,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  price: {
    fontWeight: "bold",
    color: "#e53a1e",
    fontSize: 28,
    marginTop: 10,
    marginBottom: 4,
  },
  oldPrice: {
    color: "#999",
    fontSize: 18,
    textDecorationLine: "line-through",
    marginBottom: 6,
  },
  cashback: {
    color: "#e53a1e",
    backgroundColor: "#ffe4e4",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 3,
    paddingHorizontal: 6,
    marginBottom: 18,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 18,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  selectText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
  },
  buyButton: {
    backgroundColor: "#e53a1e",
    borderRadius: 10,
    paddingVertical: 18,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1,
  },
});