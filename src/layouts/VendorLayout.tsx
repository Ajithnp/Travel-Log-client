import { useAuthUser } from '@/hooks/useAuthUser'
import SidebarLayout from './SidebarLayout';
import { vendorSidebarLinks } from '@/types/components-inputs.types/commponents.types';

const VendorLayout = () => {
  const { user } = useAuthUser();
  return (
    <SidebarLayout
      sidebarLinks={vendorSidebarLinks}
      dashboardTitle='Dashboard'
      greeting={`Hi ${user?.name || "Vendor"}`}
      loginRedirectPath={"/vendor/login"}
    />
  )
}

export default VendorLayout
