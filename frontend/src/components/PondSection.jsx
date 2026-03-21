import React from 'react';
import { Waves } from 'lucide-react';

const PondSection = ({ distance, temperature }) => {
  const maxDepth = 200; 
  const waterHeight = Math.max(0, maxDepth - distance);
  const waterPercentage = (waterHeight / maxDepth) * 100;
  const waterColor = temperature > 30 ? 'rgba(255, 77, 79, 0.6)' : 'rgba(24, 144, 255, 0.6)';

  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Waves color="#1890ff" />
        <h3 style={{ margin: 0, color: '#444' }}>Mặt Cắt Ao 2D</h3>
      </div>
      <div style={{ width: '100%', height: '180px', backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', position: 'relative', border: '2px solid #ddd' }}>
        <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, height: `${waterPercentage}%`, backgroundColor: waterColor, transition: 'height 1s ease', zIndex: 2 }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20px', backgroundColor: '#8b4513', zIndex: 3 }}></div>
        <div className="shrimp" style={{ position: 'absolute', bottom: '30%', left: '20%', zIndex: 4 }}>🦐</div>
      </div>
      <p style={{ marginTop: '15px', fontSize: '14px', textAlign: 'center' }}>Mực nước: <strong>{waterHeight.toFixed(0)} cm</strong></p>
    </div>
  );
};

export default PondSection;