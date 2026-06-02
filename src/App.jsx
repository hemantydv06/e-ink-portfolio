import React, { useState, useEffect } from 'react';
import CanvasSections from './components/CanvasSections';
import NokiaSidebar from './components/NokiaSidebar'; // Import it back here!

const App = () => {
  const [activeSection, setActiveSection] = useState('SYS_INFO');

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

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="relative flex justify-center min-h-screen">
      
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-15 grayscale contrast-150 -z-10 pointer-events-none"
        style={{ backgroundImage: "url('/topo-bg.jpg')" }} 
      />

      {/* Grid restored! 1 column on phone, 2 columns on laptop */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] md:gap-16 max-w-[1150px] w-full px-8 py-14">
        
        {/* DESKTOP CONTROLLER (Visible only on laptops) */}
        <NokiaSidebar activeSection={activeSection} isDesktop={true} />
        
        <CanvasSections activeSection={activeSection} />
      </div>

    </div>
  );
};

export default App;