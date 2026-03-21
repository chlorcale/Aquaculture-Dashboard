import React from 'react';

const StatCard = ({ icon, label, value, unit }) => (
  <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
    <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>{icon}</div>
    <div>
      <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>{label}</p>
      <h2 style={{ margin: 0, fontSize: '24px' }}>{value} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>{unit}</span></h2>
    </div>
  </div>
);

export default StatCard;