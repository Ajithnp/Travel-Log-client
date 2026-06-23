import { Globe, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ContactFaqStats() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
         
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-foreground/70">Find quick answers to common questions about our platform.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-slate-200 rounded-lg px-4 data-[state=open]:bg-slate-50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-[#1E293B] hover:text-[#0F4C81] hover:no-underline py-4">
                  How can I contact support?
                </AccordionTrigger>
                <AccordionContent className="text-[#1E293B]/70 leading-relaxed">
                  You can contact our support team using the form on this page, or email us directly at hello@travellog.in. Our team is available 24/7 to assist you with any queries.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-slate-200 rounded-lg px-4 data-[state=open]:bg-slate-50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-[#1E293B] hover:text-[#0F4C81] hover:no-underline py-4">
                  How do I become a vendor?
                </AccordionTrigger>
                <AccordionContent className="text-[#1E293B]/70 leading-relaxed">
                  Click the "Become a Travel Partner" button to start the registration process. We'll verify your business details and help you set up your first listings within 48 hours.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-slate-200 rounded-lg px-4 data-[state=open]:bg-slate-50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-[#1E293B] hover:text-[#0F4C81] hover:no-underline py-4">
                  How long does it take to receive a response?
                </AccordionTrigger>
                <AccordionContent className="text-[#1E293B]/70 leading-relaxed">
                  We aim to respond to all general inquiries within 24 hours. For urgent booking issues, our dedicated support hotline provides immediate assistance.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-slate-200 rounded-lg px-4 data-[state=open]:bg-slate-50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-[#1E293B] hover:text-[#0F4C81] hover:no-underline py-4">
                  Can I modify or cancel my booking?
                </AccordionTrigger>
                <AccordionContent className="text-[#1E293B]/70 leading-relaxed">
                  Yes, most bookings can be modified or canceled through your account dashboard. Cancellation policies vary by vendor, so please check the specific terms of your package.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border border-slate-200 rounded-lg px-4 data-[state=open]:bg-slate-50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-[#1E293B] hover:text-[#0F4C81] hover:no-underline py-4">
                  Are all vendors verified?
                </AccordionTrigger>
                <AccordionContent className="text-[#1E293B]/70 leading-relaxed">
                  Absolutely. Every tour operator and travel agency on TravelLog undergoes a rigorous verification process to ensure quality, safety, and reliability for our travelers.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border border-slate-200 rounded-lg px-4 data-[state=open]:bg-slate-50 transition-colors">
                <AccordionTrigger className="text-left font-semibold text-[#1E293B] hover:text-[#0F4C81] hover:no-underline py-4">
                  What destinations are available?
                </AccordionTrigger>
                <AccordionContent className="text-[#1E293B]/70 leading-relaxed">
                  We cover over 100 destinations across India, from the Himalayan north to the coastal south, offering everything from luxury retreats to adventurous treks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>


          <div className="w-full lg:w-1/2">
            <div className="bg-[#F8FAFC] rounded-3xl p-8 lg:p-10 border border-slate-200 h-full flex flex-col">
              <div className="mb-10">
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">The TravelLog Network</h3>
                <p className="text-foreground/70">Connecting India through trusted travel experiences.</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                  <span className="text-4xl font-bold text-[#F59E0B] mb-2 font-playfair">50k+</span>
                  <span className="text-sm font-medium text-[#1E293B]/80 uppercase tracking-wide">Travelers</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                  <span className="text-4xl font-bold text-[#10B981] mb-2 font-playfair">500+</span>
                  <span className="text-sm font-medium text-[#1E293B]/80 uppercase tracking-wide">Verified Vendors</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                  <span className="text-4xl font-bold text-[#0F4C81] mb-2 font-playfair">2k+</span>
                  <span className="text-sm font-medium text-[#1E293B]/80 uppercase tracking-wide">Packages</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                  <span className="text-4xl font-bold text-[#1E293B] mb-2 font-playfair">100+</span>
                  <span className="text-sm font-medium text-[#1E293B]/80 uppercase tracking-wide">Destinations</span>
                </div>
              </div>

              <div className="mt-auto relative rounded-2xl bg-gradient-to-br from-[#0F4C81]/5 to-[#10B981]/5 p-8 border border-slate-200 overflow-hidden flex items-center justify-center min-h-[200px]">
                <div className="absolute inset-0 bg-pattern opacity-50"></div>
                
 
                <div className="relative z-10 w-full flex justify-center items-center h-full">
                  <div className="relative w-full max-w-[200px] aspect-square animate-float">
                    <div className="absolute top-[10%] left-[40%] w-3 h-3 bg-[#F59E0B] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"></div>
                    <div className="absolute top-[30%] left-[20%] w-4 h-4 bg-[#10B981] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                    <div className="absolute top-[40%] left-[70%] w-3 h-3 bg-[#0F4C81] rounded-full shadow-[0_0_15px_rgba(15,76,129,0.8)]"></div>
                    <div className="absolute top-[60%] left-[30%] w-5 h-5 bg-[#F59E0B] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.8)] flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute top-[80%] left-[50%] w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                    
                 
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <path d="M42,12 L22,32 L32,62 L52,82" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#0F4C81]/20 stroke-dasharray-[4,4]"></path>
                      <path d="M42,12 L72,42 L32,62" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#0F4C81]/20 stroke-dasharray-[4,4]"></path>
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Globe className="w-32 h-32 text-[#0F4C81]" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-[#0F4C81] shadow-sm border border-white/50">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> PAN India Coverage
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
