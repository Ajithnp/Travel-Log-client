import { ContactHero } from "@/components/app/contact-hero";
import { ContactInfoCards } from "@/components/app/contact-info-cards";
import { ContactFormSection } from "@/components/app/contact-form-section";
import { ContactVendorSection } from "@/components/app/contact-vendor-section";
import { ContactFaqStats } from "@/components/app/contact-faq-stats";
import { ContactCtaSection } from "@/components/app/contact-cta-section";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-inter text-[#1E293B] overflow-x-hidden">
      <ContactHero />
      <ContactInfoCards />
      <ContactFormSection />
      <ContactVendorSection />
      <ContactFaqStats />
      <ContactCtaSection />
    </div>
  );
}