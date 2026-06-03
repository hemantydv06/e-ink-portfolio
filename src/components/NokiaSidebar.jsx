import React, { useState, useRef } from 'react';
import clickSound from '../assets/click.wav';

const preloadedClick = new Audio(clickSound);
preloadedClick.preload = 'auto';

const NokiaSidebar = ({ activeSection, isDesktop }) => {
  const radioRef = useRef(new Audio('https://coderadio-admin-v2.freecodecamp.org/radio/8000/radio.mp3'));
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [toast, setToast] = useState(null);

  const navItems = [
    { id: '#about-sys', screen: 'SYS_INFO', num: '1', desc: 'OVERVIEW' },
    { id: '#projects-sys', screen: 'DEPLOYMENTS', num: '2', desc: 'WORK' },
    { id: '#skills-sys', screen: 'TECH_STACK', num: '3', desc: 'SKILLS' },
    { id: '#edu-sys', screen: 'ACADEMICS', num: '4', desc: 'LOGS' },
    { id: '#achieve-sys', screen: 'ACHIEVEMENTS', num: '5', desc: 'EXTRA' },
  ];

  const triggerClickSound = () => {
    const clickClone = preloadedClick.cloneNode();
    clickClone.play().catch(() => {});
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    triggerClickSound();

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const yOffset = targetElement.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  };

  const toggleRadio = () => {
    triggerClickSound();

    if (isRadioPlaying) {
      radioRef.current.pause();
      setIsRadioPlaying(false);
      setToast('RADIO: OFF');
      setTimeout(() => setToast(null), 2000);
    } else {
      setToast('CONNECTING...');
      radioRef.current.play().then(() => {
        setIsRadioPlaying(true);
        setToast('RADIO: ON');
        setTimeout(() => setToast(null), 3000);
      }).catch(err => {
        console.log("Stream blocked:", err);
        setToast('ERR: BLOCKED');
        setTimeout(() => setToast(null), 3000);
      });
    }
  };

  const wrapperClass = isDesktop 
    ? "hidden md:block sticky top-16 h-fit w-[320px] relative" 
    : "block md:hidden relative w-full max-w-[450px] my-10";

  return (
    <div className={wrapperClass}> 

      {/* HARDWARE POP-UP NOTIFICATION */}
      {toast && (
        <div className="absolute -top-10 left-12 bg-eink-ink text-white border-4 border-b-0 border-eink-ink font-mono text-xs font-bold px-4 py-2 rounded-t-md z-0 flex items-center gap-2 animate-bounce shadow-sketch">
          <div className={`w-2 h-2 rounded-full ${toast === 'CONNECTING...' ? 'bg-yellow-400 animate-pulse' : (isRadioPlaying ? 'bg-te-orange animate-blink' : 'bg-red-600')}`}></div>
          {toast}
        </div>
      )}

      {/* UNIFIED 3D HARDWARE BLOCK */}
      <div className="flex w-full h-full rounded-xl shadow-[12px_12px_0px_#222222] relative z-10 bg-eink-ink">

        {/* LEFT SIDE CASING */}
        <div className="w-12 shrink-0 bg-[#B0B0B0] rounded-l-xl border-4 border-r-2 border-eink-ink flex flex-col items-center pt-16 pb-6 gap-10 shadow-[inset_4px_4px_0px_rgba(255,255,255,0.4)] z-20">

           <button 
             onClick={triggerClickSound}
             title="Hardware Dump"
             className="relative w-14 h-10 -ml-10 bg-[#333] border-4 border-eink-ink rounded-l-lg hover:translate-x-1 active:translate-x-3 transition-all flex items-center justify-end pr-1.5 shadow-[-6px_6px_0px_#222222] active:shadow-[0px_0px_0px_#222222]"
           >
              <div className="w-1 h-6 bg-red-500 rounded-full shadow-[inset_1px_1px_0px_rgba(0,0,0,0.5)]"></div>
           </button>

           <button 
             onClick={toggleRadio}
             title="Lofi Code Radio"
             className={`relative w-14 h-14 -ml-10 border-4 border-eink-ink rounded-l-lg hover:translate-x-1 active:translate-x-3 transition-all flex items-center justify-center shadow-[-6px_6px_0px_#222222] active:shadow-[0px_0px_0px_#222222] ${isRadioPlaying ? 'bg-te-orange text-white' : 'bg-white text-eink-ink'}`}
           >
              <i className={`fa-solid fa-radio text-lg ${isRadioPlaying ? 'animate-pulse' : ''}`}></i>
           </button>

        </div>

        {/* MAIN FRONT FACE */}
        {/* Adjusted padding (p-4) and gap (gap-5) to give the buttons strictly defined breathing room */}
        <aside className="flex-1 min-w-0 bg-eink-bg border-4 border-l-2 border-eink-ink rounded-r-xl p-4 shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.1)] flex flex-col gap-5 relative z-10 bg-noise">
          
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>

          <div className="flex justify-between items-end border-b-2 border-eink-ink pb-2">
            <div className="font-serif font-bold text-xs tracking-tighter uppercase leading-tight truncate mr-2">Teenage<br/>Engineering<br/>Vibe</div>
            <div className="font-mono text-[0.6rem] font-bold bg-eink-ink text-eink-bg px-1 shrink-0">MODEL: HY-2026</div>
          </div>

          <div className="w-full bg-eink-screen border-4 border-eink-ink p-3 flex flex-col justify-between h-28 relative shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="flex justify-between items-center text-eink-ink text-[0.65rem] font-mono font-bold">
              <span>TX/RX</span>
              <span className="flex gap-1 shrink-0">
                <div className={`w-1.5 bg-eink-ink ${isRadioPlaying ? 'animate-wind-1 h-3' : 'h-3'}`}></div>
                <div className={`w-1.5 bg-eink-ink ${isRadioPlaying ? 'animate-wind-2 h-3' : 'h-3'}`}></div>
                <div className={`w-1.5 bg-eink-ink ${isRadioPlaying ? 'animate-wind-3 h-3' : 'h-3'}`}></div>
                <div className="w-1.5 h-3 border border-eink-ink"></div>
              </span>
            </div>
            {/* Reduced text size slightly (text-lg) to prevent long words stretching the LCD */}
            <div className="font-mono font-bold text-lg uppercase tracking-wider animate-blink truncate">
              {activeSection}
            </div>
          </div>

          {/* Reduced gap (gap-2) to pull buttons tighter together */}
          <nav className="grid grid-cols-2 gap-2 w-full">
            {navItems.map((item) => (
              <a 
                key={item.num} 
                href={item.id} 
                onClick={(e) => handleNavClick(e, item.id)}
                /* Shrunk the button padding (!p-1.5) to keep it tightly boxed */
                className={`hardware-btn !p-1.5 overflow-hidden ${activeSection === item.screen ? 'active-hardware-btn' : ''} ${item.num === '5' ? 'col-span-2' : ''}`}
              >
                <div className="flex justify-between w-full font-mono font-bold text-[0.6rem] mb-1">
                  <span>{item.num}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${activeSection === item.screen ? 'bg-te-orange' : 'border border-eink-ink'}`}></div>
                </div>
                {/* Scaled down text size and forced truncation so it never breaks the grid */}
                <span className="font-serif font-bold text-[0.65rem] uppercase tracking-tighter text-left w-full truncate">{item.desc}</span>
              </a>
            ))}
          </nav>

          <div className="w-full h-7 border-2 border-eink-ink flex items-center justify-between px-2 bg-white mt-auto">
            <span className="font-mono text-[0.55rem] font-bold">SEQ_RUNNING</span>
            <div className="flex gap-1 shrink-0">
               <div className={`w-2 h-2 rounded-full animate-blink ${isRadioPlaying ? 'bg-red-500' : 'bg-te-orange'}`}></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NokiaSidebar;