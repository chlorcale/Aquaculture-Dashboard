# 🦐 Smart Aquaculture Management System (SAMS)
**Đồ án chuyên ngành Hệ thống thông tin (HTTT 252)** *Phát triển bởi: chlorcale*

## 📖 Giới thiệu dự án
SAMS là một hệ thống giám sát và điều khiển ao nuôi thủy sản thông minh tích hợp IoT và AI. Hệ thống cho phép người dùng theo dõi các chỉ số môi trường (Nhiệt độ, Độ ẩm, Mực nước) theo thời gian thực, cảnh báo sự cố bằng âm thanh/hình ảnh và điều khiển thiết bị từ xa qua giọng nói.



## 🌟 Tính năng nổi bật
* **Real-time Dashboard:** Hiển thị dữ liệu cảm biến dưới dạng biểu đồ (Recharts) và thẻ thông số (StatCards).
* **Digital Twin & AI:** Mô phỏng mặt cắt ao 2D và tích hợp Camera AI giả lập.
* **Voice Control (AI):** Điều khiển thiết bị bằng giọng nói tiếng Việt (Web Speech API).
* **Stress Test System:** Hệ thống cảnh báo toàn màn hình và âm thanh báo động khi dữ liệu vượt ngưỡng an toàn.
* **Data Persistence:** Lưu trữ lịch sử hoạt động vào cơ sở dữ liệu MongoDB.

## 🛠 Tech Stack
* **Frontend:** React.js, Lucide-React, Recharts, CSS3 (Animations).
* **Backend:** Node.js, Express.js, Mongoose.
* **Database:** MongoDB Compass.
* **IoT:** Yolo:Bit (MicroPython), Adafruit IO (MQTT Broker).

---

## ⚙️ Hướng dẫn cài đặt và Chạy dự án

Để chạy dự án này trên máy tính cá nhân, hãy thực hiện theo các bước sau:

### 1. Chuẩn bị (Prerequisites)
* Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản 16.x trở lên).
* Đã cài đặt [MongoDB Compass](https://www.mongodb.com/try/download/compass).
* Tài khoản [Adafruit IO](https://io.adafruit.com/) để lấy `Username` và `Active Key`.

### 2. Tải mã nguồn về máy
Mở Terminal/PowerShell và chạy lệnh:
```bash
git clone https://github.com/chlorcale/Aquaculture-Dashboard.git
cd Aquaculture-Dashboard
```
### 3. Cài đặt backend
```bash
cd backend
npm install
# Tạo dữ liệu mẫu ban đầu (Chỉ chạy lần đầu)
node seed.js
# Khởi chạy server
node server.js
```
Server sẽ chạy tại: http://localhost:5000
### 4. Cài đặt Frontend
Mở một Terminal mới:
```bash
cd frontend
npm install
npm start
```
Giao diện sẽ tự động mở tại: http://localhost:3000
## 🖥 Hướng dẫn Demo Module chuyên môn

### 1. Kiểm thử hệ thống (Stress Test) - Hướng CNPM
Tại giao diện chính, sử dụng thanh trượt **🛠 TEST MODE** để kéo Nhiệt độ vượt quá **32°C**.
* **Kết quả:** Kích hoạt chế độ khẩn cấp. Màn hình nhấp nháy đỏ, chuông báo động reo (Alarm Sound) và toàn bộ Dashboard rung lắc để thu hút sự chú ý của người vận hành.

### 2. Điều khiển giọng nói (AI) - Hướng AI
Nhấn nút **"Nhấn để ra lệnh"** và nói rõ ràng câu lệnh tiếng Việt: *"Bật máy bơm cho ao số một"*.
* **Kết quả:** Module Speech-to-Text sẽ xử lý và hiển thị chính xác câu lệnh của bạn lên **Terminal giả lập**. Điều này chứng minh khả năng nhận diện ngôn ngữ tự nhiên của hệ thống.

### 3. Kiểm tra dữ liệu (HTTT) - Hướng HTTT
Mở **MongoDB Compass**, kết nối vào địa chỉ: `mongodb://localhost:27017`.
* **Kết quả:** Bạn sẽ thấy database `aquaculture` chứa các collection lưu trữ lịch sử cảm biến. Điều này chứng minh tính toàn vẹn và khả năng lưu trữ dữ liệu bền vững (Persistence Data) của hệ thống thông tin.

---

## 📁 Cấu trúc thư mục dự án

```plaintext
aquaculture-dashboard/
├── backend/                # Server Node.js & Express
│   ├── models/             # Định nghĩa Schema MongoDB
│   ├── seed.js             # Script khởi tạo dữ liệu mẫu
│   └── server.js           # Logic kết nối MQTT & API
├── frontend/               # Ứng dụng React.js
│   ├── src/
│   │   ├── components/     # Các module: StatCard, AlertSystem, VoiceControl...
│   │   ├── App.js          # Luồng logic chính và quản lý State
│   │   └── App.css         # Định dạng giao diện và Animation cảnh báo
│   └── public/             # Tài nguyên tĩnh
└── README.md               # Tài liệu hướng dẫn dự án

Lưu ý: Dự án được thực hiện nhằm mục đích học tập và nghiên cứu ứng dụng công nghệ IoT/AI trong lĩnh vực thủy sản thông minh.
---

