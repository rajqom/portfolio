'use client';

import SectionContainer, { SectionHeading } from './section-container';
import { Quote, Play, User, Star } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const textTestimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager at TechVision',
    content: 'Bright is an exceptional developer who transformed our complex requirements into a seamless, high-performance web platform. His attention to detail and proactive problem-solving were instrumental to our success.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Founder of GlobalApps',
    content: 'The mobile app Bright developed for us exceeded all expectations. The performance is native-like, and the biometric security integration is flawless. A true professional who understands both code and business.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Lead Researcher at AI Labs',
    content: 'Working with Bright on our AI automation tools was a game-changer. His deep understanding of LLMs and agent orchestration helped us automate workflows we thought were impossible to digitize.',
    rating: 5,
  },
  {
    name: 'David Smith',
    role: 'CTO at FutureTech',
    content: 'Bright delivered a high-impact Chrome extension that has significantly improved our team productivity. The extraction engine is fast, reliable, and perfectly integrated with our cloud infrastructure.',
    rating: 5,
  },
];

const videoTestimonial = {
  name: 'Robert Wilson',
  role: 'CEO at RetailGiant Inc',
  thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop',
  quote: "Bright's technical expertise and vision were exactly what we needed for our enterprise platform migration.",
};

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionContainer id="testimonials" variant="dark" animate={false}>
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 right-0 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-white/[0.01] blur-[150px]" />

      <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Header + Video (Sticky via CSS + Framer Motion for animations) */}
        <div className="lg:col-span-7 lg:sticky lg:top-32 h-fit space-y-12 py-4">
          <SectionHeading
            badge="Testimonials"
            title="Trusted by Leaders"
            subtitle="Don't just take my word for it. Here's what my clients and collaborators have to say about our work together."
            align="left"
          />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="video-testimonial group relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-700 hover:border-white/20 shadow-2xl shadow-black/50"
          >
            <img
              src={videoTestimonial.thumbnail}
              alt={videoTestimonial.name}
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-black transition-all duration-500 hover:scale-110 group-hover:bg-white/90 shadow-2xl shadow-white/20">
                <Play size={24} className="ml-1" />
              </button>
            </div>

            {/* Quote Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="space-y-4">
                <Quote className="text-white/20" size={32} />
                <p className="text-xl md:text-2xl font-light leading-relaxed tracking-tight text-white italic">
                  &quot;{videoTestimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-12 w-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center overflow-hidden">
                    <User className="text-white/40" size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-light tracking-tight text-white">{videoTestimonial.name}</h4>
                    <p className="text-xs font-light tracking-widest uppercase text-white/40">{videoTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Text Testimonials Grid (Stacked/Scrolling) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-12 pb-12 lg:pb-32">
          {textTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-testimonial group relative flex flex-col gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-white/40 text-white/0" />
                  ))}
                </div>
                <Quote className="text-white/5 group-hover:text-white/10 transition-colors" size={24} />
              </div>
              
              <p className="text-sm font-light leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                {testimonial.content}
              </p>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                  <User className="text-white/20" size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-light tracking-tight text-white">{testimonial.name}</h4>
                  <p className="text-[10px] font-light uppercase tracking-widest text-white/30">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
