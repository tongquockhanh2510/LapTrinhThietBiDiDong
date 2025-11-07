import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTaskContext } from '@/contexts/task-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { setUserName } = useTaskContext();

  const handleGetStarted = () => {
    if (name.trim()) {
      setUserName(name.trim());
      router.push('/tasks');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/book.png')}
            style={styles.bookImage}
            resizeMode="contain"
          />
        </View>

        <ThemedText style={styles.title}>MANAGE YOUR{'\n'}TASK</ThemedText>

        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            onSubmitEditing={handleGetStarted}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>GET STARTED →</ThemedText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 40,
  },
  bookImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B68EE',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00BDD6',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
