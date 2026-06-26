import { MapPin, Users, Star, ArrowRight, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRecommendedPackagesQuery } from "@/hooks/app/api.hooks";
import { appConfig } from "@/config/config";
import type { RecommendedPackageResponse } from "@/services/app-service";
import { useMultipleDataWithSignedUrls } from "@/hooks/s3/multiple-data-with-signed-urls";
import { useNavigate } from "react-router-dom";

export function PackageRecommendedSection() {

    const navigate = useNavigate();

    const {
      data: packages,
      isLoading,
    } = useMultipleDataWithSignedUrls<RecommendedPackageResponse>(
      useRecommendedPackagesQuery(),
      {
        userId: appConfig.publicId,
        imageFields: ["image"],
        enabled: true,
      },
    );


  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-start mb-16">
          <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-2">Explore</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Recommended For You</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card
                  key={i}
                  className="overflow-hidden border-0 shadow-lg rounded-2xl bg-white animate-pulse"
                >
                  <div className="h-44 bg-gray-200" />

                  <div className="h-0.5 w-full bg-gray-100" />

                  <CardContent className="p-5 space-y-3">
                  
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="w-3 h-3 rounded-sm bg-gray-200" />
                      ))}
                    </div>

                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="space-y-2 pb-4 border-b border-gray-100">
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-2/5" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-200" />
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : (packages ?? []).map((pkg, i) => (
                <Card
                  key={pkg._id ?? i}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl group border-l-[5px] relative bg-white"
                >
                  <div className="h-44 overflow-hidden relative">
                    <div className="absolute bottom-3 right-3 z-10 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold shadow-lg text-sm">
                      {pkg?.soloPrice} <span className="text-[10px] text-white/80 font-normal">/person</span>
                    </div>
                    <img
                      src={pkg.image?.url}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="h-0.5 w-full bg-gradient-to-r from-orange-100 via-orange-50 to-transparent" />

                  <CardContent className="p-5">
                    <div className="flex text-orange-500 mb-2 gap-0.5">
                      {[...Array(pkg?.rating ? pkg.rating : 3)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-1">
                      {pkg?.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 pb-4 border-b border-gray-100 text-xs text-gray-600 font-medium">
                      <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-orange-500" /> {pkg?.location}</div>
                      <div className="flex items-center gap-1"><Users className="h-3 w-3 text-orange-500" />  {pkg?.state}</div>
                      {pkg?.category && (
                       <div className="flex items-center gap-1"><Mountain className="h-3 w-3 text-orange-500" />  {pkg?.category}</div>
                      )}
                      
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="inline-flex items-center px-2 py-1 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-500 shadow-sm whitespace-nowrap">
                          {pkg.totalReviews} Reviews
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 font-bold p-0 h-auto gap-1 group/btn text-sm"
                        onClick={()=> navigate(`/packages/${pkg?._id}`)}
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