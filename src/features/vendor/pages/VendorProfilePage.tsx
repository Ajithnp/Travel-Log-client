import VendorProfile from "../componenets/VendorProfile";
import useVendorProfile from "../hooks/useVendorProfile";
import { Loading } from "@/components/ui/loading";

export default function VendorProfilePage() {
  const { vendor, vendorQuery, profileLogoUrl, logoQuery } = useVendorProfile();

  console.log('vendor data', {
    vendorRaw: vendor,
    profileUrl: profileLogoUrl
  })
  
  if (!vendor) return;
  if(!profileLogoUrl) <Loading variant="spinner" fullscreen />

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <VendorProfile
        profileData={vendor}
        loadingPage={vendorQuery.isLoading}
        url={profileLogoUrl?.url}
        loadingLogo={logoQuery.isLoading} />
    </main>
  );
}
