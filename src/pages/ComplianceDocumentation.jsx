import React, { useState, useEffect } from 'react';

export const ComplianceDocumentation = ({ pageTitle, metaData, sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToAnchor = (id) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-zinc-400 font-sans selection:bg-sky-500/20 selection:text-white relative antialiased pt-28 pb-20">
      
      {/* Top Fixed Progress Bar Layout */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/[0.02] z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-sky-400 to-emerald-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 relative z-10">
        
        {/* Left Side Navigation Anchors Panel */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-zinc-600 block mb-2 uppercase">{"// NAV_ANCHORS"}</span>
              <nav className="flex flex-col gap-1 border-l border-white/[0.04]">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToAnchor(sec.id)}
                    className={`group flex items-center gap-2 pl-4 py-1.5 text-[12px] font-mono tracking-wide text-left transition-all relative ${
                      activeSection === sec.id ? 'text-white font-bold border-l border-sky-400 -ml-[1px]' : 'hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-zinc-600 group-hover:text-zinc-400 text-[10px]">{sec.index}</span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Right Content Engine Shell */}
        <main className="w-full">
          <div className="border border-white/[0.04] bg-[#0A0E14]/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="border-b border-white/[0.06] pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white font-sans">{pageTitle}</h1>
                <p className="font-mono text-[10px] text-zinc-500 tracking-widest mt-1.5 uppercase">{"// STATE CONTEXT: "}{metaData}</p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[9px] bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 rounded-lg text-zinc-400">
                {/* Clean inline vector replaced Code2 icon to bypass variable crash */}
                <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>COMPLIANCE.COMPILER.ONLINE</span>
              </div>
            </div>

            <div className="space-y-12">
              {sections.map((sec) => (
                <article 
                  id={sec.id} 
                  key={sec.id} 
                  className="group/article transition-colors relative pt-2"
                >
                  <div className="font-mono text-[11px] text-zinc-600 tracking-wider mb-4 border-b border-white/[0.03] pb-2 flex items-center justify-between">
                    <div>
                      <span className="text-zinc-700 block text-[9px]">---------------------------------------------------------</span>
                      <span className="block text-white font-bold tracking-widest mt-1 text-[13px] uppercase">
                        {sec.index}{" "}{sec.title}
                      </span>
                      <span className="text-zinc-700 block text-[9px]">---------------------------------------------------------</span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${sec.id}`);
                      }}
                      className="opacity-0 group-hover/article:opacity-100 font-sans text-[9px] tracking-widest bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded hover:bg-white/[0.08] hover:text-white transition-all text-zinc-400 flex items-center gap-1"
                    >
                      {/* Clean inline vector replaced Hash icon to bypass variable crash */}
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      LINK
                    </button>
                  </div>

                  <div className="space-y-4 font-sans text-[13.5px] leading-relaxed text-zinc-400 group-hover/article:text-zinc-300 transition-colors pl-0 md:pl-4 border-l border-transparent group-hover/article:border-white/[0.02]">
                    {sec.blocks.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComplianceDocumentation;