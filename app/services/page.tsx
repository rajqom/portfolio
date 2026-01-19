import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { generateServiceSchema, generateFAQPageSchema, generateBreadcrumbSchema } from '@/lib/schema-generators';
import { siteConfig } from '@/lib/seo-config';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import SectionContainer from '@/components/ui/section-container';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'Our Services',
  description: 'Zynra Studio offers comprehensive web and mobile development services. From custom web applications to mobile apps, we deliver scalable, elegant digital solutions tailored to your needs.',
  path: '/services',
  keywords: [
    'web development services',
    'mobile app development services',
    'custom software development',
    'React development',
    'Next.js development',
    'UI/UX design services',
    'full-stack development',
  ],
});

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices',
    features: [
      'Responsive Design',
      'Performance Optimization',
      'SEO Best Practices',
      'Progressive Web Apps',
      'E-commerce Solutions',
      'Content Management Systems',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  },
  {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android',
    features: [
      'Native iOS & Android',
      'Cross-Platform Solutions',
      'Offline Functionality',
      'Push Notifications',
      'App Store Optimization',
      'Maintenance & Support',
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality',
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Design Systems',
      'Accessibility (WCAG)',
      'Usability Testing',
    ],
    tech: ['Figma', 'Adobe XD', 'Sketch', 'Framer'],
  },
  {
    title: 'Consulting & Strategy',
    description: 'Technical guidance and strategic planning for your digital initiatives',
    features: [
      'Technical Architecture',
      'Technology Selection',
      'Code Audits',
      'Performance Analysis',
      'Team Training',
      'Project Planning',
    ],
    tech: ['Agile', 'DevOps', 'Cloud Infrastructure', 'CI/CD'],
  },
];

export default function ServicesPage() {
  // Generate Service schemas for each service
  const serviceSchemas = services.map((service) =>
    generateServiceSchema(
      service.title,
      service.description,
      service.title
    )
  );

  // Generate FAQPage schema
  const faqSchema = generateFAQPageSchema([
    {
      question: 'What web development technologies do you use?',
      answer: 'We specialize in modern web technologies including React, Next.js, TypeScript, and Node.js. We build responsive, performant web applications with SEO best practices and progressive web app capabilities.',
    },
    {
      question: 'Do you develop native or cross-platform mobile apps?',
      answer: 'We develop both native iOS/Android applications and cross-platform solutions using React Native and Flutter. We choose the best approach based on your project requirements, timeline, and budget.',
    },
    {
      question: 'What is included in your UI/UX design services?',
      answer: 'Our UI/UX design services include user research, wireframing, prototyping, visual design, design systems creation, accessibility compliance (WCAG), and usability testing. We use tools like Figma, Adobe XD, and Framer.',
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A typical web application takes 8-16 weeks, while mobile apps range from 12-24 weeks. We provide detailed timelines during our initial consultation.',
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer ongoing support and maintenance packages. This includes bug fixes, security updates, performance optimization, feature enhancements, and technical support.',
    },
    {
      question: 'What is your development process?',
      answer: 'We follow an agile methodology with four main phases: Discovery (understanding your needs), Design (creating intuitive experiences), Development (building with quality), and Deployment (launching and support).',
    },
  ]);

  // Generate BreadcrumbList schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Services', url: `${siteConfig.url}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Header />
      <main className="min-h-screen">
        <SectionContainer id="services-hero" className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6">
              Our <span className="font-extralight text-white/50">Services</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed">
              Comprehensive digital solutions tailored to bring your vision to life. 
              From concept to deployment, we handle every aspect of your project.
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="py-20">
          <div className="max-w-6xl mx-auto space-y-20">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="grid md:grid-cols-2 gap-12 items-start"
              >
                <div>
                  <div className="text-sm font-light uppercase tracking-[0.2em] text-white/40 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg font-light text-white/70 leading-relaxed mb-6">
                    {service.description}
                    {index === 0 && (
                      <> See our <Link href="/projects/voiceventure-ai" className="text-white underline hover:text-white/70">VoiceVenture AI</Link> and <Link href="/projects/esplit" className="text-white underline hover:text-white/70">Esplit</Link> projects for examples.</>
                    )}
                    {index === 1 && (
                      <> Check out <Link href="/projects/spacel" className="text-white underline hover:text-white/70">Spacel</Link> and <Link href="/projects/voiceventure-ai" className="text-white underline hover:text-white/70">VoiceVenture AI</Link> mobile apps.</>
                    )}
                    {index === 2 && (
                      <> Explore our design work in <Link href="/projects/project-sync" className="text-white underline hover:text-white/70">Project Sync</Link> and <Link href="/projects" className="text-white underline hover:text-white/70">other projects</Link>.</>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs font-light uppercase tracking-wider bg-white/5 border border-white/10 rounded-full text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-block text-sm font-light text-white/60 hover:text-white underline"
                  >
                    Get a quote for {service.title} →
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div 
                      key={feature}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                    >
                      <p className="text-sm font-light text-white/80">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        <SectionContainer className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              Our Development Process
            </h2>
            <p className="text-lg font-light text-white/70 leading-relaxed mb-12">
              We follow a proven methodology to ensure successful project delivery
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              {['Discovery', 'Design', 'Development', 'Deployment'].map((phase, index) => (
                <div key={phase} className="relative">
                  <div className="text-4xl font-extralight text-white/20 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-light text-white mb-2">{phase}</h3>
                  <p className="text-sm font-light text-white/60">
                    {index === 0 && 'Understanding your needs and goals'}
                    {index === 1 && 'Creating intuitive user experiences'}
                    {index === 2 && 'Building with quality and precision'}
                    {index === 3 && 'Launching and ongoing support'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg font-light text-white/70 leading-relaxed mb-8">
              Let&apos;s discuss how we can help bring your project to life
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full bg-white text-black font-light tracking-tight hover:bg-white/90 transition-colors duration-300"
            >
              Book a Call
            </Link>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
