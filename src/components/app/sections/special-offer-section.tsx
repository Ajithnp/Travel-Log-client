import { MapPin, Users, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ALL_OFFERS, IMAGES } from "@/mock-data";

export function SpecialOffersSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-start mb-16">
          <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-2">Top Deals</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Special Offers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {ALL_OFFERS.map((offer, i) => (
            <Card
              key={i}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl group border-l-[5px] relative bg-white"
            >
              {offer.popular && (
                <div className="absolute -right-8 top-5 bg-orange-500 text-white text-[10px] font-bold px-10 py-1 rotate-45 z-20 shadow-md">
                  POPULAR
                </div>
              )}

              <div className="h-44 overflow-hidden relative">
                <div className="absolute bottom-3 right-3 z-10 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold shadow-lg text-sm">
                  {offer.price} <span className="text-[10px] text-white/80 font-normal">/person</span>
                </div>
                <img
                  src={offer.img}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="h-0.5 w-full bg-gradient-to-r from-orange-100 via-orange-50 to-transparent" />

              <CardContent className="p-5">
                <div className="flex text-orange-500 mb-2 gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-1">
                  {offer.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 pb-4 border-b border-gray-100 text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-orange-500" /> {offer.loc}</div>
                  <div className="flex items-center gap-1"><Users className="h-3 w-3 text-orange-500" />  {offer.ppl}</div>
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3 text-orange-500" />  {offer.days}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {[0, 1].map((idx) => (
                      <div key={idx} className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden shadow-sm">
                        <img src={IMAGES.destinations[idx]} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm">
                      +4
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 font-bold p-0 h-auto gap-1 group/btn text-sm"
                  >
                    Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}