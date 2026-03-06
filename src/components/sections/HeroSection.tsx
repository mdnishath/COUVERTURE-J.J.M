"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Clock, Award, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import type { SiteConfig, FormConfig, SectionStyle } from "@/lib/wordpress";
import { images } from "@/data/images";

interface HeroSectionProps {
  siteConfig: SiteConfig;
  content?: Record<string, string | string[]>;
  formConfig?: FormConfig | null;
  sectionStyle?: SectionStyle;
}

const badgeIcons = [Shield, Clock, Award];

export default function HeroSection({ siteConfig, content, formConfig, sectionStyle }: HeroSectionProps) {
  const badgeTexts = (content?.badges as string[]) ?? ["Garantie Décennale", "Intervention 24h", "15+ Ans d'Expérience"];
  const heroImage = (content?.image as string) || siteConfig.heroImage || images.hero;

  // Build scoped button styles if overrides exist
  const buttonStyleRules: string[] = [];
  if (sectionStyle?.buttonBg) {
    buttonStyleRules.push(`background-color: ${sectionStyle.buttonBg} !important`);
  }
  if (sectionStyle?.buttonColor) {
    buttonStyleRules.push(`color: ${sectionStyle.buttonColor} !important`);
  }
  if (sectionStyle?.buttonRadius) {
    buttonStyleRules.push(`border-radius: ${sectionStyle.buttonRadius} !important`);
  }
  const buttonScopedCSS = buttonStyleRules.length > 0
    ? `.hero-buttons a, .hero-buttons button { ${buttonStyleRules.join("; ")}; }`
    : "";

  // Quick quote form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    honeypot: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleQuoteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    // Honeypot check — bots fill hidden fields, humans don't
    if (formData.honeypot) {
      // Silently fake success without sending
      setTimeout(() => setFormStatus("success"), 500);
      return;
    }

    try {
      const { honeypot: _, ...submitData } = formData;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submitData, formType: "hero_quote" }),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "", honeypot: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Couvreur professionnel intervenant sur une toiture à Fréjus dans le Var"
          fill
          className="object-cover"
          priority
        />
        {/* Brand matching gradient overlay with dark base and subtle primary tint */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 lg:py-24 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="lg:w-[60%] w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-heading font-medium mb-6 tracking-wide shadow-xl">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                {(content?.badge as string) ?? "Expert Couvreur dans le Var (83)"}
              </span>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className={`s-title text-4xl sm:text-5xl lg:text-5xl font-heading font-black leading-[1.05] mb-3 uppercase tracking-tight ${sectionStyle?.titleColor ? "" : "text-white"} drop-shadow-md`}
                style={{
                  fontSize: "var(--s-title-size, clamp(2.125rem, 3vw + 1rem, 3.25rem))",
                  textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                  ...(sectionStyle?.titleColor && { color: sectionStyle.titleColor }),
                  ...(sectionStyle?.titleWeight && { fontWeight: sectionStyle.titleWeight }),
                }}
              >
                {(content?.title as string) ?? "COUVERTURE J.J.M"}
              </h1>
              <div className="mb-6">
                <h2
                  className={`s-subtitle inline-block text-2xl sm:text-2xl lg:text-3xl font-heading font-black uppercase tracking-[0.2em] px-4 py-2 bg-primary ${sectionStyle?.subtitleColor ? "" : "text-white"} shadow-lg rounded-sm drop-shadow-sm`}
                  style={{
                    fontSize: "var(--s-subtitle-size, clamp(1.25rem, 1.5vw + 0.8rem, 1.75rem))",
                    textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                    ...(sectionStyle?.subtitleColor && { color: sectionStyle.subtitleColor }),
                  }}
                >
                  {(content?.subtitle as string) ?? "Charpente & Toiture"}
                </h2>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl sm:text-2xl font-heading font-semibold text-white mb-4"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
            >
              {(() => {
                const heading = (content?.heading as string) ?? "Votre Toiture Entre de Bonnes Mains";
                const words = heading.split(" ");
                const prefix = words.slice(0, -2).join(" ");
                return prefix;
              })()}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--color-accent)] font-bold drop-shadow-sm">
                  {(() => {
                    const heading = (content?.heading as string) ?? "Votre Toiture Entre de Bonnes Mains";
                    return heading.split(" ").slice(-2).join(" ");
                  })()}
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-2 bg-[var(--color-accent)]/40 origin-left"
                />
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`s-description text-base sm:text-lg ${sectionStyle?.descriptionColor ? "" : "text-gray-200"} leading-relaxed mb-8 max-w-xl`}
              style={{
                fontSize: "var(--s-desc-size, clamp(0.9375rem, 0.5vw + 0.8rem, 1.125rem))",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                ...(sectionStyle?.descriptionColor && { color: sectionStyle.descriptionColor }),
              }}
            >
              {(content?.description as string) ?? "Couverture, charpente et toiture à Fréjus et dans tout le Var. Travail soigné, matériaux de qualité et devis gratuit sous 24h."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col sm:flex-row gap-4 mb-10 hero-buttons"
            >
              {buttonScopedCSS && (
                <style dangerouslySetInnerHTML={{ __html: buttonScopedCSS }} />
              )}
              <Button
                href="/devis"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
              >
                Devis Gratuit
              </Button>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-300 px-8 py-4 text-lg border-2 border-white/40 text-white hover:bg-white hover:text-secondary"
              >
                <Phone size={20} />
                {siteConfig.phone}
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap gap-4"
            >
              {badgeTexts.map((text, i) => {
                const Icon = badgeIcons[i % badgeIcons.length];
                return (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-white/90 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg hover:bg-black/50 hover:border-white/20 transition-all cursor-default"
                  >
                    <Icon size={18} className="text-[var(--color-accent)]" />
                    <span className="text-sm font-semibold tracking-wide" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                      {text}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Side — Quick Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden lg:block lg:w-[40%] w-full"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative max-w-[420px] lg:ml-auto">
              {/* Red accent bar */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-primary rounded-b-full" />

              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-dark mb-2">
                    Demande Envoyée !
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Merci ! Nous vous recontacterons dans les 24 heures.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="text-primary font-heading font-semibold text-sm hover:underline"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-heading font-bold text-dark mb-2">
                    {(() => {
                      const formTitle = (content?.form_title as string) ?? "Devis Gratuit";
                      const titleWords = formTitle.split(" ");
                      if (titleWords.length >= 2) {
                        return <>{titleWords.slice(0, -1).join(" ")} <span className="text-primary">{titleWords[titleWords.length - 1]}</span></>;
                      }
                      return <span className="text-primary">{formTitle}</span>;
                    })()}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {(content?.form_subtitle as string) ?? "Réponse sous 24h — Sans engagement"}
                  </p>

                  <form onSubmit={handleQuoteSubmit} className="space-y-4 relative">
                    {formStatus === "error" && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle size={16} className="text-red-500 shrink-0" />
                        <p className="text-xs text-red-600">
                          Une erreur est survenue. Veuillez réessayer.
                        </p>
                      </div>
                    )}

                    {/* Honeypot field — hidden from humans, caught by bots */}
                    <div className="absolute left-[-9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="website-hero">Website</label>
                      <input
                        type="text"
                        id="website-hero"
                        name="website"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={formConfig?.fields?.find(f => f.name === "name")?.placeholder ?? "Votre nom complet"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={formConfig?.fields?.find(f => f.name === "email")?.placeholder ?? "Votre email"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={formConfig?.fields?.find(f => f.name === "phone")?.placeholder ?? "Votre téléphone"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${formData.service ? "text-secondary" : "text-gray-400"}`}
                      >
                        <option value="" disabled>
                          {formConfig?.fields?.find(f => f.name === "service")?.placeholder ?? "Type de prestation"}
                        </option>
                        {(formConfig?.service_options ?? ["Zinguerie", "Rénovation de Toiture", "Réparation de Fuite en Urgence", "Charpente & Toiture", "Rénovation de Rives", "Réparation de Gouttières", "Autre"]).map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={formConfig?.fields?.find(f => f.name === "message")?.placeholder ?? "Décrivez votre projet..."}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-secondary placeholder:text-gray-400 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={formStatus === "loading"}
                    >
                      {formStatus === "loading" ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        formConfig?.submit_text ?? (content?.form_button_text as string) ?? "Envoyer ma Demande"
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    {formConfig?.privacy_text ?? "Vos données sont protégées et ne seront jamais partagées."}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
