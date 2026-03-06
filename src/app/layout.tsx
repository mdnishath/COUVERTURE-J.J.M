import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import {
  getSiteConfig,
  getNavigation,
  getServices,
  getAppearance,
} from "@/lib/wordpress";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const appearance = await getAppearance();

  return {
    metadataBase: new URL("https://couverturejjm.com"),
    title: {
      default: "COUVERTURE J.J.M | Charpente & Toiture à Fréjus (83)",
      template: "%s | COUVERTURE J.J.M",
    },
    description:
      "Expert en couverture, charpente et toiture à Fréjus et dans le Var (83). Devis gratuit, intervention rapide. Rénovation, réparation, isolation de toiture. ☎ 07 68 25 90 34",
    keywords: [
      "couverture Fréjus",
      "toiture Fréjus",
      "charpente Fréjus",
      "couvreur Var 83",
      "rénovation toiture",
      "réparation toiture",
      "zinguerie",
      "démoussage toiture",
      "isolation toiture",
      "étanchéité toiture",
      "couvreur Saint-Raphaël",
      "toiture Var",
      "couvreur 83",
      "toiture Saint-Raphaël",
      "charpentier Var",
      "réparation toiture Fréjus",
      "couvreur professionnel Var",
      "entreprise couverture 83",
      "devis toiture gratuit Fréjus",
    ],
    authors: [{ name: "COUVERTURE J.J.M" }],
    icons: appearance.favicon
      ? { icon: appearance.favicon }
      : undefined,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: "https://couverturejjm.com",
      siteName: "COUVERTURE J.J.M",
      title: "COUVERTURE J.J.M | Charpente & Toiture à Fréjus (83)",
      description:
        "Expert en couverture, charpente et toiture à Fréjus. Devis gratuit ☎ 07 68 25 90 34",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "COUVERTURE J.J.M - Charpente & Toiture",
        },
      ],
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
    twitter: {
      card: "summary_large_image",
      title: "COUVERTURE J.J.M | Charpente & Toiture à Fréjus (83)",
      description:
        "Expert en couverture, charpente et toiture à Fréjus. Devis gratuit ☎ 07 68 25 90 34",
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: "https://couverturejjm.com",
    },
    other: {
      "geo.region": "FR-83",
      "geo.placename": "Fréjus",
      "geo.position": "43.4332;6.7370",
      ICBM: "43.4332, 6.7370",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteConfig, navigation, services, appearance] = await Promise.all([
    getSiteConfig(),
    getNavigation(),
    getServices(),
    getAppearance(),
  ]);

  const colorVars: Record<string, string> = {
    "--color-primary": appearance.colors.primary,
    "--color-primary-dark": appearance.colors.primaryDark,
    "--color-primary-light": appearance.colors.primaryLight,
    "--color-accent": appearance.colors.accent,
    "--color-accent-dark": appearance.colors.accentDark,
    "--color-dark": appearance.colors.dark,
    "--color-secondary": appearance.colors.secondary,
  };

  return (
    <html
      lang="fr"
      className="scroll-smooth"
      style={colorVars as React.CSSProperties}
      suppressHydrationWarning
    >
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <JsonLd siteConfig={siteConfig} />
        <Header
          siteConfig={siteConfig}
          navigation={navigation}
          logo={appearance.logo}
          headerSettings={appearance.header}
        />
        <main>{children}</main>
        <Footer
          siteConfig={siteConfig}
          navigation={navigation}
          services={services}
          logo={appearance.logo}
          footerSettings={appearance.footer}
        />
      </body>
    </html>
  );
}
