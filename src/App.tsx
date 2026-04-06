import { useEffect, useRef } from "react";
import { motion } from "motion/react";
/* Inline SVG icons — replaces lucide-react (38MB) */
const I = ({ d, size = 24, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{d.split("||").map((p, i) => <path key={i} d={p} />)}</svg>
);
const Ic = ({ cx, cy, r, extras = "", size = 24, className = "" }: { cx: string; cy: string; r: string; extras?: string; size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx={cx} cy={cy} r={r} />{extras.split("||").filter(Boolean).map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const ArrowRight = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M5 12h14||m-7-7 7 7-7 7" />;
const BookOpen = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M12 7v14||M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />;
const FileText = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z||M14 2v4a2 2 0 0 0 2 2h4||M10 9H8||M16 13H8||M16 17H8" />;
const PenTool = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z||M18 13.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5" />;
const Terminal = ({ size = 24, className = "" }: { size?: number; className?: string }) => <I size={size} className={className} d="M12 19h8||m-16-2 6-6-6-6" />;
const Search = ({ size = 24, className = "" }: { size?: number; className?: string }) => <Ic size={size} className={className} cx="11" cy="11" r="8" extras="m10 10-4.34-4.34" />;
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
  { title: "General Knowledge", description: "Shared theory and methods knowledge base that grounds the agent in communication studies fundamentals.", icon: BookOpen },
  { title: "Research Skills", description: "Modular, reusable skills for data scraping, statistical analysis, and academic writing.", icon: PenTool },
  { title: "Your Project Context", description: "Describe your study in context.md — the agent reads it automatically and tailors every response.", icon: FileText },
  { title: "Claude Code Engine", description: "Powered by Claude Code, enabling multi-step reasoning, file manipulation, and end-to-end research workflows.", icon: Terminal },
];

const cases = [
  { title: "Social media data collection", category: "Data", description: "Scrape Weibo topics or Xiaohongshu posts with a single command. The agent handles pagination, rate limiting, and exports structured data ready for analysis." },
  { title: "Quantitative analysis", category: "Analysis", description: "From descriptive statistics to ANOVA, regression, and chi-squared tests — the agent reads your dataset, selects appropriate methods, and interprets results." },
  { title: "SEM & path analysis", category: "Modeling", description: "Specify, estimate, and interpret structural equation models including CFA and path analysis. The agent validates model fit and suggests modifications." },
];

import skillsData from "./data/skills.json";
const skills: { name: string; version: string; category: string; description: string; author: string }[] = skillsData;

const team = [
  { name: "Xin Jin", initials: "XJ" },
  { name: "Xingjian Wang", initials: "XW" },
  { name: "Qianying Ye", initials: "QY" },
  { name: "Sha Qiu", initials: "SQ" },
  { name: "Lihan Yan", initials: "LY" },
  { name: "Yundi Zhang", initials: "YZ" },
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

function FadeIn({ children, className = "", delay = 0, y = 30 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } });
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
  }, [delay, y]);
  return <div ref={ref} className={className} style={{ opacity: 0 }}>{children}</div>;
}

function StaggerChildren({ children, className = "", stagger = 0.1 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(el.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } });
    return () => { ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); }); };
  }, [stagger]);
  return <div ref={ref} className={className}>{children}</div>;
}

