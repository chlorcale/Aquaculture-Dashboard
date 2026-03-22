import React, { useMemo } from 'react';
import { Waves, Droplet, AlertTriangle } from 'lucide-react';
import './PondSection.css';

const PondSection = ({ distance, temperature }) => {
  const maxDepth = 200; 
  const waterHeight = Math.max(0, maxDepth - distance);
  const waterPercentage = (waterHeight / maxDepth) * 100;
  
  const isHot = temperature > 32;
  const isLowWater = waterPercentage < 30; // Cảnh báo nước cạn

  // Tạo vị trí ngẫu nhiên cho tôm để không bị trùng lặp (Dùng useMemo để tối ưu)
  const shrimps = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: Math.random() * 70 + 15, // 15% - 85%
      delay: Math.random() * 5, // 0s - 5s
      size: Math.random() * 0.4 + 0.8 // 0.8rem - 1.2rem
    }));
  }, []);

  return (
    <div className={`pond-card glass-panel ${isHot ? 'hot-water' : ''} ${isLowWater ? 'low-water' : ''}`}>
      <div className="pond-header">
        <div className="title-group">
          <Waves className="icon-waves" size={20} />
          <h3 className="panel-title">Ecosystem Live View (2D)</h3>
        </div>
        <div className="status-group">
          {(isHot || isLowWater) && <AlertTriangle className="icon-alert" size={16} />}
          <div className="depth-badge">
            <Droplet size={14} /> {waterHeight.toFixed(0)} cm
          </div>
        </div>
      </div>

      <div className="pond-visual-container">
        {/* Thước đo kỹ thuật số */}
        <div className="depth-ruler-v3">
          <span className="mark">200</span>
          <span className="mark">100</span>
          <span className="mark">0</span>
        </div>

        {/* Bể chứa hệ sinh thái */}
        <div className="water-tank-v3">
          
          {/* HIỆU ỨNG ÁNH SÁNG LOANG (CAUSTICS) - NẰM TRÊN CÙNG */}
          <div className="water-caustics"></div>

          {/* LỚP SÓNG 1 (SAU CÙNG) */}
          <div className="wave wave-v3-back" style={{ height: `${waterPercentage}%` }}></div>
          
          {/* LỚP SÓNG 2 (GIỮA) */}
          <div className="wave wave-v3-mid" style={{ height: `${waterPercentage}%` }}></div>

          {/* LỚP SÓNG 3 (TRƯỚC CÙNG) */}
          <div className="wave wave-v3-front" style={{ height: `${waterPercentage}%` }}></div>

          {/* ĐÁY AO & HỆ THỰC VẬT */}
          <div className="pond-floor-v3">
            <div className="pond-flora">
              <span className="algae-emoji">🌿</span>
              <span className="algae-emoji shadow">🌿</span>
              <span className="algae-emoji">🌿</span>
            </div>
            <div className="pond-bed-mud"></div>
          </div>

          {/* HỆ SINH VẬT (TÔM THEO ĐÀN) */}
          <div className="shrimp-population" style={{ bottom: `${waterPercentage / 2}%` }}>
            {shrimps.map(shrimp => (
              <span 
                key={shrimp.id} 
                className="shrimp-emoji-v3" 
                style={{ 
                  left: `${shrimp.left}%`, 
                  animationDelay: `${shrimp.delay}s`,
                  fontSize: `${shrimp.size}rem`
                }}
              >
                🦐
              </span>
            ))}
          </div>

          {/* BÓNG KHÍ SỦI (BUBBLES) */}
          <div className="bubbles-container">
            <span className="bubble-v3"></span>
            <span className="bubble-v3"></span>
            <span className="bubble-v3"></span>
          </div>
        </div>
      </div>

      <div className="pond-footer-v3">
        <p>Volumetric Status: <strong>{waterPercentage.toFixed(1)}% Capacity</strong></p>
      </div>
    </div>
  );
};

export default PondSection;