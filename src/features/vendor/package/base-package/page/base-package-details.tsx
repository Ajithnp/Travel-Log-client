import { PackageHeader } from "../components/package-details/package-header";
import { PackageGallery } from "../components/package-details/package-gallery";
import { PackageAbout } from "../components/package-details/package-about";
import { PackageItinerary } from "../components/package-details/package-itinerary";
import { PackageInclusions } from "../components/package-details/package-inclusions";
import { PackingList } from "../components/package-details/packing-list";
import { PackageSidebar } from "../components/package-details/package-sidebar";
import { useVendorId } from "@/features/vendor/hooks/vendor-id";
import { useParams } from "react-router-dom";
import { usePackageDeleteMutation, usePackagesFetchWithId } from "../hooks/api.hooks";
import { useDataWithSignedUrls } from "@/hooks/s3/data-with-signed-urls";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { Button } from "@/components/ui/button";
import type { PackageDetailWithStats } from "../type/package";
import { useState } from "react";
import { ConfirmDialog } from "@/components/common/confirm-dialog";



const BasePackageDetails = () => {
  const [isDelete, setIsDelete] = useState(false);
  const vendorId = useVendorId();
  const { packageId } = useParams<{ packageId: string }>();


  const { data, isLoading, error } =
    useDataWithSignedUrls<PackageDetailWithStats>(
      usePackagesFetchWithId(packageId ?? "", { enabled: !!packageId }),
      {
        userId: vendorId ?? '',
        imageFields: ['images'],

      }
    );

  const mutateAsync = usePackageDeleteMutation({ packageId})
  const handleDelete = () => {
    mutateAsync.mutateAsync(packageId ?? "", {
      onSuccess: () => {
        setIsDelete(false);

      }
    })
  }

  if (isLoading || !data) return <Loader message="Loading data.." />;
  if (error) return <Error message={error.message} />

  const pkg = data;
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-[90rem] mx-auto sm:px-6 py-2 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Packages
            </span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">
              {pkg.title}
            </span>
          </p>
          <Button
            variant={"outline"}
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-input bg-background hover:bg-muted transition shadow-premium"
          >
            ← Back
          </Button>

        </div>
      </div>

      <div className="max-w-[90rem] mx-auto sm:px-6 py-6">
        <PackageHeader
          pkg={pkg}
          onDelete={() => setIsDelete(true)}
        />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6 min-w-0">
            <PackageGallery images={pkg.images} />
            <PackageAbout description={pkg.description} />
            <PackageItinerary itinerary={pkg.itinerary} totalDays={pkg.days} />
            <PackageInclusions inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
            <PackingList items={pkg.packingList} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <PackageSidebar pkg={pkg} />
            </div>
          </aside>
        </div>
        <div className="lg:hidden mt-6">
          <PackageSidebar pkg={pkg} />
        </div>
      </div>

      <ConfirmDialog
        open={isDelete}
        onOpenChange={(value) => setIsDelete(value)}
        title="Delete package"
        description={`Are you sure you want to delete this package? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText={mutateAsync.isPending ? "Deleting..." : "Delete"}
        variant="danger"
        loading={mutateAsync.isPending}
        destructive
      />


    </div>
  );
};

export default BasePackageDetails;
