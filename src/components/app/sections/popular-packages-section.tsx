import { MapPin, Star } from "lucide-react";
import { usePopularPackagesQuery } from "@/hooks/app/api.hooks";
import { useMultipleDataWithSignedUrls } from "@/hooks/s3/multiple-data-with-signed-urls";
import type { PopularPackageResponse } from "@/services/app-service";
import { appConfig } from "@/config/config";
import { Link } from "react-router-dom";


export function PopularPackagesSection() {
  const {
    data: packages,
    isLoading,
  } = useMultipleDataWithSignedUrls<PopularPackageResponse>(
    usePopularPackagesQuery(),
    {
      userId: appConfig.publicId,
      imageFields: ["image"],
      enabled: true,
    },
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-2">
              Explore India
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Popular Packages</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative rounded-3xl overflow-hidden shadow-lg bg-gray-100 animate-pulse"
                >
                  <div className="aspect-[4/5]" />
                </div>
              ))
            : (packages ?? []).map((pkg, i) => (
                <Link to={`/packages/${pkg?._id}`}
                  key={pkg._id ?? i}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={pkg.image?.url ?? ""}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 text-white/90">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                          <span>{pkg.location}, {pkg.state}</span>
                        </div>
                        <div className="flex items-center text-xs text-orange-400 font-bold">
                          <Star className="h-3 w-3 mr-1 fill-current" /> {pkg.rating?.toFixed(1) ?? "—"}
                        </div>
                      </div>
                      <span className="text-sm font-bold text-orange-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}