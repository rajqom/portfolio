import { Building2, Globe, Cpu, LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  impact: string;
  demoUrl: string;
  codeUrl: string;
  client: string;
  date: string;
  role: string;
  challenges: string[];
  solutions: string[];
  results: string[];
}

export const projects: Project[] = [
  {
    title: 'Enterprise AI Ecosystem',
    slug: 'enterprise-ai-ecosystem',
    category: 'AI Agents & Automation',
    description: 'A multi-agent system designed to automate complex procurement workflows, resulting in a 40% reduction in processing time.',
    fullDescription: 'This project involved architecting a sophisticated multi-agent AI system for a Fortune 500 company. The goal was to streamline their procurement process, which was previously manual and prone to errors. We utilized LangChain for agent orchestration and integrated various LLMs to handle specific tasks within the workflow.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    tags: ['Next.js', 'LangChain', 'OpenAI', 'Vector DBs', 'Python'],
    impact: '40% Process Efficiency',
    demoUrl: '#',
    codeUrl: '#',
    client: 'TechVision Corp',
    date: 'March 2025',
    role: 'Lead AI Engineer',
    challenges: [
      'Orchestrating multiple AI agents with specialized roles.',
      'Ensuring high accuracy in data extraction from complex PDF invoices.',
      'Integrating with legacy ERP systems without downtime.'
    ],
    solutions: [
      'Developed a custom state-management layer for agent communication.',
      'Implemented RAG (Retrieval-Augmented Generation) for precise context injection.',
      'Built a robust API bridge to safely interface with legacy infrastructure.'
    ],
    results: [
      '40% reduction in procurement cycle time.',
      '95% accuracy in automated data entry.',
      'Significant reduction in manual labor costs.'
    ]
  },
  {
    title: 'Fintech Mobile Experience',
    slug: 'fintech-mobile-experience',
    category: 'Mobile Application',
    description: 'A cross-platform high-performance banking app featuring biometric security and real-time transaction processing.',
    fullDescription: 'We built a high-performance, secure mobile banking application using React Native. The focus was on providing a native-like experience while maintaining a single codebase. Security was paramount, so we implemented multi-factor authentication and biometric security layers.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
    tags: ['React Native', 'Node.js', 'Biometrics', 'Real-time', 'PostgreSQL'],
    impact: '50k+ Active Users',
    demoUrl: '#',
    codeUrl: '#',
    client: 'Global Finance Group',
    date: 'June 2025',
    role: 'Senior Mobile Developer',
    challenges: [
      'Achieving native performance for complex animations.',
      'Ensuring end-to-end encryption for all transactions.',
      'Supporting a wide range of mobile devices and OS versions.'
    ],
    solutions: [
      'Used Reanimated for high-performance animations.',
      'Implemented AES-256 encryption and certificate pinning.',
      'Established a rigorous testing pipeline with automated device testing.'
    ],
    results: [
      'Over 50,000 active users within the first three months.',
      '4.8/5 rating on both App Store and Play Store.',
      'Zero security breaches since launch.'
    ]
  },
  {
    title: 'Precision Browser Utility',
    slug: 'precision-browser-utility',
    category: 'Chrome Extension',
    description: 'A professional-grade extension for specialized data extraction and research automation across enterprise platforms.',
    fullDescription: 'This Chrome extension was designed for market researchers to automate the collection of data from various sources. It features a custom scraper engine and integrates with cloud storage for seamless data syncing.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=800&fit=crop',
    tags: ['Chrome APIs', 'TypeScript', 'WASM', 'Automation', 'Firebase'],
    impact: '10k+ Downloads',
    demoUrl: '#',
    codeUrl: '#',
    client: 'DataFlow Systems',
    date: 'October 2025',
    role: 'Full Stack Extension Developer',
    challenges: [
      'Managing extension performance during heavy scraping tasks.',
      'Bypassing complex anti-bot measures on targeted platforms.',
      'Ensuring data privacy and compliance with browser policies.'
    ],
    solutions: [
      'Implemented a background worker architecture for non-blocking tasks.',
      'Developed a sophisticated request rotation and proxy management system.',
      'Built in privacy-first data handling with local-first processing.'
    ],
    results: [
      '10,000+ active downloads within the first year.',
      '99.9% uptime for the data extraction engine.',
      'Simplified researcher workflows by 60%.'
    ]
  },
  {
    title: 'Nexus Web Platform',
    slug: 'nexus-web-platform',
    category: 'Web Development',
    description: 'A lightning-fast e-commerce solution focused on core web vitals and advanced inventory management.',
    fullDescription: 'The Nexus Web Platform is an enterprise-level e-commerce solution built with Next.js 15. It prioritizes speed and scalability, featuring a server-less architecture and a headless CMS integration.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    tags: ['Next.js 15', 'Tailwind v4', 'PostgreSQL', 'Redis', 'Headless CMS'],
    impact: '99/100 Lighthouse Score',
    demoUrl: '#',
    codeUrl: '#',
    client: 'RetailGiant Inc',
    date: 'December 2025',
    role: 'Lead Frontend Architect',
    challenges: [
      'Optimizing page load times for thousands of product pages.',
      'Handling real-time inventory updates during high-traffic events.',
      'Ensuring a seamless and accessible UI/UX across all breakpoints.'
    ],
    solutions: [
      'Implemented Incremental Static Regeneration (ISR) for fast updates.',
      'Used Redis for high-speed inventory caching and real-time syncing.',
      'Developed a custom design system focused on accessibility and performance.'
    ],
    results: [
      'Lighthouse score consistently at 99/100.',
      '30% increase in conversion rates compared to the previous platform.',
      'Zero downtime during Black Friday peak traffic.'
    ]
  },
];
