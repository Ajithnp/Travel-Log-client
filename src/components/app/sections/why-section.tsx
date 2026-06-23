import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mountain, Compass, Map, Bird, Camera, Leaf, Landmark, Users, Utensils, TreePine, Waves, Droplets, Building, MapPin, Heart, ShieldCheck, CalendarCheck } from "lucide-react";

type WhySection = {
  label: string;
  features: {
    icon: LucideIcon;
    number: string;
    title: string;
    desc: string;
  }[];
};

export const WHY_SLIDES: WhySection[] = [
  {
    label: "Adventure Experiences",
    features: [
      {
        icon: Mountain,
        number: "150+",
        title: "Hiking Trails",
        desc: "Discover scenic hiking routes across India's hills, forests, and waterfalls designed for beginners and experienced adventurers."
      },
      {
        icon: Compass,
        number: "80+",
        title: "Trekking Routes",
        desc: "Explore challenging trekking expeditions across the Himalayas and Western Ghats with experienced guides."
      },
      {
        icon: Map,
        number: "500+",
        title: "Unique Destinations",
        desc: "Choose from hundreds of curated adventure destinations across India's most breathtaking landscapes."
      }
    ]
  },

  {
    label: "Wildlife Safaris",
    features: [
      {
        icon: Bird,
        number: "300+",
        title: "Wild Species",
        desc: "Spot diverse bird and animal species across India's famous national parks and wildlife reserves."
      },
      {
        icon: Camera,
        number: "50+",
        title: "Safari Experiences",
        desc: "Join guided wildlife safaris designed for nature lovers and photography enthusiasts."
      },
      {
        icon: Leaf,
        number: "Eco",
        title: "Responsible Tourism",
        desc: "All safaris follow eco-friendly guidelines that protect wildlife habitats and local ecosystems."
      }
    ]
  },

  {
    label: "Cultural Journeys",
    features: [
      {
        icon: Landmark,
        number: "200+",
        title: "Heritage Sites",
        desc: "Visit historic forts, palaces, and UNESCO heritage destinations across India."
      },
      {
        icon: Users,
        number: "Local",
        title: "Authentic Culture",
        desc: "Experience local traditions, festivals, and everyday life in India's vibrant communities."
      },
      {
        icon: Utensils,
        number: "Regional",
        title: "Food Experiences",
        desc: "Explore regional cuisines and traditional food trails that showcase India's rich culinary heritage."
      }
    ]
  },
    {
    label: "Natural Escapes",
    features: [
      {
        icon: TreePine,
        number: "120+",
        title: "Forests & Valleys",
        desc: "Walk through lush forests, misty valleys, and green hill landscapes across India."
      },
      {
        icon: Waves,
        number: "60+",
        title: "Beaches & Coastlines",
        desc: "Relax at serene beaches and coastal destinations along India's beautiful shorelines."
      },
      {
        icon: Droplets,
        number: "90+",
        title: "Waterfalls",
        desc: "Discover hidden waterfalls and natural swimming spots surrounded by pristine nature."
      }
    ]
  },

  {
    label: "Spiritual Journeys",
    features: [
      {
        icon: Building,
        number: "150+",
        title: "Sacred Temples",
        desc: "Visit iconic temples and spiritual landmarks that attract pilgrims from across the world."
      },
      {
        icon: MapPin,
        number: "Famous",
        title: "Pilgrimage Routes",
        desc: "Explore well-known pilgrimage routes including Char Dham and Jyotirlinga temples."
      },
      {
        icon: Heart,
        number: "Peace",
        title: "Wellness Retreats",
        desc: "Experience yoga, meditation, and peaceful retreats in India's most serene destinations."
      }
    ]
  },

  {
    label: "Trusted Travel Platform",
    features: [
      {
        icon: ShieldCheck,
        number: "Verified",
        title: "Verified Vendors",
        desc: "All travel vendors go through a strict verification process to ensure reliable and safe experiences."
      },
      {
        icon: Star,
        number: "Top Rated",
        title: "Customer Reviews",
        desc: "Real traveler reviews help you choose the best trips and trusted travel providers."
      },
      {
        icon: CalendarCheck,
        number: "Flexible",
        title: "Easy Booking",
        desc: "Simple booking, flexible schedules, and transparent pricing make trip planning effortless."
      }
    ]
  }
];
 
export function WhySection() {
  const [index, setIndex] = useState(0);
 
  const prev = () => setIndex((p) => (p - 1 + WHY_SLIDES.length) % WHY_SLIDES.length);
  const next = () => setIndex((p) => (p + 1) % WHY_SLIDES.length);
 
  return (
    <section className="py-24 bg-amber-50/30 relative overflow-hidden border-t-4 border-orange-500">
      <div className="absolute -left-20 top-20 w-64 h-64 bg-orange-100/50 rounded-full blur-[80px]" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-50 rounded-full blur-[100px]" />
 
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header with tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-6">
          <div className="text-center md:text-left">
            <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-3">Our Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">{WHY_SLIDES[index].label}</h2>
          </div>
 
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {WHY_SLIDES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                    i === index
                      ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200"
                      : "bg-white text-gray-500 border-gray-200 hover:border-orange-400 hover:text-orange-500"
                  }`}
                >
                  {s.label.replace("Why ", "")}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="w-10 h-10 rounded-full border-gray-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white bg-white transition-all shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="w-10 h-10 rounded-full border-gray-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white bg-white transition-all shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
 
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12 relative transition-all duration-500">
          <div className="absolute top-[33%] left-10 right-10 h-px bg-orange-100 md:hidden" />
          <div className="absolute top-[66%] left-10 right-10 h-px bg-orange-100 md:hidden" />
 
          {WHY_SLIDES[index].features.map((feature, i) => (
            <div
              key={`${index}-${i}`}
              className={`flex flex-col items-center text-center group py-10 md:py-0 ${
                i !== 2 ? "md:border-r border-orange-100" : ""
              }`}
            >
              <div className="w-28 h-28 bg-white rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-orange-500 group-hover:ring-4 group-hover:ring-orange-300 group-hover:ring-offset-4 transition-all duration-500 shadow-lg shadow-orange-100 rotate-3 group-hover:rotate-0">
                <feature.icon className="h-12 w-12 text-orange-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-2 font-mono tracking-tighter group-hover:text-orange-500 transition-colors">
                {feature.number}
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-4 uppercase tracking-widest">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed px-4">{feature.desc}</p>
            </div>
          ))}
        </div>
 
        <div className="flex justify-center gap-2 mt-14">
          {WHY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "w-8 h-3 bg-orange-500" : "w-3 h-3 bg-gray-300 hover:bg-orange-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}