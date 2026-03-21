import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Terminal as TerminalIcon } from 'lucide-react';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [terminalLogs, setTerminalLogs] = useState(["--- Hệ thống Voice AI sẵn sàng ---"]);

  // Khởi tạo nhận diện giọng nói
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new window.SpeechRecognition();

  recognition.continuous = false; // Nghe từng câu một
  recognition.lang = 'vi-VN';    // Nhận diện tiếng Việt
  recognition.interimResults = false;

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    
    setTranscript(text);
    // Thêm log vào Terminal giả lập
    const newLog = `[${new Date().toLocaleTimeString()}] User: "${text}"`;
    setTerminalLogs(prev => [newLog, ...prev].slice(0, 5)); // Lưu 5 dòng gần nhất
    
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Lỗi Voice:", event.error);
    setIsListening(false);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <Mic color={isListening ? "red" : "#888"} className={isListening ? "pulse-dot" : ""} />
        <h3 style={{ margin: 0 }}>Điều Khiển Giọng Nói (AI)</h3>
      </div>

      <button 
        onClick={startListening}
        disabled={isListening}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: isListening ? '#ff4d4f' : '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}
      >
        {isListening ? "Đang lắng nghe..." : "Nhấn để ra lệnh"}
      </button>

      {/* TERMINAL GIẢ LẬP ĐỂ CHỨNG MINH MODULE HOẠT ĐỘNG */}
      <div style={{ 
        backgroundColor: '#1e1e1e', 
        color: '#00ff00', 
        padding: '15px', 
        borderRadius: '8px', 
        fontFamily: 'Courier New, monospace',
        fontSize: '13px',
        minHeight: '120px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', borderBottom: '1px solid #444' }}>
          <TerminalIcon size={14} /> <span>VOICE_TERMINAL</span>
        </div>
        {terminalLogs.map((log, i) => (
          <div key={i} style={{ marginBottom: '5px', opacity: i === 0 ? 1 : 0.6 }}>
            {log}
          </div>
        ))}
        {isListening && <span className="blink-cursor">_</span>}
      </div>
    </div>
  );
};

export default VoiceControl;