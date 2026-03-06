import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  getStats,
  getTestimonials,
  getSiteConfig,
  getPageSections,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "À Propos | Couvreur à Fréjus depuis 15 Ans",
  description:
    "COUVERTURE J.J.M, artisan couvreur à Fréjus (83) depuis 15 ans. Garantie décennale, équipe qualifiée, matériaux de qualité dans tout le Var.",
  alternates: { canonical: "https://couverture-jjm.fr/a-propos" },
};

export default async function AProposPage() {
  const [stats, testimonials, siteConfig, sections] = await Promise.all([
    getStats(),
    getTestimonials(),
    getSiteConfig(),
    getPageSections("a-propos"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://couverture-jjm.fr" },
        { name: "À Propos", url: "https://couverture-jjm.fr/a-propos" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, stats, testimonials }}
      />
    </>
  );
}
