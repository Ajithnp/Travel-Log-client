import { useState } from "react";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALL_DESTINATIONS } from "@/mock-data";

const DEST_PER_PAGE = 4;
const TOTAL_PAGES   = Math.ceil(ALL_DESTINATIONS.length / DEST_PER_PAGE);

export function DestinationsSection() {
  const [page, setPage] = useState(0);

  const visible = ALL_DESTINATIONS.slice(
    page * DEST_PER_PAGE,
    page * DEST_PER_PAGE + DEST_PER_PAGE,
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-2">
              Explore India
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Popular Destinations</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Page dots */}
            <div className="flex gap-2 mr-2">
              {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-6 h-3 bg-orange-500"
                      : "w-3 h-3 bg-gray-200 hover:bg-orange-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="w-12 h-12 rounded-full border-gray-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white bg-white transition-all shadow-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={page === TOTAL_PAGES - 1}
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
              className="w-12 h-12 rounded-full border-gray-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white bg-white transition-all shadow-sm disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500">
          {visible.map((dest) => (
            <div
              key={dest.name}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              {/* <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-white text-orange-500 font-black px-4 py-1.5 text-base border-0 shadow-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {String(page * DEST_PER_PAGE + i + 1).padStart(2, "0")}
                </Badge>
              </div> */}

              <div className="aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity" />
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1 text-white/90">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                      <span>{dest.loc}</span>
                    </div>
                    <div className="flex items-center text-xs text-orange-400 font-bold">
                      <Star className="h-3 w-3 mr-1 fill-current" /> {dest.rating}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-orange-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}