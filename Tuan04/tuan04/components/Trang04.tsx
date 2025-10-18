import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Trang04 = () => {
  const [passwordLength, setPasswordLength] = useState('');
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSpecialSymbol, setIncludeSpecialSymbol] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    const length = parseInt(passwordLength, 10);

    if (isNaN(length) || length <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập độ dài mật khẩu hợp lệ');
      return;
    }

    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumber) charset += '0123456789';
    if (includeSpecialSymbol) charset += '!@#$%^&*()_+[]{}|;:,.<>?';

    if (charset === '') {
      Alert.alert('Lỗi', 'Vui lòng chọn ít nhất một loại ký tự');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setGeneratedPassword(password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>PASSWORD GENERATOR</Text>
        <TextInput
          style={styles.passwordOutput}
          placeholderTextColor="#aaa"
          editable={false}
          value={generatedPassword}
        />

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Password length</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={passwordLength}
            onChangeText={setPasswordLength}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Include lower case letters</Text>
          <CheckBox
            checked={includeLowercase}
            onPress={() => setIncludeLowercase(!includeLowercase)}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Include upper case letters</Text>
          <CheckBox
            checked={includeUppercase}
            onPress={() => setIncludeUppercase(!includeUppercase)}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Include numbers</Text>
          <CheckBox
            checked={includeNumber}
            onPress={() => setIncludeNumber(!includeNumber)}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Include special symbols</Text>
          <CheckBox
            checked={includeSpecialSymbol}
            onPress={() => setIncludeSpecialSymbol(!includeSpecialSymbol)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={generatePassword}>
          <Text style={styles.buttonText}>GENERATE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1E1E4F',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  passwordOutput: {
    backgroundColor: '#3b3b64',
    color: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionLabel: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    width: 60,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b3b64',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Trang04;
