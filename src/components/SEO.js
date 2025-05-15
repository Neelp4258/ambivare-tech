import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Ambivare Tech - Web Development & Digital Solutions';
  const defaultDescription = 'Transform your digital presence with Ambivare Tech. We specialize in web development, mobile apps, UI/UX design, and digital marketing services.';
  const defaultKeywords = 'web development, mobile app development, UI/UX design, digital marketing, software development, technology consulting';
  const defaultImage = '/logo.png';
  const defaultUrl = 'https://ambivare.com';

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: image || defaultImage,
    url: url || defaultUrl,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0A192F" />
      <link rel="canonical" href={seo.url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Ambivare Tech',
          url: seo.url,
          logo: seo.image,
          description: seo.description,
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN'
          },
          sameAs: [
            'https://www.linkedin.com/company/ambivare-solutions',
            'https://twitter.com/ambivare',
            'https://www.facebook.com/ambivare'
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 