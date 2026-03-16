import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/mock-data";

export function PromoSection() {
  return (
    <section className="py-24 bg-[#1a0f00]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-[#2a1a08] rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row items-center border border-orange-900/30">
          {/* Hatching pattern */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)" }}
          />
          {/* Glow blob */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500 rounded-full blur-[120px] opacity-30 z-0 pointer-events-none" />

          {/* Text side */}
          <div className="p-10 md:p-20 flex-1 z-10 relative">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-5 py-2 text-sm font-bold mb-8 shadow-sm">
              <Star className="w-4 h-4 fill-current" /> Premium Experience
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight max-w-2xl drop-shadow-lg">
              Wonderful House experiences in there!
            </h2>
            <p className="text-gray-300 mb-12 max-w-lg text-lg md:text-xl leading-relaxed">
              Book our premium cabin retreats nestled in the mountains for an unforgettable weekend escape. Reconnect with nature in absolute luxury.
            </p>
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-[0_0_30px_rgba(249,115,22,0.4)] px-10 py-7 rounded-full text-lg font-bold group flex items-center gap-3 transition-all hover:scale-105"
            >
              Read More
              <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
          </div>

          {/* Image side */}
          <div
            className="w-full md:w-[45%] h-72 md:h-full min-h-[600px] relative hidden md:block"
            style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2a1a08] via-[#2a1a08]/50 to-transparent z-10 w-1/3" />
            <img
              src={IMAGES.promo}
              alt="Cabin in the woods"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}