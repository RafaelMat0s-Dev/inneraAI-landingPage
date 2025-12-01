import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google"; // Fonte Serif para destaque
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: {
    default: "Rafael Matos| Desenvolvedor Web Estratégico",
    template: "%s | Rafael Matos"
  },
  description: "Especialista em Next.js e SEO. Ajudo empresas a faturar mais através de websites de alta performance e design narrativo.",
  metadataBase: new URL('https://inneraai.com'),
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: 'https://inneraai.com',
    siteName: 'Rafael Matos',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema para Freelancers (Crucial para SEO Local e Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "InneraAI Web Development",
    "image": "https://inneraai.com/foto-perfil.jpg",
    "description": "Desenvolvimento Web Freelance em Portugal especializado em Next.js e React.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Aveiro",
      "addressCountry": "PT"
    },
    "priceRange": "$$$",
    "openingHours": "Mo-Fr 08:00-20:00"
  };

  return (
    <html lang="pt-PT" className="scroll-smooth">
      <body className={`${inter.variable} ${calistoga.variable} font-sans bg-slate-950 text-slate-50 antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}