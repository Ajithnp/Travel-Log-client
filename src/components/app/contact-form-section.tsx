import { useState } from "react";
import { CheckCircle2, HeadphonesIcon, ShieldCheck, Compass, Clock, Award, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContactMutation } from "@/hooks/app/api.hooks";
import { contactFormSchema } from "@/validations/contact.schema";

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactFormSection() {
  
  const [isSuccess, setIsSuccess] = useState(false);
  const contactMutation = useContactMutation()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    contactMutation.mutate(values,{
      onSuccess:()=>{
        setIsSuccess(true)
        form.reset();
      }
    });
    
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <h2 className="font-playfair text-4xl font-bold text-primary mb-4">Send us a message</h2>
              <p className="text-[#1E293B]/70 text-lg">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {isSuccess ? (
              <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-2xl p-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#10B981]/30">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#0F4C81] mb-2">Message Sent Successfully!</h3>
                <p className="text-[#1E293B]/70 mb-6">
                  Thank you for reaching out. A member of our support team will contact you shortly regarding your inquiry.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsSuccess(false)}
                  className="border-[#0F4C81]/20 text-[#0F4C81] hover:bg-[#0F4C81]/5"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1E293B]">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Rahul Sharma" className="h-12 border-[#1E293B]/20 focus-visible:ring-[#0F4C81]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1E293B]">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="rahul@example.com" className="h-12 border-[#1E293B]/20 focus-visible:ring-[#0F4C81]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1E293B]">Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" className="h-12 border-[#1E293B]/20 focus-visible:ring-[#0F4C81]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1E293B]">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help you?" className="h-12 border-[#1E293B]/20 focus-visible:ring-[#0F4C81]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1E293B]">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your inquiry..." 
                            className="min-h-[150px] resize-y border-[#1E293B]/20 focus-visible:ring-[#0F4C81] p-4" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={contactMutation.isPending}
                    className="w-full h-14 bg-primary hover:bg-primary/80 text-white text-base font-semibold transition-all shadow-lg shadow-primary/20"
                  >
                    {contactMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Why TravelLog Features */}
          <div className="w-full lg:w-1/2 bg-[#F8FAFC] rounded-3xl p-8 lg:p-10 border border-slate-200">
            <h2 className="font-playfair text-3xl font-bold text-primary mb-8">Why travelers & vendors choose us</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: HeadphonesIcon, title: "Dedicated Support", desc: "Round-the-clock assistance for all your travel needs." },
                { icon: ShieldCheck, title: "Trusted Vendors", desc: "Every partner is verified for quality and reliability." },
                { icon: CheckCircle2, title: "Secure Booking", desc: "Bank-grade security for all your transactions." },
                { icon: Compass, title: "India-Focused", desc: "Deep local knowledge and curated authentic experiences." },
                { icon: Clock, title: "Fast Response", desc: "Quick resolution times for inquiries and support tickets." },
                { icon: Award, title: "Professional Help", desc: "Expert guidance for vendors to grow their business." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:bg-[#0F4C81] transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-[#0F4C81] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E293B] mb-1">{feature.title}</h4>
                    <p className="text-sm text-[#1E293B]/70 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-6 bg-gradient-to-br from-white to-white rounded-2xl text-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <Mail className="w-8 h-8 shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold text-primary text-lg mb-1">Direct Contact</h4>
                  <p className="text-primary/80 text-sm mb-4">Prefer to email us directly? Reach our specific departments.</p>
                  <div className="space-y-2 text-sm font-medium">
                    <p>Support: <a href="#" className="text-primary hover:underline">hello@travellog.in</a></p>
                    <p>Partners: <a href="#" className="text-primary hover:underline">vendors@travellog.in</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
