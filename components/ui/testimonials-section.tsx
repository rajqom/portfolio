'use client';

import SectionContainer, { SectionHeading } from './section-container';
import { Quote, Play, User, Star } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const textTestimonials = [
  {
    name: 'Paul Lo',
    role: 'Founder at Spacel',
    content: 'Zynra Studio delivered an exceptional workspace marketplace platform. The booking system is seamless, the mobile app performs flawlessly, and the real-time location features work perfectly. Their team truly understood our vision and brought it to life.',
    rating: 5,
  },
  {
    name: 'James Milton',
    role: 'CEO at Project Sync',
    content: 'Working with Zynra Studio on our task management platform was incredible. Their UI/UX design expertise and development skills created a product our users love. The attention to detail and commitment to quality is unmatched.',
    rating: 5,
  },
  {
    name: 'Oliver Palme',
    role: 'Founder at Esplit',
    content: 'Zynra Studio built our Web3 splitting platform from the ground up. Their expertise in smart contract development and frontend integration delivered a secure, transparent platform that our community trusts. Truly exceptional work.',
    rating: 5,
  },
];

const videoTestimonial = {
  name: 'Rafael Richardson',
  role: 'CEO at VoiceVenture AI',
  thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop',
  quote: "Zynra Studio's technical expertise was exactly what we needed. They built our complete ecosystem—website, web app, and mobile app—helping us reclaim 5-7 hours per staff member every week.",
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
            title="Trusted by Founders"
            subtitle="Don't just take our word for it. Here's what our clients have to say about working with Zynra Studio."
            align="left"
          />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="video-testimonial group relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl transition-all duration-700 hover:border-white/20 shadow-2xl shadow-black/50"
          >
            <Image
              src={videoTestimonial.thumbnail}
              alt={videoTestimonial.name}
              fill
              className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-black transition-all duration-500 hover:scale-110 group-hover:bg-white/90 shadow-2xl shadow-white/20"
                aria-label={`Play video testimonial from ${videoTestimonial.name}, ${videoTestimonial.role}`}
              >
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
                    <p className="text-base font-light tracking-tight text-white">{videoTestimonial.name}</p>
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
                  <p className="text-sm font-light tracking-tight text-white">{testimonial.name}</p>
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
