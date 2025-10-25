import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const data = [
  {
    id: 1,
    color: 'Xanh dương',
    provider: 'Shoppe',
    price: 1500000,
    image:
      'https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/s/vsmart-joy-4_1__2_3_2_2_2_1_1.png',
  },
  {
    id: 2,
    color: 'Đỏ',
    provider: 'Lazada',
    price: 1600000,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPNHkb3TOJdgYate4hffgLvD1LlQ9kXI5Iw&s',
  },
  {
    id: 3,
    color: 'Đen',
    provider: 'Tiki',
    price: 1700000,
    image:
      'https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/s/vsmart-joy-4_2__2_3_1_1_3_2_1.png',
  },
  {
    id: 4,
    color: 'Xanh đậm',
    provider: 'Tiktok',
    price: 1800000,
    image:
      'https://cdn2.cellphones.com.vn/358x/media/catalog/product/6/3/637164276578898043_vsmart-joy-3-tim-1_2.png',
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Chi tiết sản phẩm' }}
        />
        <Stack.Screen
          name="ChooseColor"
          component={ChooseColorScreen}
          options={{ title: 'Chọn màu' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ChooseColorScreen({ navigation }) {
  const [product, setProduct] = useState(null);

  const handlePress = (id) => {
    const productFound = data.find((item) => item.id === id);
    setProduct(productFound || null);
  };

  const onDone = () => {
    if (!product) {
      Alert.alert('Thông báo', 'Vui lòng chọn một màu trước khi hoàn tất.');
      return;
    }
    // navigate back to Home and pass the selected product info as params
    navigation.navigate('Home', {
      image: product.image,
      price: product.price,
      color: product.color,
      provider: product.provider,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <View style={{ backgroundColor: 'white', padding: 10, flexDirection: 'row' }}>
          <Image
            style={{ width: 120, height: 120 }}
            source={product ? { uri: product.image } : require('./assets/sp.png')}
            // require('./assets/sp.png') tồn tại trong thư mục assets theo ảnh bạn gửi
            resizeMode="contain"
          />
          <View style={{ marginLeft: 12, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>Điện Thoại Vsmart Joy 3</Text>
            <Text>Hàng chính hãng</Text>
            <Text>Màu: {product ? product.color : '-'}</Text>
            <Text>
              Cung cấp bởi <Text style={{ fontWeight: '700' }}>{product?.provider ?? '-'}</Text>
            </Text>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>
              {product ? product.price.toLocaleString() + ' đ' : '-'}
            </Text>
          </View>
        </View>

        <View style={{ padding: 10, backgroundColor: 'lightgray', marginTop: 12, borderRadius: 8 }}>
          <Text>Chọn một màu bên dưới:</Text>

          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Pressable
              onPress={() => handlePress(1)}
              style={[styles.colorBox, { backgroundColor: '#C5F1FB' }]}
            />
            <Pressable
              onPress={() => handlePress(2)}
              style={[styles.colorBox, { backgroundColor: '#F30D0D' }]}
            />
            <Pressable
              onPress={() => handlePress(3)}
              style={[styles.colorBox, { backgroundColor: '#000000' }]}
            />
            <Pressable
              onPress={() => handlePress(4)}
              style={[styles.colorBox, { backgroundColor: '#234896' }]}
            />
          </View>

          <Pressable onPress={onDone} style={styles.doneButton}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Xong</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation, route }) {
  // fallback values if no params passed
  const imageUri =
    route.params?.image ||
    'https://cdn2.cellphones.com.vn/358x/media/catalog/product/v/s/vsmart-joy-4_1__2_3_2_2_2_1_1.png';
  const price = route.params?.price ? route.params.price.toLocaleString() + ' đ' : '1.500.000 đ';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: '70%', height: 300 }} source={{ uri: imageUri }} resizeMode="contain" />
        </View>

        <Text style={{ marginTop: 12 }}>
          Điện Thoại Vsmart Joy 3 - Hàng chính hãng
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.star} source={require('./assets/star.png')} />
            <Image style={styles.star} source={require('./assets/star.png')} />
            <Image style={styles.star} source={require('./assets/star.png')} />
            <Image style={styles.star} source={require('./assets/star.png')} />
            <Image style={styles.star} source={require('./assets/star.png')} />
          </View>
          <Text style={{ marginLeft: 8 }}>(Xem 828 đánh giá)</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{price}</Text>
          <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray', textDecorationLine: 'line-through' }}>
            {price}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: 'red', fontSize: 12, fontWeight: '500' }}>
            Ở ĐÂU RẺ HƠN HOÀN TIỀN
          </Text>
          <Image style={{ marginLeft: 8 }} source={require('./assets/Group1.png')} />
        </View>

        <Pressable onPress={() => navigation.navigate('ChooseColor')} style={styles.chooseButton}>
          <Text style={{ color: 'black' }}>4 MÀU - CHỌN MÀU</Text>
          <Image source={require('./assets/Vector.png')} />
        </Pressable>

        <Pressable style={styles.buyButton}>
          <Text style={{ color: 'white', fontWeight: '700' }}>CHỌN MUA</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  colorBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  doneButton: {
    marginTop: 12,
    backgroundColor: '#4D6DC1',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  star: { width: 18, height: 18, marginRight: 2, resizeMode: 'contain' },
  chooseButton: {
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyButton: {
    marginTop: 24,
    borderRadius: 10,
    backgroundColor: 'red',
    paddingVertical: 15,
    alignItems: 'center',
  },
});