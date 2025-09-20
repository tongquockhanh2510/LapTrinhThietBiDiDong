import React from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const shops = [
  {
    id: '1',
    name: 'Ca nấu lẩu, nấu mì mini...',
    shop: 'Shop Devang',
    image: require('./assets/anh1.jpg'),
  },
  {
    id: '2',
    name: '1KG KHÔ GÀ BƠ TỎI ...',
    shop: 'Shop LTD Food',
    image: require('./assets/anh2.jpg'),
  },
  {
    id: '3',
    name: 'Xe cần cẩu đa năng',
    shop: 'Shop Thế giới đồ chơi',
    image: require('./assets/anh3.png'),
  },
  {
    id: '4',
    name: 'Đồ chơi dạng mô hình',
    shop: 'Shop Thế giới đồ chơi',
    image: require('./assets/anh4.jpg'),
  },
  {
    id: '5',
    name: 'Lãnh đạo giản đơn',
    shop: 'Shop Minh Long Book',
    image: require('./assets/anh5.png'),
  },
  {
    id: '6',
    name: 'Hiểu lòng con trẻ',
    shop: 'Shop Minh Long Book',
    image: require('./assets/anh6.png'),
  },
];

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <MaterialIcons name="check-box" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Bạn có thắc mắc với sản phẩm vừa xem. Đừng ngại chat với shop!
        </Text>
      </View>

      <FlatList
        data={shops}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={item.image}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemTextBox}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemShop}>{item.shop}</Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <MaterialIcons name="menu" size={28} color="#0099ff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Ionicons name="home" size={28} color="#0099ff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <MaterialIcons name="chat" size={28} color="#0099ff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00b9f1',
    height: 56,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  headerIcon: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  description: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  descriptionText: {
    color: '#444',
    fontSize: 14,
  },
  list: {
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  itemTextBox: {
    flex: 1,
  },
  itemName: {
    fontWeight: '500',
    fontSize: 15,
    color: '#222',
  },
  itemShop: {
    fontSize: 13,
    color: '#e53935',
    marginTop: 4,
  },
  chatButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
  },
  footerIcon: {
    padding: 8,
  },
});