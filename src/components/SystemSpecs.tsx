import React from 'react';
import { SYSTEM_SPECS } from '../data/gameData';
import { Smartphone, Cpu, ShieldCheck, Download, HardDrive, CheckCircle2, ChevronRight, HelpCircle, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

interface SystemSpecsProps {
  onOpenDownload: () => void;
}

export const SystemSpecs: React.FC<SystemSpecsProps> = ({ onOpenDownload }) => {
  const steps = [
    {
      num: '01',
      title: 'Enable Unknown Sources',
      desc: 'Open Android Settings → Security / Apps → Allow install from this source or browser.',
    },
    {
      num: '02',
      title: 'Download APK Package',
      desc: 'Download the lightweight 280MB official SigmaClash_v2.4.1.apk package directly.',
    },
    {
      num: '03',
      title: 'Launch & Claim Season 1 Gear',
      desc: 'Open the game, log in via Guest or Google, and claim the Rusha Cyber Champion set instantly.',
    },
  ];

  return (
    <section id="specs" className="py-20 bg-[#0F0F12] border-b border-[#282834] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#FFB800] font-bold mb-2">
            <Cpu className="w-4 h-4 text-[#FFB800]" />
            Universal Android Compatibility
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase italic tracking-tight">
            SYSTEM SPECS & <span className="text-[#00E5FF]">DOWNLOAD CENTER</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Engineered with a streamlined rendering engine so older 2GB RAM phones run with rock-solid frame rates, while flagship processors unlock 90 FPS ultra fidelity.
          </p>
        </div>

        {/* Side-by-Side Minimum vs Recommended Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Minimum Specs Card */}
          <div className="rounded-2xl bg-[#16161C] border border-[#282834] p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#282834]">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Baseline Profile
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase italic">
                  MINIMUM SPECIFICATIONS
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 font-bold">
                Low-Spec Ready
              </span>
            </div>

            <div className="divide-y divide-[#282834]/60 mt-4 text-xs font-mono">
              {SYSTEM_SPECS.minimum.map((spec, i) => (
                <div key={i} className="py-3 flex justify-between items-center">
                  <span className="text-slate-400">{spec.label}</span>
                  <span className="text-slate-200 font-bold text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-[#0F0F12] border border-[#282834] text-xs text-slate-400">
              💡 Plays smoothly on budget Redmi, Realme, Samsung Galaxy A-series, and older Android devices without thermal throttling.
            </div>
          </div>

          {/* Recommended Specs Card */}
          <div className="rounded-2xl bg-gradient-to-b from-[#181822] to-[#14141C] border border-[#00E5FF]/40 p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-[#00E5FF]/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-[#282834]">
              <div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold tracking-wider">
                  Competitive Standard
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase italic">
                  RECOMMENDED SPECIFICATIONS
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-bold">
                60 - 90 FPS Ultra
              </span>
            </div>

            <div className="divide-y divide-[#282834]/60 mt-4 text-xs font-mono">
              {SYSTEM_SPECS.recommended.map((spec, i) => (
                <div key={i} className="py-3 flex justify-between items-center">
                  <span className="text-slate-400">{spec.label}</span>
                  <span className="text-white font-bold text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-[#0F0F12] border border-[#00E5FF]/20 text-xs text-slate-300">
              ⚡ Delivers high-density particle lighting, realistic water reflections, instant gloo-wall deploy times, and tournament-grade responsiveness.
            </div>
          </div>
        </div>

        {/* 3-Step Installation Guide */}
        <div className="rounded-2xl bg-[#16161C] border border-[#282834] p-6 sm:p-10 mb-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-display font-black text-3xl text-white uppercase italic tracking-tight">
              3-STEP FAST INSTALLATION GUIDE
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-mono">
              Direct sideload setup takes under 60 seconds with no complex OBB extraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((st) => (
              <div key={st.num} className="p-5 rounded-xl bg-[#0F0F12] border border-[#282834] relative">
                <div className="font-display font-black text-4xl text-[#FFB800]/40 mb-2">
                  {st.num}
                </div>
                <h4 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Download Center CTA Banner */}
          <div className="mt-10 pt-8 border-t border-[#282834] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-display font-black text-2xl text-white uppercase">
                READY TO DROP INTO BERMUDA?
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Version: 2.4.1 · File Size: 280 MB · SHA-256: e48f...a92b · Android 5.0+
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenDownload();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black font-display font-black text-base uppercase tracking-wider shadow-lg shadow-[#FFB800]/25 hover:brightness-110 active:scale-95 transition-all"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Get APK (280MB)</span>
              </button>

              <button
                onClick={() => {
                  sound.playSelect();
                  onOpenDownload();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0F0F12] border border-[#282834] text-slate-300 font-display font-bold text-sm uppercase tracking-wider hover:text-white hover:border-[#00E5FF]/50 transition-colors"
              >
                <HardDrive className="w-4 h-4 text-[#00E5FF]" />
                <span>Mirror 2 (Fast CDN)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
