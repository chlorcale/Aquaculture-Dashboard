const axios = require('axios');
const mongoose = require('mongoose');

// Cấu hình
const ADA_USER = "chlorcale";
const ADA_KEY = "aio_SOYy61vXPVpju3nhnVKnhZOrgnHu";
const FEEDS = ['nhiet-do', 'do-am', 'khoang-cach'];

mongoose.connect('mongodb://localhost:27017/iot_aquaculture');

const SensorData = mongoose.model('SensorData', {
  temperature: Number, humidity: Number, distance: Number, timestamp: Date
});

async function seedData() {
  try {
    console.log("🚀 Đang bắt đầu lấy dữ liệu từ Adafruit...");
    
    // Lấy dữ liệu của từng feed
    const requests = FEEDS.map(feed => 
      axios.get(`https://io.adafruit.com/api/v2/${ADA_USER}/feeds/${feed}/data`, {
        headers: { 'X-AIO-Key': ADA_KEY }
      })
    );

    const responses = await Promise.all(requests);
    
    // Gom dữ liệu: Vì các feed gửi cùng lúc, ta sẽ khớp chúng theo thời gian gần bằng nhau
    const tempData = responses[0].data; // nhiet-do
    const humidData = responses[1].data; // do-am
    const distData = responses[2].data; // khoang-cach

    const combined = tempData.map((item, index) => ({
      temperature: parseFloat(item.value),
      humidity: parseFloat(humidData[index]?.value || 0),
      distance: parseFloat(distData[index]?.value || 0),
      timestamp: new Date(item.created_at)
    }));

    // Lưu vào MongoDB
    await SensorData.insertMany(combined);
    
    console.log(`✅ Thành công! Đã đưa ${combined.length} bản ghi vào MongoDB Compass.`);
    process.exit();
  } catch (err) {
    console.error("❌ Lỗi khi seeding:", err.message);
    process.exit(1);
  }
}

seedData();