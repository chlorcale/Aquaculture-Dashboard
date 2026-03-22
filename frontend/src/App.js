import React, { useState, useEffect, useCallback } from 'react';
import { 
  Thermometer, Droplets, Ruler, Activity, 
  LayoutDashboard, Settings, History, Database, User, Brain 
} from 'lucide-react';
import './App.css';

import StatCard from './components/StatCard';
import SensorChart from './components/SensorChart';
import CameraFeed from './components/CameraFeed';
import PondSection from './components/PondSection';
import AlertSystem from './components/AlertSystem';
import VoiceControl from './components/VoiceControl';

function App() {
  const [history, setHistory] = useState([]);
  const [aiAnalysis] = useState({ count: 142, health: "Tốt" });
  const [isCritical, setIsCritical] = useState(false);
  
  const [testTemp, setTestTemp] = useState(27.2);
  const [testHumid, setTestHumid] = useState(47.4);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/sensors/history');
      const data = await res.json();
      setHistory(data);
    } catch (err) { 
      console.error("Lỗi kết nối Backend:", err); 
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayLatest = {
    ...(history.length > 0 ? history[history.length - 1] : { distance: 0 }),
    temperature: testTemp,
    humidity: testHumid
  };

  // Hàm xác định màu sắc trạng thái AI
  const getStatusColor = (status) => {
    if (!status) return '#94a3b8';
    const s = status.toLowerCase();
    if (s.includes('tốt') || s.includes('good')) return '#22c55e';
    if (s.includes('yếu') || s.includes('danger')) return '#ef4444';
    return '#facc15';
  };

  return (
    <div className={`app-container ${isCritical ? "critical-mode" : ""}`}>
      {isCritical && <div className="critical-overlay" />}

      {/* NAVBAR TRÊN CÙNG */}
      <nav className="main-navbar">
        <div className="nav-logo">
          <Database className="logo-icon" size={22} />
          <span>AQUA PRO <small>v3.0</small></span>
        </div>

        <div className="nav-links">
          <button className="nav-item active"><LayoutDashboard size={18} /> Dashboard</button>
          <button className="nav-item"><History size={18} /> Analytics</button>
          <button className="nav-item"><Settings size={18} /> Settings</button>
        </div>

        <div className="nav-live-stats">
          <div className="mini-stat">
            <span className="dot temp"></span>
            T: <strong>{displayLatest.temperature}°C</strong>
          </div>
          <div className="mini-stat">
            <span className="dot humid"></span>
            H: <strong>{displayLatest.humidity}%</strong>
          </div>
          <div className="mini-stat">
            <span className="dot water"></span>
            W: <strong>{displayLatest.distance}cm</strong>
          </div>
          <div className="nav-user">
            <User size={16} />
            <span>Phat_Admin</span>
          </div>
        </div>
      </nav>

      {/* NỘI DUNG CHÍNH */}
      <main className="dashboard-content">
        
        {/* THANH TEST DATA HẸP */}
        <div className="test-panel-mini">
          <div className="test-item">
            <label>Temp: {testTemp}°C</label>
            <input type="range" min="10" max="45" step="0.1" value={testTemp} onChange={(e) => setTestTemp(parseFloat(e.target.value))} />
          </div>
          <div className="test-item">
            <label>Humid: {testHumid}%</label>
            <input type="range" min="20" max="100" value={testHumid} onChange={(e) => setTestHumid(parseFloat(e.target.value))} />
          </div>
          <button className="reset-btn" onClick={() => { setTestTemp(27.2); setTestHumid(47.4); }}>Reset</button>
        </div>

        {/* STATS HÀNG NGANG */}
        <div className="stats-grid">
          <StatCard icon={<Thermometer size={20} color="#ef4444"/>} label="Nhiệt độ" value={displayLatest.temperature} unit="°C" />
          <StatCard icon={<Droplets size={20} color="#3b82f6"/>} label="Độ ẩm" value={displayLatest.humidity} unit="%" />
          <StatCard icon={<Ruler size={20} color="#22c55e"/>} label="Mực nước" value={displayLatest.distance} unit="cm" />
        </div>

        {/* GRID CHÍNH 1:2:1 */}
        <div className="dashboard-grid">
          
          {/* CỘT 1: BIỂU ĐỒ (HẸP) */}
          <div className="grid-column chart-col">
            <SensorChart data={history} />
          </div>

          {/* CỘT 2: QUAN SÁT (RỘNG) */}
          <div className="grid-column observation-col">
            <div className="observation-main-row">
              <CameraFeed />
              
              {/* SIDE PANEL AI - NẰM KẾ BÊN CAMERA */}
              <div className="ai-side-panel glass-panel">
                <div className="ai-header-mini">
                  <Brain size={14} />
                  <span>NEURAL ANALYTICS</span>
                </div>
                <div className="ai-content-mini">
                  <div className="ai-stat-box">
                    <label>Quantity</label>
                    <div className="ai-val">{aiAnalysis.count} <small>shrimps</small></div>
                  </div>
                  <div className="ai-stat-box">
                    <label>Health Status</label>
                    <div className="ai-val" style={{ color: getStatusColor(aiAnalysis.health) }}>
                      {aiAnalysis.health}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AO CÁ 2D */}
            <PondSection distance={displayLatest.distance} temperature={displayLatest.temperature} />
          </div>

          {/* CỘT 3: ĐIỀU KHIỂN */}
          <div className="grid-column control-col">
            <AlertSystem latest={displayLatest} setIsCritical={setIsCritical} />
            <VoiceControl />
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;