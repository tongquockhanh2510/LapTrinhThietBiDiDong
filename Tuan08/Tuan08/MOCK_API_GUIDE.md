# Mock API Configuration Guide

## 📡 Cấu Hình Mock API URL

Ứng dụng hỗ trợ cấu hình Mock API URL tùy chỉnh để test chức năng sync với backend thật.

---

## 🔧 Cách Nhập Mock API URL

### Từ Ứng Dụng:

1. **Mở Sync Settings**
   - Vào màn hình Tasks
   - Tap icon cloud ở header
   - Chọn "Cloud Sync"

2. **Cấu Hình API URL**
   - Trong mục "API Configuration"
   - Tap nút "Edit" bên cạnh URL hiện tại
   - Nhập Mock API URL của bạn
   - Tap "Save" để lưu

3. **Verify**
   - URL sẽ được hiển thị màu xanh
   - Saved vào SQLite database
   - Tự động load khi mở app lại

---

## 🌐 Mock API Services Đề Xuất

### 1. **MockAPI.io** (Recommended)
```
https://[your-id].mockapi.io/api/v1
```

**Setup:**
1. Truy cập https://mockapi.io
2. Tạo tài khoản miễn phí
3. Tạo project mới
4. Tạo endpoint `/tasks`
5. Copy API URL
6. Paste vào app

**Schema:**
```json
{
  "id": "string",
  "title": "string",
  "completed": "boolean",
  "createdAt": "number"
}
```

### 2. **JSONPlaceholder**
```
https://jsonplaceholder.typicode.com
```

**Free public API** - Không cần đăng ký:
- GET: `/todos`
- POST: `/todos`
- PUT: `/todos/:id`
- DELETE: `/todos/:id`

### 3. **Reqres.in**
```
https://reqres.in/api
```

**Features:**
- RESTful API
- Support CRUD operations
- Pagination
- Delays simulation

### 4. **My JSON Server** (GitHub-based)
```
https://my-json-server.typicode.com/[username]/[repo]
```

**Setup:**
1. Tạo GitHub repo
2. Thêm file `db.json`:
```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Sample task",
      "completed": false,
      "createdAt": 1699380000000
    }
  ],
  "settings": {
    "userName": "User"
  }
}
```
3. URL: `https://my-json-server.typicode.com/yourusername/yourrepo`

### 5. **Custom Backend**

Nếu bạn có backend riêng:
```
https://your-domain.com/api/v1
```

**Required Endpoints:**
```
POST   /sync/tasks       - Upload tasks
GET    /sync/tasks       - Download tasks
POST   /auth/login       - Authentication (optional)
GET    /user/data        - Get user data
```

---

## 🔐 Production API Setup

### Real Backend Implementation

Khi deploy production, backend cần implement:

#### 1. **Authentication**
```typescript
POST /api/auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}

Response: {
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": "user123",
  "expiresIn": 3600
}
```

#### 2. **Sync Tasks**
```typescript
POST /api/sync/tasks
Headers: {
  "Authorization": "Bearer [token]"
}
Body: {
  "tasks": [
    {
      "id": "1",
      "title": "Task 1",
      "completed": false,
      "createdAt": 1699380000000
    }
  ]
}

Response: {
  "success": true,
  "syncedAt": 1699380000000,
  "count": 1
}
```

#### 3. **Get User Data**
```typescript
GET /api/user/data
Headers: {
  "Authorization": "Bearer [token]"
}

Response: {
  "tasks": [...],
  "userName": "John Doe",
  "lastSync": 1699380000000
}
```

#### 4. **Conflict Resolution**
```typescript
POST /api/sync/resolve
Headers: {
  "Authorization": "Bearer [token]"
}
Body: {
  "localTasks": [...],
  "cloudTasks": [...]
}

Response: {
  "mergedTasks": [...],
  "conflicts": []
}
```

---

## 📝 API Service Code Update

### Update `services/api-service.ts`:

