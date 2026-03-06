import type { Metadata } from "next";
import SectionRenderer from "@/components/SectionRenderer";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  getProjects,
  getStats,
  getSiteConfig,
  getPageSections,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Réalisations Toiture Var (83) — Avant / Après",
  description:
    "Découvrez nos réalisations de couverture, charpente et toiture à Fréjus et dans le Var (83). Photos avant/après de nos chantiers.",
  alternates: { canonical: "https://couverture-jjm.fr/realisations" },
};

export default async function RealisationsPage() {
  const [projects, stats, siteConfig, sections] = await Promise.all([
    getProjects(),
    getStats(),
    getSiteConfig(),
    getPageSections("realisations"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://couverture-jjm.fr" },
        { name: "Réalisations", url: "https://couverture-jjm.fr/realisations" },
      ]} />
      <SectionRenderer
        sections={sections}
        sharedData={{ siteConfig, projects, stats }}
      />
    </>
  );
}
