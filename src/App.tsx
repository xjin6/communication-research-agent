import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
/* Inline SVG icons — replaces lucide-react (38MB) */
const I = ({ d, size = 24, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{d.split("||").map((p, i) => <path key={i} d={p} />)}</svg>
);
const BookOpen = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M12 7v14||M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />;
const FileText = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z||M14 2v4a2 2 0 0 0 2 2h4||M10 9H8||M16 13H8||M16 17H8" />;
const PenTool = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z||M18 13.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5" />;
const Terminal = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M12 19h8||m-16-2 6-6-6-6" />;
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashCursor from "./components/SplashCursor";

gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────── */

const pillars = [
  { title: "General Knowledge", description: "Shared theory and methods knowledge base that grounds the agent in communication studies fundamentals.", icon: BookOpen, img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop" },
  { title: "Research Skills", description: "Modular, reusable skills for data scraping, statistical analysis, and academic writing.", icon: PenTool, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" },
  { title: "Your Project Context", description: "Describe your study in context.md — the agent reads it automatically and tailors every response.", icon: FileText, img: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=600&fit=crop" },
  { title: "Claude Code Engine", description: "Powered by Claude Code, enabling multi-step reasoning, file manipulation, and end-to-end research workflows.", icon: Terminal, img: "https://assets.apidog.com/blog-next/2025/09/6826a6227b1fbd47034d1936_claude-code.webp", imgBg: { size: "75%", position: "70% center" } },
];

const cases = [
  { title: "From raw survey data to SEM path diagram and manuscript draft", category: "Quantitative Research", description: "A PhD student uploaded raw questionnaire data and asked the agent to run CFA, explore model fit, and refine a structural equation model. The SEM skill handled everything — data cleaning, model iteration, path diagram output — and drafted the results section of a journal manuscript ready for revision.", img: "https://i.sstatic.net/IuoIK.png" },
  { title: "Weibo scraping to issue framing for an undergraduate thesis", category: "Social Media Analysis", description: "An undergraduate student used the Weibo Scraper skill to collect posts on a specific topic, then applied discourse analysis to uncover issue framing patterns. The agent identified key frames, summarized themes, and shaped the argument and writing direction of the thesis.", img: "https://gdb.voanews.com/b0db7b9d-5cad-4d89-9ce9-ce982fe6439c_cx0_cy4_cw0_w1023_r1_s.jpg" },
  { title: "Interview transcripts to themed findings and draft in one session", category: "Qualitative Research", description: "A researcher brought interview transcripts and used the qualitative thematic skill to identify and group themes, assess data saturation, and generate structured summaries for each theme. The agent then drafted a findings section with full theme descriptions ready for editing.", img: "https://media.nngroup.com/media/editor/2023/08/08/in-person-interview.jpg" },
];

import skillsData from "./data/skills.json";
import structureText from "./data/structure.txt?raw";
const skills: { slug?: string; name: string; version: string; category: string; description: string; author: string; lastUpdate?: string }[] = skillsData;

const team = [
  { name: "Xin Jin", initials: "XJ", affiliation: "Microsoft" },
  { name: "Xingjian Wang", initials: "XW", affiliation: "Tsinghua University" },
  { name: "Qianying Ye", initials: "QY", affiliation: "The Hong Kong Polytechnic University" },
  { name: "Sha Qiu", initials: "SQ", affiliation: "University of Macau" },
  { name: "Lihan Yan", initials: "LY", affiliation: "Nanjing University" },
  { name: "Yundi Zhang", initials: "YZ", affiliation: "Fudan University" },
];

const dynamicPhrases = ["data collection", "statistical analysis", "literature review", "paper writing", "AI peer review"];

/* ── Components ───────────────────────────────────────────── */

function TypingEffect() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const element = textRef.current;
    let phraseIndex = 0, charIndex = 0, isDeleting = false, timeoutId: number;

    const updateText = () => {
      const currentPhrase = dynamicPhrases[phraseIndex];
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) { element.textContent = currentPhrase.slice(0, ++charIndex); timeoutId = window.setTimeout(updateText, 120); }
        else { timeoutId = window.setTimeout(() => { isDeleting = true; updateText(); }, 2200); }
      } else {
        if (charIndex > 0) { element.textContent = currentPhrase.slice(0, --charIndex); timeoutId = window.setTimeout(updateText, 60); }
        else { isDeleting = false; phraseIndex = (phraseIndex + 1) % dynamicPhrases.length; element.textContent = ""; timeoutId = window.setTimeout(updateText, 600); }
      }
    };

    timeoutId = window.setTimeout(updateText, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400" style={{ whiteSpace: "nowrap" }}>
      <span ref={textRef} />
      <span className="typing-cursor">|</span>
    </span>
  );
}

let tabClickActive = false;

function FadeIn({ children, className = "", delay = 0, y = 40 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      onEnter: () => { if (!tabClickActive) gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out" }); },
      onLeave: () => { if (!tabClickActive) gsap.set(el, { opacity: 0, y }); },
      onEnterBack: () => { if (!tabClickActive) gsap.set(el, { opacity: 1, y: 0 }); },
      onLeaveBack: () => { if (!tabClickActive) gsap.set(el, { opacity: 0, y }); },
    });
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
  }, [delay, y]);
  return <div ref={ref} className={className} data-animate style={{ opacity: 0 }}>{children}</div>;
}

