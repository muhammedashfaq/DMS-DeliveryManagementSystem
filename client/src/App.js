import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/user/login'
import Landingpage from './pages/landingpage'
import Register from './pages/user/register'
import Otp from './pages/user/otp'
import Forget from './pages/user/forget'
import Dlogin from './pages/driver/login'
import Alogin from './pages/admin/login'
import AdminHome from './pages/admin/Home/Home'
import Home from './pages/user/Home/Home'
import Reset from './pages/user/forget2'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/Routes/protectedRoutes'
import PublicRoutes from './components/Routes/publicRoutes'
const App = () => {
  const{loading}=useSelector(state=>state.alerts)
  return (
    <BrowserRouter>
{ loading && (<div className='flex justify-center items-center bg-slate-950 opacity-60 fixed top-0 left-0 w-full h-full z-50 space-x-3'> 

<div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
	<div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
	<div className="w-4 h-4 rounded-full animate-pulse dark:bg-white"></div>
</div>)}

    <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
    <Routes>
         <Route path='/' element={<PublicRoutes> <Landingpage/> </PublicRoutes> }/>
         <Route path='/login' element={ <PublicRoutes> <Login/> </PublicRoutes>   }/>
         <Route path='/register' element={ <PublicRoutes><Register/> </PublicRoutes>}/>
         <Route path='/Home' element={ <ProtectedRoutes>  <Home />   </ProtectedRoutes>   }/>
         <Route path='/otp' element={<Otp/>}/> 
         <Route path='/forget' element={<Forget/>}/>
         <Route path='/reset' element={<Reset />}/>

         
         <Route path='/dlogin' element={<Dlogin/>}/>
         <Route path='/admin' element={<Alogin/>}/>
         <Route path='/adminhome' element={<AdminHome/>}/>





    </Routes>
    
    </BrowserRouter>
  )
}

export default App