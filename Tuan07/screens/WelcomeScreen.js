import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} style={{ flex: 1 }}>
        <View style={styles.top}>
          {/* Hiển thị ảnh book từ assets */}
          <Image
            source={require('../assets/images/book.png')}
            style={styles.bookImage}
            resizeMode="contain"
            accessibilityLabel="book"
          />

          <Text style={styles.title}>MANAGE YOUR{'\n'}TASK</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrap}>
            {/* avatar nhỏ từ assets trước ô nhập tên */}
            <Image
              source={require('../assets/images/avata.png')}
              style={styles.smallAvatar}
              resizeMode="cover"
              accessibilityLabel="avatar"
            />
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.replace('Tasks', { userName: name || 'Twinkle' })}
          >
            <Text style={styles.buttonText}>GET STARTED  ➜</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  top: { alignItems: 'center', marginTop: 20 },
  bookImage: {
    width: 220,
    height: 220,
    marginTop: 10,
  },
  title: {
    marginTop: 24,
    textAlign: 'center',
    color: '#7b42f6',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  form: { marginTop: 40, paddingHorizontal: 24 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  input: { flex: 1, paddingHorizontal: 8 },
  button: {
    marginTop: 30,
    backgroundColor: '#18c7d8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});