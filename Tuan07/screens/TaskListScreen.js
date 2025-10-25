import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import TaskItem from '../components/TaskItem';

const initialTasks = [
  { id: '1', title: 'To check email', done: false },
  { id: '2', title: 'UI task web page', done: false },
  { id: '3', title: 'Learn javascript basic', done: false },
  { id: '4', title: 'Learn HTML Advance', done: false },
  { id: '5', title: 'Medical App UI', done: false },
  { id: '6', title: 'Learn Java', done: false },
];

export default function TaskListScreen({ navigation, route }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');
  const userName = route.params?.userName || 'Twinkle';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.newJob) {
        const newJob = route.params.newJob;
        setTasks(prev => [{ id: Date.now().toString(), title: newJob, done: false }, ...prev]);
        navigation.setParams({ newJob: undefined });
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const toggleDone = id => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // Cập nhật tên job inline (gọi từ TaskItem)
  const handleUpdate = (id, newTitle) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  const addTaskViaFab = () => {
    navigation.navigate('AddJob', {
      onSave: job => {
        setTasks(prev => [{ id: Date.now().toString(), title: job, done: false }, ...prev]);
      },
    });
  };

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image source={require('../assets/images/avata.png')} style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.hi}>Hi {userName}</Text>
            <Text style={styles.sub}>Have a great day ahead</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Feather name="search" size={18} color="#888" style={{ marginLeft: 8 }} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 200 }}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            title={item.title}
            done={item.done}
            onToggle={() => toggleDone(item.id)}
            onUpdate={(id, newTitle) => handleUpdate(id, newTitle)}
          />
        )}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.fab}
        onPress={addTaskViaFab}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 6 },
  headerRight: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  hi: { fontSize: 16, fontWeight: '700' },
  sub: { fontSize: 12, color: '#888' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 14,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    elevation: 1,
  },
  searchInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 6 },
  fab: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#18c7d8',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});