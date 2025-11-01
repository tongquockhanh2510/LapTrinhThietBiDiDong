import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { deleteTransaction } from '@/services/database';
import { Transaction } from '@/types/transaction';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TransactionItemProps {
  transaction: Transaction;
  onDeleted?: () => void;
  onLongPress?: () => void;
}

export default function TransactionItem({ transaction, onDeleted, onLongPress }: TransactionItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  const isIncome = transaction.type === 'Thu';
  const typeColor = isIncome ? '#4CAF50' : '#F44336';
  const amountPrefix = isIncome ? '+' : '-';

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Format amount with thousand separators
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('vi-VN');
  };

  const handlePress = () => {
    router.push({
      pathname: '/edit-transaction',
      params: {
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount.toString(),
        type: transaction.type,
      },
    });
  };

  const handleLongPress = () => {
    // If custom onLongPress is provided (for restore in trash), use it
    if (onLongPress) {
      onLongPress();
      return;
    }

    // Otherwise, show delete confirmation
    Alert.alert(
      'Xóa giao dịch',
      `Bạn có chắc muốn xóa "${transaction.title}"?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTransaction(transaction.id);
              Alert.alert('Thành công', 'Đã xóa giao dịch!');
              onDeleted?.();
            } catch (error) {
              console.error('Error deleting transaction:', error);
              Alert.alert('Lỗi', 'Không thể xóa giao dịch!');
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.background, borderColor: colors.icon }]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.typeIndicator, { backgroundColor: typeColor }]} />
        <View style={styles.infoContainer}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {transaction.title}
          </Text>
          <Text style={[styles.date, { color: colors.icon }]}>
            {formatDate(transaction.createdAt)}
          </Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
          <Text style={[styles.typeText, { color: typeColor }]}>
            {transaction.type}
          </Text>
        </View>
        <Text style={[styles.amount, { color: typeColor }]}>
          {amountPrefix}{formatAmount(transaction.amount)} ₫
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  typeIndicator: {
    width: 4,
    height: 48,
    borderRadius: 2,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
