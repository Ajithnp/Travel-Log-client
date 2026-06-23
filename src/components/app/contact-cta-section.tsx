import { Button } from "@/components/ui/button";

export function ContactCtaSection() {
  return (
    <section className="py-24 bg-orange-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10B981]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F59E0B]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready to Explore India?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Join thousands of travelers who have already discovered the magic of India with our verified travel partners.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-foreground hover:bg-[#059669] text-white border-none h-14 px-10 text-base font-semibold shadow-lg shadow-[#10B981]/20">
            Explore Packages
          </Button>
          <Button size="lg" variant="outline" className="bg-white hover:bg-slate-50 text-[#0F4C81] border-transparent h-14 px-10 text-base font-semibold shadow-lg shadow-black/5">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
