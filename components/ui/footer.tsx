'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  specializations: [
    { label: 'Web Development' },
    { label: 'Mobile Apps' },
    { label: 'Chrome Extensions' },
    { label: 'AI Agents' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { label: 'Email', href: 'mailto:bright@example.com', icon: Mail },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-lg font-light tracking-tighter text-white">
              Bright <span className="font-extralight text-white/50">Akolade</span>
            </h2>
            <p className="text-[10px] font-extralight uppercase tracking-[0.2em] text-white/30">
              © {currentYear} — All Rights Reserved.
            </p>
          </div>

          {/* Social Links - Minimalist */}
          <div className="flex items-center gap-6">
            {footerLinks.social.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center text-white/30 transition-all duration-500 hover:text-white"
                  aria-label={social.label}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span className="absolute -bottom-4 text-[8px] font-light uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-bottom-2">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Minimalist Tagline */}
          <div className="hidden lg:block">
            <span className="text-[10px] font-extralight uppercase tracking-[0.3em] text-white/20">
              Design Driven Engineering
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
