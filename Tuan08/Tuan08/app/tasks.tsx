import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTaskContext } from '@/contexts/task-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function TasksScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { 
    tasks, 
    userName, 
    toggleTask, 
    deleteTask,
    syncStatus,
    syncToCloud,
    syncFromCloud,
    getLastSyncText,
  } = useTaskContext();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTask = (id: string, title: string) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTask(id) },
      ]
    );
  };

  const handleSync = () => {
    Alert.alert(
      'Sync Options',
      'Choose sync direction:',
      [
        { 
          text: 'Upload to Cloud', 
          onPress: () => syncToCloud(),
        },
        { 
          text: 'Download from Cloud', 
          onPress: () => syncFromCloud(),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
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

        {/* Sync Button */}
        <TouchableOpacity 
          onPress={() => router.push('/sync-settings')}
          style={styles.syncButton}
          disabled={syncStatus.isSyncing}
        >
          <MaterialIcons 
            name={syncStatus.isSyncing ? 'sync' : 'cloud-sync'} 
            size={28} 
            color={syncStatus.error ? '#FF6B6B' : '#4CAF50'}
          />
        </TouchableOpacity>
      </View>

      {/* Sync Status */}
      <View style={styles.syncStatusBar}>
        <MaterialIcons 
          name={syncStatus.error ? 'cloud-off' : 'cloud-done'} 
          size={16} 
          color={syncStatus.error ? '#FF6B6B' : '#4CAF50'} 
        />
        <ThemedText style={[
          styles.syncStatusText,
          syncStatus.error && styles.syncErrorText
        ]}>
          {syncStatus.isSyncing ? 'Syncing...' : 
           syncStatus.error ? `Error: ${syncStatus.error}` :
           `Last sync: ${getLastSyncText()}`}
        </ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={item.completed ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={item.completed ? '#4CAF50' : '#999'}
              />
              <ThemedText style={[styles.taskTitle, item.completed && styles.taskCompleted]}>
                {item.title}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDeleteTask(item.id, item.title)}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No tasks yet</ThemedText>
            <ThemedText style={styles.emptySubText}>Tap the + button to add a task</ThemedText>
          </View>
        }
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-task')}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    flex: 1,
  },
  syncButton: {
    padding: 8,
  },
  syncingIcon: {
    transform: [{ rotate: '360deg' }],
  },
  syncStatusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    gap: 8,
  },
  syncStatusText: {
    fontSize: 12,
    color: '#666',
  },
  syncErrorText: {
    color: '#FF6B6B',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    minHeight: 60,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  taskTitle: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#ccc',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00BDD6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
