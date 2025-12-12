import { useAuthUser } from '@/hooks/useAuthUser';
import SidebarLayout from './SidebarLayout';
import { adminSidebarLinks } from '@/types/components-inputs.types/commponents.types';

const AdminLayout = () => {
  const { user } = useAuthUser();
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
