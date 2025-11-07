# Cloud Sync Feature - Task Management App

## 📋 Tổng Quan

Ứng dụng đã được tích hợp chức năng đồng bộ cloud để lưu trữ và đồng bộ dữ liệu giữa thiết bị local và cloud storage.

## 🔧 Cấu Trúc Hệ Thống

### 1. **Mock API Service** (`services/api-service.ts`)

Mô phỏng backend API với các chức năng:

- ✅ **Authentication** - Login/logout (mock)
- ✅ **Sync Tasks** - Upload tasks to cloud
- ✅ **Get User Data** - Download tasks from cloud
- ✅ **CRUD Operations** - Add, update, delete tasks on cloud
- ✅ **Conflict Resolution** - Merge local and cloud data
- ✅ **Network Status Check** - Check online/offline status

**Note:** API này sử dụng localStorage để mô phỏng cloud storage. Trong production, thay bằng real API endpoint.

### 2. **Enhanced TaskContext** (`contexts/task-context.tsx`)

TaskContext đã được nâng cấp với các chức năng sync:

```typescript
interface TaskContextType {
  // Existing features
  tasks: Task[];
  userName: string;
  setUserName: (name: string) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  
  // NEW: Sync features
  syncStatus: SyncStatus;
  syncToCloud: () => Promise<void>;
  syncFromCloud: () => Promise<void>;
  getLastSyncText: () => string;
}
```

**Sync Status:**
```typescript
{
  lastSync: number;      // Timestamp of last sync
  isSyncing: boolean;    // Is currently syncing
  error: string | null;  // Error message if sync failed
}
```

### 3. **Auto Sync**

Tự động đồng bộ mỗi 5 phút:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    if (!syncStatus.isSyncing) {
      syncToCloud().catch(console.error);
    }
  }, 5 * 60 * 1000); // 5 minutes
  
  return () => clearInterval(interval);
}, [syncStatus.isSyncing]);
```

## 📱 UI Components

### 1. **Sync Status Bar** (Tasks Screen)

Hiển thị trạng thái sync trên màn hình tasks:

```jsx
<View style={styles.syncStatusBar}>
  <MaterialIcons name="cloud-done" size={16} color="#4CAF50" />
  <Text>Last sync: 2m ago</Text>
</View>
```

Các trạng thái:
- ⏳ **Syncing...** - Đang đồng bộ
- ✅ **Last sync: Xm ago** - Đã sync thành công
- ❌ **Error: message** - Sync lỗi

### 2. **Sync Button** (Tasks Screen)

Nút cloud sync trên header để truy cập sync settings:

```jsx
<TouchableOpacity onPress={() => router.push('/sync-settings')}>
  <MaterialIcons name="cloud-sync" size={28} color="#4CAF50" />
