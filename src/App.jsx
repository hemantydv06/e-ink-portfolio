import React, { useState, useEffect } from 'react';
import CanvasSections from './components/CanvasSections';
import NokiaSidebar from './components/NokiaSidebar';
import launchSound from './assets/launch.wav';

const preloadedLaunch = new Audio(launchSound);
preloadedLaunch.preload = 'auto';

const App = () => {
  const [activeSection, setActiveSection] = useState('SYS_INFO');
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-screen'));
          }
        });
      },
      { root: null, rootMargin: '-30% 0px -40% 0px', threshold: 0 }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const launchClone = preloadedLaunch.cloneNode();
    launchClone.play().catch(err => console.log("Audio block by browser:", err));

    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      setIsLaunching(false);
    }, 800);
  };

  return (
    // Changed to flex-col so we can push the full-width footer to the bottom naturally
    <div className="relative flex flex-col min-h-screen bg-eink-bg">
      
      {/* === BACKGROUND LAYERS === */}
      <div 
        className="fixed top-0 left-0 w-16 md:w-[280px] h-full pointer-events-none z-0 border-r-4 border-eink-ink/20 shadow-[2px_0_0_rgba(255,255,255,1)]" 
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(34, 34, 34, 0.1) 2px, rgba(34, 34, 34, 0.1) 4px)'
        }}
      ></div>
      <div className="fixed -bottom-16 -right-8 font-mono font-black text-[15rem] md:text-[22rem] text-te-orange opacity-[0.15] pointer-events-none z-0 select-none leading-none tracking-tighter shadow-inner">
        HY<br/>26
      </div>
      <div className="fixed top-24 right-12 pointer-events-none z-0 flex-col items-end opacity-50 hidden xl:flex">
        <div className="flex gap-1 h-14 mb-2">
           <div className="w-1.5 bg-eink-ink"></div>
           <div className="w-3 bg-eink-ink"></div>
           <div className="w-1 bg-eink-ink"></div>
           <div className="w-2 bg-eink-ink"></div>
           <div className="w-4 bg-eink-ink"></div>
           <div className="w-1 bg-eink-ink"></div>
           <div className="w-2.5 bg-eink-ink"></div>
           <div className="w-1 bg-eink-ink"></div>
           <div className="w-2 bg-eink-ink"></div>
           <div className="w-3 bg-eink-ink"></div>
           <div className="w-0.5 bg-eink-ink"></div>
        </div>
        <span className="font-mono text-xs font-bold text-eink-ink tracking-widest">SN: 67647646545465</span>
        <span className="font-mono text-[0.55rem] font-bold text-eink-ink tracking-widest uppercase mt-0.5">ASSEMBLED</span>
      </div>
      {/* ======================= */}

      {/* === MAIN CONTENT WRAPPER === */}
      <div className="flex-1 flex justify-center w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[330px_1fr] md:gap-16 max-w-[1150px] w-full px-8 pt-14">
          <NokiaSidebar activeSection={activeSection} isDesktop={true} />
          <CanvasSections activeSection={activeSection} />
        </div>
      </div>

      {/* === FULL-WIDTH GREEN LCD FOOTER === */}
      <footer className="w-full bg-[#a6c296] border-t-4 border-eink-ink py-10 px-8 relative z-20 text-eink-ink shadow-[inset_0_4px_15px_rgba(0,0,0,0.1)] mt-10">
        
        {/* Faint LCD Pixel Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise"></div>

        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
               {/* Dark LCD pixel blinks on the green screen */}
               <div className="w-2 h-2 bg-eink-ink rounded-full animate-blink"></div>
               <span className="font-mono text-xs font-bold tracking-widest opacity-80">SYSTEMS_ONLINE</span>
            </div>
            <h2 className="font-mono text-4xl md:text-5xl font-black uppercase tracking-tighter">Hemant Yadav</h2>
            <p className="font-mono text-sm font-bold opacity-80">ENGINEER // INDIA</p>

            {/* Contact Array */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-5 border-t-2 border-dashed border-eink-ink/40 pt-5">
              <a href="mailto:yadavhemant1002@gmail.com" className="font-mono text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform w-fit">
                 <i className="fa-solid fa-envelope"></i> yadavhemant1002@gmail.com
              </a>
              <a href="tel:+919953568400" className="font-mono text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform w-fit">
                 <i className="fa-solid fa-phone"></i> +91 99535XXXXXX
              </a>
            </div>
          </div>

          {/* Technical Stamp Block */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="flex gap-1 h-12 mb-4 p-2 border-2 border-eink-ink bg-[#92ae83] shadow-inner w-fit">
               <div className="w-1.5 bg-eink-ink"></div>
               <div className="w-3 bg-eink-ink"></div>
               <div className="w-1 bg-eink-ink"></div>
               <div className="w-2 bg-eink-ink"></div>
               <div className="w-4 bg-eink-ink"></div>
               <div className="w-1 bg-eink-ink"></div>
               <div className="w-2 bg-eink-ink"></div>
               <div className="w-1.5 bg-eink-ink"></div>
               <div className="w-0.5 bg-eink-ink"></div>
            </div>
            <div className="text-left md:text-right">
               <div className="font-mono text-[0.7rem] font-bold tracking-widest opacity-80">ID: 2234897432893</div>
               <div className="font-mono text-[0.7rem] font-bold tracking-widest mt-1 opacity-80">MFG YEAR: 2026</div>
            </div>
          </div>

        </div>
      </footer>
      {/* ================================== */}

      {/* Rocket Launch Button */}
      <div 
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 transition-all duration-500 ${
          showTopBtn ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-1.5 bg-te-orange opacity-40 blur-md rounded-lg animate-pulse pointer-events-none z-0"></div>
          <button 
            onClick={handleScrollToTop} 
            className={`hardware-btn relative z-10 w-14 h-14 !p-0 flex flex-col items-center justify-center gap-1.5 ${isLaunching ? 'animate-rocket' : ''}`}
            title="Return to Top"
          >
            <div className="w-1.5 h-1.5 bg-te-orange rounded-full animate-blink"></div>
            <i className="fa-solid fa-eject text-eink-ink"></i>
          </button>

          {isLaunching && (
             <div className="absolute top-full left-0 w-full h-24 pointer-events-none overflow-visible z-[-1]">
                <div className="absolute top-0 left-[20%] w-[2px] bg-eink-ink animate-wind-1"></div>
                <div className="absolute top-0 left-[50%] w-[3px] bg-eink-ink animate-wind-2"></div>
                <div className="absolute top-0 left-[80%] w-[2px] bg-eink-ink animate-wind-3"></div>
             </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default App;
