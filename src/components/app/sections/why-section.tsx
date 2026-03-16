import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHY_SLIDES } from "@/mock-data";
 
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