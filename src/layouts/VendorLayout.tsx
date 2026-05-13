import { useAuthUser } from '@/hooks/useAuthUser'
import SidebarLayout from './SidebarLayout';
import { vendorSidebarLinks } from '@/types/components-inputs.types/commponents.types';
import { useNotificationSocket } from '@/features/notification/hooks/notification.socket';

const VendorLayout = () => {
  const { user } = useAuthUser();
  useNotificationSocket();
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
