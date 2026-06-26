import { CheckCircle2} from "lucide-react";
import { assets } from "@/assets/asset";



const FEATURES = [
  "Expert Guides & Professional Services",
  "Handpicked Premium Destinations",
  "24/7 Dedicated Customer Support",
  "Flexible Booking & Cancellation Policy",
];

const STATS = [
  { value: "150+", label: "Destinations" },
  { value: "20K+", label: "Travelers" },
  { value: "10+", label: "Packagers" },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-28 bg-orange-50/30 relative overflow-hidden">
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
                src={assets.whyChooseUsBanner}
                alt="Architecture"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
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
{/* 
            <Button className="bg-gray-900 hover:bg-orange-500 text-white px-10 py-7 rounded-full shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg font-bold group flex items-center gap-2">
              Read More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}