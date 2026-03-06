import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { getSiteConfig, getPageSections, getFormConfig } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Devis Gratuit Couverture & Toiture Fréjus (83)",
  description:
    "Demandez votre devis gratuit pour travaux de toiture à Fréjus et dans le Var. Réponse sous 24h, sans engagement. ☎ 07 68 25 90 34",
  alternates: { canonical: "https://couverture-jjm.fr/devis" },
};

export default async function DevisPage() {
  const [siteConfig, sections, devisFormConfig] = await Promise.all([
    getSiteConfig(),
    getPageSections("devis"),
    getFormConfig("devis"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://couverture-jjm.fr" },
        { name: "Devis Gratuit", url: "https://couverture-jjm.fr/devis" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, devisFormConfig }}
      />
    </>
  );
}
