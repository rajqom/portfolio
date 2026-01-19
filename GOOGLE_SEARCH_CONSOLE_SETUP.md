# Google Search Console Setup Guide

## Step 1: Verify Site Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property" and select "URL prefix"
3. Enter your site URL: `https://zynra.studio`
4. Choose a verification method:
   - **HTML file upload** (Recommended): Download the HTML file and place it in `/public/` directory
   - **HTML tag**: Add the meta tag to your `<head>` in `app/layout.tsx`
   - **DNS record**: Add a TXT record to your domain's DNS settings
   - **Google Analytics**: If you have GA installed

## Step 2: Submit Sitemap

1. Once verified, go to **Sitemaps** in the left sidebar
2. Enter your sitemap URL: `https://zynra.studio/sitemap.xml`
3. Click **Submit**
4. Wait for Google to process (usually within a few hours)

## Step 3: Request Indexing for Key Pages

1. Go to **URL Inspection** tool
2. Enter each important page URL:
   - `https://zynra.studio`
   - `https://zynra.studio/services`
   - `https://zynra.studio/projects`
   - `https://zynra.studio/about`
   - `https://zynra.studio/contact`
   - Individual project pages: `/projects/voiceventure-ai`, `/projects/esplit`, `/projects/spacel`, `/projects/project-sync`
3. Click **Request Indexing** for each page

## Step 4: Monitor Performance

### Check Coverage Reports
- Go to **Coverage** to see which pages are indexed
- Fix any errors or warnings
- Monitor for crawl errors

### Review Core Web Vitals
- Go to **Core Web Vitals** report
- Ensure all metrics are in "Good" range:
  - Largest Contentful Paint (LCP) < 2.5s
  - First Input Delay (FID) < 100ms
  - Cumulative Layout Shift (CLS) < 0.1

### Mobile Usability
- Go to **Mobile Usability** report
- Ensure all pages are mobile-friendly
- Fix any mobile usability issues

## Step 5: Monitor Search Performance

1. Go to **Performance** report
2. Monitor:
   - Impressions (how often your site appears in search)
   - Clicks (how often users click through)
   - Average position (aim for top 10, ideally top 3)
   - Click-through rate (CTR)

## Step 6: Set Up Email Notifications

1. Go to **Settings** → **Users and permissions**
2. Ensure your email receives notifications for:
   - Critical issues
   - Security problems
   - Manual actions

## Expected Timeline

- **Immediate**: Sitemap submitted, pages requested for indexing
- **1-3 days**: Google starts crawling your site
- **1-2 weeks**: Pages appear in search results
- **2-4 weeks**: Rich snippets (breadcrumbs, organization info) may appear
- **1-3 months**: Improved rankings for branded searches
- **3-6 months**: Improved rankings for competitive keywords (with ongoing SEO efforts)

## Additional Resources

- [Google Search Central Documentation](https://developers.google.com/search/docs)
- [Rich Results Test](https://search.google.com/test/rich-results) - Test your structured data
- [PageSpeed Insights](https://pagespeed.web.dev/) - Test page performance
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Verify mobile usability

## Current Sitemap URL

Your sitemap is automatically generated at:
**https://zynra.studio/sitemap.xml**

This includes:
- Homepage (priority: 1.0)
- Main pages: /about, /services, /contact, /projects (priority: 0.8)
- All 4 project case studies (priority: 0.7)

## Structured Data Verification

All pages now include structured data:
- ✅ Organization schema (on all pages)
- ✅ WebSite schema (homepage)
- ✅ BreadcrumbList schema (all main pages)
- ✅ Service schemas (services page)
- ✅ FAQPage schema (services page)
- ✅ ItemList schema (projects page)
- ✅ Article schema (individual project pages)
- ✅ ContactPage schema (contact page)

Test your structured data using the [Rich Results Test](https://search.google.com/test/rich-results).
