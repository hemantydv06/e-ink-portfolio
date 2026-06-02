import React, { useState, useEffect } from 'react';
import CanvasSections from './components/CanvasSections';

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

      {/* Changed to a clean, single-column centered layout */}
      <div className="flex flex-col w-full max-w-[850px] px-8 py-14">
        {/* Pass the state directly into the canvas */}
        <CanvasSections activeSection={activeSection} />
      </div>

    </div>
  );
};

export default App;