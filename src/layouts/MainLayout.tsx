
import Hero from '@/components/hero.section'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'

const Main = () => {
  return (
    <div>
        <Navbar />
        <div className='min-h-[70vh]'>
            <Hero />
            <Footer />
        </div>
      
    </div>
  )
}

export default Main
