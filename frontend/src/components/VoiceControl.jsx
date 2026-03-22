import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, Terminal as TerminalIcon, Cpu, Trash2 } from 'lucide-react';
import './VoiceControl.css';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState(["--- Hệ thống Voice AI sẵn sàng ---"]);
  const scrollRef = useRef(null); // Ref để xử lý tự động cuộn

  // Tự động cuộn xuống dưới cùng khi có Log mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLogs, isListening]);

  // Khởi tạo nhận diện giọng nói
  const setupRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      return null;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    return recognition;
  }, []);

  const startListening = () => {
    const recognition = setupRecognition();
    if (!recognition) return;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const userLog = `[${time}] User: "${text}"`;
      
      // Logic xử lý lệnh
      let aiResponse = "Hệ thống đã nhận lệnh.";
      const cmd = text.toLowerCase();
      if (cmd.includes("tắt báo động")) aiResponse = "Đã tắt chuông cảnh báo khẩn cấp.";
      if (cmd.includes("kiểm tra ao")) aiResponse = "Cảm biến ổn định. Mực nước: 102cm.";
      if (cmd.includes("nhiệt độ")) aiResponse = "Nhiệt độ hiện tại là 27.2 độ C.";

      const aiLog = `[${time}] AI: ${aiResponse}`;

      // FIX: Đẩy log mới vào CUỐI mảng để không bị ngược
      setTerminalLogs(prev => [...prev, userLog, aiLog].slice(-20)); // Giữ 20 dòng gần nhất
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const clearLogs = () => setTerminalLogs(["--- Đã xóa lịch sử log ---"]);

  return (
    <div className={`voice-card glass-panel ${isListening ? 'listening' : ''}`}>
      <div className="voice-header">
        <div className="title-group">
          <Cpu className="icon-cpu" size={18} />
          <h3 className="panel-title">Voice AI Command</h3>
        </div>
        <div className="voice-actions">
          <button className="btn-clear" onClick={clearLogs} title="Xóa log">
            <Trash2 size={14} />
          </button>
          <div className="status-indicator">
            {isListening ? <span className="recording-tag">REC</span> : <span className="idle-tag">IDLE</span>}
          </div>
        </div>
      </div>

      <div className="voice-visualizer">
        {isListening ? (
          <div className="sound-waves">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        ) : (
          <div className="mic-placeholder">
            <MicOff size={32} className="icon-muted" />
          </div>
        )}
      </div>

      <button 
        className={`btn-voice ${isListening ? 'btn-active' : ''}`}
        onClick={startListening}
        disabled={isListening}
      >
        {isListening ? (
          <><Mic className="animate-pulse" size={16} /> Đang nghe...</>
        ) : (
          <><Mic size={16} /> Nhấn để ra lệnh</>
        )}
      </button>

      {/* TERMINAL FIX LỖI TRÀN VIỀN */}
      <div className="terminal-container">
        <div className="terminal-header">
          <TerminalIcon size={12} /> <span>TERMINAL_V3.0</span>
        </div>
        <div className="terminal-body" ref={scrollRef}>
          {terminalLogs.map((log, i) => (
            <div key={i} className={`log-line ${log.includes('AI:') ? 'ai-text' : ''}`}>
              <span className="log-prompt">{">"}</span> {log}
            </div>
          ))}
          {isListening && (
            <div className="log-line">
              <span className="log-prompt">{">"}</span>
              <span className="cursor">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceControl;