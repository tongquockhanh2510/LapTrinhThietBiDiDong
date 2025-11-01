import TransactionItem from '@/components/TransactionItem';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getDeletedTransactions } from '@/services/database';
import { Transaction } from '@/types/transaction';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrashScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [deletedTransactions, setDeletedTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Reload deleted transactions when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadDeletedTransactions();
    }, [])
  );

  const loadDeletedTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getDeletedTransactions();
      setDeletedTransactions(data);
    } catch (error) {
      console.error('Failed to load deleted transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter deleted transactions based on search query
  const filteredDeletedTransactions = useMemo(() => {
    if (!searchQuery.trim()) {
      return deletedTransactions;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return deletedTransactions.filter(transaction => 
      transaction.title.toLowerCase().includes(query) ||
      transaction.amount.toString().includes(query) ||
      transaction.type.toLowerCase().includes(query)
    );
  }, [deletedTransactions, searchQuery]);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} onDeleted={loadDeletedTransactions} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.tint }]}>
          <Ionicons name="trash-outline" size={28} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>THÙNG RÁC</Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color={colors.icon} />
            <Text style={[styles.infoText, { color: colors.icon }]}>
              Các giao dịch đã xóa sẽ được lưu ở đây
            </Text>
          </View>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
            <Ionicons name="search" size={20} color={colors.icon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Tìm kiếm trong thùng rác..."
              placeholderTextColor={colors.icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.icon} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.listContainer}>
            <Text style={[styles.listTitle, { color: colors.text }]}>
              Danh sách đã xóa {searchQuery ? `(${filteredDeletedTransactions.length})` : `(${deletedTransactions.length})`}
            </Text>
            {isLoading ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="reload-circle-outline" size={60} color={colors.icon} />
                <Text style={[styles.emptyText, { color: colors.icon }]}>Đang tải...</Text>
              </View>
            ) : filteredDeletedTransactions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="trash-outline" size={80} color={colors.icon} />
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  {searchQuery ? 'Không tìm thấy giao dịch nào' : 'Thùng rác trống'}
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.icon }]}>
                  {searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Chưa có giao dịch nào bị xóa'}
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredDeletedTransactions}
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
    flexDirection: 'row',
    gap: 8,
  },
  headerIcon: {
    marginRight: 4,
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});
