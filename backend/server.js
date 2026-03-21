const express = require('express');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. KẾT NỐI MONGODB COMPASS ---
// 'iot_aquaculture' là tên Database sẽ tự sinh ra trong Compass của bạn
mongoose.connect('mongodb://localhost:27017/iot_aquaculture')
  .then(() => console.log("✅ Đã kết nối MongoDB Compass"))
  .catch(err => console.error("❌ Lỗi kết nối DB:", err));

// Định nghĩa Schema (Cấu trúc bảng dữ liệu) - Rất quan trọng cho đồ án HTTT
const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  distance: Number,
  timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData', sensorSchema);

// --- 2. KẾT NỐI ADAFRUIT IO (MQTT) ---
const ADA_USER = "chlorcale";
const ADA_KEY = "aio_SOYy61vXPVpju3nhnVKnhZOrgnHu";
const client = mqtt.connect(`mqtts://io.adafruit.com`, {
  username: ADA_USER,
  password: ADA_KEY
});

let latestData = { temperature: 0, humidity: 0, distance: 0 };

client.on('connect', () => {
  console.log("📡 Đã kết nối Adafruit MQTT");
  client.subscribe(`${ADA_USER}/feeds/nhiet-do`);
  client.subscribe(`${ADA_USER}/feeds/do-am`);
  client.subscribe(`${ADA_USER}/feeds/khoang-cach`);
});

client.on('message', async (topic, message) => {
  console.log(`📩 Nhận dữ liệu từ Topic: ${topic} ---- Nội dung: ${message.toString()}`);
  const value = parseFloat(message.toString());
  
  // Dùng hàm .includes để tránh sai sót khoảng trắng hoặc ký tự đặc biệt
  if (topic.includes('nhiet-do')) latestData.temperature = value;
  if (topic.includes('do-am')) latestData.humidity = value;
  if (topic.includes('khoang-cach')) latestData.distance = value;

  // Chỉ lưu vào DB nếu CẢ 3 số liệu đều đã có giá trị (tránh lưu số 0 ban đầu)
  if (latestData.temperature !== 0 || latestData.humidity !== 0) {
      try {
        const newEntry = new SensorData({
          temperature: latestData.temperature,
          humidity: latestData.humidity,
          distance: latestData.distance
        });
        await newEntry.save();
        console.log("💾 Đã lưu thành công vào MongoDB!");
      } catch (err) {
        console.error("❌ Lỗi lưu DB:", err);
      }
  }
});
// --- 3. CÁC API CHO FRONTEND ---
// Lấy 20 dữ liệu mới nhất để vẽ biểu đồ
app.get('/api/sensors/history', async (req, res) => {
  try {
    // Lấy dữ liệu từ DB, sắp xếp theo thời gian mới nhất
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(30);
    // Đảo ngược lại để biểu đồ chạy từ trái sang phải (cũ -> mới)
    res.json(data.reverse()); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API điều khiển (Nếu bạn có feed điều khiển)
app.post('/api/control', (req, res) => {
  const { command } = req.body;
  client.publish(`${ADA_USER}/feeds/den-quat`, command);
  res.json({ status: "Sent " + command });
});

app.listen(5000, () => console.log("🚀 Backend chạy tại http://localhost:5000"));