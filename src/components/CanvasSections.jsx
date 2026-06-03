import React, { useState, useEffect } from 'react';
import NokiaSidebar from './NokiaSidebar';
import clickSound from '../assets/click.wav';

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
        if (fullText[i] !== ' ') {
          const typeClone = preloadedType.cloneNode();
          typeClone.volume = 0.2;
          typeClone.play().catch(() => {});
        }
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          setShowDot(true);
          const dotClone = preloadedType.cloneNode();
          dotClone.volume = 0.6;
          dotClone.play().catch(() => {});
        }, 500);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex items-end min-h-[60px] mb-2">
      <h1 className="font-mono text-5xl font-bold uppercase leading-tight">
        {text}{showDot && <span className="text-red-600">.</span>}
      </h1>
      <div className={`w-5 h-10 bg-eink-ink ml-2 mb-1 ${!isTyping ? 'animate-blink' : ''}`}></div>
    </div>
  );
};

const projectsData = [
  {
    title: "LedgerLease",
    badge: "Full-Stack SaaS",
    desc: "Engineered a rental management platform using React for a dynamic frontend and Firebase/SQL for secure storage. Integrated Razorpay API for real-time payments, automated billing, and a secure Tenant Complaint System with zero-latency synchronization.",
    tags: ["#React", "#Java", "#SQL", "#Firebase", "#Razorpay"],
    btnText: "[ SYSTEM_LIVE ]",
    btnLink: "https://rent-optimizer-gamma.vercel.app/",
    isDisabled: false
  },
  {
    title: "Autonomous Indoor Farming",
    badge: "Web / ML Dashboard",
    desc: "Built a responsive web interface to monitor real-time plant growth. Engineered automated data pipelines for sensor preprocessing and deployed ML predictive models to analyze environmental trends, automate care scheduling, and forecast harvests.",
    tags: ["#Python", "#MachineLearning", "#UI/UX", "#DataPipelines"],
    btnText: "[ ERR: NOT_AVAILABLE ]",
    btnLink: "#",
    isDisabled: true
  }
];

const skillsData = [
  { label: "Languages", value: "Java (Advanced), Python, C, SQL, HTML, CSS, JavaScript (ES6+)" },
  { label: "Web Technologies", value: "React.js, JDBC, Servlets, Firebase, MongoDB, Git, GitHub" },
  { label: "Core Engineering", value: "DBMS, Computer Networks, OOP, DSA" }
];

