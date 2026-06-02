import React, { useState, useEffect } from 'react';
import NokiaSidebar from './NokiaSidebar';
import clickSound from '../assets/click.wav';

// HARDWARE PRELOAD FOR TYPING SOUNDS
const preloadedType = new Audio(clickSound);
preloadedType.preload = 'auto';

const TypewriterIntro = () => {
  const [text, setText] = useState('');
  const fullText = "HEMANT YADAV";
  const [showDot, setShowDot] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        
        // Play mechanical click for every letter (skip spaces)
        if (fullText[i] !== ' ') {
          const typeClone = preloadedType.cloneNode();
          typeClone.volume = 0.2; // Keep it quiet and tactile
          typeClone.play().catch(() => {});
        }
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Dramatic pause before the final red dot
        setTimeout(() => {
          setShowDot(true);
          const dotClone = preloadedType.cloneNode();
          dotClone.volume = 0.6; // Louder final "clack"
          dotClone.play().catch(() => {});
        }, 500);
      }
    }, 150); // 150ms delay gives it that deliberate, heavy retro speed

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex items-end min-h-[60px] mb-2">
      <h1 className="font-mono text-5xl font-bold uppercase leading-tight">
        {text}{showDot && <span className="text-red-600">.</span>}
      </h1>
      {/* Retro Terminal Block Cursor */}
      <div className={`w-5 h-10 bg-eink-ink ml-2 mb-1 ${!isTyping ? 'animate-blink' : ''}`}></div>
    </div>
  );
};

const projectsData = [
  {
    title: "LedgerLease",
    badge: "SaaS Platform",
    desc: "End-to-end rental property management optimizer platform featuring automated billing and multi-tenant tracking.",
    tags: ["#React", "#SQL"]
  },
  {
    title: "Autonomous Indoor Farming",
    badge: "Hardware / AI",
    desc: "Closed-loop automation platform for indoor plantation care utilizing edge diagnostics and macro-nutrient control loops.",
    tags: ["#ESP32-S3", "#NeuralNetworks"]
  }
];

const skillsData = [
  { label: "Languages", value: "Java, Python, C++, SQL" },
  { label: "Frameworks", value: "React, Flutter, Scikit-learn" },
  { label: "Hardware", value: "ESP32-S3 Microcontrollers, IoT Sensors" }
];

const CanvasSections = ({ activeSection }) => {
  return (
    <main className="flex flex-col gap-32 pt-4 pb-32 w-full max-w-[850px]">
      
      <section id="about-sys" className="scroll-section relative" data-screen="SYS_INFO">
        
        {/* === NEW TYPING INTRO REPLACES STATIC H1 === */}
        <TypewriterIntro />
        
        <p className="font-mono font-semibold opacity-85 text-base mt-3">ID // 2K24CSUN01285 | CSE.AI_YEAR_2</p>
        
        {/* MOBILE CONTROLLER */}
        <NokiaSidebar activeSection={activeSection} isDesktop={false} />

        <h2 className="border-b-4 border-eink-ink inline-block mb-8 font-mono text-3xl uppercase">System Overview</h2>
        
        <div className="sketch-frame text-xl leading-relaxed">
          <p>Computer Science Engineering student specializing in <strong>Artificial Intelligence</strong>. Focused on bridging the interface between scalable cloud architecture and automated hardware nodes through clean code and precise physical design.</p>
        </div>
        
        <div className="mt-10 flex gap-6">
          <a href="#" className="border-2 border-eink-ink px-6 py-3 rounded-full bg-white shadow-sketch hover:-translate-y-0.5 hover:shadow-sketch-hover transition-all font-mono font-bold text-base text-eink-ink">
            <i className="fab fa-github mr-2"></i> _github
          </a>
          <a href="#" className="border-2 border-eink-ink px-6 py-3 rounded-full bg-white shadow-sketch hover:-translate-y-0.5 hover:shadow-sketch-hover transition-all font-mono font-bold text-base text-eink-ink">
            <i className="fab fa-linkedin-in mr-2"></i> _linkedin
          </a>
        </div>
      </section>

      <section id="projects-sys" className="scroll-section relative" data-screen="DEPLOYMENTS">
        <h2 className="border-b-4 border-eink-ink inline-block mb-10 font-mono text-3xl uppercase">Active Deployments</h2>
        <div className="flex flex-col gap-12">
          {projectsData.map((project, idx) => (
            <div key={idx} className="sketch-frame">
              <span className="bg-eink-ink text-eink-bg px-3 py-1.5 rounded text-sm font-mono font-bold inline-block mb-4">{project.badge}</span>
              <h3 className="text-3xl font-mono font-bold mb-4">{project.title}</h3>
              <p className="text-xl opacity-90">{project.desc}</p>
              <div className="mt-6 flex gap-5 border-t-2 border-dashed border-eink-ink pt-5 font-mono text-base font-bold">
                {project.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills-sys" className="scroll-section relative" data-screen="TECH_STACK">
        <h2 className="border-b-4 border-eink-ink inline-block mb-10 font-mono text-3xl uppercase">Technical Proficiencies</h2>
        <div className="sketch-frame flex flex-col gap-8">
          {skillsData.map((skill, idx) => (
            <div key={idx} className={`${idx !== skillsData.length - 1 ? 'border-b-2 border-dashed border-eink-ink/30 pb-8' : ''}`}>
              <div className="font-mono text-xl font-bold mb-2 uppercase">{skill.label}</div>
              <div className="text-2xl font-semibold">{skill.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="edu-sys" className="scroll-section relative" data-screen="ACADEMICS">
        <h2 className="border-b-4 border-eink-ink inline-block mb-10 font-mono text-3xl uppercase">Academic Timeline</h2>
        <div className="border-l-4 border-dashed border-eink-ink pl-10 ml-5 flex flex-col gap-12 relative">
          <div className="relative">
            <div className="absolute -left-[54px] top-1.5 w-5 h-5 bg-eink-ink rounded-full border-4 border-eink-bg"></div>
            <span className="font-mono text-base font-bold opacity-80">[ 2024 - PRESENT ]</span>
            <h4 className="font-mono text-2xl font-bold mt-2">B.Tech — CSE (Artificial Intelligence)</h4>
          </div>
          <div className="relative">
             <div className="absolute -left-[54px] top-1.5 w-5 h-5 bg-eink-ink rounded-full border-4 border-eink-bg"></div>
            <span className="font-mono text-base font-bold opacity-80">[ CERTIFICATION ]</span>
            <h4 className="font-mono text-2xl font-bold mt-2">Java Web Development Complete</h4>
          </div>
        </div>
      </section>

    </main>
  );
};

export default CanvasSections;