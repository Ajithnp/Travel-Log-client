import { MapPin, Users, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRecommendedPackagesQuery } from "@/hooks/app/api.hooks";

export const IMAGES = {
  offers: [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format",
    "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format",
  ],
  destinations: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format",
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=400&auto=format",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&auto=format",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&auto=format",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format",
  ],
};

export interface Offer {
  price: string;
  title: string;
  loc: string;
  days: string;
  ppl: string;
  img: string;
  popular: boolean;
}

export const ALL_OFFERS: Offer[] = [
  { price: "$1,860", title: "Mount Fuji Expedition", loc: "Japan", days: "7 Days", ppl: "2 People", img: IMAGES.offers[0], popular: true },
  { price: "$2,450", title: "Santorini Getaway", loc: "Greece", days: "5 Days", ppl: "2 People", img: IMAGES.offers[1], popular: false },
  { price: "$1,200", title: "Bali Surf Safari", loc: "Indonesia", days: "10 Days", ppl: "4 People", img: IMAGES.offers[2], popular: false },
  { price: "$3,100", title: "Northern Lights Tour", loc: "Iceland", days: "6 Days", ppl: "2 People", img: IMAGES.offers[3], popular: false },
];

export function SpecialOffersSection() {

  const recommendedPackages = useRecommendedPackagesQuery()
  console.log("recommended packages === ", recommendedPackages?.data?.data)

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-start mb-16">
          <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-2">Explore</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Recommended For You</h2>
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