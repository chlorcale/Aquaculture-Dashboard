import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, ReferenceLine // Thêm ReferenceLine
} from 'recharts';
import { Activity, Thermometer, Waves, LayoutGrid, Droplets } from 'lucide-react';
import './SensorChart.css';

const SensorChart = ({ data }) => {
  const [view, setView] = useState('all');

  if (!data || data.length === 0) {
    return <div className="chart-card glass-panel loading-text">Đang kết nối cơ sở dữ liệu...</div>;
  }

  return (
    <div className="chart-card glass-panel">
      <div className="chart-header">
        <div className="title-group">
          <Activity className="icon-activity" size={18} />
          <h3 className="panel-title">Environmental Analytics</h3>
        </div>
        
        <div className="chart-controls">
          <button className={`filter-btn ${view === 'all' ? 'active' : ''}`} onClick={() => setView('all')}>
            <LayoutGrid size={12} /> Tất cả
          </button>
          <button className={`filter-btn ${view === 'temperature' ? 'active' : ''}`} onClick={() => setView('temperature')}>
            <Thermometer size={12} /> Nhiệt độ
          </button>
          <button className={`filter-btn ${view === 'humidity' ? 'active' : ''}`} onClick={() => setView('humidity')}>
            <Droplets size={12} /> Độ ẩm
          </button>
          <button className={`filter-btn ${view === 'distance' ? 'active' : ''}`} onClick={() => setView('distance')}>
            <Waves size={12} /> Mực nước
          </button>
        </div>
      </div>

      <div className="chart-main-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="timestamp" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 9 }}
              tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
              domain={['auto', 'auto']} 
            />

            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '11px' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />

            {/* --- ĐƯỜNG NGƯỠNG CẢNH BÁO (REFERENCE LINES) --- */}
            
            {/* Ngưỡng Nhiệt độ cao (35°C) */}
            {(view === 'all' || view === 'temperature') && (
              <ReferenceLine 
                y={35} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                label={{ value: 'MAX TEMP', position: 'right', fill: '#ef4444', fontSize: 8, fontWeight: 'bold' }} 
              />
            )}

            {/* Ngưỡng Mực nước thấp (50cm) */}
            {(view === 'all' || view === 'distance') && (
              <ReferenceLine 
                y={50} 
                stroke="#22c55e" 
                strokeDasharray="5 5" 
                label={{ value: 'MIN WATER', position: 'right', fill: '#22c55e', fontSize: 8, fontWeight: 'bold' }} 
              />
            )}

            {/* HIỂN THỊ CÁC ĐƯỜNG DỮ LIỆU */}
            {(view === 'all' || view === 'temperature') && (
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2.5} dot={false} name="Nhiệt độ (°C)" />
            )}
            {(view === 'all' || view === 'humidity') && (
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Độ ẩm (%)" />
            )}
            {(view === 'all' || view === 'distance') && (
              <Line type="monotone" dataKey="distance" stroke="#22c55e" strokeWidth={2.5} dot={false} name="Mực nước (cm)" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorChart;