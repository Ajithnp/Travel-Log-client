import { HeadphonesIcon, Building2, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactInfoCards() {
  return (
    <section className="relative z-30 -mt-24 container mx-auto px-6 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up stagger-1">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F4C81]/10 flex items-center justify-center mb-4">
              <HeadphonesIcon className="w-6 h-6 text-[#0F4C81]" />
            </div>
            <CardTitle className="font-playfair text-2xl text-primary">Customer Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#1E293B]/70 mb-4 leading-relaxed">
              Need help with a booking, payment issue, or managing your account? Our dedicated support team is available 24/7.
            </p>
            <ul className="space-y-2 text-sm text-[#1E293B]/80 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Booking assistance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Payment issues</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Itinerary changes</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-[#0F4C81] hover:text-[#0F4C81] hover:bg-[#0F4C81]/5 group">
              Chat with Support <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-panel border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up stagger-2">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <CardTitle className="font-playfair text-2xl text-primary">Vendor Partnership</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#1E293B]/70 mb-4 leading-relaxed">
              Are you a tour operator or travel agency? Join our marketplace to reach thousands of travelers looking for unique Indian experiences.
            </p>
            <ul className="space-y-2 text-sm text-[#1E293B]/80 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Onboarding help</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Listing optimization</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Business inquiries</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-[#F59E0B] hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 group">
              Partner Resources <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-panel border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up stagger-3">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-[#10B981]" />
            </div>
            <CardTitle className="font-playfair text-2xl text-primary">General Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#1E293B]/70 mb-4 leading-relaxed">
              Have a suggestion, feedback, or a general question about how TravelLog works? We'd love to hear from you.
            </p>
            <ul className="space-y-2 text-sm text-[#1E293B]/80 mb-6">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Platform feedback</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Feature suggestions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Press & Media</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-[#10B981] hover:text-[#10B981] hover:bg-[#10B981]/5 group">
              Send a Message <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
