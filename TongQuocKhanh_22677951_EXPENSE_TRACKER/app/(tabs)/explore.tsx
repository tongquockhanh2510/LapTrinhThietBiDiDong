import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getAllTransactions } from '@/services/database';
import { Transaction } from '@/types/transaction';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StatisticsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
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

  // Calculate statistics by month
  const monthlyStats = useMemo(() => {
    const stats: { [key: string]: { income: number; expense: number } } = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.createdAt);
      const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!stats[monthKey]) {
        stats[monthKey] = { income: 0, expense: 0 };
      }
      
      if (transaction.type === 'Thu') {
        stats[monthKey].income += transaction.amount;
      } else {
        stats[monthKey].expense += transaction.amount;
      }
    });
    
    // Get last 6 months
    const sortedMonths = Object.keys(stats).sort((a, b) => {
      const [monthA, yearA] = a.split('/').map(Number);
      const [monthB, yearB] = b.split('/').map(Number);
      return yearA === yearB ? monthA - monthB : yearA - yearB;
    }).slice(-6);
    
    return sortedMonths.map(month => ({
      month,
      income: stats[month].income,
      expense: stats[month].expense,
    }));
  }, [transactions]);

  // Calculate totals
  const totals = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'Thu') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    
    return {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.tint }]}>
          <Ionicons name="stats-chart-outline" size={28} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>THỐNG KÊ</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <View style={[styles.summaryCard, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="arrow-down-circle" size={32} color="#fff" />
              <Text style={styles.summaryLabel}>Tổng Thu</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(totals.income)}</Text>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: '#F44336' }]}>
              <Ionicons name="arrow-up-circle" size={32} color="#fff" />
              <Text style={styles.summaryLabel}>Tổng Chi</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(totals.expense)}</Text>
            </View>
          </View>

          <View style={[styles.balanceCard, { 
            backgroundColor: totals.balance >= 0 ? '#4CAF50' : '#F44336' 
          }]}>
            <Ionicons name="wallet-outline" size={28} color="#fff" />
            <Text style={styles.balanceLabel}>Số dư</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(totals.balance)}</Text>
          </View>

          {/* Chart */}
          <View style={styles.chartContainer}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>
              Biểu đồ Thu - Chi theo Tháng
            </Text>
            
            {isLoading ? (
              <Text style={[styles.emptyText, { color: colors.icon }]}>Đang tải...</Text>
            ) : monthlyStats.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.icon }]}>
                Chưa có dữ liệu thống kê
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                  data={{
                    labels: monthlyStats.map(s => s.month),
                    datasets: [
                      {
                        data: monthlyStats.map(s => s.income),
                        color: () => '#4CAF50',
                      },
                      {
                        data: monthlyStats.map(s => s.expense),
                        color: () => '#F44336',
                      },
                    ],
                    legend: ['Thu', 'Chi'],
                  }}
                  width={Math.max(screenWidth - 32, monthlyStats.length * 100)}
                  height={260}
                  yAxisLabel=""
                  yAxisSuffix="đ"
                  chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
                    backgroundGradientTo: colorScheme === 'dark' ? '#2c2c2c' : '#f5f5f5',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: () => colors.text,
                    style: {
                      borderRadius: 16,
                    },
                    propsForLabels: {
                      fontSize: 10,
                    },
                    barPercentage: 0.7,
                  }}
                  style={styles.chart}
                  fromZero
                  showValuesOnTopOfBars
                />
              </ScrollView>
            )}
          </View>

          {/* Monthly Details */}
          {monthlyStats.length > 0 && (
            <View style={styles.detailsContainer}>
              <Text style={[styles.detailsTitle, { color: colors.text }]}>
                Chi tiết theo tháng
              </Text>
              {monthlyStats.map((stat, index) => (
                <View 
                  key={stat.month} 
                  style={[styles.detailCard, { 
                    backgroundColor: colorScheme === 'dark' ? '#2c2c2c' : '#f5f5f5',
                    borderColor: colors.icon 
                  }]}
                >
                  <Text style={[styles.detailMonth, { color: colors.text }]}>
                    Tháng {stat.month}
                  </Text>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailIncomeLabel}>Thu:</Text>
                      <Text style={styles.detailIncomeAmount}>
                        +{formatCurrency(stat.income)}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailExpenseLabel}>Chi:</Text>
                      <Text style={styles.detailExpenseAmount}>
                        -{formatCurrency(stat.expense)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.detailBalance}>
                    <Text style={[styles.detailBalanceLabel, { color: colors.text }]}>
                      Chênh lệch:
                    </Text>
                    <Text style={[
                      styles.detailBalanceAmount,
                      { color: stat.income - stat.expense >= 0 ? '#4CAF50' : '#F44336' }
                    ]}>
                      {formatCurrency(stat.income - stat.expense)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
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
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.9,
  },
  summaryAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  balanceCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    opacity: 0.9,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  detailMonth: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailIncomeLabel: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  detailIncomeAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  detailExpenseLabel: {
    fontSize: 14,
    color: '#F44336',
    marginBottom: 4,
  },
  detailExpenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  detailBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  detailBalanceLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailBalanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
