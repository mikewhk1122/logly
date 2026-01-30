
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 全域錯誤處理
window.onerror = function(msg, url, line, col, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; color: #92400e; background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; margin: 20px; font-family: sans-serif;">
        <h2 style="font-weight: bold; margin-bottom: 10px;">系統暫時無法運作 🚧</h2>
        <p style="font-size: 14px; line-height: 1.5;">錯誤訊息: ${msg}</p>
        <p style="font-size: 12px; color: #b45309; margin-top: 10px;">這通常是版本衝突引起，請嘗試重新整理。</p>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #92400e; color: white; border-radius: 10px; border: none; cursor: pointer; font-weight: bold;">
          立即重新載入
        </button>
      </div>
    `;
  }
  return false;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
