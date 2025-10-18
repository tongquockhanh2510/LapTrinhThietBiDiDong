import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const Trang01 = () => {
  const [num, setNum] = useState<number>(1);
  const unitPrice = 141800;
  const originalPrice = 180000;

  const handleIncr = () => setNum(num + 1);
  const handleDecr = () => setNum(num > 1 ? num - 1 : 1);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.bookImg} source={require('../assets/book.png')} />
        <View style={{ margin: 10, flex: 1 }}>
          <Text style={styles.bookTitle}>Nguyên hàm tích phân và ứng dụng</Text>
          <Text style={styles.subTitle}>Cung cấp bởi Tiki Trading</Text>
          <Text style={styles.price}>{unitPrice.toLocaleString()} đ</Text>
          <Text style={styles.oldPrice}>{originalPrice.toLocaleString()} đ</Text>

          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={handleDecr}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{num}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={handleIncr}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.linkText}>Mua sau</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={{ margin: 10 }}>Mã giảm giá đã lưu</Text>
        <Text style={styles.linkText}>Xem tại đây</Text>
      </View>

      <View style={styles.discountRow}>
        <TouchableOpacity style={styles.discountBox}>
          <View style={styles.yellowBox} />
          <Text>Mã giảm giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={{ color: 'white' }}>Áp dụng</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={{ margin: 10 }}>Bạn có phiếu quà tặng Tiki/Got it/ Urbox?</Text>
        <Text style={styles.linkText}>Nhập tại đây?</Text>
      </View>

      <View style={styles.totalRow}>
        <Text style={{ margin: 10 }}>Tạm tính</Text>
        <Text style={styles.totalPrice}>{(unitPrice * num).toLocaleString()} đ</Text>
      </View>

      <View>
        <View style={styles.totalRow}>
          <Text style={{ margin: 10 }}>Thành tiền</Text>
          <Text style={styles.totalPrice}>{(unitPrice * num).toLocaleString()} đ</Text>
        </View>
        <TouchableOpacity style={styles.orderBtn}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>TIẾN HÀNH ĐẶT HÀNG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Trang01;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  bookImg: {
    width: 100,
    height: 140,
    resizeMode: 'contain',
  },
  bookTitle: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subTitle: {
    marginBottom: 5,
    color: 'gray',
  },
  price: {
    marginBottom: 5,
    fontSize: 18,
    color: 'red',
  },
  oldPrice: {
    marginBottom: 5,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    borderWidth: 1,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    width: 30,
    textAlign: 'center',
  },
  linkText: {
    margin: 10,
    color: '#134FEC',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  discountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
  },
  yellowBox: {
    backgroundColor: '#F2DD1B',
    width: 40,
    height: 20,
    marginEnd: 10,
  },
  applyBtn: {
    padding: 10,
    backgroundColor: '#0A5EB8',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    margin: 10,
    fontSize: 20,
    color: 'red',
  },
  orderBtn: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'red',
    alignItems: 'center',
  },
});