</TouchableOpacity>
```

### 3. **Sync Settings Screen** (`app/sync-settings.tsx`)

Màn hình quản lý đồng bộ với 2 options:

#### Upload to Cloud
- Upload local data lên cloud
- Hiển thị số lượng tasks sẽ upload
- Confirmation dialog

#### Download from Cloud
- Download cloud data về local
- Replace local data
- Confirmation dialog (destructive action)

## 🔄 Sync Flow

### Upload to Cloud (syncToCloud)

```
1. Check online status
2. Upload tasks array to cloud
3. Upload userName to cloud
4. Save lastSync timestamp to SQLite
5. Update syncStatus state
6. Show success/error message
```

### Download from Cloud (syncFromCloud)

```
1. Check online status
2. Get cloud data (tasks + userName)
3. Merge with local data (conflict resolution)
4. Clear local SQLite tasks table
5. Insert merged tasks
6. Update userName
7. Save lastSync timestamp
8. Update state
9. Show success/error message
```

### Conflict Resolution

Khi có conflict (cùng task ID tồn tại local & cloud):
- So sánh `createdAt` timestamp
- Chọn version mới hơn
- Merge vào final result

```typescript
const mergedTasks = await apiService.resolveConflicts(localTasks, cloudTasks);
```

## 💾 Database Schema

Thêm table mới cho sync metadata:

```sql
CREATE TABLE IF NOT EXISTS sync_metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Store last sync timestamp
INSERT OR REPLACE INTO sync_metadata (key, value) 
VALUES ('lastSync', '1699380000000');
```

## 🚀 Cách Sử Dụng

### Từ Tasks Screen:

1. **View sync status** - Xem trạng thái đồng bộ ở sync status bar
2. **Open sync settings** - Tap vào cloud icon ở header
3. **Auto sync** - App tự động sync mỗi 5 phút

### Từ Sync Settings Screen:

1. **Upload to Cloud**
   - Tap "Upload to Cloud"
   - Confirm dialog
   - Wait for upload complete
   - See success message

2. **Download from Cloud**
   - Tap "Download from Cloud"
   - Confirm dialog (warning: replace local data)
   - Wait for download complete
   - See success message

## 🔐 Security Considerations (Production)

Trong production environment, cần implement:

1. **Authentication**
   - JWT token authentication
   - Refresh token mechanism
   - Secure token storage (Keychain/Keystore)

2. **Encryption**
   - Encrypt data before upload
   - HTTPS/TLS for API calls
   - End-to-end encryption

3. **Authorization**
   - User-specific data isolation
   - Role-based access control
   - API rate limiting

4. **Error Handling**
   - Network timeout handling
   - Retry mechanism with exponential backoff
   - Offline queue for pending sync

## 🛠️ Production Migration

Để chuyển sang production API:

1. **Update API_BASE_URL** trong `api-service.ts`:
   ```typescript
   const API_BASE_URL = 'https://your-api.com/api';
   ```

2. **Replace mock methods** với real API calls:
   ```typescript
   async getUserData(): Promise<{ tasks: Task[]; userName: string }> {
     const response = await fetch(`${API_BASE_URL}/user/data`, {
       headers: {
         'Authorization': `Bearer ${this.token}`,
       },
     });
     return response.json();
   }
   ```

3. **Add real authentication**:
   ```typescript
   async login(email: string, password: string) {
     const response = await fetch(`${API_BASE_URL}/auth/login`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password }),
     });
     const { token } = await response.json();
     this.token = token;
     await SecureStore.setItemAsync('authToken', token);
   }
   ```

4. **Implement real network check**:
   ```typescript
   import NetInfo from '@react-native-community/netinfo';
   
   async isOnline(): Promise<boolean> {
     const state = await NetInfo.fetch();
     return state.isConnected && state.isInternetReachable;
   }
   ```

## 📊 Testing Sync Feature

### Test Scenarios:

1. ✅ Upload tasks to cloud
2. ✅ Download tasks from cloud
3. ✅ Conflict resolution (same task modified locally & on cloud)
4. ✅ Auto sync every 5 minutes
5. ✅ Sync status display
6. ✅ Error handling (no internet)
7. ✅ Last sync time display

### Test Steps:

```bash
# Run the app
npm start

# Navigate to Tasks screen
# Add some tasks
# Tap cloud icon -> Sync Settings
# Tap "Upload to Cloud"
# Delete some tasks locally
# Tap "Download from Cloud"
# Verify tasks are restored
```

## 🎨 UI/UX Features

1. **Visual Feedback**
   - Cloud icon changes color based on status
   - Loading spinner during sync
   - Success/error messages

2. **Status Indicators**
   - Green cloud = synced
   - Red cloud = error
   - Spinning icon = syncing

3. **User Control**
   - Manual sync via Sync Settings
   - Choose upload or download direction
   - Confirmation dialogs for destructive actions

## 📝 Future Enhancements

- [ ] Incremental sync (only sync changes)
- [ ] Background sync (using background tasks)
- [ ] Offline queue (store operations when offline)
- [ ] Push notifications for sync conflicts
- [ ] Multi-device sync notifications
- [ ] Sync history log
- [ ] Selective sync (choose which data to sync)
- [ ] Real-time sync using WebSocket

## 🔗 Related Files

- `services/api-service.ts` - Mock API service
- `contexts/task-context.tsx` - Enhanced context with sync
- `app/tasks.tsx` - Tasks screen with sync status
- `app/sync-settings.tsx` - Sync settings screen

## 📞 Support

Nếu có lỗi hoặc cần hỗ trợ, kiểm tra:
1. Console logs (`console.log` statements)
2. Sync status error message
3. Network connection
4. Mock API implementation

---

**Version:** 1.0  
**Last Updated:** November 2025
