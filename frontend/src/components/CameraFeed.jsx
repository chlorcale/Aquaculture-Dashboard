import React from 'react';
import { Camera } from 'lucide-react'; // Bỏ Brain vì đã chuyển sang Side Panel
import './CameraFeed.css';
import pondVideo from '../assets/shrimp-pond.mp4';

const CameraFeed = () => {
  // Đã xóa hàm getStatusClass bị báo lỗi unused-vars ở đây

  return (
    <div className="camera-card glass-panel">
      <div className="camera-header">
        <div className="title-group">
          <Camera className="icon-camera" size={18} />
          <h3 className="panel-title">Pond Surveillance</h3>
        </div>
        <div className="live-indicator">
          <span className="live-text">REC 4K</span>
        </div>
      </div>

      <div className="video-container">
        <div className="ai-scanner"></div>
        <div className="video-overlay-text">AI TRACKING ACTIVE</div>
        
        <video className="pond-video" autoPlay loop muted playsInline>
          <source src={pondVideo} type="video/mp4" />
        </video>

        <div className="focus-corners">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;