

import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div className=''>
        <Navbar />
      <div className='min-h-[70vh]'>
        
        <Outlet />
        
            <Footer />
        </div>
      
    </div>
  )
}

export default Main
