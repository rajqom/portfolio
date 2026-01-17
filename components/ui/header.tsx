'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.2,
      });
    },
    { scope: headerRef }
  );

  useGSAP(
    () => {
      if (!mobileMenuOpen || !mobileMenuRef.current) return;

      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );

      gsap.from(mobileMenuRef.current.querySelectorAll('a'), {
        x: -10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
      });
    },
    { dependencies: [mobileMenuOpen], scope: mobileMenuRef }
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section instanceof HTMLElement) {
          if (scrollPosition >= section.offsetTop) {
            setActiveSection(navItems[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5"
    >
      <nav className="mx-auto flex h-16 lg:h-20 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-light tracking-tighter text-white transition-all duration-500 hover:opacity-70"
        >
          Bright <span className="font-extralight text-white/50">Akolade</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-[13px] font-light uppercase tracking-[0.1em] transition-all duration-500 relative py-2 ${
                activeSection === item.href
                  ? 'text-white'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-500 ${
                activeSection === item.href ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`} />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10"
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`py-3 px-4 rounded-xl text-sm font-light tracking-tight transition-colors duration-300 ${
                  activeSection === item.href
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
