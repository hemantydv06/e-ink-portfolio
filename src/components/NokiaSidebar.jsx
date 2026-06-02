import React from 'react';

const NokiaSidebar = ({ activeSection, isDesktop }) => {
  const navItems = [
    { id: '#about-sys', screen: 'SYS_INFO', num: '1', desc: 'OVERVIEW' },
    { id: '#projects-sys', screen: 'DEPLOYMENTS', num: '2', desc: 'WORK' },
    { id: '#skills-sys', screen: 'TECH_STACK', num: '3', desc: 'SKILLS' },
    { id: '#edu-sys', screen: 'ACADEMICS', num: '4', desc: 'LOGS' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    // --- PLAYS YOUR EXACT AUDIO FILE FOR SIDEBAR CLICKS ---
    const clickAudio = new Audio('/click.wav');
    clickAudio.play().catch(err => console.log("Audio block by browser:", err));

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const yOffset = targetElement.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  };

  const wrapperClass = isDesktop 
    ? "hidden md:block relative w-[280px]" 
    : "block md:hidden relative w-full max-w-[450px] my-10";

  const asideClass = isDesktop
    ? "fixed top-24 -ml-6 w-[280px]"
    : "w-full";

  return (
    <div className={wrapperClass}> 
      <aside className={`${asideClass} bg-eink-bg border-4 border-eink-ink rounded-sm p-6 shadow-hardware flex flex-col gap-6 relative overflow-hidden`}>
        
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>

        <div className="flex justify-between items-end border-b-2 border-eink-ink pb-2">
          <div className="font-serif font-bold text-sm tracking-tighter uppercase">Teenage<br/>Engineering<br/>Vibe</div>
          <div className="font-mono text-xs font-bold bg-eink-ink text-eink-bg px-1">MODEL: HY-2026</div>
        </div>

        <div className="w-full bg-eink-screen border-4 border-eink-ink p-4 flex flex-col justify-between h-32 relative">
          <div className="flex justify-between items-center text-eink-ink text-xs font-mono font-bold">
            <span>TX/RX</span>
            <span className="flex gap-1">
              <div className="w-1.5 h-3 bg-eink-ink"></div>
              <div className="w-1.5 h-3 bg-eink-ink"></div>
              <div className="w-1.5 h-3 bg-eink-ink"></div>
              <div className="w-1.5 h-3 border border-eink-ink"></div>
            </span>
          </div>
          <div className="font-mono font-bold text-2xl uppercase tracking-widest animate-blink">
            {activeSection}
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-4 w-full">
          {navItems.map((item) => (
            <a 
              key={item.num} 
              href={item.id} 
              onClick={(e) => handleNavClick(e, item.id)}
              className={`hardware-btn ${activeSection === item.screen ? 'active-hardware-btn' : ''}`}
            >
              <div className="flex justify-between w-full font-mono font-bold text-xs mb-4">
                <span>{item.num}</span>
                <div className={`w-2 h-2 rounded-full ${activeSection === item.screen ? 'bg-te-orange' : 'border border-eink-ink'}`}></div>
              </div>
              <span className="font-serif font-bold text-sm uppercase tracking-tighter text-left w-full">{item.desc}</span>
            </a>
          ))}
        </nav>

        <div className="w-full h-8 border-2 border-eink-ink flex items-center justify-between px-2 bg-white">
          <span className="font-mono text-[0.6rem] font-bold">SEQ_RUNNING</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-te-orange rounded-full animate-blink"></div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NokiaSidebar;