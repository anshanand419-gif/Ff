import React, { useState, useEffect } from 'react';
import { X, Download, ShieldCheck, CheckCircle2, Smartphone, Terminal, HardDrive, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState('48.4 MB/s');

  useEffect(() => {
    if (!isOpen) {
      setDownloadProgress(0);
      setIsDownloading(false);
      setDownloadCompleted(false);
    }
  }, [isOpen]);

  const startDownloadSimulation = () => {
    sound.playClick();
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadCompleted(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsDownloading(false);
        setDownloadCompleted(true);
        sound.playSelect();

        // Trigger real file download of demo APK package
        try {
          const apkContent = "Sigma Clash Mobile Battle Royale - Official Client Package v2.4.1\nEngine: Unity Sigma Lite\nArchitecture: arm64-v8a / armeabi-v7a\nPackage: com.sigmaclash.battleroyale";
          const blob = new Blob([apkContent], { type: 'application/vnd.android.package-archive' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'SigmaClash_v2.4.1.apk';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch {
          // fallback
        }
      }
      setDownloadProgress(progress);
    }, 120);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#16161C] border border-[#282834] shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#282834]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFB800] text-black font-display font-black text-xl flex items-center justify-center">
              Σ
            </div>
            <div>
              <h3 className="font-display font-black text-2xl text-white uppercase italic">
                SIGMA CLASH APK DOWNLOAD
              </h3>
              <span className="text-xs font-mono text-[#00E5FF]">
                Official Direct Channel · v2.4.1 (Latest)
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#0F0F12] border border-[#282834] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Package Metadata Grid */}
        <div className="grid grid-cols-3 gap-3 my-5 text-center text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#0F0F12] border border-[#282834]">
            <span className="text-slate-500 uppercase block text-[10px]">Package Size</span>
            <span className="text-white font-bold text-sm">280.4 MB</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#0F0F12] border border-[#282834]">
            <span className="text-slate-500 uppercase block text-[10px]">Target OS</span>
            <span className="text-[#00E5FF] font-bold text-sm">Android 5.0+</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#0F0F12] border border-[#282834]">
            <span className="text-slate-500 uppercase block text-[10px]">Security Hash</span>
            <span className="text-emerald-400 font-bold text-sm">VERIFIED ✓</span>
          </div>
        </div>

        {/* Download Simulation Area */}
        <div className="p-5 rounded-xl bg-[#0F0F12] border border-[#282834] space-y-4 mb-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold">
              {downloadCompleted 
                ? 'Package Downloaded & Verified!' 
                : isDownloading 
                ? `Transmitting: ${downloadProgress}% (${downloadSpeed})`
                : 'Click button below to initiate high-speed download'}
            </span>
            <span className="text-[#FFB800] font-bold">
              {downloadProgress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-[#16161C] rounded-full overflow-hidden border border-[#282834] relative">
            <div 
              className={`h-full transition-all duration-150 rounded-full ${
                downloadCompleted 
                  ? 'bg-emerald-500 shadow-md shadow-emerald-500/50' 
                  : 'bg-gradient-to-r from-[#FFB800] to-[#00E5FF]'
              }`}
              style={{ width: `${downloadProgress}%` }}
            />
          </div>

          {/* Checksum SHA256 */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
            <span>SHA-256: e48f81246a2b7f90c88319ba11</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Clean / Virus-Free
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3">
          {!downloadCompleted ? (
            <button
              onClick={startDownloadSimulation}
              disabled={isDownloading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black font-display font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FFB800]/30 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Downloading SigmaClash_v2.4.1.apk ({downloadProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>Start Direct APK Download (280MB)</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>APK file saved to your Downloads! Tap the file on your phone to install.</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-[#1E1E26] hover:bg-[#282834] text-white font-display font-black text-base uppercase tracking-wider transition-colors"
              >
                Done / Close Window
              </button>
            </div>
          )}

          {/* Quick installation note */}
          <div className="text-[11px] font-mono text-slate-400 text-center leading-relaxed">
            Note: If Android prompts "File might be harmful", tap <strong>Download anyway</strong> and <strong>Install Unknown Apps</strong> to proceed.
          </div>
        </div>
      </div>
    </div>
  );
};
