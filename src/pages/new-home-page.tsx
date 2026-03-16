import { BlogsSection } from "@/components/app/sections/blog-section";
import { DestinationsSection } from "@/components/app/sections/destination-section";
import { GallerySection } from "@/components/app/sections/gallery-section";
import { HeroSection } from "@/components/app/sections/hero-section";
import { PromoSection } from "@/components/app/sections/promo-section";
import { SpecialOffersSection } from "@/components/app/sections/special-offer-section";
import { WhyChooseUsSection } from "@/components/app/sections/why-choose-us-section";
import { WhySection } from "@/components/app/sections/why-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <SpecialOffersSection />
      <GallerySection />
      <WhySection />
      <BlogsSection />
      <PromoSection />
      <WhyChooseUsSection />
    </>
  );
}
