# 🚀 Cách Build Preview cho Task Manager App

## ✅ Đã hoàn tất setup:
- ✅ EAS CLI installed
- ✅ Logged in to Expo account
- ✅ Project configured with EAS
- ✅ eas.json created
- ✅ Package identifiers added

## 📱 Build Preview ngay bây giờ:

### Option 1: Build Android APK (Recommended - Dễ test nhất)

```bash
npx eas build --profile preview --platform android
```

**Kết quả:**
- ⏱️ Build time: 5-15 phút
- 📦 File: APK (~50-100MB)
- 📲 Install: Trực tiếp trên Android (không cần Play Store)
- 🔗 Link: Tự động có link download & QR code

### Option 2: Build iOS Simulator

```bash
npx eas build --profile preview --platform ios
```

**Kết quả:**
- ⏱️ Build time: 10-20 phút
- 📦 File: .app cho simulator
- 📲 Test: Chỉ trên Mac với Xcode Simulator

### Option 3: Build cả 2 platforms

```bash
npx eas build --profile preview --platform all
```

---

## 📋 Quy trình Build:

1. **Chạy lệnh build** (ví dụ Android):
   ```bash
   npx eas build --profile preview --platform android
   ```

2. **Chọn options** khi được hỏi:
   - Generate new keystore? → **Yes**
   - Build type? → **apk** (đã config sẵn)

3. **Đợi build hoàn tất**:
   - Theo dõi progress trên terminal
   - Hoặc mở link expo.dev để xem dashboard
   - Build logs real-time

4. **Download & Test**:
   - Click link download từ terminal
   - Hoặc vào https://expo.dev/accounts/[username]/projects/tuan08/builds
   - Download APK
   - Cài đặt trên thiết bị Android

---

## 🎯 Sau khi Build thành công:

### Cách 1: Download từ Dashboard
1. Mở https://expo.dev
2. Vào Projects → Tuan08 → Builds
3. Click vào build mới nhất
4. Click **Download** button
5. Chuyển APK sang điện thoại
6. Cài đặt (enable Unknown Sources nếu cần)

### Cách 2: QR Code (Nhanh nhất!)
1. Sau khi build xong, terminal sẽ hiển thị QR code
2. Scan bằng camera điện thoại
3. Mở link → Download → Install

### Cách 3: Share Link
1. Copy link từ terminal hoặc dashboard
2. Gửi cho người khác qua email/chat
3. Họ click → Download → Install

---

## 🔄 Update App (Build mới):

Khi có thay đổi code, chỉ cần:

1. **Commit changes** (optional nhưng recommended):
   ```bash
   git add .
   git commit -m "Update: your changes"
   ```

2. **Build lại**:
   ```bash
   npx eas build --profile preview --platform android
   ```

3. **Download build mới** và test

---

## 📊 Monitor Builds:

**Xem tất cả builds:**
```bash
npx eas build:list
```

**Output:**
```
┌─────────────┬──────────┬──────────┬────────────────┬──────────────┐
│ ID          │ Platform │ Profile  │ Status         │ Created      │
├─────────────┼──────────┼──────────┼────────────────┼──────────────┤
│ abc123...   │ ANDROID  │ preview  │ FINISHED       │ 2 hours ago  │
│ def456...   │ ANDROID  │ preview  │ IN_PROGRESS    │ 5 mins ago   │
└─────────────┴──────────┴──────────┴────────────────┴──────────────┘
```

**Xem chi tiết 1 build:**
```bash
npx eas build:view <build-id>
```

---

## ⚡ Build Options hữu ích:

**Build không đợi (async):**
```bash
npx eas build --profile preview --platform android --no-wait
```

**Clear cache nếu có lỗi:**
```bash
npx eas build --profile preview --platform android --clear-cache
```

**Build local (test trước khi build cloud):**
```bash
npx eas build --profile preview --platform android --local
```

---

## 🎉 Kết quả cuối cùng:

Sau khi build **preview** thành công, bạn sẽ có:

✅ **APK file** hosted trên expo.dev  
✅ **Public download link** (có thể chia sẻ)  
✅ **QR code** để scan & install  
✅ **Install instructions** tự động  
✅ **30 ngày** expiry time  
✅ **Unlimited downloads**  

---

## 🐛 Common Issues:

**1. "Build failed" - SQLite native module:**
```bash
npx expo prebuild --clean
npx eas build --profile preview --platform android
```

**2. "Invalid credentials":**
```bash
npx eas logout
npx eas login
```

**3. "Package name already exists":**
- Đổi package name trong app.json
- Ví dụ: `com.yourname.tuan08`

---

## 🚀 Ready to Build?

Chạy ngay lệnh này:

```bash
npx eas build --profile preview --platform android
```

Đợi 5-15 phút → Nhận link download → Install & Test! 🎉
