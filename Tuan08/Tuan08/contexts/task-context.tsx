import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const STORAGE_KEY_TASKS = '@tasks';
const STORAGE_KEY_USER = '@userName';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserNameState] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTasks();
    }
  }, [tasks]);

  // Save userName to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading && userName) {
      saveUserName();
    }
  }, [userName]);

  const loadData = async () => {
    try {
      const [tasksJson, storedUserName] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_TASKS),
        AsyncStorage.getItem(STORAGE_KEY_USER),
      ]);

      if (tasksJson) {
        setTasks(JSON.parse(tasksJson));
      }
      if (storedUserName) {
        setUserNameState(storedUserName);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const saveUserName = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_USER, userName);
    } catch (error) {
      console.error('Error saving userName:', error);
    }
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, title: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
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
