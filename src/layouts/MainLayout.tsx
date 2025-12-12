
import Footer from '@/components/shared/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import NavbarContainer from '@/components/containers/NavbarContainer'

const Main = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarContainer />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-[90px]'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Main
