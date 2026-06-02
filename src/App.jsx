import React, { useState, useEffect } from 'react';
import CanvasSections from './components/CanvasSections';
import NokiaSidebar from './components/NokiaSidebar';

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
    // --- PLAY LAUNCH SOUND ---
    const launchAudio = new Audio('/launch.wav');
    launchAudio.play().catch(err => console.log("Audio block by browser:", err));

    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      setIsLaunching(false);
    }, 800);
  };

  return (
    <div className="relative flex justify-center min-h-screen">
      
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-15 grayscale contrast-150 -z-10 pointer-events-none"
        style={{ backgroundImage: "url('/topo-bg.jpg')" }} 
      />

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] md:gap-16 max-w-[1150px] w-full px-8 py-14">
        {/* DESKTOP CONTROLLER */}
        <NokiaSidebar activeSection={activeSection} isDesktop={true} />
        
        <CanvasSections activeSection={activeSection} />
      </div>

      {/* === MINI BACK-TO-TOP HARDWARE BUTTON === */}
      <div 
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 transition-all duration-500 ${
          showTopBtn ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="relative flex items-center justify-center">
          
          {/* SIGNATURE TE-ORANGE GLOW */}
          <div className="absolute -inset-1.5 bg-te-orange opacity-40 blur-md rounded-lg animate-pulse pointer-events-none z-0"></div>

          {/* The Button */}
          <button 
            onClick={handleScrollToTop} 
            className={`hardware-btn relative z-10 w-14 h-14 !p-0 flex flex-col items-center justify-center gap-1.5 ${isLaunching ? 'animate-rocket' : ''}`}
            title="Return to Top"
          >
            <div className="w-1.5 h-1.5 bg-te-orange rounded-full animate-blink"></div>
            <i className="fa-solid fa-eject text-eink-ink"></i>
          </button>

          {/* The High-Speed Wind Trails */}
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