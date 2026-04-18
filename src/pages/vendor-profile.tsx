import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import PackageCard from "@/components/app/package-card";
import { PackagesSkeleton } from "@/components/app/packages-states";
import { MapPin, Star, Calendar, PackageCheck, Package, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useVendorProfile } from "@/hooks/app/vendor-profile";

export default function VendorProfilePage() {

    const { vendorId } = useParams();
    const sentinelRef = useRef<HTMLDivElement>(null);

    const {
        vendor,
        packages,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useVendorProfile(vendorId!);

    console.log("vendor profile data:::", vendor,);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0, rootMargin: "100px" }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading && !vendor) return <Loader />;
    if (error) return <Error message={error.message || "Failed to load vendor profile"} />;
    if (!vendor) return <Error message="Vendor not found or not verified" />;

    const joinedDate = new Date(vendor.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    return (
        <div className="min-h-screen bg-background mt-20">
            {/* Hero Section */}
            <div className="bg-muted/30 border-b border-border py-12 px-4 shadow-sm">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-md">
                        <AvatarImage src={vendor.profilePhotoUrl || vendor.profilePhoto || undefined} alt={vendor.businessName} className="object-cover" />
                        <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
                            {vendor.businessName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
                                {vendor.businessName}
                                {vendor.isVerified && (
                                    <PackageCheck className="w-6 h-6 text-emerald-500" />
                                )}
                            </h1>
                            {vendor.location && (
                                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-1 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    {vendor.location}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium">

                            {/* Rating */}
                            <div className="flex items-center gap-1.5 text-foreground bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                                <Star className={`w-4 h-4 ${vendor.averageRating > 0 ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                                <span>{vendor.averageRating > 0 ? vendor.averageRating : "No Ratings Yet"}</span>
                            </div>

                            {/* Joined */}
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {joinedDate}</span>
                            </div>

                            {/* Active Packages */}
                            <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                <Package className="w-4 h-4" />
                                <span>{vendor?.totalPackages ?? 0} Active</span>
                            </div>

                            {/* Completed Packages */}
                            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                                <CheckCircle className="w-4 h-4" />
                                <span>{vendor?.totalTripsCompleted ?? 0} Completed</span>
                            </div>

                        </div>

                        {!vendor.about && (
                            <div className="pt-2 space-y-2">
                                <h2 className="text-lg font-semibold text-foreground/70">
                                    About
                                </h2>

                                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                                    {/* {vendor.about} */}
                                    {'Mountain Trails Co. has been crafting unforgettable high-altitude experiences since 2018. Based out of Shimla, our team of certified trek leaders and local guides specialise in Himalayan winter expeditions — from the frozen passes of Spiti to the remote valleys of Kinnaur. We believe travel should be transformative, not just recreational.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Packages Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">Active Packages</h2>
                    <Badge variant="outline" className="text-sm px-3 py-1 bg-background">
                        Total: {vendor.totalPackages}
                    </Badge>
                </div>

                {packages.length === 0 && !isLoading ? (
                    <div className="text-center py-20 border border-dashed rounded-xl bg-muted/10">
                        <h3 className="text-lg font-medium text-muted-foreground">No active packages currently available.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {packages.map((pkg) => (
                            <div key={pkg._id} className="h-full">
                                <PackageCard pkg={pkg} view="grid" />
                            </div>
                        ))}
                    </div>
                )}

                {isFetchingNextPage && (
                    <div className="mt-8">
                        <PackagesSkeleton count={4} />
                    </div>
                )}

                <div ref={sentinelRef} className="h-4 w-full mt-4" />

                {!hasNextPage && packages.length > 0 && (
                    <p className="text-center text-muted-foreground mt-8">You've seen all packages from this vendor.</p>
                )}
            </div>
        </div>
    );
}


function Badge({ children, className }: { children: React.ReactNode, className?: string, variant?: string }) {
    return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>{children}</span>
}
