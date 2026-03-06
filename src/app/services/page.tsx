import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  getServices,
  getSiteConfig,
  getPageSections,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Nos Services de Couverture & Toiture à Fréjus (83)",
  description:
    "Couverture, charpente, zinguerie, isolation et étanchéité à Fréjus et dans le Var (83). Artisan couvreur qualifié. Devis gratuit ☎ 07 68 25 90 34",
  alternates: { canonical: "https://couverturejjm.com/services" },
};

export default async function ServicesPage() {
  const [services, siteConfig, sections] = await Promise.all([
    getServices(),
    getSiteConfig(),
    getPageSections("services"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://couverturejjm.com" },
        { name: "Services", url: "https://couverturejjm.com/services" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, services }}
      />
    </>
  );
}
