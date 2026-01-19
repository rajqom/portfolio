import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema-generators';
import { projects } from '@/lib/projects-data';
import { siteConfig } from '@/lib/seo-config';
import CaseStudyClient from './case-study-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return generatePageMetadata({
      title: 'Project Not Found',
      description: 'The requested project case study could not be found.',
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  const title = `${project.title} - Case Study | ${siteConfig.name}`;
  const description = `${project.description} ${project.fullDescription.substring(0, 100)}...`;

  return generatePageMetadata({
    title,
    description,
    path: `/projects/${slug}`,
    image: project.image.startsWith('http') ? project.image : `${siteConfig.url}${project.image}`,
    keywords: [
      ...project.tags,
      project.category,
      'case study',
      'portfolio',
      'web development',
      'mobile app development',
    ],
  });
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Generate schemas for this page
  const articleSchema = generateArticleSchema(
    project.title,
    project.description,
    `${siteConfig.url}/projects/${slug}`,
    project.image.startsWith('http') ? project.image : `${siteConfig.url}${project.image}`,
    project.date !== 'In Development' ? new Date(project.date).toISOString() : undefined
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Projects', url: `${siteConfig.url}/projects` },
    { name: project.title, url: `${siteConfig.url}/projects/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <CaseStudyClient project={project} />
    </>
  );
}
