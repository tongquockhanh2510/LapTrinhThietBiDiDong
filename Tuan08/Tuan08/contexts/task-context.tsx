import * as SQLite from 'expo-sqlite';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { apiService, formatSyncTime, SyncStatus } from '../services/api-service';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

interface TaskContextType {
  tasks: Task[];
  userName: string;
  setUserName: (name: string) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
  isLoading: boolean;
  syncStatus: SyncStatus;
  syncToCloud: () => Promise<void>;
  syncFromCloud: () => Promise<void>;
  getLastSyncText: () => string;
  setApiUrl: (url: string) => Promise<void>;
  getApiUrl: () => string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserNameState] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: 0,
    isSyncing: false,
    error: null,
  });

  // Initialize database
  useEffect(() => {
    initDatabase();
  }, []);

  // Auto sync every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!syncStatus.isSyncing) {
        syncToCloud().catch(console.error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [syncStatus.isSyncing]);

  const initDatabase = async () => {
    try {
      const database = await SQLite.openDatabaseAsync('tasks.db');
      setDb(database);

      // Create tables
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          completed INTEGER DEFAULT 0,
          createdAt INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );
      `);

      // Create sync metadata table
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS sync_metadata (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );
      `);

      // Load data
      await loadData(database);

      // Load last sync time
      const syncResult = await database.getFirstAsync<{ value: string }>(
        'SELECT value FROM sync_metadata WHERE key = ?',
        ['lastSync']
      );
      if (syncResult) {
        setSyncStatus((prev) => ({ ...prev, lastSync: parseInt(syncResult.value) }));
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      setIsLoading(false);
    }
  };

  const loadData = async (database: SQLite.SQLiteDatabase) => {
    try {
      // Load tasks
      const tasksResult = await database.getAllAsync<Task>(
        'SELECT * FROM tasks ORDER BY createdAt DESC'
      );
      setTasks(tasksResult);

      // Load userName
      const userResult = await database.getFirstAsync<{ value: string }>(
        'SELECT value FROM settings WHERE key = ?',
        ['userName']
      );
      if (userResult) {
        setUserNameState(userResult.value);
      }

      // Load API URL
      const apiUrlResult = await database.getFirstAsync<{ value: string }>(
        'SELECT value FROM settings WHERE key = ?',
        ['apiUrl']
      );
      if (apiUrlResult) {
        apiService.setApiUrl(apiUrlResult.value);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserName = async (name: string) => {
    setUserNameState(name);
    if (db) {
      try {
        await db.runAsync(
          'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
          ['userName', name]
        );
      } catch (error) {
        console.error('Error saving userName:', error);
      }
    }
  };

  const addTask = async (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks([newTask, ...tasks]);

    if (db) {
      try {
        await db.runAsync(
          'INSERT INTO tasks (id, title, completed, createdAt) VALUES (?, ?, ?, ?)',
          [newTask.id, newTask.title, 0, newTask.createdAt]
        );
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    if (db) {
      try {
        const task = tasks.find((t) => t.id === id);
        if (task) {
          await db.runAsync(
            'UPDATE tasks SET completed = ? WHERE id = ?',
            [task.completed ? 0 : 1, id]
          );
        }
      } catch (error) {
        console.error('Error toggling task:', error);
      }
    }
  };

  const deleteTask = async (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));

    if (db) {
      try {
        await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const updateTask = async (id: string, title: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title } : task
    );
    setTasks(updatedTasks);

    if (db) {
      try {
        await db.runAsync('UPDATE tasks SET title = ? WHERE id = ?', [title, id]);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  // Sync local data to cloud
  const syncToCloud = async () => {
    if (!db || syncStatus.isSyncing) return;

    setSyncStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      console.log('🔄 Starting sync to cloud...');

      // Check if online
      const isOnline = await apiService.isOnline();
      if (!isOnline) {
        throw new Error('No internet connection');
      }

      // Sync tasks
      const result = await apiService.syncTasks(tasks);

      // Sync userName
      if (userName) {
        await apiService.syncUserName(userName);
      }

      // Update last sync time
      const syncTime = result.syncedAt;
      await db.runAsync(
        'INSERT OR REPLACE INTO sync_metadata (key, value) VALUES (?, ?)',
        ['lastSync', syncTime.toString()]
      );

      setSyncStatus({
        lastSync: syncTime,
        isSyncing: false,
        error: null,
      });

      console.log('✅ Sync to cloud completed');
    } catch (error) {
      console.error('❌ Sync to cloud failed:', error);
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      }));
    }
  };

  // Sync cloud data to local
  const syncFromCloud = async () => {
    if (!db || syncStatus.isSyncing) return;

    setSyncStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      console.log('🔄 Starting sync from cloud...');

      // Check if online
      const isOnline = await apiService.isOnline();
      if (!isOnline) {
        throw new Error('No internet connection');
      }

      // Get cloud data
      const cloudData = await apiService.getUserData();

      // Merge with local data (conflict resolution)
      const mergedTasks = await apiService.resolveConflicts(tasks, cloudData.tasks);

      // Clear local tasks
      await db.runAsync('DELETE FROM tasks');

      // Insert merged tasks
      for (const task of mergedTasks) {
        await db.runAsync(
          'INSERT INTO tasks (id, title, completed, createdAt) VALUES (?, ?, ?, ?)',
          [task.id, task.title, task.completed ? 1 : 0, task.createdAt]
        );
      }

      // Update state
      setTasks(mergedTasks);

      // Update userName if available
      if (cloudData.userName) {
        setUserNameState(cloudData.userName);
        await db.runAsync(
          'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
          ['userName', cloudData.userName]
        );
      }

      // Update last sync time
      const syncTime = Date.now();
      await db.runAsync(
        'INSERT OR REPLACE INTO sync_metadata (key, value) VALUES (?, ?)',
        ['lastSync', syncTime.toString()]
      );

      setSyncStatus({
        lastSync: syncTime,
        isSyncing: false,
        error: null,
      });

      console.log('✅ Sync from cloud completed');
    } catch (error) {
      console.error('❌ Sync from cloud failed:', error);
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      }));
    }
  };

  // Get formatted last sync text
  const getLastSyncText = () => {
    if (syncStatus.lastSync === 0) return 'Never synced';
    return formatSyncTime(syncStatus.lastSync);
  };

  // Set custom API URL
  const setApiUrl = async (url: string) => {
    if (!db) return;

    try {
      // Save to database
      await db.runAsync(
        'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
        ['apiUrl', url]
      );

      // Update API service
      apiService.setApiUrl(url);

      console.log('✅ API URL saved:', url);
    } catch (error) {
      console.error('Error saving API URL:', error);
      throw error;
    }
  };

  // Get current API URL
  const getApiUrl = () => {
    return apiService.getApiUrl();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        userName,
        setUserName,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        isLoading,
        syncStatus,
        syncToCloud,
        syncFromCloud,
        getLastSyncText,
        setApiUrl,
        getApiUrl,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}
