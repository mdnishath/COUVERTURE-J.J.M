interface ServiceJsonLdProps {
  name: string;
  description: string;
  slug: string;
}

export default function ServiceJsonLd({ name, description, slug }: ServiceJsonLdProps) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name: name,
    description: description,
    url: `https://couverturejjm.com/services/${slug}`,
    provider: {
      "@type": "RoofingContractor",
      name: "COUVERTURE J.J.M",
      telephone: "+330768259034",
      address: {
        "@type": "PostalAddress",
        streetAddress: "151 Avenue de Verdun",
        addressLocality: "Fréjus",
        postalCode: "83600",
        addressRegion: "Provence-Alpes-Côte d'Azur",
        addressCountry: "FR",
      },
    },
    areaServed: [
      { "@type": "City", name: "Fréjus" },
      { "@type": "City", name: "Saint-Raphaël" },
      { "@type": "City", name: "Draguignan" },
      { "@type": "AdministrativeArea", name: "Var (83)" },
    ],
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://couverturejjm.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://couverturejjm.com/services" },
      { "@type": "ListItem", position: 3, name: name, item: `https://couverturejjm.com/services/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
