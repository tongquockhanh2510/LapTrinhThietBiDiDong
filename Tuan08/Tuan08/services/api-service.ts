// Mock API Service - Real HTTP requests to Mock API
// Supports mockapi.io, JSONPlaceholder, and custom endpoints

let API_BASE_URL = 'https://api.example.com'; // Default Mock URL

export interface SyncStatus {
  lastSync: number;
  isSyncing: boolean;
  error: string | null;
}

class ApiService {
  private token: string | null = null;
  private customApiUrl: string | null = null;

  // Set custom API URL
  setApiUrl(url: string) {
    this.customApiUrl = url;
    API_BASE_URL = url;
    console.log('📡 API URL updated to:', url);
  }

  // Get current API URL
  getApiUrl(): string {
    return this.customApiUrl || API_BASE_URL;
  }

  // Check if using real API
  private isRealApiConfigured(): boolean {
    const url = this.getApiUrl();
    return url !== 'https://api.example.com' && url.trim() !== '';
  }

  // Real HTTP request to get all tasks from Mock API
  async getUserData(): Promise<{ tasks: any[]; userName: string }> {
    console.log('📥 Fetching from cloud...');

    if (!this.isRealApiConfigured()) {
      console.log('⚠️ Using mock storage (no real API configured)');
      return { tasks: [], userName: '' };
    }

    try {
      const apiUrl = this.getApiUrl();
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Fetched', Array.isArray(data) ? data.length : 0, 'items from cloud');

      // Transform data to tasks format
      const tasks = Array.isArray(data) ? data.map((item: any) => ({
        id: item.id || String(item.id),
        title: item.title || item.name || 'Untitled',
        completed: item.completed || false,
        createdAt: item.createdAt || Date.now(),
      })) : [];

      return {
        tasks,
        userName: '',
      };
    } catch (error) {
      console.error('❌ Error fetching from cloud:', error);
      throw error;
    }
  }

  // Real HTTP request to sync tasks to Mock API
  async syncTasks(tasks: any[]): Promise<{ success: boolean; syncedAt: number }> {
    console.log('📤 Syncing to cloud...', tasks.length, 'tasks');

    if (!this.isRealApiConfigured()) {
      console.log('⚠️ Using mock storage (no real API configured)');
      return { success: true, syncedAt: Date.now() };
    }

    try {
      const apiUrl = this.getApiUrl();

      // Delete all existing items first (clear cloud storage)
      try {
        const existingResponse = await fetch(apiUrl);
        if (existingResponse.ok) {
          const existingData = await existingResponse.json();
          if (Array.isArray(existingData)) {
            for (const item of existingData) {
              await fetch(`${apiUrl}/${item.id}`, {
                method: 'DELETE',
              });
            }
            console.log('🗑️ Cleared', existingData.length, 'existing items');
          }
        }
      } catch (e) {
        console.log('⚠️ Could not clear existing items:', e);
      }

      // Upload all tasks
      let uploadedCount = 0;
      for (const task of tasks) {
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: task.id,
              title: task.title,
              completed: task.completed,
              createdAt: task.createdAt,
            }),
          });

          if (response.ok) {
            uploadedCount++;
          } else {
            console.warn('⚠️ Failed to upload task:', task.title);
          }
        } catch (error) {
          console.error('❌ Error uploading task:', task.title, error);
        }
      }

      console.log(`✅ Uploaded ${uploadedCount}/${tasks.length} tasks to cloud`);

      return {
        success: uploadedCount > 0 || tasks.length === 0,
        syncedAt: Date.now(),
      };
    } catch (error) {
      console.error('❌ Error syncing to cloud:', error);
      throw error;
    }
  }

  // Sync userName (skip for mock API)
  async syncUserName(userName: string): Promise<{ success: boolean }> {
    console.log('📤 Syncing userName to cloud...');
    // Most mock APIs don't support custom user data
    // Just return success
    return { success: true };
  }

  // Check if online (in real app, check network status)
  async isOnline(): Promise<boolean> {
    return true; // Mock always online
  }

  // Conflict resolution - merge local and cloud tasks
  async resolveConflicts(localTasks: any[], cloudTasks: any[]): Promise<any[]> {
    // Simple merge: use newer version based on createdAt
    const merged = new Map();
    
    [...cloudTasks, ...localTasks].forEach((task) => {
      const existing = merged.get(task.id);
      if (!existing || task.createdAt > existing.createdAt) {
        merged.set(task.id, task);
      }
    });
    
    return Array.from(merged.values());
  }
}

export const apiService = new ApiService();

// Helper to format sync time
export function formatSyncTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}