```typescript
class ApiService {
  private apiUrl: string;
  
  async syncTasks(tasks: Task[]): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/sync/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify({ tasks }),
    });
    
    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  async getUserData(): Promise<UserData> {
    const response = await fetch(`${this.apiUrl}/user/data`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.statusText}`);
    }
    
    return response.json();
  }
}
```

---

## 🧪 Testing API Connection

### Test Steps:

1. **Enter API URL** trong Sync Settings
2. **Save** URL
3. **Add tasks** trong app
4. **Upload to Cloud** 
   - Tap "Upload to Cloud"
   - Check console logs
   - Verify success message
5. **Verify in API**
   - Check Mock API dashboard
   - Verify tasks uploaded
6. **Download from Cloud**
   - Delete local tasks
   - Tap "Download from Cloud"
   - Verify tasks restored

### Console Logs:

```
📡 API URL updated to: https://your-api.mockapi.io/api/v1
🔄 Starting sync to cloud...
📤 Syncing to cloud... 5 tasks
✅ Sync to cloud completed
```

---

## 🚨 Error Handling

### Common Errors:

1. **Invalid URL Format**
```
Error: Please enter a valid URL
Fix: Ensure URL starts with http:// or https://
```

2. **Network Error**
```
Error: No internet connection
Fix: Check network connectivity
```

3. **API Not Found**
```
Error: 404 - Endpoint not found
Fix: Verify API URL and endpoints
```

4. **Authentication Failed**
```
Error: 401 - Unauthorized
Fix: Check API token/credentials
```

5. **CORS Error** (Web only)
```
Error: CORS policy blocked
Fix: Enable CORS on backend
```

---

## 📱 UI Features

### API Configuration Section:

- **Display Current URL**: Shows saved API URL
- **Edit Button**: Opens edit mode
- **Input Field**: Enter new URL
- **Save Button**: Save to database
- **Cancel Button**: Discard changes

### Visual Feedback:

- ✅ **Blue URL text** - Valid URL saved
- 📝 **Edit mode** - White input field
- 💾 **Save success** - Alert confirmation
- ❌ **Error** - Alert with error message

---

## 🔄 Sync Workflow with Mock API

```
User enters URL
    ↓
Save to SQLite
    ↓
Update API Service
    ↓
Add tasks locally
    ↓
Tap "Upload to Cloud"
    ↓
POST to Mock API
    ↓
API saves data
    ↓
Return success response
    ↓
Update lastSync timestamp
    ↓
Show success message
```

---

## 📊 Database Storage

API URL được lưu trong `settings` table:

```sql
INSERT OR REPLACE INTO settings (key, value) 
VALUES ('apiUrl', 'https://your-api.mockapi.io/api/v1');
```

Load khi app start:
```typescript
const apiUrlResult = await db.getFirstAsync(
  'SELECT value FROM settings WHERE key = ?',
  ['apiUrl']
);
if (apiUrlResult) {
  apiService.setApiUrl(apiUrlResult.value);
}
```

---

## 🎯 Best Practices

1. **Use HTTPS**: Luôn dùng `https://` cho production
2. **Validate URL**: Check URL format trước khi save
3. **Error Handling**: Handle network errors gracefully
4. **Retry Logic**: Implement retry với exponential backoff
5. **Cache**: Cache data locally khi offline
6. **Security**: Không hardcode API keys/secrets

---

## 📚 Examples

### MockAPI.io Setup Example:

```bash
# 1. Create project on mockapi.io
# 2. Create /tasks endpoint with schema:

{
  "id": "{{random.uuid}}",
  "title": "{{lorem.sentence}}",
  "completed": "{{random.boolean}}",
  "createdAt": "{{date.now}}"
}

# 3. Get API URL:
https://67890abcdef.mockapi.io/api/v1

# 4. Enter in app:
Sync Settings → Edit → Paste URL → Save
```

### JSONPlaceholder Example:

```typescript
// Enter URL:
https://jsonplaceholder.typicode.com

// App will use endpoints:
GET  /todos          - Download
POST /todos          - Upload
PUT  /todos/:id      - Update
DELETE /todos/:id    - Delete
```

---

## 🔧 Troubleshooting

### Problem: URL not saving

**Solution:**
1. Check SQLite database initialized
2. Verify `settings` table exists
3. Check console for errors

### Problem: Sync failing after URL change

**Solution:**
1. Restart app to reload config
2. Verify API endpoint exists
3. Check API response format matches expected

### Problem: Cannot edit URL

**Solution:**
1. Close and reopen Sync Settings
2. Check if already in edit mode
3. Clear app cache and retry

---

## 📞 Support

Nếu gặp vấn đề:
1. Check console logs
2. Verify API URL format
3. Test API với Postman/cURL
4. Check network connectivity
5. Review API documentation

---

**Version:** 1.0  
**Last Updated:** November 7, 2025  
**Status:** ✅ Ready to use
