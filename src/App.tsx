
import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from '@/routes/AppRoutes'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Router>
       <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes/>
    </Router>
    
    </>
  )
}

export default App
