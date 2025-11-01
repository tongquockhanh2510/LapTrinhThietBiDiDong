import TransactionItem from '@/components/TransactionItem';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Transaction } from '@/types/transaction';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Sample data for demonstration
  const sampleTransactions: Transaction[] = [
    {
      id: 1,
      title: 'Lương tháng 11',
      amount: 15000000,
      createdAt: new Date(2025, 10, 1, 9, 0).toISOString(),
      type: 'Thu',
    },
    {
      id: 2,
      title: 'Mua sắm tạp hóa',
      amount: 500000,
      createdAt: new Date(2025, 10, 1, 10, 30).toISOString(),
      type: 'Chi',
    },
    {
      id: 3,
      title: 'Tiền điện tháng 10',
      amount: 350000,
      createdAt: new Date(2025, 10, 1, 14, 15).toISOString(),
      type: 'Chi',
    },
    {
      id: 4,
      title: 'Bán đồ cũ',
      amount: 1200000,
      createdAt: new Date(2025, 10, 1, 16, 45).toISOString(),
      type: 'Thu',
    },
    {
      id: 5,
      title: 'Ăn uống',
      amount: 200000,
      createdAt: new Date(2025, 10, 1, 19, 0).toISOString(),
      type: 'Chi',
    },
  ];

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.tint }]}>
          <Text style={styles.headerTitle}>EXPENSE TRACKER</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Quản lý chi tiêu cá nhân
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: colors.tint }]}
            >
              <Text style={styles.addButtonText}>+ Thêm Thu/Chi</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <Text style={[styles.listTitle, { color: colors.text }]}>
              Danh sách giao dịch
            </Text>
            <FlatList
              data={sampleTransactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  addButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});
