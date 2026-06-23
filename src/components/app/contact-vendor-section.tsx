import { Users, Globe, ShieldCheck, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ContactVendorSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-orange-500"></div>
      <div className="absolute inset-0 bg-[url('/__mockup/images/travellog-vendor.png')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500/80 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl text-white">
          <Badge className="bg-white text-orange-500 hover:bg-white hover:text-orange-500 mb-6 font-medium tracking-wider px-4 py-1.5 uppercase border-none">
            Grow Your Business
          </Badge>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Join India's Premier Travel Marketplace
          </h2>
          <p className="text-lg text-white mb-10 leading-relaxed">
            Connect with thousands of travelers looking for authentic Indian experiences. We provide the platform, tools, and support you need to scale your travel business.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="font-medium text-white/90">Reach More Travelers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="font-medium text-white/90">Easy Package Management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="font-medium text-white/90">Secure Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="font-medium text-white/90">Dedicated Partner Support</span>
            </div>
          </div>
          
          <Button size="lg" className="bg-white text-orange-500 border-none h-14 px-8 text-base font-semibold shadow-lg shadow-orange-500/20">
            Become a Vendor Today
          </Button>
        </div>
      </div>
    </section>
  );
}
