'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: 'default' | 'dark' | 'darker' | 'gradient';
  animate?: boolean;
}

export default function SectionContainer({
  children,
  id,
  className = '',
  variant = 'default',
  animate = true,
}: SectionContainerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!animate || !sectionRef.current) return;

      gsap.from(sectionRef.current.children, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef }
  );

  const variantClasses = {
    default: 'bg-black',
    dark: 'bg-black/95',
    darker: 'bg-black',
    gradient: 'bg-gradient-to-b from-black via-black/95 to-black',
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full py-20 lg:py-28 ${variantClasses[variant]} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'center',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-4 mb-12 lg:mb-16 ${alignClasses}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[10px] font-light uppercase tracking-[0.08em] text-white/70">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base font-light leading-relaxed tracking-tight text-white/75 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
