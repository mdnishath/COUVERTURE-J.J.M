import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getSiteConfig, getPageSections, getFormConfig } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Contact Couvreur Fréjus — Devis Gratuit",
  description:
    "Contactez votre couvreur à Fréjus (83). Devis gratuit sous 24h. ☎ 07 68 25 90 34. Intervention rapide dans tout le Var.",
  alternates: { canonical: "https://couverture-jjm.fr/contact" },
};

export default async function ContactPage() {
  const [siteConfig, sections, contactFormConfig] = await Promise.all([
    getSiteConfig(),
    getPageSections("contact"),
    getFormConfig("contact"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://couverture-jjm.fr" },
        { name: "Contact", url: "https://couverture-jjm.fr/contact" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, contactFormConfig }}
      />
    </>
  );
}
