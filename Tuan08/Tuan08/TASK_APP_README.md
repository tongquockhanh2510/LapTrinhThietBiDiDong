# Task Manager App - Tuần 08

## 📱 Mô tả dự án

Ứng dụng quản lý công việc (Task Manager) được xây dựng bằng React Native + Expo Router với 3 màn hình chính:

### Màn hình đã triển khai:

1. **Welcome Screen** (`app/index.tsx`) - Màn hình chào mừng
   - Nhập tên người dùng
   - Nút "GET STARTED" để bắt đầu
   
2. **Tasks Screen** (`app/tasks.tsx`) - Danh sách công việc
   - Hiển thị danh sách tasks
   - Tìm kiếm tasks
   - Đánh dấu hoàn thành (checkbox)
   - Xóa task (icon delete)
   - Nút + để thêm task mới
   
3. **Add Task Screen** (`app/add-task.tsx`) - Thêm công việc mới
   - Nhập tên công việc
   - Nút "FINISH" để lưu và quay lại

## 🎯 Chức năng chính

✅ **Thêm task mới** - Nhập và lưu công việc  
✅ **Đánh dấu hoàn thành** - Tap vào task để toggle trạng thái  
✅ **Xóa task** - Nút delete với xác nhận  
✅ **Tìm kiếm** - Lọc tasks theo tên  
✅ **Lưu trữ local** - Dữ liệu được lưu với AsyncStorage (persistent giữa các lần mở app)  
✅ **Quản lý state** - React Context API  

## 📂 Cấu trúc files đã thêm/sửa

```
app/
  ├── _layout.tsx          ✏️ (Đã sửa - wrap TaskProvider)
  ├── index.tsx            ✨ (Mới - Welcome screen)
  ├── tasks.tsx            ✨ (Mới - Task list)
  └── add-task.tsx         ✨ (Mới - Add task)

contexts/
  └── task-context.tsx     ✨ (Mới - State management + AsyncStorage)

package.json               ✏️ (Đã thêm @react-native-async-storage/async-storage)
```

## 🚀 Cách chạy dự án

### 1. Cài đặt dependencies (đã hoàn tất)

```bash
npm install
```

### 2. Chạy Expo Dev Server

```bash
npx expo start
```

### 3. Chọn platform:

- **Android**: Nhấn `a` (cần Android emulator hoặc thiết bị thật)
- **iOS**: Nhấn `i` (chỉ trên macOS với Xcode)
- **Web**: Nhấn `w` (chạy trên browser)

## 🎨 UI/UX Notes

- **Icon tạm thời**: Tôi đã dùng MaterialIcons thay cho ảnh notepad/avatar để đơn giản hóa
- **Màu sắc**: 
  - Primary: `#00BDD6` (cyan - nút)
  - Secondary: `#7B68EE` (purple - text)
  - Success: `#4CAF50` (green - checkbox)
  - Danger: `#FF6B6B` (red - delete)

## 📦 Dependencies đã thêm

- `@react-native-async-storage/async-storage`: ^2.1.0

## 🔧 Kiến trúc kỹ thuật

- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **Persistence**: AsyncStorage
- **UI Components**: Custom themed components (ThemedView, ThemedText)
- **Icons**: @expo/vector-icons (MaterialIcons)

## ✨ Các cải tiến có thể làm thêm

1. **Edit task** - Cho phép chỉnh sửa task đã tạo
2. **Categories/Tags** - Phân loại công việc
3. **Due dates** - Thêm deadline cho tasks
4. **Animations** - Thêm animations khi add/delete/complete
5. **Dark mode** - Hỗ trợ theme tối
6. **Statistics** - Thống kê tasks hoàn thành/chưa hoàn thành
7. **Real images** - Thêm ảnh notepad và avatar thực tế thay icon
8. **Swipe actions** - Vuốt để xóa/edit task
9. **Notifications** - Nhắc nhở công việc
10. **Cloud sync** - Đồng bộ với server

## 🐛 Troubleshooting

### Nếu gặp lỗi Metro bundler:
```bash
npx expo start -c
```

### Nếu AsyncStorage không hoạt động:
```bash
npm install
npx expo prebuild --clean
```

### Nếu muốn reset dữ liệu:
- Uninstall app và cài lại
- Hoặc thêm button "Clear all tasks" trong settings

## 📝 Ghi chú

- Tất cả dữ liệu được lưu local trên thiết bị
- App hoạt động offline hoàn toàn
- Hỗ trợ iOS, Android, và Web
- TypeScript được sử dụng để type-safe

---

**Tạo bởi**: GitHub Copilot  
**Ngày**: 7 tháng 11, 2025  
**Môn**: Lập Trình Thiết Bị Di Động - Tuần 08
