import { Badge } from "@/components/ui/badge";
import {assets} from "@/assets/asset"

export function ContactHero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/80 to-transparent z-10 mix-blend-multiply"></div>
        <img 
          src={assets.contactHeroBanner} 
          alt="Beautiful Indian Landscape" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl pt-20">
        <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-white/40 mb-6 font-medium tracking-wider px-4 py-1.5 uppercase">
          TravelLog Support
        </Badge>
        <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
          Let's Plan Your Next Journey Together
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed animate-fade-in-up stagger-1 max-w-2xl mx-auto">
          Whether you're a traveler seeking unforgettable experiences or a partner looking to showcase the beauty of India, our team is here for you.
        </p>

      </div>
    </section>
  );
}
