import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { SmoothScroll } from "@/components/core/SmoothScroll";
import { CustomCursor } from "@/components/core/CustomCursor";
import { PageTransition } from "@/components/core/PageTransition";
import { portfolioData } from "@/data/portfolio";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nzm-dev.site"),
  title: {
    template: `%s | ${portfolioData.name}`,
    default: `${portfolioData.name} - ${portfolioData.role}`,
  },
  description: `Portfolio de ${portfolioData.name}, Webmaster & Développeur Web basé à Douala. Conception de sites vitrines, e-commerce et applications web sur mesure avec React, Laravel, WordPress et Shopify. Disponible pour vos projets digitaux.`,
  keywords: [
    "Mathias Zele",
    "Développeur Web",
    "Développeur WordPress",
    "Webmaster",
    "Développeur Junior",
    "React",
    "React Native",
    "JavaScript",
    "Laravel",
    "PHP",
    "Douala",
    "Cameroun",
    "Portfolio",
    "E-commerce",
    "Web Design",
    "Frontend",
    "Backend",
    "Développeur Freelance",
    "Création Site Web",
    "Web Developer",
    "Development",
  ],
  authors: [{ name: portfolioData.name, url: "https://nzm-dev.site" }],
  creator: portfolioData.name,
  publisher: portfolioData.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nzm-dev.site",
    title: `${portfolioData.name} - ${portfolioData.role}`,
    description: portfolioData.about,
    siteName: `${portfolioData.name} Portfolio`,
    images: [
      {
        url: "https://nzm-dev.site/images/profile.webp",
        width: 1200,
        height: 630,
        alt: `${portfolioData.name} - ${portfolioData.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.name} - ${portfolioData.role}`,
    description: portfolioData.about,
    creator: "@mathiaszele",
    images: ["https://nzm-dev.site/images/profile.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icons/icon.ico", type: "image/x-icon" }],
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="bg-bg-primary text-text-primary font-body antialiased overflow-x-hidden grain">
        <SmoothScroll>
          <CustomCursor />
          <PageTransition />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
      </body>
    </html>
  );
}
