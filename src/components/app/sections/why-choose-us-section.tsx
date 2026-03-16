import { CheckCircle2, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/mock-data";

const FEATURES = [
  "Expert Guides & Professional Services",
  "Handpicked Premium Destinations",
  "24/7 Dedicated Customer Support",
  "Flexible Booking & Cancellation Policy",
];

const STATS = [
  { value: "150+", label: "Destinations" },
  { value: "20K+", label: "Travelers"    },
  { value: "10+",  label: "Packagers"        },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div
        className="absolute right-0 top-0 w-1/3 h-full opacity-30 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#f97316 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">

          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-6 bg-orange-100 rounded-[3.5rem] transform -rotate-6 z-0" />
            <div className="relative z-10 rounded-[3rem] border-8 border-white ring-1 ring-gray-100 shadow-2xl overflow-hidden h-[600px]">
              <img
                src={IMAGES.whyUs}
                alt="Architecture"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <div
              className="absolute -bottom-8 -right-4 md:-right-12 bg-white p-6 rounded-3xl shadow-2xl z-20 flex flex-col gap-4 animate-bounce border border-gray-100"
              style={{ animationDuration: "4s" }}
            >
              <div className="flex items-center gap-5">
                <div className="flex -space-x-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-sm">
                      <img src={IMAGES.gallery[i]} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-orange-500 mb-1 gap-0.5">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-base font-black text-gray-900">4.9/5 Reviews</p>
                </div>
              </div>
              <p className="text-sm font-bold text-orange-600 text-center bg-orange-50 py-2 rounded-xl">
                20,000+ Happy Travelers
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-orange-500 font-extrabold tracking-widest uppercase text-medium mb-3">Best Services</p>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">Why Choose Us?</h2>
            <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed">
              We provide the best travel experiences tailored to your needs. With years of expertise, we ensure your journey is safe, comfortable, and absolutely memorable.
            </p>

            <div className="space-y-6 mb-12">
              {FEATURES.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 group hover:border-l-4 hover:border-orange-500 pl-0 hover:pl-4 transition-all duration-300 cursor-default"
                >
                  <div className="bg-orange-50 group-hover:bg-orange-500 p-2.5 rounded-xl transition-colors shadow-sm">
                    <CheckCircle2 className="text-orange-500 group-hover:text-white w-6 h-6 transition-colors" />
                  </div>
                  <span className="text-gray-800 font-bold text-lg group-hover:text-orange-600 transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-8 py-8 border-t border-b border-gray-100 mb-12">
              {STATS.map((stat, i) => (
                <>
                  {i > 0 && <div key={`div-${i}`} className="w-px h-12 bg-gray-200" />}
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                </>
              ))}
            </div>

            <Button className="bg-gray-900 hover:bg-orange-500 text-white px-10 py-7 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg font-bold group flex items-center gap-2">
              Read More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}