import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SensorChart = ({ data }) => (
  <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
    <h3 style={{ marginTop: 0, color: '#444' }}>Lịch sử môi trường (MongoDB)</h3>
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#ff4d4f" strokeWidth={3} name="Nhiệt độ" dot={false} />
          <Line type="monotone" dataKey="distance" stroke="#52c41a" strokeWidth={3} name="Mực nước" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SensorChart;