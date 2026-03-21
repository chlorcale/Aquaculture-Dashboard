import React from 'react';
import { Camera, Brain } from 'lucide-react';
import pondVideo from '../assets/shrimp-pond.mp4';

const CameraFeed = ({ aiAnalysis }) => (
  <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
      <Camera color="#888" />
      <h3 style={{ margin: 0, color: '#444' }}>Camera Ao Nuôi</h3>
      <div className="pulse-dot" style={{ width: '12px', height: '12px', backgroundColor: '#52c41a', borderRadius: '50%' }}></div>
    </div>

    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '2px solid #eee', marginBottom: '20px', backgroundColor: '#000' }}>
      <video width="100%" autoPlay loop muted playsInline style={{ objectFit: 'cover', height: '180px', display: 'block' }}>
        <source src={pondVideo} type="video/mp4" />
      </video>
    </div>

    <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '10px', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <Brain color="#722ed1" size={20} />
        <h4 style={{ margin: 0, color: '#722ed1' }}>AI Phân tích</h4>
      </div>
      <p style={{ margin: '5px 0', fontSize: '14px' }}>🔢 Số lượng: <strong>{aiAnalysis.count} con</strong></p>
      <p style={{ margin: '5px 0', fontSize: '14px' }}>❤️ Sức khỏe: <strong>{aiAnalysis.health}</strong></p>
    </div>
  </div>
);

export default CameraFeed;