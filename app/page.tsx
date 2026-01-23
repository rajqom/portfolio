import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { generateWebSiteSchema, generateFAQPageSchema } from '@/lib/schema-generators';
import { faqs } from '@/lib/faq-data';
import dynamic from 'next/dynamic';
import Hero from "@/components/ui/neural-network-hero";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

// Lazy load below-the-fold components for better initial page load
const AboutSection = dynamic(() => import("@/components/ui/about-section"), {
  loading: () => <div className="min-h-[400px]" />,
});
const SkillsSection = dynamic(() => import("@/components/ui/skills-section"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ProjectsSection = dynamic(() => import("@/components/ui/projects-section"), {
  loading: () => <div className="min-h-[600px]" />,
});
const TestimonialsSection = dynamic(() => import("@/components/ui/testimonials-section"), {
  loading: () => <div className="min-h-[400px]" />,
});
const FAQSection = dynamic(() => import("@/components/ui/faq-section"), {
  loading: () => <div className="min-h-[400px]" />,
});
const ContactSection = dynamic(() => import("@/components/ui/contact-section"), {
  loading: () => <div className="min-h-[400px]" />,
});

export const metadata: Metadata = generatePageMetadata({
  title: 'Zynra Studio - Web & Mobile Development Agency | Custom Digital Solutions',
  description: 'Zynra Studio is a modern web and mobile development agency specializing in building elegant, scalable digital solutions. We transform ideas into powerful applications with React, Next.js, and cutting-edge technologies.',
  path: '/',
  keywords: [
    'web development agency',
    'mobile app development',
    'custom web applications',
    'React development',
    'Next.js development',
    'UI/UX design agency',
    'full-stack development',
    'software development company',
    'digital solutions',
  ],
});

export default function Home() {
  const websiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQPageSchema(faqs);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Header />
      <main>
        <Hero 
          title="Crafting Elegant Digital Solutions"
          description="Zynra Studio specializes in web and mobile development. We transform your vision into powerful, user-friendly applications that drive results."
          badgeText="Available for Projects"
          badgeLabel="Open"
          ctaButtons={[
            { text: "Book a Call", href: "/contact", primary: true },
            { text: "Get a Quote", href: "/services" }
          ]}
          microDetails={["Web Development", "Mobile Apps", "UI/UX Design"]}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
