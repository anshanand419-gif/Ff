import React from 'react';
import { ShieldCheck, MessageSquare, Youtube, Send, Instagram, Github, Radio } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Discord', icon: MessageSquare, href: '#', count: '120K Members' },
    { name: 'YouTube', icon: Youtube, href: '#', count: '450K Subscribers' },
    { name: 'Telegram', icon: Send, href: '#', count: '85K Community' },
    { name: 'Instagram', icon: Instagram, href: '#', count: '210K Followers' },
  ];

  const serverRegions = [
    { region: 'Asia-East (Singapore)', ping: '24ms', status: 'Optimal' },
    { region: 'NA-East (Virginia)', ping: '38ms', status: 'Optimal' },
    { region: 'EU-Central (Frankfurt)', ping: '29ms', status: 'Optimal' },
    { region: 'LATAM (São Paulo)', ping: '32ms', status: 'Optimal' },
  ];

  return (
    <footer className="bg-[#0B0B0E] border-t border-[#282834] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#282834]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FFB800] text-black font-display font-black text-xl flex items-center justify-center">
                Σ
              </div>
              <span className="font-display font-black text-2xl text-white uppercase italic tracking-wider">
                SIGMA <span className="text-[#FFB800]">CLASH</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The high-velocity, lightweight 50-player battle royale designed for fast 10-minute skirmishes, responsive anime action, and zero-lag performance on all mobile devices.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Aegis Anti-Cheat Kernel Protocol v3.8 Active</span>
            </div>
          </div>

          {/* Server Status Center */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase font-bold text-slate-300">
              <span className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#00E5FF]" /> Live Regional Matchmaking
              </span>
              <span className="text-emerald-400">99.98% Uptime</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121217] border border-[#282834] divide-y divide-[#282834]/60 text-xs font-mono">
              {serverRegions.map((srv, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between">
                  <span className="text-slate-400">{srv.region}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{srv.ping}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Social Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase font-bold text-slate-300 block">
              Official Channels
            </span>
            <div className="space-y-2">
              {socialLinks.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.href}
                    onClick={() => sound.playSelect()}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#121217] border border-[#282834] text-xs font-mono hover:text-[#FFB800] hover:border-[#FFB800]/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 text-slate-300 group-hover:text-white">
                      <Icon className="w-4 h-4 text-[#FFB800]" />
                      <span className="font-bold">{soc.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{soc.count}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Sigma Clash Studio. All rights reserved. Free Fire is a trademark of Garena.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Fair Play Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Privacy Notice</a>
            <a href="#" className="hover:text-slate-400">Community Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
