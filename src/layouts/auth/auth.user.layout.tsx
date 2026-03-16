import { Outlet } from "react-router-dom";
import { assets } from "@/assets/asset";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const slideContent = [
  {
    image: assets.authSlide1,
    title: "Discover New Destinations",
    description:
      "Explore amazing places around the world and find travel experiences crafted by expert trip organizers.",
  },
  {
    image: assets.authSlide2,
    title: "Plan Your Perfect Trip",
    description:
      "Browse curated travel packages, choose your destination, and plan your journey with ease.",
  },
  {
    image: assets.authSlide3,
    title: "Create Unforgettable Memories",
    description:
      "From mountain adventures to relaxing beach escapes — start your next journey with TravelLog.",
  },
];

export default function AuthUserLayout() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-svh flex flex-col">

      <div className="w-full flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />
          <span>User Secure Login</span>
        </div>

        {/* Right: Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 md:p-10 pt-0">

        <div className="w-full max-w-4xl rounded-xl border shadow-[-6px_6px_20px_rgba(0,0,0,0.15)] bg-card grid md:grid-cols-2 items-stretch overflow-hidden min-h-[560px]">

          {/* Left Section (Form) */}
          <div className="lg:p-8 flex items-center justify-center sm:p-0">
            <div className="w-full">
              <Outlet />
            </div>
          </div>

          {/* Right Section (Carousel) */}
          <div className="hidden md:flex flex-col">
            <Carousel
              plugins={[plugin.current]}
              opts={{ loop: true }}
              className="flex-1 [&>div]:h-full"
            >
              <CarouselContent className="h-full m-0 [&>*]:h-full">
                {slideContent.map((slide, index) => (
                  <CarouselItem
                    key={index}
                    className="p-0 h-full min-h-[560px] relative"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute bottom-6 left-4 right-4">
                      <div
                        className="rounded-xl px-5 py-4 text-white"
                        style={{
                          background: "rgba(255, 255, 255, 0.08)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255, 255, 255, 0.18)",
                          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <h2 className="text-lg font-semibold tracking-tight mb-1">
                          {slide.title}
                        </h2>
                        <p className="text-sm text-white/80 leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>

                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-center gap-1 text-xs text-muted-foreground">
          <span>By continuing, you agree to our</span>
          <div className="flex items-center gap-1">
            <span className="underline underline-offset-4 hover:text-foreground transition-colors">
              Terms of Service
            </span>
            <span>and</span>
            <span className="underline underline-offset-4 hover:text-foreground transition-colors">
              Privacy Policy
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}