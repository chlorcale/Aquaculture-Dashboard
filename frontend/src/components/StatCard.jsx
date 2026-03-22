import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, label, value, unit, isWarning }) => {
  return (
    <div className={`stat-card ${isWarning ? 'warning' : ''}`}>
      {/* Hiệu ứng ánh sáng loang trang trí */}
      <div className="card-decorator"></div>
      
      {/* Chấm trạng thái nhỏ */}
      <div className="status-dot"></div>

      <div className="icon-container">
        {icon}
      </div>

      <div className="card-content">
        <p className="card-label">{label}</p>
        <h2 className="card-value">
          {value}
          <span className="card-unit">{unit}</span>
        </h2>
      </div>
    </div>
  );
};

export default StatCard;