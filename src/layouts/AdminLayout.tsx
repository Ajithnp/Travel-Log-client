import { useAuthUser } from '@/hooks/useAuthUser';
import SidebarLayout from './SidebarLayout';
import { adminSidebarLinks } from '@/types/components-inputs.types/commponents.types';
import { useNotificationSocket } from '@/features/notification/hooks/notification.socket';

const AdminLayout = () => {
  const { user } = useAuthUser();
   useNotificationSocket();
  return (
    <SidebarLayout
      sidebarLinks={adminSidebarLinks}
      dashboardTitle='Dashboard'
      greeting={`Hi ${user?.name || "Admin"}`}
      loginRedirectPath='/admin/login'
    />
  )
}

export default AdminLayout
