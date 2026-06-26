import { DestinationsSection } from "@/components/app/sections/destination-section";
import WhyShortTripsWin from "@/components/app/sections/gallery-section";
import { HeroSection } from "@/components/app/sections/hero-section";
import BookingInFourMoves from "@/components/app/sections/promo-section";
import { SpecialOffersSection } from "@/components/app/sections/special-offer-section";
import { WhyChooseUsSection } from "@/components/app/sections/why-choose-us-section";
import { WhySection } from "@/components/app/sections/why-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <WhyShortTripsWin />
      <SpecialOffersSection />
      <WhySection />
      <BookingInFourMoves />
      <WhyChooseUsSection />
    </>
  );
}
