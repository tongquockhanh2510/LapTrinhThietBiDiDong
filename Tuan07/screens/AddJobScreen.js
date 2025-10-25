import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddJobScreen({ navigation, route }) {
  const initialText = route.params?.initialText ?? '';
  const [text, setText] = useState(initialText);

  useEffect(() => {
    // nếu có initialText (sửa), focus or thay đổi UI nếu cần — ví dụ đổi title nút
    setText(initialText);
  }, [initialText]);

  const handleFinish = () => {
    const trimmed = (text || '').trim();
    if (!trimmed) {
      Alert.alert('Nhắc', 'Vui lòng nhập công việc trước khi lưu.');
      return;
    }

    if (route.params?.onSave && typeof route.params.onSave === 'function') {
      // gọi callback truyền từ TaskList để thêm hoặc sửa
      route.params.onSave(trimmed);
      navigation.goBack();
      return;
    }

    // fallback: gửi param newJob về Tasks
    navigation.navigate('Tasks', { newJob: trimmed });
  };

  const isEditing = !!initialText;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
            <Ionicons name="arrow-back" size={22} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Image source={require('../assets/images/avata.png')} style={styles.avatar} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.hi}>Hi Twinkle</Text>
              <Text style={styles.sub}>Have a great day ahead</Text>
            </View>
          </View>
        </View>

        <View style={{ padding: 24, alignItems: 'center' }}>
          <Text style={styles.bigTitle}>{isEditing ? 'EDIT YOUR JOB' : 'ADD YOUR JOB'}</Text>

          <View style={styles.inputWrap}>
            <Ionicons name="document-text" size={18} color="#28a48b" style={{ marginLeft: 8 }} />
            <TextInput
              placeholder="input your job"
              style={styles.input}
              value={text}
              onChangeText={setText}
              returnKeyType="done"
              onSubmitEditing={handleFinish}
            />
          </View>

          <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>{isEditing ? 'UPDATE ➜' : 'FINISH ➜'}</Text>
          </TouchableOpacity>

          {/* Hiển thị ảnh book ở trang Add */}
          <Image
            source={require('../assets/images/book.png')}
            style={{ width: 180, height: 160, marginTop: 30, opacity: 0.95 }}
            resizeMode="contain"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 6 },
  headerRight: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  avatar: { width: 46, height: 46, borderRadius: 22 },
  hi: { fontSize: 16, fontWeight: '700' },
  sub: { fontSize: 12, color: '#888' },
  bigTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 18,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingVertical: 10,
    width: '85%',
    backgroundColor: '#fff',
  },
  input: { flex: 1, paddingHorizontal: 8 },
  finishBtn: {
    marginTop: 18,
    backgroundColor: '#18c7d8',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});