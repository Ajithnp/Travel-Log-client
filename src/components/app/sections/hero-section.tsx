import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, ArrowDown, ArrowRight,
  MapPin, Calendar, Search,
  CalendarCheck,
  Backpack,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { HERO_SLIDES } from "@/mock-data";

export function HeroSection() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetHeroTimer = useCallback(() => {
    if (heroTimer.current) clearInterval(heroTimer.current);
    heroTimer.current = setInterval(() => {
      setHeroIndex((p) => (p + 1) % HERO_SLIDES.length);
    }, 5000);
  }, []);

  useEffect(() => {
    resetHeroTimer();
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, [resetHeroTimer]);

  const goHero = (dir: 1 | -1) => {
    setHeroIndex((p) => (p + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    resetHeroTimer();
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-32 overflow-hidden"
    >
      {/* Slides */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === heroIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/30 z-10" />
            <img src={slide.img} alt={slide.heading} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <button
        onClick={() => goHero(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/15 hover:bg-orange-500 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => goHero(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/15 hover:bg-orange-500 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        <div
          className="bg-white text-orange-500 rounded-full px-5 py-2 text-sm font-bold mb-8 flex items-center gap-2 shadow-lg shadow-black/20 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <span>✈</span> Trusted by 20,000+ travelers
        </div>

        <h1
          key={heroIndex}
          className="text-6xl md:text-8xl font-extrabold text-white max-w-5xl leading-tight mb-8 tracking-tight drop-shadow-2xl transition-all duration-700"
        >
          {HERO_SLIDES[heroIndex].heading}
        </h1>

        <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-12 drop-shadow-md font-medium leading-relaxed transition-all duration-700">
          {HERO_SLIDES[heroIndex].sub}
        </p>

        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-7 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 group flex items-center gap-2"
        >
          Book Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-48 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setHeroIndex(i); resetHeroTimer(); }}
            className={`rounded-full transition-all duration-300 ${i === heroIndex ? "w-8 h-3 bg-orange-500" : "w-3 h-3 bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
      {/* Search bar */}
      <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-full max-w-5xl px-6 z-30">
        <Card className="bg-white rounded-3xl shadow-2xl border-0 overflow-visible">
          <CardContent className="p-3 flex flex-col md:flex-row items-center">

            <div className="flex-1 flex items-center w-full px-6 py-4 md:border-r border-gray-200 hover:bg-gray-50/50 transition-colors rounded-2xl md:rounded-r-none">
              <CalendarCheck className="text-orange-500 h-6 w-6 mr-7 shrink-0" />
              <p className="text-medium font-bold uppercase tracking-wider">Book</p>
            </div>

            <div className="flex-1 flex items-center w-full px-6 py-4 md:border-r border-gray-200 hover:bg-gray-50/50 transition-colors">
              <Backpack className="text-orange-500 h-6 w-6 mr-7 shrink-0" />
              <p className="text-medium font-bold uppercase tracking-wider">Pack</p>
            </div>

            <div className="flex-1 flex items-center w-full px-6 py-4 hover:bg-gray-50/50 transition-colors rounded-2xl md:rounded-l-none">
              <Navigation className="text-orange-500 h-6 w-6 mr-7 shrink-0" />
              <p className="text-medium font-bold uppercase tracking-wider">Explore</p>
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
}