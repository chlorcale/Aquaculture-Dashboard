import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Bell, CheckCircle } from 'lucide-react';
import alarmSound from '../assets/alarm.wav'; // Import file âm thanh

const AlertSystem = ({ latest, setIsCritical }) => {
  const [alerts, setAlerts] = useState([]);
  const audioRef = useRef(new Audio(alarmSound));

  const THRESHOLDS = {
    temp: { max: 32, min: 15 },
    humid: { max: 80, min: 40 }
  };

  useEffect(() => {
    let newAlerts = [];
    let critical = false;

    if (latest.temperature > THRESHOLDS.temp.max || latest.temperature < THRESHOLDS.temp.min) {
      newAlerts.push({ type: 'error', msg: `⚠️ NHIỆT ĐỘ BẤT THƯỜNG: ${latest.temperature}°C` });
      critical = true;
    }
    if (latest.humidity > THRESHOLDS.humid.max || latest.humidity < THRESHOLDS.humid.min) {
      newAlerts.push({ type: 'error', msg: `⚠️ ĐỘ ẨM BẤT THƯỜNG: ${latest.humidity}%` });
      critical = true;
    }

    setAlerts(newAlerts);
    setIsCritical(critical); // Báo cho App.js biết tình trạng khẩn cấp

    // Xử lý âm thanh
    if (critical) {
      audioRef.current.play().catch(e => console.log("Chờ tương tác người dùng để phát âm thanh"));
      audioRef.current.loop = true;
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      audioRef.current.pause();
    };
  }, [latest, setIsCritical]);

  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <Bell className={alerts.length > 0 ? "shaking-bell" : ""} color={alerts.length > 0 ? "red" : "green"} />
        <h3 style={{ margin: 0 }}>Trạng Thái Hệ Thống</h3>
      </div>
      {/* Hiển thị danh sách cảnh báo như cũ */}
      {alerts.map((a, i) => (
        <div key={i} style={{ color: 'red', fontWeight: 'bold', marginBottom: '5px' }}>{a.msg}</div>
      ))}
    </div>
  );
};

export default AlertSystem;