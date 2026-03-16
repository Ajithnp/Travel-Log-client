import {
  Plane, MapPin, Phone, Clock, ChevronRight,
  Facebook, Twitter, Instagram, Linkedin,
  ArrowRight, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 
const INFO_LINKS    = ["About Us", "Destinations", "Tours & Pricing", "Blog Post", "Contact Us"];
const HELPFUL_LINKS = ["Support Center", "Terms & Conditions", "Privacy Policy", "Refund Policy", "FAQ"];
const CONTACT_INFO  = [
  { Icon: MapPin, label: "Location",     value: "123 Travel Avenue, New York, NY 10001, USA" },
  { Icon: Phone,  label: "Phone",        value: "+1 (555) 123-4567"                          },
  { Icon: Clock,  label: "Office Hours", value: "Mon - Sat: 9.00am - 6.00pm"                 },
];
const SOCIAL_ICONS = [Facebook, Twitter, Instagram, Linkedin];
 
export function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-white pt-24 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-t-[3px] border-orange-500 pt-16">
 
          {/* Brand + newsletter + social */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-orange-500 p-2.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tight text-white">Travels</span>
            </div>
 
            <p className="text-gray-400 mb-8 leading-relaxed font-medium">
              We make your travel dreams come true with exceptional service and unforgettable experiences across the globe.
            </p>
 
            <div className="mb-10 bg-white/5 p-5 rounded-2xl border border-white/10">
              <p className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" /> Subscribe to our newsletter
              </p>
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="bg-white/10 border-transparent text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-orange-500 h-11"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-11 px-4 shadow-lg">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
 
            <div className="flex gap-4">
              {SOCIAL_ICONS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
 
          {/* Information */}
          <FooterLinkColumn title="Information" items={INFO_LINKS} />
 
          {/* Helpful Links */}
          <FooterLinkColumn title="Helpful Links" items={HELPFUL_LINKS} />
 
          {/* Contact info */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-1/2 after:h-1.5 after:bg-orange-500 after:rounded-full">
              Contact Info
            </h3>
            <ul className="space-y-6">
              {CONTACT_INFO.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4 text-gray-400 group">
                  <div className="bg-white/5 p-3 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="pt-1">
                    <p className="text-white font-bold mb-1">{label}</p>
                    <span className="font-medium text-base">{value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
 
        <div className="h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
 
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm font-bold">
          <p>&copy; {new Date().getFullYear()} Travels. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            {["Terms", "Privacy", "Cookies"].map((t) => (
              <a key={t} href="#" className="hover:text-orange-500 transition-colors uppercase tracking-wider">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
 

function FooterLinkColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-8 text-white relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-1/2 after:h-1.5 after:bg-orange-500 after:rounded-full">
        {title}
      </h3>
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-3 group font-medium text-lg"
            >
              <ChevronRight className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              <span className="-ml-7 group-hover:ml-0 transition-all">{item}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}