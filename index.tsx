import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Stop the watchdog timer as soon as the module starts executing
if ((window as any).clearLoadingWatchdog) {
  (window as any).clearLoadingWatchdog();
}

console.log("[Logly] Entry point loaded, starting mount...");

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("[Logly] Render triggered successfully.");
  } catch (error) {
    console.error("[Logly] React Mounting Error:", error);
    rootElement.innerHTML = `
      <div class="flex items-center justify-center min-h-screen p-6 bg-red-50">
        <div class="bg-white p-8 rounded-[32px] shadow-2xl border-2 border-red-200 text-left max-w-lg w-full">
          <h3 class="text-red-900 font-black text-2xl tracking-tight mb-4 text-center">Mount Error</h3>
          <p class="bg-red-50 p-4 rounded-2xl font-mono text-xs text-red-700 break-all border border-red-100 mb-6">
            ${error instanceof Error ? error.message : String(error)}
          </p>
          <button onclick="location.reload()" class="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-lg">Retry</button>
        </div>
      </div>
    `;
  }
} else {
  console.error("[Logly] Root element not found!");
}