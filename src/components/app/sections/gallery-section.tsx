import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/mock-data";

const GALLERY_ITEMS = [
  { img: IMAGES.gallery[0], name: "Yosemite", country: "USA",    cols: "col-span-2", rows: "row-span-2" },
  { img: IMAGES.gallery[1], name: "Kyoto",    country: "Japan",  cols: "",           rows: ""           },
  { img: IMAGES.gallery[2], name: "Rome",     country: "Italy",  cols: "",           rows: ""           },
  { img: IMAGES.gallery[3], name: "Paris",    country: "France", cols: "col-span-2", rows: ""           },
];

export function GallerySection() {
  return (
    <section className="py-24 bg-gradient-to-t from-gray-950 to-gray-900 text-white overflow-hidden relative">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-3">Memories</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Destination Gallery</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Browse through our collection of beautiful memories captured by our travelers around the globe.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex items-center gap-6">
              <Stat value="30" accent="text-orange-500" label="Destinations" />
              <div className="h-16 w-px bg-white/10 hidden sm:block" />
              <Stat value="50" accent="text-blue-500" label="Packagers" />
            </div>
            {/* <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-gray-900 rounded-full px-8 py-6 text-lg transition-all ml-0 sm:ml-4 group"
            >
              See All <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button> */}
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] mt-10">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`${item.cols} ${item.rows} rounded-3xl overflow-hidden group relative hover:ring-4 hover:ring-inset hover:ring-white/30 transition-all duration-300 cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
              <img
                src={item.img}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1">{item.name}</h4>
                <p className="text-orange-400 font-bold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {item.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, accent, label }: { value: string; accent: string; label: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className={`text-6xl font-black text-white mb-2`}>
        {value}<span className={accent}>+</span>
      </div>
      <div className={`h-1 w-12 ${accent.replace("text-", "bg-")} mb-2 mx-auto sm:mx-0 rounded-full`} />
      <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
}