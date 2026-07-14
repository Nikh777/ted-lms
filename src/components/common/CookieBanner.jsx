import React, { useState, useEffect } from 'react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const consent = localStorage.getItem('ted_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const saveConsent = (state) => {
    localStorage.setItem('ted_cookie_consent', state);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-[#0D111A]/95 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.85)] z-50 overflow-hidden group select-none font-sans transition-all duration-500"
      role="dialog"
      aria-label="Cookie Configuration Terminal"
    >
      {/* Background Micro Tech Grid Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Reactive Mouse Spotlight Track */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), transparent 65%)`
        }}
      />

      {/* Top Header Row Panel */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-sky-400 overflow-hidden shadow-inner">
            <svg className="w-4 h-4 animate-[spin_24s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
              <path d="M12 6v2m0 8v2M6 12h2m8 0h2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" className="opacity-30" />
            </svg>
          </div>
          
          <div>
            <h4 className="font-mono text-[12px] font-black tracking-widest text-white uppercase">COOKIE MANIFEST</h4>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider">SECURE CONTEXT</span>
            </div>
          </div>
        </div>
        
        <span className="font-mono text-[10px] font-semibold text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-md">
          v1.0.4
        </span>
      </div>

      {/* Central Description Text — Enhanced Readability Contrast */}
      <p className="text-[13px] leading-relaxed text-zinc-200 mb-5 relative z-10 font-normal tracking-wide">
        We instantiate telemetry streams and runtime session cache states to allocate secure workspace sandboxes. Review our <a href="/cookie-policy" className="text-sky-400 font-semibold hover:text-sky-300 underline underline-offset-4 decoration-sky-400/40 hover:decoration-sky-300 transition-colors">Cookie Architecture</a>.
      </p>

      {/* Control Configuration Core Buttons Grid */}
      <div className="flex flex-col gap-2.5 relative z-10">
        <button
          onClick={() => saveConsent('all')}
          className="w-full py-2.5 bg-white text-black font-black text-[11px] font-mono tracking-widest rounded-xl hover:bg-zinc-100 transition-all uppercase shadow-[0_4px_20px_rgba(255,255,255,0.08)] active:scale-[0.99]"
        >
          ACCEPT ALL INITIALIZATIONS
        </button>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => saveConsent('essential')}
            className="py-2 border border-white/[0.12] bg-white/[0.03] text-zinc-100 hover:text-white font-bold text-[10.5px] font-mono tracking-widest rounded-xl hover:bg-white/[0.07] hover:border-white/[0.2] transition-all uppercase active:scale-[0.98]"
          >
            ESSENTIAL ONLY
          </button>
          <button
            onClick={() => saveConsent('rejected')}
            className="py-2 border border-white/[0.12] bg-white/[0.03] text-zinc-300 hover:text-white font-bold text-[10.5px] font-mono tracking-widest rounded-xl hover:bg-white/[0.07] hover:border-white/[0.2] transition-all uppercase active:scale-[0.98]"
          >
            REJECT OPTIONAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;