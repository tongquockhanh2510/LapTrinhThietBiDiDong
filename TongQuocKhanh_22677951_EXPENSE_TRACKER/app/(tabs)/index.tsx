import TransactionItem from '@/components/TransactionItem';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getApiBaseUrl, setApiBaseUrl, syncTransactionsToAPI } from '@/services/api';
import { getAllTransactions, initDatabase } from '@/services/database';
import { Transaction } from '@/types/transaction';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Thu' | 'Chi'>('all');

  // Initialize database on component mount
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
        setIsDatabaseReady(true);
        await loadTransactions();
        
        // Load saved API URL
        const savedUrl = await AsyncStorage.getItem('mockapi_url');
        if (savedUrl) {
          setApiUrl(savedUrl);
          setApiBaseUrl(savedUrl);
        }
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  }, []);

  const handleSyncPress = () => {
    setShowSyncModal(true);
  };

  const handleSaveApiUrl = async () => {
    if (!apiUrl.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập URL API');
      return;
    }

    try {
      await AsyncStorage.setItem('mockapi_url', apiUrl);
      setApiBaseUrl(apiUrl);
      Alert.alert('Thành công', 'Đã lưu URL API');
      setShowSyncModal(false);
    } catch (error) {
      console.error('Failed to save API URL:', error);
      Alert.alert('Lỗi', 'Không thể lưu URL API');
    }
  };

  const handleSync = async () => {
    const currentApiUrl = getApiBaseUrl() || apiUrl.trim();
    
    if (!currentApiUrl) {
      Alert.alert('Lỗi', 'Vui lòng nhập và lưu URL API trước khi đồng bộ');
      return;
    }

    Alert.alert(
      'Xác nhận đồng bộ',
      'Thao tác này sẽ xóa toàn bộ dữ liệu trên API và upload lại từ thiết bị. Bạn có chắc chắn?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng bộ',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsSyncing(true);
              setShowSyncModal(false);
              
              // Make sure API URL is set
              setApiBaseUrl(currentApiUrl);
              
              // Only sync non-deleted transactions
              const activeTransactions = transactions.filter(t => !t.isDeleted);
              await syncTransactionsToAPI(activeTransactions);
              
              Alert.alert('Thành công', `Đã đồng bộ ${activeTransactions.length} giao dịch lên API`);
            } catch (error) {
              console.error('Sync failed:', error);
              Alert.alert('Lỗi', 'Không thể đồng bộ dữ liệu. Vui lòng kiểm tra URL API');
            } finally {
              setIsSyncing(false);
            }
          },
        },
      ]
    );
  };

  // Filter transactions based on search query and selected filter
  const filteredTransactions = useMemo(() => {
    let result = transactions;
    
    // Filter by type
    if (selectedFilter !== 'all') {
      result = result.filter(transaction => transaction.type === selectedFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(transaction => 
        transaction.title.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query) ||
        transaction.type.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [transactions, searchQuery, selectedFilter]);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionItem transaction={item} onDeleted={loadTransactions} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.tint }]}>
          <Text style={styles.headerTitle}>EXPENSE TRACKER</Text>
          <TouchableOpacity 
            style={styles.syncButton}
            onPress={handleSyncPress}
            disabled={isSyncing}
            activeOpacity={0.7}
          >
            <View style={styles.syncIconContainer}>
              <Ionicons name={isSyncing ? "sync" : "cloud-upload-outline"} size={26} color="#fff" />
            </View>
          </TouchableOpacity>
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

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
            <Ionicons name="search" size={20} color={colors.icon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Tìm kiếm giao dịch..."
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

          {/* Filter Bar */}
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[
                styles.filterButton,
                selectedFilter === 'all' && styles.filterButtonActive,
                { borderColor: colors.icon },
                selectedFilter === 'all' && { backgroundColor: colors.tint, borderColor: colors.tint }
              ]}
              onPress={() => setSelectedFilter('all')}
            >
              <Ionicons 
                name="list-outline" 
                size={18} 
                color={selectedFilter === 'all' ? '#fff' : colors.text} 
              />
              <Text style={[
                styles.filterButtonText,
                { color: selectedFilter === 'all' ? '#fff' : colors.text }
              ]}>
                Tất cả
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.filterButton,
                selectedFilter === 'Thu' && styles.filterButtonActive,
                { borderColor: colors.icon },
                selectedFilter === 'Thu' && { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
              ]}
              onPress={() => setSelectedFilter('Thu')}
            >
              <Ionicons 
                name="arrow-down-circle-outline" 
                size={18} 
                color={selectedFilter === 'Thu' ? '#fff' : '#4CAF50'} 
              />
              <Text style={[
                styles.filterButtonText,
                { color: selectedFilter === 'Thu' ? '#fff' : '#4CAF50' }
              ]}>
                Thu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.filterButton,
                selectedFilter === 'Chi' && styles.filterButtonActive,
                { borderColor: colors.icon },
                selectedFilter === 'Chi' && { backgroundColor: '#F44336', borderColor: '#F44336' }
              ]}
              onPress={() => setSelectedFilter('Chi')}
            >
              <Ionicons 
                name="arrow-up-circle-outline" 
                size={18} 
                color={selectedFilter === 'Chi' ? '#fff' : '#F44336'} 
              />
              <Text style={[
                styles.filterButtonText,
                { color: selectedFilter === 'Chi' ? '#fff' : '#F44336' }
              ]}>
                Chi
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <Text style={[styles.listTitle, { color: colors.text }]}>
              Danh sách giao dịch {searchQuery ? `(${filteredTransactions.length})` : `(${transactions.length})`}
            </Text>
            {isLoading ? (
              <Text style={[styles.emptyText, { color: colors.icon }]}>Đang tải...</Text>
            ) : filteredTransactions.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.icon }]}>
                {searchQuery ? 'Không tìm thấy giao dịch nào' : 'Chưa có giao dịch nào. Nhấn nút "Thêm Thu/Chi" để bắt đầu!'}
              </Text>
            ) : (
              <FlatList
                data={filteredTransactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.tint]}
                    tintColor={colors.tint}
                  />
                }
              />
            )}
          </View>
        </View>
      </View>

      {/* Sync Modal */}
      <Modal
        visible={showSyncModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSyncModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Đồng bộ với MockAPI</Text>
              <TouchableOpacity onPress={() => setShowSyncModal(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalLabel, { color: colors.text }]}>URL API:</Text>
            <TextInput
              style={[styles.modalInput, { 
                backgroundColor: colorScheme === 'dark' ? '#2c2c2c' : '#f5f5f5',
                color: colors.text,
                borderColor: colors.icon
              }]}
              value={apiUrl}
              onChangeText={setApiUrl}
              placeholder="https://your-id.mockapi.io/api/v1/transactions"
              placeholderTextColor={colors.icon}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={[styles.modalInfo, { color: colors.icon }]}>
              <Ionicons name="information-circle-outline" size={16} color={colors.icon} />
              {' '}Nhập URL endpoint từ MockAPI.io của bạn
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton, { backgroundColor: colors.tint }]}
                onPress={handleSaveApiUrl}
              >
                <Ionicons name="save-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Lưu URL</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalButton, styles.syncButtonModal, { backgroundColor: '#4CAF50' }]}
                onPress={handleSync}
                disabled={!apiUrl.trim()}
              >
                <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Đồng bộ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  syncButton: {
    position: 'absolute',
    right: 16,
  },
  syncIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  filterButtonActive: {
    // Background color set dynamically
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  modalInfo: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  saveButton: {
    // backgroundColor set dynamically
  },
  syncButtonModal: {
    // backgroundColor set dynamically
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