/* ── App ──────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f0ece6] font-sans">
      <SplashCursor />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-[#0a0a0b]/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">Comm Research Agent</span>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Cases", "Skills", "Team", "Deploy"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/50 hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <a href="https://github.com/xjin6/comm-agent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14">
        <div className="max-w-3xl w-full text-center z-10">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/xjin6/comm-agent" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95 flex items-center gap-2 overflow-hidden text-[#0a0a0b]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/75 to-white/55 backdrop-blur-2xl transition-all duration-300 group-hover:from-white group-hover:via-white/90 group-hover:to-white/80" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute inset-0 rounded-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] pointer-events-none" />
              <GithubIcon size={16} className="relative z-10" />
              <span className="relative z-10">Get Started</span>
              <ArrowRight size={14} className="relative z-10 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative z-10 bg-[#0a0a0b] pt-20 md:pt-32 pb-12 md:pb-16 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <FadeIn>
              <p className="text-white/50 font-medium uppercase text-xs mb-4 tracking-widest font-mono">About</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight">What is Comm Research Agent</h2>
            </FadeIn>
            <FadeIn delay={0.2} className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-6">
              An AI research assistant built on shared knowledge, modular skills, and your project context — extending your research process with intelligent automation.
            </FadeIn>
          </div>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {pillars.map((p) => (
              <div key={p.title} className="rounded-xl bg-white/[0.03] border border-white/8 flex flex-col overflow-hidden">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-white/[0.06] to-white/[0.02] flex items-center justify-center">
                  <p.icon size={32} className="text-white/20" />
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

      {/* ── Cases ── */}
      <section id="cases" className="relative z-10 bg-[#0a0a0b] py-16 md:py-32 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-20">
            <FadeIn><p className="text-white/50 font-medium uppercase text-xs mb-4 tracking-widest font-mono">Cases</p></FadeIn>
            <FadeIn delay={0.1}><h2 className="text-3xl md:text-5xl font-normal tracking-tight">Built for what you research.</h2></FadeIn>
          </div>
          <div className="space-y-24 md:space-y-32">
            {cases.map((cap, i) => (
              <FadeIn key={cap.title} y={40}>
                <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
                  <div className="flex-1 space-y-6">
                    <p className="text-white/50 text-sm font-medium font-mono">{cap.category}</p>
                    <h3 className="text-2xl md:text-4xl font-normal tracking-tight">{cap.title}</h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-lg">{cap.description}</p>
                  </div>
                  <div className="flex-1 w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center">
                    <Search size={48} className="text-white/10" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills (Studio 8 Skills Hub card grid — dark theme) ── */}
      <section id="skills" className="relative z-10 bg-[#0a0a0b] py-16 md:py-32 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 md:mb-16">
            <FadeIn><p className="text-white/50 font-medium uppercase text-xs mb-4 tracking-widest font-mono">Skills</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-4">Modular research skills.</h2>
              <p className="text-white/50 text-lg max-w-2xl">Standalone, reusable capabilities that the agent combines to handle your research workflow end-to-end.</p>
            </FadeIn>
          </div>

          {/* Stats bar — matches original */}
          <FadeIn delay={0.15} className="flex items-center gap-4 mb-5 text-xs text-white/40">
            <span><span className="text-white/70 font-semibold">{skills.length}</span> skills</span>
          </FadeIn>

          {/* Card grid — exact original structure */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4" stagger={0.08}>
            {skills.map((skill) => (
              <article
                key={skill.name}
                className="skill-card rounded-[30px] bg-white/[0.04] border-[0.5px] border-white/[0.08] p-[18px] flex flex-col gap-3 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(255,255,255,0.04)] hover:-translate-y-px cursor-default"
              >
                {/* card-header */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[16px] leading-[22px] font-semibold flex-1">{skill.name}</span>
                  <span className="shrink-0 inline-flex items-center rounded-full text-[12px] font-semibold leading-none px-2 py-[3px] bg-white/[0.08] text-white/60">
                    Skill
                  </span>
                </div>

                {/* card-desc */}
                <p className="text-[14px] leading-[20px] text-white/50 flex-1 line-clamp-3">{skill.description}</p>

                {/* card-meta */}
                <div className="flex items-center gap-1 flex-wrap mt-auto pt-1 border-t border-white/[0.06]">
                  <span className="inline-flex items-center rounded-full text-[12px] font-semibold leading-none px-2 py-[3px] bg-white/[0.06] text-white/40">
                    {skill.category}
                  </span>
                  <span className="font-mono text-[11px] text-white/25">v{skill.version}</span>
                  <span className="ml-auto text-[12px] text-white/25">{skill.author}</span>
                </div>
              </article>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team" className="relative z-10 bg-[#0a0a0b] py-16 md:py-32 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4">The minds behind the agent.</h2>
              <p className="text-white/50">A research team building the future of AI-assisted communication studies.</p>
            </FadeIn>
          </div>

          <StaggerChildren className="flex flex-wrap justify-center gap-10 md:gap-14" stagger={0.08}>
            {team.map((member) => (
              <div key={member.name} className="group flex flex-col items-center gap-4">
                {/* Circular avatar */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-1 ring-white/15 ring-offset-[3px] ring-offset-[#0a0a0b] bg-gradient-to-br from-white/10 to-white/[0.02] flex items-center justify-center transition-all duration-500 group-hover:ring-white/30">
                  <span className="text-lg md:text-xl font-light text-white/30 group-hover:text-white/60 transition-colors duration-500 select-none">
                    {member.initials}
                  </span>
                </div>
                <p className="text-white/50 font-medium tracking-tight group-hover:text-white transition-colors duration-300 text-sm">
                  {member.name}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Deploy ── */}
      <section id="deploy" className="relative z-10 bg-[#0a0a0b] py-24 md:py-32 px-6 border-t border-white/5 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-white/50 font-medium uppercase text-xs mb-4 tracking-widest font-mono">Deploy</p>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-6">Ready to accelerate your research?</h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">Three steps. No setup wizards, no cloud accounts. Just clone, describe, and ask.</p>
            </FadeIn>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" stagger={0.15}>
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
            <pre>{`comm-agent/
├── general-knowledge/   # Shared theory & methods
├── general-skill/       # Reusable research skills
│   ├── skill-weibo-topic-scraper/
│   ├── skill-xiaohongshu-scraper/
│   ├── skill-quantitative-analysis/
│   ├── skill-structural-equation-modeling/
│   └── skill-apa-reference-list/
├── your-project/        # Your personal workspace
│   ├── context.md       # Describe your study here
│   ├── data/            # Your raw data
│   ├── knowledge/       # Your literature & notes
│   ├── literature/      # PDFs/BIB/RIS for references
│   └── output/          # Agent-generated results
└── CLAUDE.md            # Agent instructions`}</pre>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#0a0a0b] py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-medium text-white/40">Comm Research Agent</span>
          <p className="text-xs text-white/30">By Xin Jin &middot; MIT License</p>
        </div>
      </footer>
    </div>
  );
}
