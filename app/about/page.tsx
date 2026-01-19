import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/schema-generators';
import { siteConfig } from '@/lib/seo-config';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import SectionContainer from '@/components/ui/section-container';
import TeamSection from '@/components/ui/team-section';
import Link from 'next/link';

export const metadata: Metadata = generateMetadata({
  title: 'About Us',
  description: 'Learn about Zynra Studio - a modern web and mobile development agency dedicated to crafting elegant, scalable digital solutions. Discover our mission, values, and approach to building exceptional software.',
  path: '/about',
  keywords: [
    'about zynra studio',
    'web development agency',
    'mobile app development',
    'agency team',
    'software development company',
    'digital agency',
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'About', url: `${siteConfig.url}/about` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Header />
      <main className="min-h-screen">
        <SectionContainer id="about-hero" className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6">
              About <span className="font-extralight text-white/50">Zynra Studio</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed">
              We are a modern development agency specializing in web and mobile applications. 
              Our mission is to transform ideas into elegant, functional digital solutions.
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg font-light text-white/70 leading-relaxed">
                At Zynra Studio, we believe that great software is more than just code—it&apos;s an experience. 
                We combine technical excellence with thoughtful design to create digital products that not only 
                work flawlessly but also delight users at every interaction.
              </p>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
                What We Do
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-light text-white mb-3">Web Development</h3>
                  <p className="text-white/60 font-light mb-3">
                    Building responsive, performant web applications using modern frameworks and best practices.
                  </p>
                  <Link href="/services#services-hero" className="text-sm text-white/80 hover:text-white underline">
                    Learn more about our services →
                  </Link>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-light text-white mb-3">Mobile Apps</h3>
                  <p className="text-white/60 font-light mb-3">
                    Creating native and cross-platform mobile experiences that users love.
                  </p>
                  <Link href="/projects/spacel" className="text-sm text-white/80 hover:text-white underline">
                    See our mobile app projects →
                  </Link>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-light text-white mb-3">UI/UX Design</h3>
                  <p className="text-white/60 font-light mb-3">
                    Crafting intuitive interfaces that prioritize user experience and accessibility.
                  </p>
                  <Link href="/services" className="text-sm text-white/80 hover:text-white underline">
                    View design services →
                  </Link>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-light text-white mb-3">Consulting</h3>
                  <p className="text-white/60 font-light mb-3">
                    Providing technical guidance and strategic planning for your digital initiatives.
                  </p>
                  <Link href="/contact" className="text-sm text-white/80 hover:text-white underline">
                    Schedule a consultation →
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
                Our Approach
              </h2>
              <p className="text-lg font-light text-white/70 leading-relaxed mb-4">
                We start every project by deeply understanding your goals, users, and challenges. 
                Through close collaboration and iterative development, we ensure that the final product 
                not only meets but exceeds expectations.
              </p>
              <p className="text-lg font-light text-white/70 leading-relaxed">
                Quality, communication, and attention to detail are at the heart of everything we do. 
                We&apos;re not just building software—we&apos;re building partnerships.
              </p>
            </div>
          </div>
        </SectionContainer>

        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
