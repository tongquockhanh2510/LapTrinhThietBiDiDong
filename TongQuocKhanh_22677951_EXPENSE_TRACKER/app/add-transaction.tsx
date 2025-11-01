import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { addTransaction } from '@/services/database';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddTransactionScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  // Using useRef to manage form inputs
  const titleInputRef = useRef<TextInput>(null);
  const amountInputRef = useRef<TextInput>(null);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'Thu' | 'Chi'>('Chi');

  const clearForm = () => {
    setTitle('');
    setAmount('');
    setType('Chi');
    // Clear inputs using refs
    titleInputRef.current?.clear();
    amountInputRef.current?.clear();
  };

  const handleSave = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên khoản chi!');
      return;
    }

    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ!');
      return;
    }

    try {
      await addTransaction(title.trim(), amountNum, type);
      Alert.alert('Thành công', 'Đã thêm giao dịch mới!', [
        {
          text: 'OK',
          onPress: () => {
            clearForm();
            router.back();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm giao dịch. Vui lòng thử lại!');
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Custom Header */}
      <View style={[styles.header, { backgroundColor: colors.tint, borderBottomColor: colors.icon + '30' }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Ionicons name="wallet-outline" size={28} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Thêm giao dịch</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Decorative top section */}
            <View style={styles.decorativeTop}>
              <View style={[styles.decorativeCircle, styles.circle1, { backgroundColor: colors.tint + '20' }]} />
              <View style={[styles.decorativeCircle, styles.circle2, { backgroundColor: colors.tint + '15' }]} />
            </View>
            {/* Title Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                <Ionicons name="document-text-outline" size={18} color={colors.text} /> Tên khoản chi *
              </Text>
              <TextInput
                ref={titleInputRef}
                style={[
                  styles.input,
                  { backgroundColor: colors.background, borderColor: colors.icon, color: colors.text },
                ]}
                placeholder="Nhập tên khoản chi..."
                placeholderTextColor={colors.icon}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Amount Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                <Ionicons name="cash-outline" size={18} color={colors.text} /> Số tiền (VNĐ) *
              </Text>
              <TextInput
                ref={amountInputRef}
                style={[
                  styles.input,
                  { backgroundColor: colors.background, borderColor: colors.icon, color: colors.text },
                ]}
                placeholder="Nhập số tiền..."
                placeholderTextColor={colors.icon}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>

            {/* Type Selection */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>
                <Ionicons name="swap-horizontal-outline" size={18} color={colors.text} /> Loại giao dịch *
              </Text>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'Chi' && styles.typeButtonActive,
                    type === 'Chi' && { backgroundColor: '#F44336' },
                  ]}
                  onPress={() => setType('Chi')}
                >
                  <Ionicons 
                    name="remove-circle" 
                    size={24} 
                    color={type === 'Chi' ? '#fff' : '#F44336'} 
                  />
                  <Text
                    style={[styles.typeButtonText, type === 'Chi' && styles.typeButtonTextActive]}
                  >
                    Chi
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'Thu' && styles.typeButtonActive,
                    type === 'Thu' && { backgroundColor: '#4CAF50' },
                  ]}
                  onPress={() => setType('Thu')}
                >
                  <Ionicons 
                    name="add-circle" 
                    size={24} 
                    color={type === 'Thu' ? '#fff' : '#4CAF50'} 
                  />
                  <Text
                    style={[styles.typeButtonText, type === 'Thu' && styles.typeButtonTextActive]}
                  >
                    Thu
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.tint }]}
              onPress={handleSave}
            >
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>Lưu giao dịch</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: colors.icon }]}
              onPress={() => router.back()}
            >
              <Ionicons name="close-circle-outline" size={20} color={colors.text} />
              <Text style={[styles.cancelButtonText, { color: colors.text, marginLeft: 6 }]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerIcon: {
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  decorativeTop: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    width: 150,
    height: 150,
    top: 0,
    right: 0,
  },
  circle2: {
    width: 100,
    height: 100,
    top: 80,
    right: 80,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 6,
  },
  typeButtonActive: {
    borderColor: 'transparent',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1.5,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
