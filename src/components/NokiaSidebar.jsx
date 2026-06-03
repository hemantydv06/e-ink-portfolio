import React, { useState, useRef } from 'react';
import clickSound from '../assets/click.wav';

const preloadedClick = new Audio(clickSound);
preloadedClick.preload = 'auto';

const NokiaSidebar = ({ activeSection, isDesktop }) => {
  // FreeCodeCamp's highly reliable 24/7 Lofi Code Radio Stream
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

  // --- LOFI RADIO TOGGLE LOGIC ---
  const toggleRadio = () => {
    triggerClickSound();

    if (isRadioPlaying) {
      radioRef.current.pause();
      setIsRadioPlaying(false);
      setToast('RADIO: OFF');
    } else {
      radioRef.current.play().catch(err => console.log("Stream blocked:", err));
      setIsRadioPlaying(true);
      setToast('RADIO: ON [LOFI]');
    }

    // Hide notification after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  // We slightly widened the wrapper to fit the new 3D side edge
  const wrapperClass = isDesktop 
    ? "hidden md:flex sticky top-14 h-fit w-[330px] relative" 
    : "flex md:hidden relative w-full max-w-[450px] my-8";

  return (
    <div className={wrapperClass}> 

      {/* --- NOTIFICATION TOAST --- */}
      {toast && (
        <div className="absolute -top-12 left-0 w-full bg-eink-ink text-white font-mono text-xs font-bold py-2 px-4 rounded border-2 border-eink-ink flex items-center justify-between z-50 animate-pulse">
          <span>{toast}</span>
          {isRadioPlaying && <div className="w-2 h-2 bg-red-500 rounded-full animate-blink"></div>}
        </div>
      )}

      {/* --- 3D SIDE PANEL (LEFT EDGE) --- */}
      <div className="w-12 bg-[#D1D1D1] border-4 border-r-0 border-eink-ink rounded-l-xl flex flex-col items-center justify-start pt-12 pb-6 gap-6 shadow-[inset_4px_0px_0px_rgba(255,255,255,0.5)] z-0 relative mt-2 mb-2">
         
         {/* Tactile Power Button */}
         <button 
           onClick={triggerClickSound}
           className="w-4 h-12 bg-eink-ink border-2 border-eink-ink rounded-sm shadow-hardware active:shadow-hardware-pressed active:translate-x-[2px] active:translate-y-[2px] transition-all" 
           title="Power Dump"
         ></button>

         {/* Lofi Radio Toggle Button */}
         <button 
            onClick={toggleRadio} 
            className={`w-6 h-12 border-2 border-eink-ink rounded-sm shadow-hardware active:shadow-hardware-pressed active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center ${isRadioPlaying ? 'bg-te-orange text-white' : 'bg-white text-eink-ink'}`}
            title="Lofi Radio"
         >
            <i className={`fa-solid fa-radio text-xs -rotate-90 ${isRadioPlaying ? 'animate-blink' : ''}`}></i>
         </button>
      </div>

      {/* --- MAIN FRONT FACE --- */}
      <aside className="flex-1 bg-eink-bg border-4 border-eink-ink rounded-r-xl rounded-l-sm p-6 shadow-[10px_10px_0px_#222222] flex flex-col gap-6 z-10 relative bg-noise">
        
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border-2 border-eink-ink"></div>

        <div className="flex justify-between items-end border-b-2 border-eink-ink pb-2">
          <div className="font-serif font-bold text-sm tracking-tighter uppercase">Teenage<br/>Engineering<br/>Vibe</div>
          <div className="font-mono text-xs font-bold bg-eink-ink text-eink-bg px-1">MODEL: HY-2026</div>
        </div>

        <div className="w-full bg-eink-screen border-4 border-eink-ink p-4 flex flex-col justify-between h-32 relative">
          <div className="flex justify-between items-center text-eink-ink text-xs font-mono font-bold">
            <span>TX/RX</span>
            <span className="flex gap-1">
              {/* Radio wave animation in LCD when playing */}
              <div className={`w-1.5 bg-eink-ink ${isRadioPlaying ? 'animate-wind-1 h-3' : 'h-3'}`}></div>
              <div className={`w-1.5 bg-eink-ink ${isRadioPlaying ? 'animate-wind-2 h-3' : 'h-3'}`}></div>
              <div className={`w-1.5 bg-eink-ink ${isRadioPlaying ? 'animate-wind-3 h-3' : 'h-3'}`}></div>
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
              className={`hardware-btn ${activeSection === item.screen ? 'active-hardware-btn' : ''} ${item.num === '5' ? 'col-span-2' : ''}`}
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
            <div className={`w-2 h-2 rounded-full ${isRadioPlaying ? 'bg-red-500 animate-blink' : 'bg-te-orange animate-blink'}`}></div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NokiaSidebar;