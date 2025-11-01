import TransactionItem from '@/components/TransactionItem';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getAllTransactions, initDatabase } from '@/services/database';
import { Transaction } from '@/types/transaction';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

  // Initialize database on component mount
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
        setIsDatabaseReady(true);
        await loadTransactions();
      } catch (error) {
        console.error('Failed to setup database:', error);
      }
    };

    setupDatabase();
  }, []);

  // Reload transactions when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (isDatabaseReady) {
        loadTransactions();
      }
    }, [isDatabaseReady])
  );

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = () => {
    router.push('/add-transaction');
  };

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
              onPress={handleAddTransaction}
            >
              <Text style={styles.addButtonText}>+ Thêm Thu/Chi</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <Text style={[styles.listTitle, { color: colors.text }]}>
              Danh sách giao dịch
            </Text>
            {isLoading ? (
              <Text style={[styles.emptyText, { color: colors.icon }]}>Đang tải...</Text>
            ) : transactions.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.icon }]}>
                Chưa có giao dịch nào. Nhấn nút "Thêm Thu/Chi" để bắt đầu!
              </Text>
            ) : (
              <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            )}
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
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});
