import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTaskContext } from '@/contexts/task-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddTaskScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const router = useRouter();
  const { addTask, userName } = useTaskContext();

  const handleFinish = () => {
    if (taskTitle.trim()) {
      addTask(taskTitle.trim());
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Image
              source={require('@/assets/images/avata.png')}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View>
              <ThemedText style={styles.greeting}>Hi {userName || 'Twinkle'}</ThemedText>
              <ThemedText style={styles.subGreeting}>Have a great day ahead</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.form}>
          <ThemedText style={styles.title}>ADD YOUR JOB</ThemedText>

          <View style={styles.inputContainer}>
            <MaterialIcons name="work" size={24} color="#4CAF50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="input your job"
              placeholderTextColor="#999"
              value={taskTitle}
              onChangeText={setTaskTitle}
              onSubmitEditing={handleFinish}
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleFinish}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>FINISH →</ThemedText>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <Image
              source={require('@/assets/images/book.png')}
              style={styles.bookImage}
              resizeMode="contain"
            />
          </View>
        </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 40,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  bookImage: {
    width: 180,
    height: 180,
  },
});
