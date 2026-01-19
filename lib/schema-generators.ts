import { siteConfig } from './seo-config';

/**
 * Generate BreadcrumbList schema for navigation path
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Service schema for individual services
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  serviceType: string,
  areaServed?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo-square.svg`,
    },
    ...(areaServed && { areaServed }),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generate ItemList schema for portfolio/projects listing
 */
export function generateItemListSchema(
  name: string,
  description: string,
  items: Array<{
    name: string;
    description: string;
    url: string;
    image?: string;
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.name,
        description: item.description,
        url: item.url,
        ...(item.image && {
          image: item.image.startsWith('http')
            ? item.image
            : `${siteConfig.url}${item.image}`,
        }),
      },
    })),
  };
}

/**
 * Generate Article/CreativeWork schema for case studies
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  url: string,
  image?: string,
  datePublished?: string,
  dateModified?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    image: image
      ? image.startsWith('http')
        ? image
        : `${siteConfig.url}${image}`
      : `${siteConfig.url}/og-image.png`,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo-square.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/projects?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate ContactPage schema
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    url: `${siteConfig.url}/contact`,
    description: `Get in touch with ${siteConfig.name}. We're ready to discuss your project and help transform your ideas into elegant digital solutions.`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.links.email,
        contactType: 'customer service',
        availableLanguage: ['English'],
      },
    },
  };
}

/**
 * Generate LocalBusiness schema (if applicable)
 */
export function generateLocalBusinessSchema(
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.links.email,
    ...(address && { address: { '@type': 'PostalAddress', ...address } }),
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
  };
}
