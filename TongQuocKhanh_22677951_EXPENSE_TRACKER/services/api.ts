import { Transaction } from '@/types/transaction';

// API transaction type for MockAPI (without id for POST)
export interface APITransaction {
  id?: number;
  title: string;
  amount: number;
  createdAt: string;
  type: 'Thu' | 'Chi';
}

let apiBaseUrl = '';

export const setApiBaseUrl = (url: string) => {
  // Remove trailing slash if exists
  apiBaseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
};

export const getApiBaseUrl = () => apiBaseUrl;

// Get all transactions from API
export const getTransactionsFromAPI = async (): Promise<APITransaction[]> => {
  if (!apiBaseUrl) {
    throw new Error('API URL chưa được cấu hình');
  }

  try {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
};

// Delete a transaction from API
export const deleteTransactionFromAPI = async (id: number): Promise<void> => {
  if (!apiBaseUrl) {
    throw new Error('API URL chưa được cấu hình');
  }

  try {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting transaction ${id} from API:`, error);
    throw error;
  }
};

// Delete all transactions from API
export const deleteAllTransactionsFromAPI = async (): Promise<void> => {
  try {
    const transactions = await getTransactionsFromAPI();
    
    // Delete each transaction
    const deletePromises = transactions.map(transaction => 
      deleteTransactionFromAPI(transaction.id!)
    );
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting all transactions from API:', error);
    throw error;
  }
};

// Add a transaction to API
export const addTransactionToAPI = async (transaction: Omit<APITransaction, 'id'>): Promise<APITransaction> => {
  if (!apiBaseUrl) {
    throw new Error('API URL chưa được cấu hình');
  }

  try {
    const response = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding transaction to API:', error);
    throw error;
  }
};

// Sync all local transactions to API
export const syncTransactionsToAPI = async (transactions: Transaction[]): Promise<void> => {
  try {
    // First, delete all existing data in API
    await deleteAllTransactionsFromAPI();
    
    // Then, add all local transactions to API
    const addPromises = transactions.map(transaction => 
      addTransactionToAPI({
        title: transaction.title,
        amount: transaction.amount,
        createdAt: transaction.createdAt,
        type: transaction.type,
      })
    );
    
    await Promise.all(addPromises);
  } catch (error) {
    console.error('Error syncing transactions to API:', error);
    throw error;
  }
};
