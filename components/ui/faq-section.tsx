'use client';

import SectionContainer, { SectionHeading } from './section-container';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqs } from '@/lib/faq-data';

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!itemsRef.current || !itemsRef.current.children.length) return;

      const items = Array.from(itemsRef.current.children) as HTMLElement[];
      
      // First, ensure all items are visible
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.transform = 'translateY(0)';
      });

      // Then animate them in when scrolled into view
      ScrollTrigger.batch(items, {
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          });
        },
        start: 'top 85%',
        once: true,
      });
    },
    { scope: containerRef, dependencies: [faqs] }
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionContainer id="faq" variant="darker" animate={false} className="overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

      <SectionHeading
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our services and process."
      />

      <div ref={containerRef} className="max-w-3xl mx-auto">
        <div ref={itemsRef} className="space-y-4">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 opacity-100"
                style={{ opacity: 1, visibility: 'visible' }}
              >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-2xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-base font-light tracking-tight text-white pr-8 sm:text-lg">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`flex-shrink-0 h-5 w-5 text-white/60 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-sm font-light leading-relaxed tracking-tight text-white/75 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="text-center text-white/60 py-8">
              <p>No FAQs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
