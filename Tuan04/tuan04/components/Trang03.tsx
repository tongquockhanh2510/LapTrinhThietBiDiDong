import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Trang03 = () => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Image
          style={styles.productImg}
          source={require('../assets/usb.png')}
        />
        <Text style={styles.productName}>
          USB Bluetooth Music Receiver HJX-001 - Biến loa thường thành loa bluetooth
        </Text>
      </View>

      <Text style={styles.title}>Cực kỳ hài lòng</Text>
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons
              name={i <= rating ? 'star' : 'star-outline'}
              size={32}
              color="gold"
              style={{ marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addImgBtn}>
        <Ionicons name="camera-outline" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>Thêm hình ảnh</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.textBox}
        placeholder="Hãy chia sẻ những điều mà bạn thích về sản phẩm"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity style={styles.sendBtn}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Trang03;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  productImg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addImgBtn: {
    borderWidth: 1,
    borderColor: '#0A5EB8',
    borderRadius: 5,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  textBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  link: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 15,
  },
  sendBtn: {
    backgroundColor: '#0A5EB8',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
});
