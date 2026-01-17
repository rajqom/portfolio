import Hero from "@/components/ui/neural-network-hero";
import Header from "@/components/ui/header";
import AboutSection from "@/components/ui/about-section";
import SkillsSection from "@/components/ui/skills-section";
import ProjectsSection from "@/components/ui/projects-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero 
          title="Building Digital Experiences That Matter"
          description="Full-stack developer specializing in web applications, mobile apps, Chrome extensions, and AI-powered solutions. Transforming ideas into elegant, functional software."
          badgeText="Available for Work"
          badgeLabel="Open"
          ctaButtons={[
            { text: "View Projects", href: "#projects", primary: true },
            { text: "Get in Touch", href: "#contact" }
          ]}
          microDetails={["Web Development", "Mobile Apps", "AI Solutions"]}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
