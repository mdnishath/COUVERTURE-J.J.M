// ============================================
// WordPress REST API Client for COUVERTURE J.J.M
// Fetches all data from WordPress headless backend
// ============================================

// ─── Type Definitions ───

export interface SiteConfig {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
  };
  coordinates: { lat: number; lng: number };
  socialLinks: { facebook: string; instagram: string; google: string };
  businessHours: { weekdays: string; saturday: string; sunday: string };
  heroImage: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface ResponsiveValue {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface SectionStyle {
  bgColor?: string;
  bgImage?: string;
  bgOverlayColor?: string;
  bgOverlayOpacity?: number;
  paddingTop?: ResponsiveValue;
  paddingBottom?: ResponsiveValue;
  maxWidth?: string;
  textAlign?: string;
  customClass?: string;
  titleColor?: string;
  titleSize?: ResponsiveValue;
  titleWeight?: string;
  subtitleColor?: string;
  subtitleSize?: ResponsiveValue;
  subtitleWeight?: string;
  descriptionColor?: string;
  descriptionSize?: ResponsiveValue;
  descriptionWeight?: string;
  cardBg?: string;
  cardRadius?: string;
  cardShadow?: string;
  buttonBg?: string;
  buttonColor?: string;
  buttonRadius?: string;
}

export interface PageSection {
  type: string;
  enabled: boolean;
  order: number;
  content: Record<string, string | string[]>;
  style?: SectionStyle;
}

export interface AppearanceHeader {
  sticky: boolean;
  logoHeight: number;
  bg: string;
  bgScrolled: string;
  navColor: string;
  navActive: string;
  navHover: string;
  ctaText: string;
  ctaLink: string;
  topBar: {
    show: boolean;
    bg: string;
    text: string;
  };
}

export interface AppearanceFooter {
  logo: string;
  logoHeight: number;
  bg: string;
  textColor: string;
  headingColor: string;
  linkColor: string;
  linkHover: string;
  description: string;
  copyright: string;
  showSocial: boolean;
  showServices: boolean;
  showLinks: boolean;
  showContact: boolean;
  bottomBar: {
    bg: string;
    text: string;
  };
}

export interface Appearance {
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    accent: string;
    accentDark: string;
    dark: string;
    secondary: string;
  };
  header: AppearanceHeader;
  footer: AppearanceFooter;
}

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
}

export interface FormConfig {
  fields: FormField[];
  service_options?: string[];
  urgency_options?: string[];
  submit_text: string;
  loading_text?: string;
  success_title?: string;
  success_text?: string;
  success_button?: string;
  error_text?: string;
  privacy_text?: string;
}

// ─── Fallback Static Data ───
// Used when WordPress is unreachable (development, first-time setup)

import {
  siteConfig as staticSiteConfig,
  services as staticServices,
  testimonials as staticTestimonials,
  projects as staticProjects,
  stats as staticStats,
  zones as staticZones,
  navigation as staticNavigation,
} from "@/data/siteData";

import { images as staticImages } from "@/data/images";

// ─── API Base URL ───

const API_URL =
  process.env.WORDPRESS_API_URL ||
  "http://couverture-jjm.local/wp-json/jjm/v1";

// ─── Base Fetch with Error Handling ───

async function fetchAPI<T>(
  endpoint: string
): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`WordPress API error: ${res.status} on ${endpoint}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`WordPress API unreachable for ${endpoint}:`, error);
    return null;
  }
}

// ─── Public API Functions ───
// Each function falls back to static data if WordPress is unavailable.

export async function getSiteConfig(): Promise<SiteConfig> {
  const data = await fetchAPI<SiteConfig>("/site-config");
  if (data && data.businessName) return data;

  // Fallback to static data
  return {
    ...staticSiteConfig,
    heroImage: staticImages.hero,
  } as SiteConfig;
}

export async function getServices(): Promise<Service[]> {
  const data = await fetchAPI<Service[]>("/services");
  if (data && data.length > 0) return data;

  // Fallback: merge static services with images
  return staticServices.map((s) => ({
    ...s,
    image: staticImages.services[s.slug] || s.image,
  }));
}

export async function getServiceBySlug(
  slug: string
): Promise<Service | null> {
  const data = await fetchAPI<Service>(`/services/${slug}`);
  if (data && data.slug) return data;

  // Fallback
  const service = staticServices.find((s) => s.slug === slug);
  if (!service) return null;
  return {
    ...service,
    image: staticImages.services[service.slug] || service.image,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchAPI<Testimonial[]>("/testimonials");
  if (data && data.length > 0) return data;
  return staticTestimonials;
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchAPI<Project[]>("/projects");
  if (data && data.length > 0) return data;

  // Fallback: merge static projects with images
  return staticProjects.map((p, i) => ({
    ...p,
    beforeImage: staticImages.projects.before[i] || p.beforeImage,
    afterImage: staticImages.projects.after[i] || p.afterImage,
  }));
}

export async function getStats(): Promise<Stat[]> {
  const data = await fetchAPI<Stat[]>("/stats");
  if (data && data.length > 0) return data;
  return staticStats;
}

export async function getZones(): Promise<string[]> {
  const data = await fetchAPI<string[]>("/zones");
  if (data && data.length > 0) return data;
  return staticZones;
}

export async function getNavigation(): Promise<NavItem[]> {
  const data = await fetchAPI<NavItem[]>("/navigation");
  if (data && data.length > 0) return data;
  return staticNavigation;
}

export async function getPageSections(slug: string): Promise<PageSection[]> {
  const data = await fetchAPI<PageSection[]>(`/pages/${slug}`);
  if (data && Array.isArray(data)) return data;
  return [];
}

export async function getFormConfig(name: string): Promise<FormConfig | null> {
  const data = await fetchAPI<FormConfig>(`/forms/${name}`);
  if (data && data.fields) return data;
  return null;
}

export async function getAppearance(): Promise<Appearance> {
  const data = await fetchAPI<Appearance>("/appearance");
  if (data && data.colors) return data;

  // Fallback defaults
  return {
    logo: "",
    favicon: "",
    colors: {
      primary: "#C41E1E",
      primaryDark: "#A01818",
      primaryLight: "#E84545",
      accent: "#D4A853",
      accentDark: "#B8922E",
      dark: "#1A1A1A",
      secondary: "#2D2D2D",
    },
    header: {
      sticky: true,
      logoHeight: 50,
      bg: "#FFFFFF",
      bgScrolled: "",
      navColor: "#374151",
      navActive: "",
      navHover: "",
      ctaText: "Devis Gratuit",
      ctaLink: "/devis",
      topBar: { show: true, bg: "", text: "#FFFFFF" },
    },
    footer: {
      logo: "",
      logoHeight: 40,
      bg: "",
      textColor: "#9CA3AF",
      headingColor: "#FFFFFF",
      linkColor: "#9CA3AF",
      linkHover: "",
      description: "Expert en couverture, charpente et toiture dans le Var. Qualité, fiabilité et savoir-faire au service de votre habitation.",
      copyright: `© ${new Date().getFullYear()} COUVERTURE J.J.M. Tous droits réservés.`,
      showSocial: true,
      showServices: true,
      showLinks: true,
      showContact: true,
      bottomBar: { bg: "", text: "" },
    },
  };
}
