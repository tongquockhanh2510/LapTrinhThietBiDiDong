import { Transaction } from '@/types/transaction';
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'expense_tracker.db';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync(DB_NAME);
    
    // Create transactions table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        createdAt TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('Thu', 'Chi')),
        isDeleted INTEGER DEFAULT 0
      );
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const addTransaction = async (
  title: string,
  amount: number,
  type: 'Thu' | 'Chi'
): Promise<number> => {
  if (!db) throw new Error('Database not initialized');
  
  try {
    const createdAt = new Date().toISOString();
    const result = await db.runAsync(
      'INSERT INTO transactions (title, amount, createdAt, type, isDeleted) VALUES (?, ?, ?, ?, 0)',
      [title, amount, createdAt, type]
    );
    
    console.log('Transaction added with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  if (!db) throw new Error('Database not initialized');
  
  try {
    const rows = await db.getAllAsync<Transaction>(
      'SELECT id, title, amount, createdAt, type FROM transactions WHERE isDeleted = 0 ORDER BY createdAt DESC'
    );
    
    return rows;
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw error;
  }
};

export const updateTransaction = async (
  id: number,
  title: string,
  amount: number,
  type: 'Thu' | 'Chi'
): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  try {
    await db.runAsync(
      'UPDATE transactions SET title = ?, amount = ?, type = ? WHERE id = ?',
      [title, amount, type, id]
    );
    
    console.log('Transaction updated:', id);
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id: number): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  try {
    // Soft delete
    await db.runAsync(
      'UPDATE transactions SET isDeleted = 1 WHERE id = ?',
      [id]
    );
    
    console.log('Transaction deleted:', id);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

export const getDeletedTransactions = async (): Promise<Transaction[]> => {
  if (!db) throw new Error('Database not initialized');
  
  try {
    const rows = await db.getAllAsync<Transaction>(
      'SELECT id, title, amount, createdAt, type FROM transactions WHERE isDeleted = 1 ORDER BY createdAt DESC'
    );
    
    return rows;
  } catch (error) {
    console.error('Error getting deleted transactions:', error);
    throw error;
  }
};

export const restoreTransaction = async (id: number): Promise<void> => {
  if (!db) throw new Error('Database not initialized');
  
  try {
    await db.runAsync(
      'UPDATE transactions SET isDeleted = 0 WHERE id = ?',
      [id]
    );
    
    console.log('Transaction restored:', id);
  } catch (error) {
    console.error('Error restoring transaction:', error);
    throw error;
  }
};
