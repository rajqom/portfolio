'use client';

import SectionContainer, { SectionHeading } from './section-container';
import {
  Code2,
  Smartphone,
  Puzzle,
  Bot,
  Layers,
  Palette,
  Database,
  Zap,
} from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specializations = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Modern, high-performance web applications built with React and Next.js.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-blue-500/10',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Cross-platform solutions delivering native performance and feel.',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    color: 'from-purple-500/10',
  },
  {
    icon: Puzzle,
    title: 'Chrome Extension',
    description: 'Specialized browser tools designed to optimize user productivity.',
    skills: ['Manifest V3', 'Chrome APIs', 'Automation'],
    color: 'from-orange-500/10',
  },
  {
    icon: Bot,
    title: 'AI Agent',
    description: 'Intelligent automation systems powered by advanced LLM architectures.',
    skills: ['LangChain', 'OpenAI', 'RAG', 'Vector DBs'],
    color: 'from-green-500/10',
  },
];

const additionalSkills = [
  { icon: Layers, label: 'UI/UX Design' },
  { icon: Palette, label: 'Graphic Design' },
  { icon: Database, label: 'Backend Ops' },
  { icon: Zap, label: 'SEO & Perf' },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });

      // Animate the heading first
      if (headingRef.current) {
        tl.from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Stagger the skill cards
      const cards = containerRef.current.querySelectorAll('.skill-card');
      tl.from(
        cards,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  return (
    <SectionContainer id="skills" variant="gradient" animate={false} className="overflow-hidden">
      <div ref={containerRef}>
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-white/[0.02] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-white/[0.02] blur-[100px] rounded-full" />

        <div ref={headingRef}>
          <SectionHeading
            badge="Expertise"
            title="Technical Arsenal"
            subtitle="Harnessing modern technologies to build robust, scalable, and intelligent software."
          />
        </div>

        <div className="space-y-16 lg:space-y-24">
          {/* Main Specializations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {specializations.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div
                key={index}
                className={`skill-card group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20`}
              >
                {/* Dynamic Gradient Overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${spec.color} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                
                <div className="relative z-10">
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/80 ring-1 ring-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white group-hover:ring-white/30">
                    <Icon size={32} />
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-light tracking-tight text-white">
                    {spec.title}
                  </h3>
                  
                  <p className="mb-8 text-base font-light leading-relaxed text-white/70 lg:max-w-[80%]">
                    {spec.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {spec.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-light tracking-tight text-white/90 backdrop-blur-sm transition-colors group-hover:border-white/20 group-hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Technical Proficiencies */}
        <div className="skill-card relative rounded-3xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left space-y-2">
              <h3 className="text-xl font-light tracking-tight text-white">
                Extended Proficiencies
              </h3>
              <p className="text-sm font-light text-white/70 max-w-xs">
                Comprehensive skills that complement core development workflows.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-12 w-full lg:w-auto">
              {additionalSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 group cursor-default"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/80 ring-1 ring-white/20 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:scale-110 group-hover:ring-white/30">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-light tracking-tight text-white/80 group-hover:text-white transition-colors">
                      {skill.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </SectionContainer>
  );
}