const CanvasSections = ({ activeSection }) => {
  return (
    <main className="flex flex-col gap-32 pt-4 pb-16 w-full max-w-[850px]">
      
      <section id="about-sys" className="scroll-section relative" data-screen="SYS_INFO">
        <TypewriterIntro />
        
        <p className="font-mono font-semibold opacity-85 text-base mt-3">ID // 2K24CSUN01285 | BTech-CSE.AI</p>
        
        <NokiaSidebar activeSection={activeSection} isDesktop={false} />

        <h2 className="border-b-4 border-eink-ink inline-block mb-8 font-mono text-3xl uppercase">System Overview</h2>
        
        <div className="sketch-frame text-xl leading-relaxed">
          <p>
            Certified <strong>Java Web Developer</strong> and Computer Science Engineering student bridging the gap between scalable web architecture and intelligent systems. Proven ability to architect robust backend logic, engineer predictive <strong>Machine Learning</strong> pipelines, and deploy <strong>Artificial Neural Networks (ANN)</strong> for real-world automation.
          </p>
        </div>
        
        <div className="mt-10 flex gap-6">
          <a href="https://github.com/hemantydv06" target="_blank" rel="noreferrer" className="border-2 border-eink-ink px-6 py-3 rounded-full bg-white shadow-sketch hover:-translate-y-0.5 hover:shadow-sketch-hover transition-all font-mono font-bold text-base text-eink-ink">
            <i className="fab fa-github mr-2"></i> _github
          </a>
          <a href="https://www.linkedin.com/in/hemantydvvv" target="_blank" rel="noreferrer" className="border-2 border-eink-ink px-6 py-3 rounded-full bg-white shadow-sketch hover:-translate-y-0.5 hover:shadow-sketch-hover transition-all font-mono font-bold text-base text-eink-ink">
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
              
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-5 border-t-2 border-dashed border-eink-ink pt-5">
                
                <div className="flex flex-wrap gap-3 font-mono text-sm font-bold">
                  {project.tags.map(tag => <span key={tag} className="bg-white border border-eink-ink px-2 py-1">{tag}</span>)}
                </div>

                {project.isDisabled ? (
                  <span className="font-mono text-sm font-bold bg-[#D1D1D1] text-eink-ink/60 border-2 border-eink-ink/40 px-4 py-2 cursor-not-allowed shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)] select-none">
                    {project.btnText}
                  </span>
                ) : (
                  <a href={project.btnLink} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold bg-te-orange text-white border-2 border-eink-ink px-4 py-2 shadow-hardware hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hardware-pressed active:bg-eink-ink transition-all text-center">
                    {project.btnText}
                  </a>
                )}

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
              <div className="font-mono text-xl font-bold mb-2 uppercase text-te-orange">{skill.label}</div>
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
            <span className="font-mono text-base font-bold opacity-80">[ 2024 - 2028 ]</span>
            <h4 className="font-mono text-2xl font-bold mt-2">B.Tech — CSE (Artificial Intelligence)</h4>
            <p className="text-lg mt-1 font-semibold">Manav Rachna University, Faridabad</p>
            <p className="font-mono text-sm mt-2 font-bold bg-white border border-eink-ink inline-block px-2 py-1">FIRST YEAR CGPA: 7.5</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[54px] top-1.5 w-5 h-5 bg-eink-ink rounded-full border-4 border-eink-bg"></div>
            <span className="font-mono text-base font-bold opacity-80">[ 2024 ]</span>
            <h4 className="font-mono text-2xl font-bold mt-2">Class 12 (CBSE)</h4>
            <p className="text-lg mt-1 font-semibold">S.D Adarsh Vidyalaya</p>
          </div>

          <div className="relative">
             <div className="absolute -left-[54px] top-1.5 w-5 h-5 bg-te-orange rounded-full border-4 border-eink-bg animate-blink"></div>
            <span className="font-mono text-base font-bold text-te-orange">[ CERTIFICATIONS ]</span>
            <h4 className="font-mono text-xl font-bold mt-3">• Advanced Java Web Development (Aptech)</h4>
            <h4 className="font-mono text-xl font-bold mt-2">• Complete Web Development (Aptech)</h4>
            <h4 className="font-mono text-xl font-bold mt-2">• Python Basic (Aptech)</h4>
          </div>

        </div>
      </section>

      <section id="achieve-sys" className="scroll-section relative" data-screen="ACHIEVEMENTS">
        <h2 className="border-b-4 border-eink-ink inline-block mb-10 font-mono text-3xl uppercase">Extracurricular</h2>
        <div className="flex flex-col gap-8">
          <div className="sketch-frame !p-6">
            <h3 className="font-mono text-2xl font-bold mb-2">Hackathon Competitor</h3>
            <p className="text-lg">Competed in two 72-hour National Level Hackathons at K.R. Mangalam University. Collaborated in high-pressure environments to build functional prototypes.</p>
          </div>
          <div className="sketch-frame !p-6">
            <h3 className="font-mono text-2xl font-bold mb-2">IEEE Club Member</h3>
            <p className="text-lg">Actively engaged in technical networking and staying updated with emerging engineering standards and protocols.</p>
          </div>
        </div>
      </section>

      {/* === HARDWARE MANUFACTURER SPEC PLATE FOOTER === */}
      <footer className="mt-16 bg-eink-ink text-white border-4 border-eink-ink p-6 md:p-8 shadow-[8px_8px_0px_#222222] relative flex flex-col md:flex-row justify-between gap-8 z-10 overflow-hidden">
        
        {/* Bolt Accents */}
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>

        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-blink"></div>
             <span className="font-mono text-xs font-bold text-green-500 tracking-widest">SYSTEMS_ONLINE</span>
          </div>
          <h2 className="font-mono text-4xl font-black uppercase tracking-tighter">Hemant Yadav</h2>
          <p className="font-mono text-sm font-bold text-gray-400">ENGINEER // GURUGRAM, HARYANA</p>

          {/* Contact Array */}
          <div className="flex flex-col gap-3 mt-5 border-t-2 border-dashed border-gray-600 pt-5">
            <a href="mailto:yadavhemant1002@gmail.com" className="font-mono text-sm font-bold flex items-center gap-3 hover:text-te-orange transition-colors w-fit">
               <i className="fa-solid fa-envelope text-gray-400"></i> yadavhemant1002@gmail.com
            </a>
            <a href="tel:+919953568400" className="font-mono text-sm font-bold flex items-center gap-3 hover:text-te-orange transition-colors w-fit">
               <i className="fa-solid fa-phone text-gray-400"></i> +91 9953568400
            </a>
          </div>
        </div>

        {/* Technical Stamp Block */}
        <div className="flex flex-col items-start md:items-end justify-between relative z-10">
          <div className="flex gap-1 h-12 mb-4 bg-white p-2 border-2 border-white w-fit">
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
             <div className="font-mono text-[0.65rem] font-bold tracking-widest text-gray-400">ID: 2K24CSUN01285</div>
             <div className="font-mono text-[0.65rem] font-bold tracking-widest text-te-orange mt-1">MFG YEAR: 2026</div>
          </div>
        </div>

      </footer>

    </main>
  );
};

export default CanvasSections;