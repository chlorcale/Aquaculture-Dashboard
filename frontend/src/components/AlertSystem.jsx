import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, ShieldAlert } from 'lucide-react';
import './AlertSystem.css';
import alarmSound from '../assets/alarm.wav';

const AlertSystem = ({ latest, setIsCritical }) => {
  const [alerts, setAlerts] = useState([]);
  const audioRef = useRef(new Audio(alarmSound));

  useEffect(() => {
    // 1. Định nghĩa ngưỡng bên trong Effect để tránh lỗi dependency
    const THRESHOLDS = {
      temp: { max: 32, min: 15 },
      humid: { max: 80, min: 40 }
    };

    let newAlerts = [];
    let critical = false;

    // Kiểm tra Nhiệt độ
    if (latest.temperature > THRESHOLDS.temp.max) {
      newAlerts.push({ id: 't-high', msg: `NHIỆT ĐỘ QUÁ CAO: ${latest.temperature}°C` });
      critical = true;
    } else if (latest.temperature < THRESHOLDS.temp.min) {
      newAlerts.push({ id: 't-low', msg: `NHIỆT ĐỘ QUÁ THẤP: ${latest.temperature}°C` });
      critical = true;
    }

    // Kiểm tra Độ ẩm
    if (latest.humidity > THRESHOLDS.humid.max) {
      newAlerts.push({ id: 'h-high', msg: `ĐỘ ẨM QUÁ CAO: ${latest.humidity}%` });
      critical = true;
    } else if (latest.humidity < THRESHOLDS.humid.min) {
      newAlerts.push({ id: 'h-low', msg: `ĐỘ ẨM QUÁ THẤP: ${latest.humidity}%` });
      critical = true;
    }

    setAlerts(newAlerts);
    setIsCritical(critical);

    // 2. Fix lỗi Line 50: Lưu ref vào biến cục bộ (Closure)
    const currentAudio = audioRef.current;

    if (critical) {
      currentAudio.loop = true;
      currentAudio.play().catch(() => {
        // Trình duyệt chặn tự động phát âm thanh nếu user chưa click vào web
        console.warn("Cần tương tác với trang web để kích hoạt âm thanh báo động.");
      });
    } else {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // 3. Cleanup function: Đảm bảo dừng đúng instance audio
    return () => {
      currentAudio.pause();
    };
  }, [latest, setIsCritical]); // Chỉ chạy lại khi dữ liệu cảm biến thay đổi

  return (
    <div className={`alert-card glass-panel ${alerts.length > 0 ? 'has-alerts' : 'system-ok'}`}>
      <div className="alert-header">
        <div className="title-group">
          {/* Chuông rung khi có lỗi */}
          <Bell className={alerts.length > 0 ? "shaking-bell" : "static-bell"} size={22} />
          <h3 className="panel-title">System Guard</h3>
        </div>
        <div className={`status-tag ${alerts.length > 0 ? 'tag-error' : 'tag-safe'}`}>
          {alerts.length > 0 ? 'UNSAFE' : 'SECURE'}
        </div>
      </div>

      <div className="alert-list">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className="alert-item error-item">
              <ShieldAlert size={18} />
              <span>{alert.msg}</span>
            </div>
          ))
        ) : (
          <div className="alert-item safe-item">
            <CheckCircle size={18} />
            <span>Hệ thống hoạt động bình thường</span>
          </div>
        )}
      </div>

      {alerts.length > 0 && (
        <div className="alert-footer">
          <div className="emergency-scanner"></div>
          <p className="footer-note">CẦN KIỂM TRA NGAY LẬP TỨC</p>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;