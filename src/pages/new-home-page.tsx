import { PopularPackagesSection } from "@/components/app/sections/popular-packages-section";
import WhyShortTripsWin from "@/components/app/sections/gallery-section";
import { HeroSection } from "@/components/app/sections/hero-section";
import BookingInFourMoves from "@/components/app/sections/promo-section";
import { PackageRecommendedSection } from "@/components/app/sections/package-recommended-section";
import { WhyChooseUsSection } from "@/components/app/sections/why-choose-us-section";
import { WhySection } from "@/components/app/sections/why-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularPackagesSection />
      <WhyShortTripsWin />
      <PackageRecommendedSection />
      <WhySection />
      <BookingInFourMoves />
      <WhyChooseUsSection />
    </>
  );
}
