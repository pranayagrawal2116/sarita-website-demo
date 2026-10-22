import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  structuredData?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Sarita Infotech Pvt. Ltd. | Enterprise Business Software',
  description = 'Practical business software and technology solutions designed to simplify operations, improve visibility, and support your organization’s growth.',
  canonicalPath,
  structuredData
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;

  useEffect(() => {
    // 1. Document title
    document.title = title.includes('Sarita Infotech') ? title : `${title} | Sarita Infotech Pvt. Ltd.`;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. OpenGraph title & desc
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // 4. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', `https://www.saritainfotech.com${currentPath}`);

    // 5. JSON-LD structured data
    const existingScript = document.getElementById('seo-jsonld');
    if (existingScript) existingScript.remove();

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [title, description, currentPath, structuredData]);

  return null;
};