function StaggerChildren({ children, className = "", stagger = 0.1, delay = 0 }: { children: React.ReactNode; className?: string; stagger?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      onEnter: () => { if (!tabClickActive) gsap.fromTo(el.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay, stagger, ease: "power3.out" }); },
      onLeave: () => { if (!tabClickActive) gsap.set(el.children, { opacity: 0, y: 40 }); },
      onEnterBack: () => { if (!tabClickActive) gsap.set(el.children, { opacity: 1, y: 0 }); },
      onLeaveBack: () => { if (!tabClickActive) gsap.set(el.children, { opacity: 0, y: 40 }); },
    });
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
  }, [stagger, delay]);
  return <div ref={ref} className={className} data-animate-stagger>{children}</div>;
}

const navItems = ["About", "Skills", "Cases", "Team", "Deploy"];

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = navItems.map((s) => s.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return active;
}

/* ── App ──────────────────────────────────────────────────── */

export default function App() {
  const activeSection = useActiveSection();
  const [heroKey, setHeroKey] = useState(0);
  const [skillCategories, setSkillCategories] = useState<string[]>([]);
  const [skillAuthors, setSkillAuthors] = useState<string[]>([]);
  const filteredSkills = skills.filter((s) =>
    (skillCategories.length === 0 || skillCategories.includes(s.category)) &&
    (skillAuthors.length === 0 || skillAuthors.includes(s.author))
  );
  const toggleCategory = (val: string) => setSkillCategories((prev) => prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]);
  const toggleAuthor = (val: string) => setSkillAuthors((prev) => prev.includes(val) ? prev.filter((a) => a !== val) : [...prev, val]);
  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f0ece6] font-sans" style={{ background: "linear-gradient(180deg, #0a0a0b 0%, #0e0e18 20%, #0a0b10 40%, #110e14 60%, #0b0c12 80%, #0a0a0b 100%)" }}>
      <SplashCursor />

      {/* Section glow layer — sits behind all content, no overflow clipping */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* About — purple, center */}
        <div className="absolute w-[900px] h-[600px] rounded-full bg-purple-500/[0.07] blur-[200px]" style={{ top: "100vh", left: "50%", transform: "translateX(-50%)" }} />
        {/* Cases — blue, right */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/[0.06] blur-[200px]" style={{ top: "220vh", right: "-5%" }} />
        {/* Skills — indigo, left */}
        <div className="absolute w-[800px] h-[600px] rounded-full bg-indigo-500/[0.065] blur-[200px]" style={{ top: "380vh", left: "-5%" }} />
        {/* Team — pink, center */}
        <div className="absolute w-[600px] h-[500px] rounded-full bg-pink-500/[0.055] blur-[200px]" style={{ top: "520vh", left: "50%", transform: "translateX(-50%)" }} />
        {/* Deploy — emerald, right */}
        <div className="absolute w-[700px] h-[600px] rounded-full bg-emerald-500/[0.05] blur-[200px]" style={{ top: "650vh", right: "15%" }} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-[#0f0f11]/85 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "instant" }); setHeroKey((k) => k + 1); }} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="relative w-full h-full" />
              {/* Light dot tracing the C outline */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 32 32">
                <defs>
                  <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /></feMerge>
                  </filter>
                  <radialGradient id="dot-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="30%" stopColor="#e9d5ff" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#a855f7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* C-shaped arc (top-right → counterclockwise → bottom-right) then dash back */}
                <circle r="3.5" fill="url(#dot-grad)" filter="url(#dot-glow)">
                  <animateMotion
                    dur="3.5s"
                    repeatCount="indefinite"
                    path="M 22 7.5 C 22 7.5 24 6 20 5 C 14 3.5 7 6 5.5 12 C 4 18 6 24 12 27 C 16 28.5 20 28 22 25.5 L 22 7.5"
                    keyPoints="0;0.85;1"
                    keyTimes="0;0.9;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1;0.1 0 0.3 1"
                  />
                  <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" values="0.9;0.9;0;0.9" keyTimes="0;0.85;0.92;1" />
                </circle>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">Communication Research Agent</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById(item.toLowerCase());
                  if (!section) return;
                  // Block ScrollTrigger callbacks during tab navigation
                  tabClickActive = true;
                  // Reset FadeIn elements
                  const fadeEls = section.querySelectorAll<HTMLElement>("[data-animate]");
                  gsap.set(fadeEls, { opacity: 0, y: 40 });
                  // Reset StaggerChildren's children
                  const staggerContainers = section.querySelectorAll<HTMLElement>("[data-animate-stagger]");
                  staggerContainers.forEach((container) => {
                    gsap.set(container.children, { opacity: 0, y: 40 });
                  });
                  // Jump to section
                  section.scrollIntoView({ behavior: "instant" });
                  // Replay animations after scroll settles
                  requestAnimationFrame(() => {
                    tabClickActive = false;
                    gsap.to(fadeEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
                    staggerContainers.forEach((container) => {
                      gsap.to(container.children, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 });
                    });
                  });
                }} className={`text-sm relative group transition-colors duration-300 cursor-pointer ${isActive ? "text-white" : "text-white/50 hover:text-white"}`}>
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-px bg-white/70 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-white/50"}`} />
                </a>
              );
            })}
          </div>
          <a href="https://github.com/xjin6/comm-agent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14">
        <div key={heroKey} className="max-w-3xl w-full text-center z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border border-white/10 bg-white/5 text-white/70">Built on Claude Code</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
            <span className="block mb-2">Your Communication research AI partner for</span>
            <span className="block" style={{ minHeight: "1.2em", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TypingEffect />
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="mt-6 text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            From research question to publishable paper — an end-to-end agent for communication and media studies.
          </motion.p>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative z-10 pt-20 md:pt-32 pb-12 md:pb-16 px-6 scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <FadeIn>
              <p className="text-white/30 font-medium uppercase text-[11px] mb-5 tracking-[0.2em] font-mono">About</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight">What is Communication Research Agent</h2>
            </FadeIn>
            <FadeIn delay={0.2} className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-6">
              An AI research assistant built on shared knowledge, modular skills, and your project context — extending your research process with intelligent automation.
            </FadeIn>
          </div>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {pillars.map((p) => (
              <div key={p.title} data-suppress-splash className="rounded-xl bg-white/[0.03] border border-white/8 flex flex-col overflow-hidden">
                <div className="w-full aspect-[4/3] relative overflow-hidden">
                  {p.imgBg ? (
                    <div className="absolute inset-0 opacity-75" style={{ backgroundImage: `url(${p.img})`, backgroundSize: p.imgBg.size, backgroundPosition: p.imgBg.position, backgroundRepeat: "no-repeat", filter: "grayscale(0.6) brightness(0.85)" }} />
                  ) : (
                    <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-75" style={{ filter: "grayscale(0.6) brightness(0.85)" }} loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                </div>
                <div className="p-5 flex flex-col">
                  <h3 className="text-base font-medium mb-2 leading-tight">{p.title}</h3>
                  <p className="text-white/50 leading-relaxed text-xs">{p.description}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="relative z-10 py-16 md:py-24 px-6 scroll-mt-14">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 md:mb-16">
            <FadeIn>
              <p className="text-white/30 font-medium uppercase text-[11px] mb-5 tracking-[0.2em] font-mono">Skills</p>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-4">Modular research skills.</h2>
            </FadeIn>
            <FadeIn delay={0.2} className="text-white/50 text-lg max-w-2xl">
              Standalone, reusable capabilities that the agent combines to handle your research workflow end-to-end.
            </FadeIn>
          </div>

          {/* Filters */}
          <FadeIn delay={0.2} className="flex flex-wrap items-center gap-3 mb-6">
            <button onClick={() => setSkillCategories([])} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${skillCategories.length === 0 ? "bg-white/15 text-white" : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60"}`}>
              All type
            </button>
            {(["analysis", "scraper", "utility"] as const).map((cat) => {
              const active = skillCategories.includes(cat);
              return (
                <button key={cat} onClick={() => toggleCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${active ? "bg-white/15 text-white" : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60"}`}>
                  {cat}
                </button>
              );
            })}
            <span className="mx-2 w-px h-4 bg-white/10" />
            <button onClick={() => setSkillAuthors([])} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${skillAuthors.length === 0 ? "bg-white/15 text-white" : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60"}`}>
              All authors
            </button>
            {Array.from(new Set(skills.map((s) => s.author))).map((author) => {
              const active = skillAuthors.includes(author);
              return (
                <button key={author} onClick={() => toggleAuthor(author)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${active ? "bg-white/15 text-white" : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60"}`}>
                  {author}
                </button>
              );
            })}
            <span className="ml-auto text-xs text-white/40">
              <span className="text-white/70 font-semibold">{filteredSkills.length}</span> / {skills.length} skills
            </span>
          </FadeIn>

          {/* Card grid */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4" stagger={0.05} delay={0.2}>
            {filteredSkills.map((skill) => (
              <a
                key={skill.name}
                href={skill.slug ? `https://github.com/xjin6/comm-agent/tree/main/general-skill/${skill.slug}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-card rounded-[30px] bg-white/[0.04] border-[0.5px] border-white/[0.08] p-[18px] flex flex-col gap-3 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(255,255,255,0.04)] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[16px] leading-[22px] font-semibold flex-1">{skill.name}</span>
                  <span className="shrink-0 inline-flex items-center rounded-full text-[12px] font-semibold leading-none px-2 py-[3px] bg-white/[0.08] text-white/60">
                    {skill.category}
                  </span>
                </div>

                <p className="text-[14px] leading-[20px] text-white/50 flex-1 line-clamp-3">{skill.description}</p>

                <div className="flex items-center gap-1 flex-wrap mt-auto pt-1 border-t border-white/[0.06]">
                  <span className="font-mono text-[11px] text-white/25">{skill.version}</span>
                  <span className="ml-auto text-[11px] text-white/25">{skill.author}</span>
                  {skill.lastUpdate && <span className="text-[11px] text-white/20 ml-2">updated {skill.lastUpdate}</span>}
                </div>
              </a>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Cases ── */}
      <section id="cases" className="relative z-10 py-16 md:py-24 px-6 scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24">
            <FadeIn>
              <p className="text-white/30 font-medium uppercase text-[11px] mb-5 tracking-[0.2em] font-mono">Cases</p>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight">Real research, powered by the agent.</h2>
            </FadeIn>
          </div>
          <div className="space-y-20 md:space-y-28">
            {cases.map((cap, i) => (
              <FadeIn key={cap.title} y={50}>
                <div data-suppress-splash className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
                  <div className="flex-1 space-y-4">
                    <p className="text-purple-400/50 text-xs font-medium font-mono tracking-wider uppercase">{cap.category}</p>
                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight">{cap.title}</h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-lg">{cap.description}</p>
                    <motion.span
                      className="inline-flex items-center gap-1.5 text-sm cursor-pointer"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      whileHover="hovered"
                      animate="rest"
                      variants={{ rest: { color: "rgba(255,255,255,0.4)" }, hovered: { color: "rgba(255,255,255,1)" } }}
                    >
                      View full story
                      <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        variants={{ rest: { x: 0 }, hovered: { x: 6 } }}
                        transition={{ duration: 0.2 }}
                      ><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></motion.svg>
                    </motion.span>
                  </div>
                  <div className="flex-1 w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 relative">
                    <img src={cap.img} alt={cap.title} className="absolute inset-0 w-full h-full object-cover opacity-70" style={{ filter: "grayscale(0.4) brightness(0.85)" }} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b]/30 to-transparent" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team" className="relative z-10 py-16 md:py-24 px-6 scroll-mt-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4">The minds behind the agent.</h2>
            </FadeIn>
            <FadeIn delay={0.2} className="text-white/50">
              A research team building the future of AI-assisted communication studies.
            </FadeIn>
          </div>

          <StaggerChildren className="flex flex-wrap justify-center gap-10 md:gap-14" stagger={0.1}>
            {team.map((member) => (
              <div key={member.name} data-suppress-splash className="group flex flex-col items-center gap-4 w-28 md:w-32">
                {/* Circular avatar */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-1 ring-white/15 ring-offset-[3px] ring-offset-[#0a0a0b] bg-gradient-to-br from-white/10 to-white/[0.02] flex items-center justify-center transition-all duration-500 group-hover:ring-white/30">
                  <span className="text-lg md:text-xl font-light text-white/30 group-hover:text-white/60 transition-colors duration-500 select-none">
                    {member.initials}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-white/50 font-medium tracking-tight group-hover:text-white transition-colors duration-300 text-sm">
                    {member.name}
                  </p>
                  {member.affiliation && <p className="text-white/25 text-xs mt-0.5">{member.affiliation}</p>}
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Deploy ── */}
      <section id="deploy" className="relative z-10 py-16 md:py-24 px-6 scroll-mt-14">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-white/30 font-medium uppercase text-[11px] mb-5 tracking-[0.2em] font-mono">Deploy</p>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-6">Ready to accelerate your research?</h2>
            </FadeIn>
            <FadeIn delay={0.2} className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
              Three steps. No setup wizards, no cloud accounts. Just clone, describe, and ask.
            </FadeIn>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" stagger={0.1}>
            {[
              { step: "01", title: "Clone the repo", desc: "git clone the project to your local machine." },
              { step: "02", title: "Describe your study", desc: "Fill in context.md with your research questions and variables." },
              { step: "03", title: "Ask the agent", desc: "Start Claude Code and let the agent handle the rest." },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
                <span className="text-xs font-mono text-white/30">{item.step}</span>
                <h3 className="text-lg font-medium mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </StaggerChildren>

          <FadeIn className="text-center">
            <div className="inline-block rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-sm text-white/70 select-all mb-8">
              git clone https://github.com/xjin6/comm-agent.git
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="text-center"><h3 className="text-lg font-medium mb-6">Project Structure</h3></FadeIn>
          <FadeIn delay={0.15} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 font-mono text-sm leading-7 text-white/50 overflow-x-auto">
            <pre>{structureText}</pre>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-medium text-white/40">Communication Research Agent</span>
          <p className="text-xs text-white/30">Contact: xjin6@outlook.com</p>
        </div>
      </footer>
    </div>
  );
}
