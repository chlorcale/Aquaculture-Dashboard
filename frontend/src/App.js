import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Ruler } from 'lucide-react';
import './App.css'; // IMPORT FILE CSS NGOÀI TẠI ĐÂY

import StatCard from './components/StatCard';
import SensorChart from './components/SensorChart';
import CameraFeed from './components/CameraFeed';
import PondSection from './components/PondSection';
import AlertSystem from './components/AlertSystem';
import VoiceControl from './components/VoiceControl';

function App() {
  const [history, setHistory] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState({ count: 0, health: "..." });
  const [isCritical, setIsCritical] = useState(false);
  
  const [testTemp, setTestTemp] = useState(25);
  const [testHumid, setTestHumid] = useState(50);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/sensors/history');
      const data = await res.json();
      setHistory(data);
    } catch (err) { console.error(err); }
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

  return (
    <div className={`app-container ${isCritical ? "critical-mode" : ""}`}>
      
      {isCritical && <div className="critical-overlay" />}

      {/* THANH TEST (MOCK DATA) */}
      <div className="test-panel">
        <h4>🛠 TEST MODE:</h4>
        <input type="range" min="10" max="45" value={testTemp} onChange={(e) => setTestTemp(parseFloat(e.target.value))} />
        <span>Nhiệt độ: {testTemp}°C</span>
        <input type="range" min="20" max="100" value={testHumid} onChange={(e) => setTestHumid(parseFloat(e.target.value))} />
        <span>Độ ẩm: {testHumid}%</span>
        <button onClick={() => { setTestTemp(25); setTestHumid(50); }}>Reset</button>
      </div>

      <h2>📊 Smart Aquaculture System</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <StatCard icon={<Thermometer color="red"/>} label="Nhiệt độ" value={displayLatest.temperature} unit="°C" />
        <StatCard icon={<Droplets color="blue"/>} label="Độ ẩm" value={displayLatest.humidity} unit="%" />
        <StatCard icon={<Ruler color="green"/>} label="Khoảng cách" value={displayLatest.distance} unit="cm" />
      </div>

      <div className="dashboard-grid">
        <SensorChart data={history} />

        <div className="column-flex">
          <CameraFeed aiAnalysis={aiAnalysis} />
          <VoiceControl />
        </div>

        <div className="column-flex">
          <AlertSystem latest={displayLatest} setIsCritical={setIsCritical} />
          <PondSection distance={displayLatest.distance} temperature={displayLatest.temperature} />
        </div>
      </div>
    </div>
  );
}

export default App;