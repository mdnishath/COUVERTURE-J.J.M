"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Hammer,
  Droplets,
  Thermometer,
  Shield,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Service, SectionStyle } from "@/lib/wordpress";

interface ServicesGridProps {
  services: Service[];
  content?: Record<string, string | string[]>;
  sectionStyle?: SectionStyle;
}

const iconMap: Record<string, React.ElementType> = {
  roof: Home,
  frame: Hammer,
  droplets: Droplets,
  thermometer: Thermometer,
  shield: Shield,
  sparkles: Sparkles,
  zap: Zap,
};

export default function ServicesGrid({ services, content, sectionStyle }: ServicesGridProps) {
  const shadowClass = sectionStyle?.cardShadow
    ? sectionStyle.cardShadow === 'none' ? 'shadow-none'
      : sectionStyle.cardShadow === 'sm' ? 'shadow-sm'
      : sectionStyle.cardShadow === 'lg' ? 'shadow-lg'
      : sectionStyle.cardShadow === 'xl' ? 'shadow-xl'
      : 'shadow-md'
    : 'shadow-card';

  const hoverShadowClass = sectionStyle?.cardShadow ? '' : 'hover:shadow-card-hover';

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          subtitle={(content?.subtitle as string) || "Nos Services"}
          title={(content?.title as string) || "Des Solutions Compl\u00e8tes pour Votre Toiture"}
          description={(content?.description as string) || "Du diagnostic \u00e0 la r\u00e9alisation, nous prenons en charge tous vos travaux de couverture avec expertise et professionnalisme."}
          titleColor={sectionStyle?.titleColor}
          titleWeight={sectionStyle?.titleWeight}
          subtitleColor={sectionStyle?.subtitleColor}
          descriptionColor={sectionStyle?.descriptionColor}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Home;
            const serviceImage = service.image || "/images/placeholder-service.jpg";
            return (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block"
                >
                  <div
                    className={`${sectionStyle?.cardBg ? '' : 'bg-white'} ${sectionStyle?.cardRadius ? '' : 'rounded-2xl'} h-full ${shadowClass} ${hoverShadowClass} transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
                    style={{
                      ...(sectionStyle?.cardBg ? { backgroundColor: sectionStyle.cardBg } : {}),
                      ...(sectionStyle?.cardRadius ? { borderRadius: sectionStyle.cardRadius } : {}),
                    }}
                  >
                    {/* Red accent on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={serviceImage}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {/* Icon floating */}
                      <div className="absolute bottom-4 left-6 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors duration-300">
                        <Icon
                          size={24}
                          className="text-primary group-hover:text-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-5">
                      <h3 className="text-xl font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed mb-5 text-[15px]">
                        {service.shortDescription}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Link */}
                      <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
                        <span>{(content?.link_text as string) || "En savoir plus"}</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
