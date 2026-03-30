"use client";

import { portfolioData } from "@/data/portfolio";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.name,
    jobTitle: portfolioData.role,
    description: portfolioData.about,
    url: "https://nzm-dev.site",
    image: "https://nzm-dev.site/images/profile.webp",
    telephone: "+237698497839",
    email: "mathiaszele3@gmail.com",
    sameAs: portfolioData.social
      .filter((s) => s.platform !== "Email")
      .map((s) => s.url),
    address: {
      "@type": "PostalAddress",
      addressCity: "Douala",
      addressCountry: "CM",
    },
    knowsAbout: [
      "Web Development",
      "React Development",
      "React Native Development",
      "WordPress Development",
      "PHP",
      "Laravel",
      "JavaScript",
      "E-commerce",
      "Webmaster",
      "Frontend Development",
      "Backend Development",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${portfolioData.name} Portfolio - Webmaster et Développeur Web`,
    description: portfolioData.about,
    url: "https://nzm-dev.site",
    author: {
      "@type": "Person",
      name: portfolioData.name,
    },
    inLanguage: "fr-FR",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-11-20",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: {
      "@type": "Person",
      name: portfolioData.name,
      description: portfolioData.about,
      jobTitle: portfolioData.role,
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${portfolioData.name} - Développeur Web Professionnel`,
    description: "Services de développement web et webmaster à Douala",
    url: "https://nzm-dev.site",
    telephone: "+237698497839",
    email: "mathiaszele3@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCity: "Douala",
      addressCountry: "CM",
    },
    areaServed: ["CM", "Africa"],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
