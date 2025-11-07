# EAS Build - Preview Distribution Guide

## 📦 Hướng dẫn Build và Phân phối trên Expo.dev

### 🔐 Bước 1: Đăng nhập Expo

```bash
npx eas login
```

Hoặc tạo tài khoản mới:
```bash
npx eas register
```

### 🚀 Bước 2: Configure Project

```bash
npx eas build:configure
```

### 📱 Bước 3: Build Preview

**Build cho Android (APK - dễ test nhất):**
```bash
npx eas build --profile preview --platform android
```

**Build cho iOS (Simulator):**
```bash
npx eas build --profile preview --platform ios
```

**Build cả 2 platform:**
```bash
npx eas build --profile preview --platform all
```

### 🔍 Bước 4: Theo dõi Build

Sau khi chạy lệnh build, bạn sẽ thấy:
- 🔗 Link theo dõi build trên expo.dev
- ⏱️ Thời gian build (khoảng 5-15 phút)
- 📊 Build logs real-time

### 📲 Bước 5: Download & Test

**Cách 1 - Web Dashboard:**
1. Vào https://expo.dev/accounts/[your-username]/projects/tuan08/builds
2. Tìm build vừa tạo
3. Click "Download" để tải APK/IPA
4. Cài đặt trên thiết bị

**Cách 2 - QR Code:**
1. Build xong sẽ có QR code
2. Scan bằng camera điện thoại
3. Download trực tiếp

**Cách 3 - Internal Distribution Link:**
```bash
npx eas build:list
```
Copy link chia sẻ cho team test

### 🎯 Build Profiles trong eas.json

```json
{
  "build": {
    "preview": {
      "distribution": "internal",  // Không cần App Store/Play Store
      "android": {
        "buildType": "apk"         // APK dễ cài đặt
      },
      "ios": {
        "simulator": true          // Build cho iOS simulator
      }
    }
  }
}
```

### 📝 Các lệnh hữu ích

**Xem danh sách builds:**
```bash
npx eas build:list
```

**Xem chi tiết 1 build:**
```bash
npx eas build:view [build-id]
```

**Hủy build đang chạy:**
```bash
npx eas build:cancel
```

**Xem thông tin project:**
```bash
npx eas project:info
```

### 🔑 Environment Variables (nếu cần)

Tạo file `.env`:
```env
API_URL=https://api.example.com
API_KEY=your-key-here
```

Thêm vào `eas.json`:
```json
{
  "build": {
    "preview": {
      "env": {
        "API_URL": "https://api.example.com"
      }
    }
  }
}
```

### ⚡ Tips & Tricks

1. **Build nhanh hơn**: Sử dụng cache
   ```bash
   npx eas build --profile preview --platform android --no-wait
   ```

2. **Clear cache nếu lỗi**:
   ```bash
   npx eas build --profile preview --platform android --clear-cache
   ```

3. **Auto submit sau build**:
   ```bash
   npx eas build --profile preview --platform android --auto-submit
   ```

### 📊 Internal Distribution

Sau khi build xong, Expo tự động:
- ✅ Host file APK/IPA trên expo.dev
- ✅ Tạo shareable link
- ✅ QR code để download
- ✅ Install instructions tự động

**Chia sẻ với team:**
1. Vào expo.dev dashboard
2. Copy "Install link"
3. Gửi cho người test
4. Họ click link → Download → Cài đặt

### 🔒 Security

**Preview builds:**
- Chỉ người có link mới download được
- Không public trên Store
- Có thể expire sau 1 thời gian
- Set password protection (optional)

### 🐛 Troubleshooting

**Lỗi: "Not logged in"**
```bash
npx eas logout
npx eas login
```

**Lỗi: "Project not configured"**
```bash
npx eas build:configure
```

**Lỗi: SQLite native module**
```bash
npx expo prebuild --clean
npx eas build --profile preview --platform android
```

### 📱 Test trên thiết bị thật

**Android:**
1. Enable "Unknown sources" trong Settings
2. Download APK từ link
3. Cài đặt trực tiếp
4. Open app

**iOS (cần Apple Developer):**
1. Add UDID thiết bị vào Apple Developer
2. Build với profile có UDID
3. Install qua TestFlight hoặc direct install

### 🎉 Kết quả

Sau khi build preview thành công:
- 📦 **APK/IPA file** hosted on expo.dev
- 🔗 **Public link** để chia sẻ
- 📱 **QR code** scan & install
- ⏰ **30 ngày** expire time (mặc định)
- 👥 **Unlimited** downloads

---

## 🚀 Quick Start

```bash
# 1. Login
npx eas login

# 2. Configure (chỉ chạy 1 lần)
npx eas build:configure

# 3. Build Preview Android
npx eas build --profile preview --platform android

# 4. Đợi 5-15 phút → Download APK → Test!
```

**Lưu ý:** Build lần đầu tiên sẽ lâu hơn (10-15 phút). Các lần sau nhanh hơn nhờ cache.
